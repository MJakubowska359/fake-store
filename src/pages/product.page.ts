import { BasePage } from './base.page';
import { Locator, Page } from '@playwright/test';

export class ProductPage extends BasePage {
  url = '/product';

  header: Locator;
  addToBasketButton: Locator;
  alert: Locator;

  constructor(page: Page) {
    super(page);

    this.header = page.getByRole('heading');
    this.addToBasketButton = page.getByRole('button', {
      name: 'Dodaj do koszyka',
    });
    this.alert = page.getByRole('alert');
  }

  async clickAddToBasketButton(): Promise<void> {
    await this.addToBasketButton.click();
  }
}
