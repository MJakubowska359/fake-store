import { BasketPage } from '../src/pages/basket.page';
import { ProductCategoryPage } from '../src/pages/product-category.page';
import { ProductPage } from '../src/pages/product.page';
import { ShopPage } from '../src/pages/shop.page';
import { expect, test } from '@playwright/test';

test.describe('Verify basket', () => {
  let basketPage: BasketPage;
  let shopPage: ShopPage;
  let productCategoryPage: ProductCategoryPage;
  let productPage: ProductPage;

  test.beforeEach(async ({ page }) => {
    basketPage = new BasketPage(page);
    shopPage = new ShopPage(page);
    productCategoryPage = new ProductCategoryPage(page);
    productPage = new ProductPage(page);
  });

  test('Add the product to the basket', async () => {
    // Arrange
    const expectedInfoForEmptyBasket = 'Twój koszyk jest pusty.';
    const expectedProductName = 'Wspinaczka Island Peak';
    const expectedAlertContentAfterProductIsAdded =
      '„Wspinaczka Island Peak“ został dodany do koszyka.';

    // Act
    await basketPage.goto();
    await expect(basketPage.information).toHaveText(expectedInfoForEmptyBasket);
    await basketPage.clickBackToShopButton();
    await shopPage.clickClimbingCategory();
    await productCategoryPage.clickClimbingInIslandPeak();
    await productPage.clickAddToBasketButton();
    await expect(productPage.header.first()).toHaveText(expectedProductName);
    await productPage.clickAddToBasketButton();

    // Assert
    await expect(productPage.alert).toContainText(
      expectedAlertContentAfterProductIsAdded,
    );
  });

  test('Apply a 250 PLN coupon to the basket (no limits)', async () => {
    // Arrange
    const expectedOrderTotalBeforeCouponIsAdded = '999,00 zł';
    const expectedAlertContent = 'Kupon został pomyślnie użyty.';
    const expectedOrderTotalAfterCouponIsAdded = '749,00 zł';

    // Act
    await shopPage.goto();
    await shopPage.clickSailingCategory();
    await productCategoryPage.clickSailingInMasuria();
    await productPage.clickAddToBasketButton();
    await basketPage.goto();
    await expect(basketPage.orderTotal.first()).toHaveText(
      expectedOrderTotalBeforeCouponIsAdded,
    );
    await basketPage.addCoupon250PlnWithoutLimit();
    await expect(productPage.alert).toContainText(expectedAlertContent);

    // Assert
    await expect(basketPage.orderTotal.first()).toHaveText(
      expectedOrderTotalAfterCouponIsAdded,
    );
  });

  test('Add a coupon worth 10% of the order value to the basket', async () => {
    // Arrange
    const expectedOrderTotalBeforeCouponIsAdded = '4 500,00 zł';
    const expectedAlertContent = 'Kupon został pomyślnie użyty.';
    const expectedOrderTotalAfterCouponIsAdded = '4 050,00 zł';

    // Act
    await shopPage.goto();
    await shopPage.clickYogaAndPilatesCategory();
    await productCategoryPage.clickYogaInTuscany();
    await productPage.clickAddToBasketButton();
    await basketPage.goto();
    await expect(basketPage.orderTotal.first()).toHaveText(
      expectedOrderTotalBeforeCouponIsAdded,
    );
    await basketPage.addCoupon10PercentValueOfOrder();
    await expect(productPage.alert).toContainText(expectedAlertContent);

    // Assert
    await expect(basketPage.orderTotal.first()).toHaveText(
      expectedOrderTotalAfterCouponIsAdded,
    );
  });

  test('Add a coupon that requires a minimum order value in the basket (required value)', async () => {
    // Arrange
    const expectedOrderTotalBeforeCouponIsAdded = '3 200,00 zł';
    const expectedAlertContent = 'Kupon został pomyślnie użyty.';
    const expectedOrderTotalAfterCouponIsAdded = '2 900,00 zł';

    // Act
    await shopPage.goto();
    await shopPage.clickWindsurfingCategory();
    await productCategoryPage.clickWindsurfingInGreece();
    await productPage.clickAddToBasketButton();
    await basketPage.goto();
    await expect(basketPage.orderTotal.first()).toHaveText(
      expectedOrderTotalBeforeCouponIsAdded,
    );
    await basketPage.addCouponMinimumValueOfOrder();
    await expect(productPage.alert).toContainText(expectedAlertContent);

    // Assert
    await expect(basketPage.orderTotal.first()).toHaveText(
      expectedOrderTotalAfterCouponIsAdded,
    );
  });

  test('Add a coupon that requires a minimum order value in the basket (value too low).', async () => {
    // Arrange
    const expectedHeaderInBasket = 'Koszyk';

    // Act
    await shopPage.goto();
    await shopPage.clickYogaAndPilatesCategory();
    await productCategoryPage.clickYogaInSpain();
    await productPage.clickAddToBasketButton();
    await basketPage.goto();
    await expect
      .soft(basketPage.header.first())
      .toHaveText(expectedHeaderInBasket);
    await basketPage.addCouponMinimumValueOfOrder();

    // Assert
    await expect(basketPage.errorMinimumValueOfOrder).toBeVisible();
  });

  test('Add a coupon to a product without a discount in the basket (product without discount)', async () => {
    // Arrange
    const expectedOrderTotalBeforeCouponIsAdded = '2 999,99 zł';
    const expectedAlertContent = 'Kupon został pomyślnie użyty.';
    const expectedOrderTotalAfterCouponIsAdded = '2 699,99 zł';

    // Act
    await shopPage.goto();
    await shopPage.clickClimbingCategory();
    await productCategoryPage.clickClimbingInPoland();
    await productPage.clickAddToBasketButton();
    await productPage.clickShowBasketButton();
    await expect(basketPage.orderTotal.first()).toHaveText(
      expectedOrderTotalBeforeCouponIsAdded,
    );
    await basketPage.addCouponForProductWithoutPromotion();
    await expect(productPage.alert).toContainText(expectedAlertContent);

    // Assert
    await expect(basketPage.orderTotal.first()).toHaveText(
      expectedOrderTotalAfterCouponIsAdded,
    );
  });

  test('Add a coupon to a product without a discount in the basket (discount product)', async () => {
    // Arrange
    const expectedHeaderInBasket = 'Koszyk';

    // Act
    await shopPage.goto();
    await shopPage.clickYogaAndPilatesCategory();
    await productCategoryPage.clickYogaInPortugal();
    await productPage.clickAddToBasketButton();
    await productPage.clickShowBasketButton();
    await expect
      .soft(basketPage.header.first())
      .toHaveText(expectedHeaderInBasket);
    await basketPage.addCouponForProductWithoutPromotion();

    // Assert
    await expect(basketPage.errorDiscountProduct).toBeVisible();
  });

  test('Add a coupon to a product from the windsurfing category in the basket (windsurfing category)', async () => {
    // Arrange
    const expectedOrderTotalBeforeCouponIsAdded = '3 400,00 zł';
    const expectedAlertContent = 'Kupon został pomyślnie użyty.';
    const expectedOrderTotalAfterCouponIsAdded = '3 050,00 zł';

    // Act
    await shopPage.goto();
    await shopPage.clickWindsurfingCategory();
    await productCategoryPage.clickWindsurfingInEgypt();
    await productPage.clickAddToBasketButton();
    await productPage.clickShowBasketButton();
    await expect(basketPage.orderTotal.first()).toHaveText(
      expectedOrderTotalBeforeCouponIsAdded,
    );
    await basketPage.addCouponForProductFromWindsurfingCategory();
    await expect(productPage.alert).toContainText(expectedAlertContent);

    // Assert
    await expect(basketPage.orderTotal.first()).toHaveText(
      expectedOrderTotalAfterCouponIsAdded,
    );
  });

  test('Add a coupon to a product from the windsurfing category in the basket (yoga category)', async () => {
    // Arrange
    const expectedHeaderInBasket = 'Koszyk';

    // Act
    await shopPage.goto();
    await shopPage.clickYogaAndPilatesCategory();
    await productCategoryPage.clickYogaInPortugal();
    await productPage.clickAddToBasketButton();
    await productPage.clickShowBasketButton();
    await expect
      .soft(basketPage.header.first())
      .toHaveText(expectedHeaderInBasket);
    await basketPage.addCouponForProductFromWindsurfingCategory();

    // Assert
    await expect(basketPage.errorChosenProduct).toBeVisible();
  });

  test('Add a used coupon in the basket', async () => {
    // Arrange
    const expectedHeaderInBasket = 'Koszyk';

    // Act
    await shopPage.goto();
    await shopPage.clickSailingCategory();
    await productCategoryPage.clickSailingInMasuria();
    await productPage.clickAddToBasketButton();
    await productPage.clickShowBasketButton();
    await expect
      .soft(basketPage.header.first())
      .toHaveText(expectedHeaderInBasket);
    await basketPage.addUsedCoupon();

    // Assert
    await expect(basketPage.errorUsedCoupon).toBeVisible();
  });

  test('Restore the removed product to the basket', async () => {
    // Arrange
    const expectedProductName = 'Grecja - Limnos';

    // Act
    await shopPage.goto();
    await shopPage.clickWindsurfingCategory();
    await productCategoryPage.clickWindsurfingInGreece();
    await productPage.clickAddToBasketButton();
    await productPage.clickShowBasketButton();
    await expect(basketPage.productTableInBasket).toBeVisible();
    await basketPage.removeProductFromBasket();
    await expect(basketPage.productTableInBasket).toBeHidden();
    await basketPage.clickUndoOption();

    // Assert
    await expect(basketPage.productNameInTable).toContainText(
      expectedProductName,
    );
  });

  test('Increase the quantity of the product in the basket', async () => {
    // Arrange
    const expectedAlertContent = 'Koszyk zaktualizowany.';

    // Act
    await shopPage.goto();
    await shopPage.clickYogaAndPilatesCategory();
    await productCategoryPage.clickYogaInSpain();
    await productPage.clickAddToBasketButton();
    await productPage.clickShowBasketButton();
    await expect(basketPage.updateBasketButton).toBeDisabled();
    await basketPage.increaseQuantityOfProductInBasket();
    await expect(basketPage.updateBasketButton).toBeEnabled();
    await expect(basketPage.productPriceInTable).toHaveText('2 900,00 zł');
    await basketPage.clickUpdateBasketButton();
    await expect(basketPage.subtotalProductInTable).toHaveText('5 800,00 zł');

    // Assert
    await expect(basketPage.alert).toHaveText(expectedAlertContent);
  });

  test('Apply a 250 PLN coupon to the basket (used solo)', async () => {
    // Act
    await shopPage.goto();
    await shopPage.clickWindsurfingCategory();
    await productCategoryPage.clickWindsurfingInEgypt();
    await productPage.clickAddToBasketButton();
    await basketPage.goto();
    await basketPage.addCouponMinimumValueOfOrder();
    await expect(basketPage.threeHundredPlnCoupon).toBeVisible();
    await basketPage.addCouponForProductFromWindsurfingCategory();
    await expect(basketPage.windsurfingCoupon).toBeVisible();
    await basketPage.addCoupon10PercentValueOfOrder();
    await expect(basketPage.tenPercentCoupon).toBeVisible();
    await basketPage.addCoupon250PlnWithoutLimitToUseSolo();

    // Assert
    await expect(basketPage.soloCoupon).toBeVisible();
    await expect(basketPage.threeHundredPlnCoupon).toBeHidden();
    await expect(basketPage.windsurfingCoupon).toBeHidden();
    await expect(basketPage.tenPercentCoupon).toBeHidden();
  });

  test('Delete the coupon from the basket', async () => {
    // Arrange
    const expectedAlertContent = 'Kupon został usunięty.';

    // Act
    await shopPage.goto();
    await shopPage.clickYogaAndPilatesCategory();
    await productCategoryPage.clickYogaInTuscany();
    await productPage.clickAddToBasketButton();
    await basketPage.goto();
    await basketPage.addCoupon250PlnWithoutLimitToUseSolo();
    await basketPage.clickDeleteCouponOption();
    await expect(productPage.alert).toContainText(expectedAlertContent);

    // Assert
    await expect(basketPage.soloCoupon).toBeHidden();
  });

  test('Add a non-existent coupon to the product in the basket', async () => {
    // Arrange
    const expectedAlertContent = 'Kupon "milionymonet" nie istnieje!';

    // Act
    await shopPage.goto();
    await shopPage.clickYogaAndPilatesCategory();
    await productCategoryPage.clickYogaInTuscany();
    await productPage.clickAddToBasketButton();
    await basketPage.goto();
    await basketPage.addInvalidCoupon();

    // Assert
    await expect(basketPage.alert).toHaveText(expectedAlertContent);
  });

  test('Add more than one coupon to the product in the basket', async () => {
    // Arrange
    const expectedOrderTotalBeforeCouponIsAdded = '4 500,00 zł';
    const expectedOrderTotalAfterCouponIsAdded = '3 500,00 zł';

    // Act
    await shopPage.goto();
    await shopPage.clickYogaAndPilatesCategory();
    await productCategoryPage.clickYogaInTuscany();
    await productPage.clickAddToBasketButton();
    await basketPage.goto();
    await expect(basketPage.orderTotal.first()).toHaveText(
      expectedOrderTotalBeforeCouponIsAdded,
    );
    await basketPage.addCouponMinimumValueOfOrder();
    await expect(basketPage.threeHundredPlnCoupon).toBeVisible();
    await basketPage.addCoupon250PlnWithoutLimit();
    await expect(basketPage.twoHundredFiftyNoLimitCoupon).toBeVisible();
    await basketPage.addCoupon10PercentValueOfOrder();
    await expect(basketPage.tenPercentCoupon).toBeVisible();

    // Assert
    await expect(basketPage.orderTotal.first()).toHaveText(
      expectedOrderTotalAfterCouponIsAdded,
    );
  });

  test('Remove a product with coupons from the basket', async () => {
    // Arrange
    const expectedAlertContent =
      'Przepraszamy, kupon "kwotowy300" jest nieprawidłowy – został usunięty z twojego zamówienia. Przepraszamy, kupon "windsurfing350" jest nieprawidłowy – został usunięty z twojego zamówienia.';

    // Act
    await shopPage.goto();
    await shopPage.clickWindsurfingCategory();
    await productCategoryPage.clickWindsurfingInEgypt();
    await productPage.clickAddToBasketButton();
    await productPage.clickShowBasketButton();
    await basketPage.addCoupon250PlnWithoutLimit();
    await basketPage.addCoupon10PercentValueOfOrder();
    await basketPage.addCouponMinimumValueOfOrder();
    await basketPage.addCouponForProductWithoutPromotion();
    await basketPage.addCouponForProductFromWindsurfingCategory();
    await basketPage.removeProductFromBasket();

    // Assert
    await expect(basketPage.alert.nth(1)).toHaveText(expectedAlertContent);
  });
});
