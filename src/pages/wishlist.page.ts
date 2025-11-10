import { BasePage } from './base.page';
import { Locator, Page } from '@playwright/test';

export class WishlistPage extends BasePage {
  url = '/wishlist';

  emptyWishlist: Locator;
  deleteButton: Locator;
  productNameInTable: Locator;
  addToBasketLink: Locator;

  alert: Locator;

  constructor(page: Page) {
    super(page);
    this.emptyWishlist = page.locator('.wishlist-empty');
    this.deleteButton = page.getByTitle('Usuń');
    this.productNameInTable = page.locator('td.product-name').getByRole('link');
    this.addToBasketLink = page.getByRole('link', {
      name: 'Dodaj do koszyka',
    });

    this.alert = page.getByRole('alert');
  }

  async deleteProductFromWishlist(): Promise<void> {
    await this.deleteButton.click();
  }

  async addProductFromWishlistToBasket(): Promise<void> {
    await this.addToBasketLink.click();
    await this.page.waitForEvent('load');
  }

  async clickProductNameInTable(): Promise<void> {
    await this.productNameInTable.click();
  }
}
