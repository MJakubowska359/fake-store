import { ProductCategoryPage } from '../../src/pages/product-category.page';
import { ProductPage } from '../../src/pages/product.page';
import { ShopPage } from '../../src/pages/shop.page';
import { expect, test } from '@playwright/test';

test.describe('Verify product', () => {
  let shopPage: ShopPage;
  let productCategoryPage: ProductCategoryPage;
  let productPage: ProductPage;

  test.beforeEach(async ({ page }) => {
    shopPage = new ShopPage(page);
    productCategoryPage = new ProductCategoryPage(page);
    productPage = new ProductPage(page);
  });

  test('User can navigate to the previous and next product', async () => {
    // Arrange
    const expectedPreviousProductHeader =
      'Zmień swoją sylwetkę! Yoga na Malcie';
    const expectedNextProductHeader = 'Wczasy relaksacyjne z yogą w Toskanii';

    // Act
    await shopPage.goto();
    await shopPage.clickYogaAndPilatesCategory();
    await productCategoryPage.clickYogaInTuscany();
    await productPage.goToPreviousProduct();
    await expect(productPage.header.first()).toHaveText(
      expectedPreviousProductHeader,
    );
    await productPage.goToNextProduct();

    // Assert
    await expect(productPage.header.first()).toHaveText(
      expectedNextProductHeader,
    );
  });
});
