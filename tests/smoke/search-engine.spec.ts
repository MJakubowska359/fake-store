import { BasePage } from '../../src/pages/base.page';
import { ProductPage } from '../../src/pages/product.page';
import { expect, test } from '@playwright/test';

test.describe('Search engine @smoke', () => {
  let basePage: BasePage;
  let productPage: ProductPage;

  test.beforeEach(async ({ page }) => {
    basePage = new BasePage(page);
    productPage = new ProductPage(page);

    await basePage.goto();
  });

  test('User can search products by partial product name', async () => {
    // Arrange
    const expectedHeader = 'Grecja – Limnos';

    // Act
    await basePage.fillPartOfProductNameInSearchEngine();

    // Assert
    await expect(productPage.header.first()).toHaveText(expectedHeader);
  });
});
