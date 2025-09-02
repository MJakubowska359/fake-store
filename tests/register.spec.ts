import { prepareRandomUser } from '../src/factories/user.factory';
import { RegisterUserModel } from '../src/models/user.model';
import { RegisterPage } from '../src/pages/register.page';
import { expect, test } from '@playwright/test';

test.describe('Verify register', () => {
  let registerPage: RegisterPage;
  let registerUserData: RegisterUserModel;

  test.beforeEach(async ({ page }) => {
    registerPage = new RegisterPage(page);
    registerUserData = prepareRandomUser();

    await registerPage.goto();
  });

  test('Register with correct data', async () => {
    // Arrange
    const expectedWelcomeText = 'Witaj';

    // Act
    await registerPage.register(registerUserData);

    // Assert
    await expect(registerPage.paragraph.nth(1)).toContainText(
      expectedWelcomeText,
    );
  });
});
