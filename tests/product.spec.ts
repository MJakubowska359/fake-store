import { ProductPage } from '../src/pages/product.page';
import { ShopPage } from '../src/pages/shop.page';
import { expect, test } from '@playwright/test';

test.describe('Verify basket', () => {
  let shopPage: ShopPage;
  let productPage: ProductPage;

  test.beforeEach(async ({ page }) => {
    shopPage = new ShopPage(page);
    productPage = new ProductPage(page);
  });

  test('Add too many of the product to the basket', async () => {
    // Arrange

    const expectedAlertContent =
      'Nie możesz dodać takiej ilości do koszyka — w magazynie posiadamy 14536 a w koszyku masz już 1.';

    // Act
    await shopPage.goto();
    await shopPage.clickClimbingViaFerrata();
    await productPage.clickAddToBasketButton();
    await shopPage.addFullProductQuantityToBasket();
    await productPage.clickAddToBasketButton();

    // Assert
    await expect(productPage.alert).toContainText(expectedAlertContent);
  });
});
