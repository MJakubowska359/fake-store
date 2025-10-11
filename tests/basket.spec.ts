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

  test('Add product to basket', async () => {
    // Arrange
    const expectedMessageForEmptyBasket = 'Twój koszyk jest pusty.';
    const expectedProductName = 'Wspinaczka Via Ferraty';
    const expectedAlertAfterProductAdded =
      '„Wspinaczka Via Ferraty“ został dodany do koszyka.';

    // Act
    await basketPage.goto();
    await expect(basketPage.message).toHaveText(expectedMessageForEmptyBasket);
    await basketPage.clickBackToShopButton();
    await shopPage.clickClimbingViaFerrata();
    await expect(productPage.header.first()).toHaveText(expectedProductName);
    await productPage.clickAddToBasketButton();

    // Assert
    await expect(productPage.alert).toContainText(
      expectedAlertAfterProductAdded,
    );
  });

  test('Add coupon on 250 PLN without limit in basket', async () => {
    // Arrange
    const expectedOrderSumBeforeAddedCoupon = '2 799,00 zł';
    const expectedAlert = 'Kupon został pomyślnie użyty.';
    const expectedOrderSumAfterAddedCoupon = '2 549,00 zł';

    // Act
    await shopPage.goto();
    await shopPage.clickClimbingViaFerrata();
    await productPage.clickAddToBasketButton();
    await basketPage.goto();
    await expect(basketPage.orderTotal.first()).toHaveText(
      expectedOrderSumBeforeAddedCoupon,
    );
    await basketPage.addCoupon250PlnWithoutLimit();
    await expect(productPage.alert).toContainText(expectedAlert);

    // Assert
    await expect(basketPage.orderTotal.first()).toHaveText(
      expectedOrderSumAfterAddedCoupon,
    );
  });

  test('Add coupon on 10% value of order in basket', async () => {
    // Arrange
    const expectedOrderSumBeforeAddedCoupon = '2 799,00 zł';
    const expectedAlert = 'Kupon został pomyślnie użyty.';
    const expectedOrderSumAfterAddedCoupon = '2 519,10 zł';

    // Act
    await shopPage.goto();
    await shopPage.clickClimbingViaFerrata();
    await productPage.clickAddToBasketButton();
    await basketPage.goto();
    await expect(basketPage.orderTotal.first()).toHaveText(
      expectedOrderSumBeforeAddedCoupon,
    );
    await basketPage.addCoupon10PercentValueOfOrder();
    await expect(productPage.alert).toContainText(expectedAlert);

    // Assert
    await expect(basketPage.orderTotal.first()).toHaveText(
      expectedOrderSumAfterAddedCoupon,
    );
  });

  test('Add coupon on minimum value of order in basket (required value)', async () => {
    // Arrange
    const expectedOrderSumBeforeAddedCoupon = '3 299,00 zł';
    const expectedAlert = 'Kupon został pomyślnie użyty.';
    const expectedOrderSumAfterAddedCoupon = '2 999,00 zł';

    // Act
    await shopPage.goto();
    await shopPage.clickYogaInMalta();
    await productPage.clickAddToBasketButton();
    await basketPage.goto();
    await expect(basketPage.orderTotal.first()).toHaveText(
      expectedOrderSumBeforeAddedCoupon,
    );
    await basketPage.addCouponMinimumValueOfOrder();
    await expect(productPage.alert).toContainText(expectedAlert);

    // Assert
    await expect(basketPage.orderTotal.first()).toHaveText(
      expectedOrderSumAfterAddedCoupon,
    );
  });

  test('Add coupon on minimum value of order in basket (value too low)', async () => {
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

  test('Add coupon on product without discount in basket (product without discount)', async () => {
    // Arrange
    const expectedOrderSumBeforeAddedCoupon = '3 299,00 zł';
    const expectedAlert = 'Kupon został pomyślnie użyty.';
    const expectedOrderSumAfterAddedCoupon = '2 999,00 zł';

    // Act
    await shopPage.goto();
    await shopPage.clickYogaInMalta();
    await productPage.clickAddToBasketButton();
    await productPage.clickShowBasketButton();
    await expect(basketPage.orderTotal.first()).toHaveText(
      expectedOrderSumBeforeAddedCoupon,
    );
    await basketPage.addCouponForProductWithoutPromotion();
    await expect(productPage.alert).toContainText(expectedAlert);

    // Assert
    await expect(basketPage.orderTotal.first()).toHaveText(
      expectedOrderSumAfterAddedCoupon,
    );
  });

  test('Add coupon on product without discount in basket (discount product)', async () => {
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

  test('Add coupon on product from windsurfing category in basket (windsurfing category)', async () => {
    // Arrange
    const expectedOrderSumBeforeAddedCoupon = '3 400,00 zł';
    const expectedAlert = 'Kupon został pomyślnie użyty.';
    const expectedOrderSumAfterAddedCoupon = '3 050,00 zł';

    // Act
    await shopPage.goto();
    await shopPage.clickWindsurfingInEgypt();
    await productPage.clickAddToBasketButton();
    await productPage.clickShowBasketButton();
    await expect(basketPage.orderTotal.first()).toHaveText(
      expectedOrderSumBeforeAddedCoupon,
    );
    await basketPage.addCouponForProductFromWindsurfingCategory();
    await expect(productPage.alert).toContainText(expectedAlert);

    // Assert
    await expect(basketPage.orderTotal.first()).toHaveText(
      expectedOrderSumAfterAddedCoupon,
    );
  });

  test('Add coupon on product from windsurfing category in basket (yoga category)', async () => {
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

  test('Add used coupon in basket', async () => {
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

  test('Restore removed product to basket', async () => {
    // Arrange
    const expectedProductName = 'Zmień swoją sylwetkę! Yoga na Malcie';

    // Act
    await shopPage.goto();
    await shopPage.clickYogaInMalta();
    await productPage.clickAddToBasketButton();
    await productPage.clickShowBasketButton();
    await expect(basketPage.productTable).toBeVisible();
    await basketPage.removeProductFromBasket();
    await expect(basketPage.productTable).toBeHidden();
    await basketPage.clickUndoOption();

    // Assert
    await expect(basketPage.productNameInTable).toHaveText(expectedProductName);
  });

  test('Update the quantity of the product in the basket', async () => {
    // Arrange
    const expectedAlert = 'Koszyk zaktualizowany.';

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
    await expect(basketPage.alert).toHaveText(expectedAlert);
  });
});
