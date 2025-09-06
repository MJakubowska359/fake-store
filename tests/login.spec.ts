import { LoginUserModel } from '../src/models/user.model';
import { LoginPage } from '../src/pages/login.page';
import { testUser1 } from '../src/test-data/user.data';
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
    const LoginUserModelData: LoginUserModel = {
      userEmail: testUser1.userEmail,
      userPassword: '123A567',
    };

    // Act
    await loginPage.login(LoginUserModelData);

    // Assert
    await expect(loginPage.alert).toContainText(expectedErrorText);
  });
});
