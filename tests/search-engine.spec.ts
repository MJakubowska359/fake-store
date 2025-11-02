import { BasePage } from '../src/pages/base.page';
import { ProductPage } from '../src/pages/product.page';
import { expect, test } from '@playwright/test';

test.describe('Verify search engine', () => {
  let basePage: BasePage;
  let productPage: ProductPage;

  test.beforeEach(async ({ page }) => {
    basePage = new BasePage(page);
    productPage = new ProductPage(page);

    await basePage.goto();
  });

  test('Enter the product price in the search engine', async () => {
    // Arrange
    const expectedHeader = 'Wyniki wyszukiwania: „2 599,00 zł”';

    // Act
    await basePage.fillPrizeInSearchEngine();
    await expect(basePage.header).toHaveText(expectedHeader);

    // Assert
    await expect(basePage.information).toBeVisible();
  });

  test('Enter part of the product name in the search engine', async () => {
    // Arrange
    const expectedHeader = 'Grecja – Limnos';

    // Act
    await basePage.fillPartOfProductNameInSearchEngine();

    // Assert
    await expect(productPage.header.first()).toHaveText(expectedHeader);
  });

  test('Enter letters from product names in the search engine', async () => {
    // Act
    await basePage.fillLettersInSearchEngine();

    // Assert
    await expect(basePage.searchResult).toHaveCount(4);
  });
});
