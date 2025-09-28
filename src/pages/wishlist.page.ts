import { BasePage } from './base.page';
import { Locator, Page } from '@playwright/test';

export class WishlistPage extends BasePage {
  url = '/wishlist';
  deleteButton: Locator;

  alertAfterDeleted: Locator;

  constructor(page: Page) {
    super(page);
    this.deleteButton = page.getByTitle('Usuń');

    this.alertAfterDeleted = page.getByRole('alert');
  }

  async deleteProductFromWishlist(): Promise<void> {
    await this.deleteButton.click();
  }
}
