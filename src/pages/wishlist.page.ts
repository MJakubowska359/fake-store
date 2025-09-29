import { BasePage } from './base.page';
import { Locator, Page } from '@playwright/test';

export class WishlistPage extends BasePage {
  url = '/wishlist';
  deleteButton: Locator;
  product: Locator;
  addToBasketLink: Locator;

  alertAfterDeleted: Locator;

  constructor(page: Page) {
    super(page);
    this.deleteButton = page.getByTitle('Usuń');
    this.product = page.locator('.product-name');
    this.addToBasketLink = page.getByRole('link', {
      name: 'Dodaj do koszyka',
    });

    this.alertAfterDeleted = page.getByRole('alert');
  }

  async deleteProductFromWishlist(): Promise<void> {
    await this.deleteButton.click();
  }

  async addProductFromWishlistToBasket(): Promise<void> {
    await this.addToBasketLink.click();
    await this.page.waitForEvent('load');
  }
}
