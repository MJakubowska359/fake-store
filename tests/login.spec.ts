import { LoginPage } from '../src/pages/login.page';
import {
  incorrect_email,
  incorrect_username,
  testUser1,
  without_password,
} from '../src/test-data/user.data';
import { expect, test } from '@playwright/test';

test.describe('Verify login', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);

    await loginPage.goto();
  });

  test('Login with correct credentials', async () => {
    // Arrange
    const expectedWelcomeText = 'Witaj';

    // Act
    await loginPage.login(testUser1);

    // Assert
    await expect(loginPage.paragraph.nth(1)).toContainText(expectedWelcomeText);
  });

  test('Reject login without password', async () => {
    // Arrange
    const expectedErrorText = 'Błąd: pole hasła jest puste.';

    // Act
    await loginPage.login(without_password);

    // Assert
    await expect(loginPage.alert).toContainText(expectedErrorText);
  });

  test('Reject login with incorrect email', async () => {
    // Arrange
    const expectedErrorText =
      'Nieznany adres e-mail. Proszę sprawdzić ponownie lub wypróbować swoją nazwę użytkownika.';

    // Act
    await loginPage.login(incorrect_email);

    // Assert
    await expect(loginPage.alert).toContainText(expectedErrorText);
  });

  test('Reject login with incorrect username', async () => {
    // Arrange
    const expectedErrorText = `Błąd: brak ${incorrect_username.userEmail} wśród zarejestrowanych w witrynie użytkowników. Jeśli nie masz pewności co do nazwy użytkownika, użyj adresu e-mail.`;

    // Act
    await loginPage.login(incorrect_username);

    // Assert
    await expect(loginPage.alert).toHaveText(expectedErrorText);
  });

  test('Remember password', async () => {
    // Arrange
    const expectedNotificationText = 'Wysłano e-mail do zresetowania hasła.';

    // Act
    await loginPage.clickResetPasswordOption();
    await loginPage.resetPassword(testUser1);

    // Assert
    await expect(loginPage.alert).toHaveText(expectedNotificationText);
  });
});
