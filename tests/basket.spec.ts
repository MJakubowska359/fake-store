import { BasketPage } from '../src/pages/basket.page';
import { ProductPage } from '../src/pages/product.page';
import { ShopPage } from '../src/pages/shop.page';
import { expect, test } from '@playwright/test';

test.describe('Verify basket', () => {
  let shopPage: ShopPage;
  let basketPage: BasketPage;
  let productPage: ProductPage;

  test.beforeEach(async ({ page }) => {
    shopPage = new ShopPage(page);
    basketPage = new BasketPage(page);
    productPage = new ProductPage(page);
  });

  test('Add the product to the basket', async () => {
    // Arrange
    const expectedInfoForEmptyBasket = 'Twój koszyk jest pusty.';
    const expectedProductName = 'Wspinaczka Via Ferraty';
    const expectedAlertContentAfterProductIsAdded =
      '„Wspinaczka Via Ferraty“ został dodany do koszyka.';

    // Act
    await basketPage.goto();
    await expect(basketPage.information).toHaveText(expectedInfoForEmptyBasket);
    await basketPage.clickBackToShopButton();
    await shopPage.clickClimbingViaFerrata();
    await expect(productPage.header.first()).toHaveText(expectedProductName);
    await productPage.clickAddToBasketButton();

    // Assert
    await expect(productPage.alert).toContainText(
      expectedAlertContentAfterProductIsAdded,
    );
  });

  test('Apply a 250 PLN coupon to the basket (no limits)', async () => {
    // Arrange
    const expectedOrderTotalBeforeCouponIsAdded = '2 799,00 zł';
    const expectedAlertContent = 'Kupon został pomyślnie użyty.';
    const expectedOrderTotalAfterCouponIsAdded = '2 549,00 zł';

    // Act
    await shopPage.goto();
    await shopPage.clickClimbingViaFerrata();
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
    const expectedOrderTotalBeforeCouponIsAdded = '2 799,00 zł';
    const expectedAlertContent = 'Kupon został pomyślnie użyty.';
    const expectedOrderTotalAfterCouponIsAdded = '2 519,10 zł';

    // Act
    await shopPage.goto();
    await shopPage.clickClimbingViaFerrata();
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
    const expectedOrderTotalBeforeCouponIsAdded = '3 299,00 zł';
    const expectedAlertContent = 'Kupon został pomyślnie użyty.';
    const expectedOrderTotalBAfterCouponIsAdded = '2 999,00 zł';

    // Act
    await shopPage.goto();
    await shopPage.clickYogaInMalta();
    await productPage.clickAddToBasketButton();
    await basketPage.goto();
    await expect(basketPage.orderTotal.first()).toHaveText(
      expectedOrderTotalBeforeCouponIsAdded,
    );
    await basketPage.addCouponMinimumValueOfOrder();
    await expect(productPage.alert).toContainText(expectedAlertContent);

    // Assert
    await expect(basketPage.orderTotal.first()).toHaveText(
      expectedOrderTotalBAfterCouponIsAdded,
    );
  });

  test('Add a coupon that requires a minimum order value in the basket (value too low).', async () => {
    // Arrange
    const expectedHeaderInBasket = 'Koszyk';

    // Act
    await shopPage.goto();
    await shopPage.clickClimbingViaFerrata();
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
    const expectedOrderTotalBeforeCouponIsAdded = '3 299,00 zł';
    const expectedAlertContent = 'Kupon został pomyślnie użyty.';
    const expectedOrderTotalAfterCouponIsAdded = '2 999,00 zł';

    // Act
    await shopPage.goto();
    await shopPage.clickYogaInMalta();
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
    await shopPage.clickClimbingViaFerrata();
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
    await shopPage.clickWindsurfingInEgypt();
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
    await shopPage.clickYogaInMalta();
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
    await shopPage.clickYogaInMalta();
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
    const expectedProductName = 'Zmień swoją sylwetkę! Yoga na Malcie';

    // Act
    await shopPage.goto();
    await shopPage.clickYogaInMalta();
    await productPage.clickAddToBasketButton();
    await productPage.clickShowBasketButton();
    await expect(basketPage.productTableInBasket).toBeVisible();
    await basketPage.removeProductFromBasket();
    await expect(basketPage.productTableInBasket).toBeHidden();
    await basketPage.clickUndoOption();

    // Assert
    await expect(basketPage.productNameInTable).toHaveText(expectedProductName);
  });

  test('Update the quantity of the product in the basket', async () => {
    // Arrange
    const expectedAlertContent = 'Koszyk zaktualizowany.';

    // Act
    await shopPage.goto();
    await shopPage.clickClimbingViaFerrata();
    await shopPage.addTwoQuantityOfProduct();
    await productPage.clickAddToBasketButton();
    await productPage.clickShowBasketButton();
    await expect(basketPage.updateBasketButton).toBeDisabled();
    await basketPage.lowerQuantityOfProductInBasket();
    await expect(basketPage.updateBasketButton).toBeEnabled();
    await basketPage.clickUpdateBasketButton();

    // Assert
    await expect(basketPage.alert).toHaveText(expectedAlertContent);
  });
});
