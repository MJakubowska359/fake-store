import { BasketPage } from '../src/pages/basket.page';
import { ProductPage } from '../src/pages/product.page';
import { ShopPage } from '../src/pages/shop.page';
import { expect, test } from '@playwright/test';

test.describe('Verify basket', () => {
  let shopPage: ShopPage;
  let basketPage: BasketPage;
  let productPage: ProductPage;

  test.beforeEach(async ({ page }) => {
    shopPage = new ShopPage(page);
    basketPage = new BasketPage(page);
    productPage = new ProductPage(page);
  });

  test('Add product to basket', async () => {
    // Arrange
    const expectedMessageForEmptyBasket = 'Twój koszyk jest pusty.';
    const expectedProductName = 'Wspinaczka Via Ferraty';
    const expectedAlertAfterProductAdded =
      '„Wspinaczka Via Ferraty“ został dodany do koszyka.';

    // Act
    await basketPage.goto();
    await expect(basketPage.message).toHaveText(expectedMessageForEmptyBasket);
    await basketPage.clickBackToShopButton();
    await shopPage.addClimbingViaFerrataToBasket();
    await expect(productPage.header.first()).toHaveText(expectedProductName);
    await productPage.clickAddToBasketButton();

    // Assert
    await expect(productPage.alert).toContainText(
      expectedAlertAfterProductAdded,
    );
  });
});
