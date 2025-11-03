import { BasePage } from './base.page';
import { Locator, Page } from '@playwright/test';

export class MainPage extends BasePage {
  url = '';

  popularProducts: Locator;
  showBasketLink: Locator;

  header: Locator;

  constructor(page: Page) {
    super(page);

    this.popularProducts = page
      .getByRole('region', { name: 'Popularne produkty' })
      .getByLabel('Dodaj do koszyka');
    // this.showBasketLink = page.getByRole('link', { name: 'Zobacz koszyk' });
    this.showBasketLink = page.getByTitle('Zobacz koszyk');
    this.header = page.getByRole('heading');
  }

  async addFirstProductFromPopularProductsToBasket(): Promise<void> {
    await this.popularProducts.first().click();
  }

  async clickShowBasketLink(): Promise<void> {
    await this.showBasketLink.click();
  }
}
