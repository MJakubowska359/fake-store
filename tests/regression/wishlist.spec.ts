import { ProductCategoryPage } from '../../src/pages/product-category.page';
import { ProductPage } from '../../src/pages/product.page';
import { ShopPage } from '../../src/pages/shop.page';
import { WishlistPage } from '../../src/pages/wishlist.page';
import { expect, test } from '@playwright/test';

test.describe('Wishlist @regression', () => {
  let shopPage: ShopPage;
  let productCategoryPage: ProductCategoryPage;
  let productPage: ProductPage;
  let wishlistPage: WishlistPage;

  test.beforeEach(async ({ page }) => {
    shopPage = new ShopPage(page);
    productCategoryPage = new ProductCategoryPage(page);
    productPage = new ProductPage(page);
    wishlistPage = new WishlistPage(page);

    await shopPage.goto();
    await shopPage.clickWindsurfingCategory();
    await productCategoryPage.clickWindsurfingInGreece();
    await productPage.clickAddToWishlistButton();
    await wishlistPage.goto();
    await page.reload();
  });

  test('User can add a product to the wishlist', async () => {
    // Arrange
    const expectedTextOfEmptyWishlist = 'No products added to the wishlist';
    const expectedPopupContent = 'Produkt dodany!';
    const expectedProductAfterAddedToWishlist =
      'Wczasy relaksacyjne z yogą w Toskanii';

    // Act
    await wishlistPage.goto();
    await expect(wishlistPage.emptyWishlist).toHaveText(
      expectedTextOfEmptyWishlist,
    );
    await shopPage.goto();
    await shopPage.clickYogaAndPilatesCategory();
    await productCategoryPage.clickYogaInTuscany();
    await productPage.clickAddToWishlistButton();
    await expect(productPage.popup).toHaveText(expectedPopupContent);
    await wishlistPage.goto();

    // Assert
    await expect(wishlistPage.productNameInTable).toHaveText(
      expectedProductAfterAddedToWishlist,
    );
  });

  test('User can remove a product from the wishlist', async () => {
    // Arrange
    const expectedAlertContent = 'Produkt został usunięty.';

    // Act
    await wishlistPage.deleteProductFromWishlist();

    // Assert
    await expect(wishlistPage.alert).toHaveText(expectedAlertContent);
  });

  test('User can navigate to the product page from the wishlist', async () => {
    // Arrange
    const expectedHeader = 'Grecja – Limnos';

    // Act
    await wishlistPage.clickProductNameInTable();
    await expect(productPage.header.first()).toHaveText(expectedHeader);

    // Assert
    await expect(productPage.productAdded).toBeVisible();
  });
});
