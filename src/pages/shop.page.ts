import { BasePage } from './base.page';
import { Locator, Page } from '@playwright/test';

export class ShopPage extends BasePage {
  url = '/shop';
  categoryWindsurfing: Locator;
  categoryClimbing: Locator;
  categoryYoga: Locator;
  categorySailing: Locator;
  product: Locator;
  addToWishlist: Locator;
  quantityInput: Locator;

  submitMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.categoryWindsurfing = this.page.getByRole('heading', {
      name: 'Windsurfing',
    });
    this.categoryClimbing = this.page.getByRole('heading', {
      name: 'Wspinaczka',
    });
    this.categoryYoga = this.page.getByRole('heading', {
      name: 'Yoga i pilates',
    });
    this.categorySailing = this.page.getByRole('heading', {
      name: 'Żeglarstwo',
    });
    this.product = page.locator('.type-product a');
    this.addToWishlist = page.getByText('Dodaj do listy życzeń');
    this.quantityInput = page.getByRole('spinbutton', {
      name: 'Ilość produktu',
    });

    this.submitMessage = page.locator('[id$="popup-message"]');
  }

  async addYogaInTuscanyToWishlist(): Promise<void> {
    await this.categoryYoga.click();
    await this.product.nth(2).click();
    await this.addToWishlist.click();
  }

  async addWindsurfingInGreeceToWishlist(): Promise<void> {
    await this.categoryWindsurfing.click();
    await this.product.nth(2).click();
    await this.addToWishlist.click();
  }

  async addClimbingInIslandPeakToWishlist(): Promise<void> {
    await this.categoryClimbing.click();
    await this.product.nth(2).click();
    await this.addToWishlist.click();
  }

  async clickClimbingViaFerrata(): Promise<void> {
    await this.categoryClimbing.click();
    await this.product.nth(4).click();
  }

  async clickYogaInMalta(): Promise<void> {
    await this.categoryYoga.click();
    await this.product.nth(8).click();
  }

  async clickWindsurfingInEgypt(): Promise<void> {
    await this.categoryWindsurfing.click();
    await this.product.first().click();
  }

  async addFullProductQuantityToBasket(): Promise<void> {
    await this.quantityInput.fill('14536');
  }
}
