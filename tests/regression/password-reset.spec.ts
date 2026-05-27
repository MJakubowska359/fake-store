import { prepareRandomUser } from '../../src/factories/user.factory';
import { RegisterUserModel } from '../../src/models/user.model';
import { LoginPage } from '../../src/pages/login.page';
import { MainAccountPage } from '../../src/pages/main-account.page';
import { RegisterPage } from '../../src/pages/register.page';
import { testUser1 } from '../../src/test-data/user.data';
import { expect, test } from '@playwright/test';

test.describe('Reset password @regression', () => {
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

  test('User can reset the password from the login page', async () => {
    // Arrange
    const expectedNotificationContent = 'Wysłano e-mail do zresetowania hasła.';

    // Act
    await loginPage.clickResetPasswordOption();
    await loginPage.resetPassword(testUser1);

    // Assert
    await expect(loginPage.alert).toHaveText(expectedNotificationContent);
  });

  test('User can reset the password from the account page', async () => {
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
