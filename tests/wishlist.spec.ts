import { BasketPage } from '../src/pages/basket.page';
import { ProductPage } from '../src/pages/product.page';
import { ShopPage } from '../src/pages/shop.page';
import { WishlistPage } from '../src/pages/wishlist.page';
import { expect, test } from '@playwright/test';

test.describe.configure({ mode: 'serial' });
test.describe('Verify wishlist', () => {
  let shopPage: ShopPage;
  let productPage: ProductPage;
  let wishlistPage: WishlistPage;
  let basketPage: BasketPage;

  test.beforeEach(async ({ page }) => {
    shopPage = new ShopPage(page);
    productPage = new ProductPage(page);
    wishlistPage = new WishlistPage(page);
    basketPage = new BasketPage(page);
  });

  test('Add a product to the wishlist', async () => {
    // Arrange
    const expectedPopupContent = 'Produkt dodany!';

    // Act
    await shopPage.goto();
    await shopPage.addYogaInTuscanyToWishlist();

    // Assert
    await expect(productPage.popup).toHaveText(expectedPopupContent);
  });

  test('Remove a product from the wishlist', async () => {
    // Arrange
    const expectedPopupContent = 'Produkt dodany!';
    const expectedAlertContent = 'Produkt został usunięty.';

    // Act
    await shopPage.goto();
    await shopPage.addWindsurfingInGreeceToWishlist();
    await expect.soft(productPage.popup).toHaveText(expectedPopupContent);
    await wishlistPage.goto();
    await wishlistPage.deleteProductFromWishlist();

    // Assert
    await expect(wishlistPage.alert).toHaveText(expectedAlertContent);
  });

  test('Add a product to the basket from the wishlist', async () => {
    // Arrange
    const expectedPopupContent = 'Produkt dodany!';
    const expectedHeader = 'Koszyk';

    // Act
    await shopPage.goto();
    await shopPage.addClimbingInIslandPeakToWishlist();
    await expect.soft(productPage.popup).toHaveText(expectedPopupContent);
    await wishlistPage.goto();
    await wishlistPage.addProductFromWishlistToBasket();

    // Assert
    await expect(basketPage.header.first()).toHaveText(expectedHeader);
  });
});
