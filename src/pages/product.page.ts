import { BasePage } from './base.page';
import { Locator, Page } from '@playwright/test';

export class ProductPage extends BasePage {
  url = '/product';

  addToBasketButton: Locator;
  showBasketLink: Locator;
  addToWishlist: Locator;
  quantityInput: Locator;

  header: Locator;
  popup: Locator;
  alert: Locator;

  constructor(page: Page) {
    super(page);

    this.addToBasketButton = page.getByRole('button', {
      name: 'Dodaj do koszyka',
    });
    this.showBasketLink = page.getByRole('link', {
      name: 'Zobacz koszyk',
    });
    this.addToWishlist = page.getByText('Dodaj do listy życzeń');
    this.quantityInput = page.getByRole('spinbutton', {
      name: 'Ilość produktu',
    });

    this.header = page.getByRole('heading');
    this.popup = page.locator('[id$="popup-message"]');
    this.alert = page.getByRole('alert');
  }

  async clickAddToBasketButton(): Promise<void> {
    await this.addToBasketButton.click();
  }

  async clickAddToWishlistButton(): Promise<void> {
    await this.addToWishlist.click();
  }

  async clickShowBasketButton(): Promise<void> {
    await this.showBasketLink.click();
  }

  async addFullProductQuantityToBasket(): Promise<void> {
    await this.quantityInput.fill('15340');
  }

  async addTwoQuantityOfProduct(): Promise<void> {
    await this.quantityInput.fill('2');
  }
}
