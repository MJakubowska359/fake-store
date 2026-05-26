import { BasePage } from '../../src/pages/base.page';
import { expect, test } from '@playwright/test';

test.describe('Search engine @regression', () => {
  let basePage: BasePage;

  test.beforeEach(async ({ page }) => {
    basePage = new BasePage(page);

    await basePage.goto();
  });

  test('User can search products by price', async () => {
    // Arrange
    const expectedHeader = 'Wyniki wyszukiwania: „2 599,00 zł”';

    // Act
    await basePage.fillPrizeInSearchEngine();
    await expect(basePage.header).toHaveText(expectedHeader);

    // Assert
    await expect(basePage.information).toBeVisible();
  });

  test('User can search products using letters from product names', async () => {
    // Act
    await basePage.fillLettersInSearchEngine();

    // Assert
    await expect(basePage.searchResult).toHaveCount(4);
  });
});
