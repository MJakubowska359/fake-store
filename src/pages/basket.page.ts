import { BasePage } from './base.page';
import { Locator, Page } from '@playwright/test';

export class BasketPage extends BasePage {
  url = '/koszyk';

  header: Locator;
  message: Locator;
  backToShopButton: Locator;
  couponCodeInput: Locator;
  couponCodeButton: Locator;
  orderTotal: Locator;

  constructor(page: Page) {
    super(page);

    this.header = page.getByRole('heading');
    this.message = page.locator('.wc-empty-cart-message');
    this.backToShopButton = page.getByRole('link', {
      name: 'Wróć do sklepu',
    });
    this.couponCodeInput = page.getByRole('textbox', { name: 'Kupon' });
    this.couponCodeButton = page.getByRole('button', {
      name: 'Zastosuj kupon',
    });
    this.orderTotal = page.locator('.order-total .amount');
  }

  async clickBackToShopButton(): Promise<void> {
    await this.backToShopButton.click();
  }

  async addCoupon250PlnWithoutLimit(): Promise<void> {
    await this.couponCodeInput.fill('kwotowy250');
    await this.couponCodeButton.click();
  }

  async addCoupon10PercentValueOfOrder(): Promise<void> {
    await this.couponCodeInput.fill('10procent');
    await this.couponCodeButton.click();
  }
}
