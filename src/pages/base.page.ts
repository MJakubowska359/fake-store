import { Locator, Page } from '@playwright/test';

export class BasePage {
  url = '';

  productAmount: Locator;
  previewBasketContent: Locator;

  constructor(protected page: Page) {
    this.productAmount = this.page.locator('.cart-contents .amount');
    this.previewBasketContent = page
      .locator('#site-header-cart')
      .getByRole('link')
      .nth(2);
  }

  async goto(): Promise<void> {
    await this.page.goto(this.url);
  }

  async hoverBasketPreview(): Promise<void> {
    await this.productAmount.hover();
  }
}
