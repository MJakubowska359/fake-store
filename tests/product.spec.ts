import { BasePage } from '../src/pages/base.page';
import { ProductCategoryPage } from '../src/pages/product-category.page';
import { ProductPage } from '../src/pages/product.page';
import { ShopPage } from '../src/pages/shop.page';
import { expect, test } from '@playwright/test';

test.describe('Verify product', () => {
  let shopPage: ShopPage;
  let productCategoryPage: ProductCategoryPage;
  let productPage: ProductPage;
  let basePage: BasePage;

  test.beforeEach(async ({ page }) => {
    shopPage = new ShopPage(page);
    productCategoryPage = new ProductCategoryPage(page);
    productPage = new ProductPage(page);
    basePage = new BasePage(page);
  });

  test('Add the product to the basket', async () => {
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

  test('Add too many of the product to the basket', async () => {
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
