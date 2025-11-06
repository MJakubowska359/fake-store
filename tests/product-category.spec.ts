import { ProductCategoryPage } from '../src/pages/product-category.page';
import { ShopPage } from '../src/pages/shop.page';
import { expect, test } from '@playwright/test';

test.describe('Verify product category page', () => {
  let shopPage: ShopPage;
  let productCategoryPage: ProductCategoryPage;

  test.beforeEach(async ({ page }) => {
    shopPage = new ShopPage(page);
    productCategoryPage = new ProductCategoryPage(page);
  });

  test('Sort products by lowest price', async () => {
    // Arrange
    const expectedFirstProductPrice = '2 900,00 zł';
    const expectedLastProductPrice = '5 399,00 zł';

    // Act
    await shopPage.goto();
    await shopPage.clickWindsurfingCategory();
    await productCategoryPage.sortByLowestPrice();

    // Assert
    await expect(productCategoryPage.priceUnderProduct.first()).toHaveText(
      expectedFirstProductPrice,
    );
    await expect(productCategoryPage.priceUnderProduct.last()).toHaveText(
      expectedLastProductPrice,
    );
  });

  test('Sort products by highest price', async () => {
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
