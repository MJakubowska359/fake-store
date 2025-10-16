import { BasePage } from './base.page';
import { Locator, Page } from '@playwright/test';

export class BasketPage extends BasePage {
  url = '/koszyk';

  header: Locator;
  deleteIconInTable: Locator;
  productNameInTable: Locator;
  quantityProductInTable: Locator;
  backToShopLink: Locator;
  couponCodeInput: Locator;
  couponCodeButton: Locator;
  orderTotal: Locator;
  undoLink: Locator;
  productTableInBasket: Locator;
  updateBasketButton: Locator;
  deleteCouponLink: Locator;

  information: Locator;
  alert: Locator;
  errorMinimumValueOfOrder: Locator;
  errorDiscountProduct: Locator;
  errorChosenProduct: Locator;
  errorUsedCoupon: Locator;
  twoHundredFiftyNoLimitCoupon: Locator;
  threeHundredPlnCoupon: Locator;
  windsurfingCoupon: Locator;
  tenPercentCoupon: Locator;
  soloCoupon: Locator;

  constructor(page: Page) {
    super(page);

    this.header = page.getByRole('heading');
    this.productTableInBasket = page.locator('.cart_item');
    this.deleteIconInTable = page.locator('.remove');
    this.productNameInTable = page.locator('td.product-name').getByRole('link');
    this.quantityProductInTable = page.getByLabel('Ilość produktu');
    this.backToShopLink = page.getByRole('link', {
      name: 'Wróć do sklepu',
    });
    this.couponCodeInput = page.getByRole('textbox', { name: 'Kupon' });
    this.couponCodeButton = page.getByRole('button', {
      name: 'Zastosuj kupon',
    });
    this.orderTotal = page.locator('.order-total .amount');
    this.undoLink = page.getByRole('link', { name: 'Cofnij?' });
    this.updateBasketButton = page.getByRole('button', {
      name: 'Zaktualizuj koszyk',
    });
    this.deleteCouponLink = page.getByRole('link', { name: 'Usuń' }).nth(1);

    this.information = page.locator('.cart-empty');
    this.alert = page.getByRole('alert');
    this.errorMinimumValueOfOrder = page.getByText(
      'Minimalna wartość zamówienia dla tego kuponu to 3 000,00 zł.',
    );
    this.errorDiscountProduct = page.getByText(
      'Przepraszamy, ten kupon nie może być zastosowany do przecenionych produktów.',
    );
    this.errorChosenProduct = page.getByText(
      'Przepraszamy, tego kuponu nie można zastosować do wybranych produktów.',
    );
    this.errorUsedCoupon = page.getByText('Ten kupon stracił ważność');
    this.twoHundredFiftyNoLimitCoupon = page.locator('.cart_totals th', {
      hasText: 'kwotowy250',
    });
    this.threeHundredPlnCoupon = page.locator('.cart_totals th', {
      hasText: 'kwotowy300',
    });
    this.windsurfingCoupon = page.locator('.cart_totals th', {
      hasText: 'windsurfing350',
    });
    this.tenPercentCoupon = page.locator('.cart_totals th', {
      hasText: '10procent',
    });
    this.soloCoupon = page.locator('.cart_totals th', {
      hasText: 'kwotowy250pojedynczy',
    });
  }

  async clickBackToShopButton(): Promise<void> {
    await this.backToShopLink.click();
  }

  async addCoupon250PlnWithoutLimit(): Promise<void> {
    await this.couponCodeInput.fill('kwotowy250');
    await this.couponCodeButton.click();
  }

  async addCoupon250PlnWithoutLimitToUseSolo(): Promise<void> {
    await this.couponCodeInput.fill('kwotowy250pojedynczy');
    await this.couponCodeButton.click();
  }

  async addCoupon10PercentValueOfOrder(): Promise<void> {
    await this.couponCodeInput.fill('10procent');
    await this.couponCodeButton.click();
  }

  async addCouponMinimumValueOfOrder(): Promise<void> {
    await this.couponCodeInput.fill('kwotowy300');
    await this.couponCodeButton.click();
  }

  async addCouponForProductWithoutPromotion(): Promise<void> {
    await this.couponCodeInput.fill('kwotowy300bezpromocji');
    await this.couponCodeButton.click();
  }

  async addCouponForProductFromWindsurfingCategory(): Promise<void> {
    await this.couponCodeInput.fill('windsurfing350');
    await this.couponCodeButton.click();
  }

  async addUsedCoupon(): Promise<void> {
    await this.couponCodeInput.fill('starośćnieradość');
    await this.couponCodeButton.click();
  }

  async removeProductFromBasket(): Promise<void> {
    await this.deleteIconInTable.click();
  }

  async clickUndoOption(): Promise<void> {
    await this.undoLink.click();
  }

  async lowerQuantityOfProductInBasket(): Promise<void> {
    await this.quantityProductInTable.fill('1');
  }

  async clickUpdateBasketButton(): Promise<void> {
    await this.updateBasketButton.click();
  }

  async clickDeleteCouponOption(): Promise<void> {
    await this.deleteCouponLink.click();
  }

  async addInvalidCoupon(): Promise<void> {
    await this.couponCodeInput.fill('milionymonet');
    await this.couponCodeButton.click();
  }
}
