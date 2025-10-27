import { LoginPage } from '../../src/pages/login.page';
import { MainAccountPage } from '../../src/pages/main-account.page';
import { testUser1 } from '../../src/test-data/user.data';
import { expect, test } from '@playwright/test';

test.describe('Add addresses to the account', () => {
  let loginPage: LoginPage;
  let mainAccountPage: MainAccountPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    mainAccountPage = new MainAccountPage(page);
  });

  test('Add a billing address to the account', async () => {
    // Arrange
    const expectedAlertContent = 'Adres został zmieniony.';

    // Act
    await loginPage.goto();
    await loginPage.login(testUser1);
    await mainAccountPage.clickAddressSettings();
    await mainAccountPage.clickAddBillingAddressIcon();
    await expect(mainAccountPage.stateList).toBeHidden();
    await expect(mainAccountPage.emailAddressInput).toHaveValue(
      testUser1.userEmail,
    );
    await mainAccountPage.fillBillingAddressForm();
    await mainAccountPage.clickSaveAddressButton();

    // Assert
    await expect(mainAccountPage.alert).toHaveText(expectedAlertContent);
  });

  test('Add a shipping address to the account', async () => {
    // Arrange
    const expectedAlertContent = 'Adres został zmieniony.';

    // Act
    await loginPage.goto();
    await loginPage.login(testUser1);
    await mainAccountPage.clickAddressSettings();
    await mainAccountPage.clickAddShippingAddressIcon();
    await mainAccountPage.fillShippingAddressForm();
    await mainAccountPage.clickSaveAddressButton();

    // Assert
    await expect(mainAccountPage.alert).toHaveText(expectedAlertContent);
  });
});
