import { prepareRandomUser } from '../src/factories/user.factory';
import { RegisterUserModel } from '../src/models/user.model';
import { LoginPage } from '../src/pages/login.page';
import { MainAccountPage } from '../src/pages/main-account.page';
import { RegisterPage } from '../src/pages/register.page';
import {
  incorrect_email,
  incorrect_username,
  testUser1,
  without_password,
} from '../src/test-data/user.data';
import { expect, test } from '@playwright/test';

test.describe('Verify login', () => {
  let loginPage: LoginPage;
  let registerPage: RegisterPage;
  let registerUserData: RegisterUserModel;
  let mainAccount: MainAccountPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    registerPage = new RegisterPage(page);
    registerUserData = prepareRandomUser();
    mainAccount = new MainAccountPage(page);

    await loginPage.goto();
  });

  test('Log in with correct credentials', async () => {
    // Arrange
    const expectedHeader = 'Moje konto';

    // Act
    await loginPage.login(testUser1);

    // Assert
    await expect(loginPage.header).toHaveText(expectedHeader);
  });

  test('Reject login attempts without a password', async () => {
    // Arrange
    const expectedAlertContent = 'Błąd: pole hasła jest puste.';

    // Act
    await loginPage.login(without_password);

    // Assert
    await expect(loginPage.alert).toHaveText(expectedAlertContent);
  });

  test('Reject login attempts with an incorrect email', async () => {
    // Arrange
    const expectedAlertContent =
      'Nieznany adres e-mail. Proszę sprawdzić ponownie lub wypróbować swoją nazwę użytkownika.';

    // Act
    await loginPage.login(incorrect_email);

    // Assert
    await expect(loginPage.alert).toHaveText(expectedAlertContent);
  });

  test('Reject login attempts with an incorrect username', async () => {
    // Arrange
    const expectedAlertContent = `Błąd: brak ${incorrect_username.userEmail} wśród zarejestrowanych w witrynie użytkowników. Jeśli nie masz pewności co do nazwy użytkownika, użyj adresu e-mail.`;

    // Act
    await loginPage.login(incorrect_username);

    // Assert
    await expect(loginPage.alert).toHaveText(expectedAlertContent);
  });

  test('Reset password from login page', async () => {
    // Arrange
    const expectedNotificationContent = 'Wysłano e-mail do zresetowania hasła.';

    // Act
    await loginPage.clickResetPasswordOption();
    await loginPage.resetPassword(testUser1);

    // Assert
    await expect(loginPage.alert).toHaveText(expectedNotificationContent);
  });

  test('Reset password from account', async () => {
    // Arrange
    const expectedNotificationContent = 'Zmieniono szczegóły konta.';

    // Act
    await registerPage.register(registerUserData);
    await mainAccount.clickEditAccount();
    await mainAccount.changePassword(registerUserData);

    // Assert
    await expect(loginPage.alert).toHaveText(expectedNotificationContent);
  });
});
