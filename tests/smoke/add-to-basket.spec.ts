import { BasePage } from '../../src/pages/base.page';
import { BasketPage } from '../../src/pages/basket.page';
import { MainPage } from '../../src/pages/main.page';
import { ProductCategoryPage } from '../../src/pages/product-category.page';
import { ProductPage } from '../../src/pages/product.page';
import { ShopPage } from '../../src/pages/shop.page';
import { expect, test } from '@playwright/test';

test.describe('Add product to basket @smoke', () => {
  let shopPage: ShopPage;
  let productCategoryPage: ProductCategoryPage;
  let productPage: ProductPage;
  let basePage: BasePage;
  let mainPage: MainPage;
  let basketPage: BasketPage;

  test.beforeEach(async ({ page }) => {
    shopPage = new ShopPage(page);
    productCategoryPage = new ProductCategoryPage(page);
    productPage = new ProductPage(page);
    basePage = new BasePage(page);
    mainPage = new MainPage(page);
    basketPage = new BasketPage(page);
  });

  test('User can add a product to the basket from the product page', async () => {
    // Arrange
    const expectedAmountInBasketBeforeAddedProduct = '0,00 zł';
    const expectedAmountInBasketAfterAddedProduct = '4 299,00 zł';
    const expectedAlertContent =
      '„Wakacje z yogą w Kraju Kwitnącej Wiśni“ został dodany do koszyka.';
    const expectedBasketPreviewContent =
      'Wakacje z yogą w Kraju Kwitnącej Wiśni';

    // Act
    await shopPage.goto();
    await shopPage.clickYogaAndPilatesCategory();
    await productCategoryPage.clickYogaInJapan();
    await expect(basePage.productAmount).toHaveText(
      expectedAmountInBasketBeforeAddedProduct,
    );
    await productPage.clickAddToBasketButton();
    await expect(basePage.productAmount).toHaveText(
      expectedAmountInBasketAfterAddedProduct,
    );
    await expect(productPage.alert).toContainText(expectedAlertContent);
    await basePage.hoverBasketPreview();

    // Assert
    await expect(basePage.previewBasketContent).toHaveText(
      expectedBasketPreviewContent,
    );
  });

  test('User can add a product to the basket from the home page', async () => {
    // Arrange
    const expectedProductNameInBasket =
      'Windsurfing w Lanzarote (Costa Teguise)';

    // Act
    await mainPage.goto();
    await mainPage.addFirstProductFromPopularProductsToBasket();
    await expect(mainPage.showBasketLink).toBeVisible();
    await mainPage.clickShowBasketLink();

    // Assert
    await expect(basketPage.productNameInTable).toHaveText(
      expectedProductNameInBasket,
    );
  });

  test('User cannot add too many items to the basket', async () => {
    // Arrange
    const expectedAlertContent =
      'Nie możesz dodać takiej ilości do koszyka — w magazynie posiadamy 15340 a w koszyku masz już 1.';

    // Act
    await shopPage.goto();
    await shopPage.clickSailingCategory();
    await productCategoryPage.clickSailingInMasuria();
    await productPage.clickAddToBasketButton();
    await productPage.addFullProductQuantityToBasket();
    await productPage.clickAddToBasketButton();

    // Assert
    await expect(productPage.alert).toContainText(expectedAlertContent);
  });
});
