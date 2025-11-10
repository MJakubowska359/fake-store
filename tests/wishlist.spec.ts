import { BasketPage } from '../src/pages/basket.page';
import { ProductCategoryPage } from '../src/pages/product-category.page';
import { ProductPage } from '../src/pages/product.page';
import { ShopPage } from '../src/pages/shop.page';
import { WishlistPage } from '../src/pages/wishlist.page';
import { expect, test } from '@playwright/test';

test.describe('Verify wishlist', () => {
  let shopPage: ShopPage;
  let productCategoryPage: ProductCategoryPage;
  let productPage: ProductPage;
  let wishlistPage: WishlistPage;
  let basketPage: BasketPage;

  test.beforeEach(async ({ page }) => {
    shopPage = new ShopPage(page);
    productCategoryPage = new ProductCategoryPage(page);
    productPage = new ProductPage(page);
    wishlistPage = new WishlistPage(page);
    basketPage = new BasketPage(page);

    await shopPage.goto();
    await shopPage.clickWindsurfingCategory();
    await productCategoryPage.clickWindsurfingInGreece();
    await productPage.clickAddToWishlistButton();
    await wishlistPage.goto();
    await page.reload();
  });

  test('Remove the product from the wishlist', async () => {
    // Arrange
    const expectedAlertContent = 'Produkt został usunięty.';

    // Act
    await wishlistPage.deleteProductFromWishlist();

    // Assert
    await expect(wishlistPage.alert).toHaveText(expectedAlertContent);
  });

  test('Add the product to the basket from the wishlist', async () => {
    // Arrange
    const expectedHeader = 'Koszyk';

    // Act
    await wishlistPage.addProductFromWishlistToBasket();

    // Assert
    await expect(basketPage.header.first()).toHaveText(expectedHeader);
  });

  test('Go back to the product from the wishlist', async () => {
    // Arrange
    const expectedHeader = 'Grecja – Limnos';

    // Act
    await wishlistPage.clickProductNameInTable();
    await expect(productPage.header.first()).toHaveText(expectedHeader);

    // Assert
    await expect(productPage.productAdded).toBeVisible();
  });
});
