import { BasePage } from './base.page';
import { Locator, Page } from '@playwright/test';

export class BasketPage extends BasePage {
  url = '/koszyk';

  header: Locator;
  message: Locator;
  backToShopButton: Locator;

  constructor(page: Page) {
    super(page);

    this.header = page.getByRole('heading');
    this.message = page.locator('.wc-empty-cart-message');
    this.backToShopButton = page.getByRole('link', {
      name: 'Wróć do sklepu',
    });
  }

  async clickBackToShopButton(): Promise<void> {
    await this.backToShopButton.click();
  }
}
