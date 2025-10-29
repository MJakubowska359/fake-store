import { BasePage } from '../src/pages/base.page';
import { expect, test } from '@playwright/test';

test.describe('Verify search engine', () => {
  let basePage: BasePage;

  test.beforeEach(async ({ page }) => {
    basePage = new BasePage(page);

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
});
