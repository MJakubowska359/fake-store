import { LoginPage } from '../../src/pages/login.page';
import { testUser1 } from '../../src/test-data/user.data';
import { expect, test } from '@playwright/test';

test.describe('Login @smoke', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
  });

  test('User can log in with valid credentials', async () => {
    // Arrange
    const expectedHeader = 'Moje konto';

    // Act
    await loginPage.goto();
    await loginPage.login(testUser1);

    // Assert
    await expect(loginPage.header).toHaveText(expectedHeader);
  });
});
