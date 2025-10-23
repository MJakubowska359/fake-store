import { prepareRandomUser } from '../../src/factories/user.factory';
import { RegisterUserModel } from '../../src/models/user.model';
import { MainAccountPage } from '../../src/pages/main-account.page';
import { MainPage } from '../../src/pages/main.page';
import { RegisterPage } from '../../src/pages/register.page';
import { expect, test } from '@playwright/test';

test.describe('Verify account deletion', () => {
  let registerPage: RegisterPage;
  let registerUserData: RegisterUserModel;
  let mainAccountPage: MainAccountPage;
  let mainPage: MainPage;

  test.beforeEach(async ({ page }) => {
    registerPage = new RegisterPage(page);
    registerUserData = prepareRandomUser();
    mainAccountPage = new MainAccountPage(page);
    mainPage = new MainPage(page);

    await registerPage.goto();
  });

  test('Delete the created account', async () => {
    // Arrange
    const expectedHeaderInMyAccount = 'Moje konto';
    const expectedHeaderOnMainPage = 'Wybierz podróż dla siebie!';

    // Act
    await registerPage.register(registerUserData);
    await expect
      .soft(registerPage.header)
      .toHaveText(expectedHeaderInMyAccount);
    await mainAccountPage.deleteAccount();

    // Assert
    await expect
      .soft(mainPage.header.first())
      .toHaveText(expectedHeaderOnMainPage);
  });
});
