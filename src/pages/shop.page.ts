import { BasePage } from './base.page';
import { Locator, Page } from '@playwright/test';

export class ShopPage extends BasePage {
  url = '/shop';
  category: Locator;
  product: Locator;
  addToWishlist: Locator;

  submitMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.category = this.page.locator('.product-category');
    this.product = page.locator('.type-product a');
    this.addToWishlist = page.getByText('Dodaj do listy życzeń');

    this.submitMessage = page.locator('[id$="popup-message"]');
  }

  async addYogaInTuscanyToWishlist(): Promise<void> {
    await this.category.nth(2).click();
    await this.product.nth(2).click();
    await this.addToWishlist.click();
  }
}
