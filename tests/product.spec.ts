import { ProductCategoryPage } from '../src/pages/product-category.page';
import { ProductPage } from '../src/pages/product.page';
import { ShopPage } from '../src/pages/shop.page';
import { expect, test } from '@playwright/test';

test.describe('Verify basket', () => {
  let shopPage: ShopPage;
  let productCategoryPage: ProductCategoryPage;
  let productPage: ProductPage;

  test.beforeEach(async ({ page }) => {
    shopPage = new ShopPage(page);
    productCategoryPage = new ProductCategoryPage(page);
    productPage = new ProductPage(page);
  });

  test('Add too many of the product to the basket', async () => {
    // Arrange

    const expectedAlertContent =
      'Nie możesz dodać takiej ilości do koszyka — w magazynie posiadamy 15340 a w koszyku masz już 1.';

    // Act
    await shopPage.goto();
    await shopPage.clickSailingCategory();
    await productCategoryPage.clickSailingInMasuria();
    await productPage.clickAddToBasketButton();
    await productPage.addFullProductQuantityToBasket();
    await productPage.clickAddToBasketButton();

    // Assert
    await expect(productPage.alert).toContainText(expectedAlertContent);
  });
});
