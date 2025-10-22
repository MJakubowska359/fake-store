import { LoginPage } from '../../src/pages/login.page';
import { MainAccountPage } from '../../src/pages/main-account.page';
import { testUser1 } from '../../src/test-data/user.data';
import { expect, test } from '@playwright/test';

test.describe('Verify login and logout', () => {
  let loginPage: LoginPage;
  let mainAccountPage: MainAccountPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    mainAccountPage = new MainAccountPage(page);
  });

  test('Log in and logout', async () => {
    // Arrange
    const expectedHeaderAfterLogIn = 'Moje konto';
    const expectedHeaderAfterLogout = 'Zaloguj się';

    // Act
    await loginPage.goto();
    await loginPage.login(testUser1);
    await expect(mainAccountPage.header).toHaveText(expectedHeaderAfterLogIn);
    await mainAccountPage.clickLogoutButton();

    // Assert
    await expect(loginPage.header.nth(1)).toHaveText(expectedHeaderAfterLogout);
  });
});
