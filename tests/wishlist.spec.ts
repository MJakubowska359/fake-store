import { ShopPage } from '../src/pages/shop.page';
import { expect, test } from '@playwright/test';

test.describe('Verify wishlist', () => {
  let shopPage: ShopPage;

  test.beforeEach(async ({ page }) => {
    shopPage = new ShopPage(page);

    await shopPage.goto();
  });

  test('Add product to wishlist', async () => {
    // Arrange
    const expectedTextAfterProductAdded = 'Produkt dodany!';

    // Act
    await shopPage.addYogaInTuscanyToWishlist();

    // Assert
    await expect(shopPage.submitMessage).toHaveText(
      expectedTextAfterProductAdded,
    );
  });
});
