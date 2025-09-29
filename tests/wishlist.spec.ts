import { BasketPage } from '../src/pages/basket.page';
import { ShopPage } from '../src/pages/shop.page';
import { WishlistPage } from '../src/pages/wishlist.page';
import { expect, test } from '@playwright/test';

test.describe.configure({ mode: 'serial' });
test.describe('Verify wishlist', () => {
  let shopPage: ShopPage;
  let wishlistPage: WishlistPage;
  let basketPage: BasketPage;

  test.beforeEach(async ({ page }) => {
    shopPage = new ShopPage(page);
    wishlistPage = new WishlistPage(page);
    basketPage = new BasketPage(page);
  });

  test('Add product to wishlist', async () => {
    // Arrange
    const expectedTextAfterProductAdded = 'Produkt dodany!';

    // Act
    await shopPage.goto();
    await shopPage.addYogaInTuscanyToWishlist();

    // Assert
    await expect(shopPage.submitMessage).toHaveText(
      expectedTextAfterProductAdded,
    );
  });

  test('Remove product from wishlist', async () => {
    // Arrange
    const expectedTextAfterProductAdded = 'Produkt dodany!';
    const expectedTextAfterProductDeleted = 'Produkt został usunięty.';

    // Act
    await shopPage.goto();
    await shopPage.addWindsurfingInGreeceToWishlist();
    await expect
      .soft(shopPage.submitMessage)
      .toHaveText(expectedTextAfterProductAdded);
    await wishlistPage.goto();
    await wishlistPage.deleteProductFromWishlist();

    // Assert
    await expect(wishlistPage.alertAfterDeleted).toHaveText(
      expectedTextAfterProductDeleted,
    );
  });

  test('Add product to basket from wishlist', async () => {
    // Arrange
    const expectedTextAfterProductAdded = 'Produkt dodany!';
    const expectedHeading = 'Koszyk';

    // Act
    await shopPage.goto();
    await shopPage.addClimbingInIslandPeakToWishlist();
    await expect
      .soft(shopPage.submitMessage)
      .toHaveText(expectedTextAfterProductAdded);
    await wishlistPage.goto();
    await wishlistPage.addProductFromWishlistToBasket();

    // Assert
    await expect(basketPage.header.first()).toHaveText(expectedHeading);
  });
});
