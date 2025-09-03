import { LoginPage } from '../src/pages/login.page';
import { testUser1 } from '../src/test-data/user.data';
import { expect, test } from '@playwright/test';

test.describe('Verify login', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);

    await loginPage.goto();
  });

  test('Register with correct data', async () => {
    // Arrange
    const expectedWelcomeText = 'Witaj';

    // Act
    await loginPage.login(testUser1);

    // Assert
    await expect(loginPage.paragraph.nth(1)).toContainText(expectedWelcomeText);
  });
});
