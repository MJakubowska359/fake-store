import { ProductCategoryPage } from '../../src/pages/product-category.page';
import { ShopPage } from '../../src/pages/shop.page';
import { expect, test } from '@playwright/test';

test.describe('Product category page @regression', () => {
  let shopPage: ShopPage;
  let productCategoryPage: ProductCategoryPage;

  test.beforeEach(async ({ page }) => {
    shopPage = new ShopPage(page);
    productCategoryPage = new ProductCategoryPage(page);
  });

  test('User can sort products by price from high to low', async () => {
    // Arrange
    const expectedFirstProductPrice = '5 399,00 zł';
    const expectedLastProductPrice = '2 900,00 zł';

    // Act
    await shopPage.goto();
    await shopPage.clickWindsurfingCategory();
    await productCategoryPage.sortByHighestPrice();

    // Assert
    await expect(productCategoryPage.priceUnderProduct.first()).toHaveText(
      expectedFirstProductPrice,
    );
    await expect(productCategoryPage.priceUnderProduct.last()).toHaveText(
      expectedLastProductPrice,
    );
  });
});
