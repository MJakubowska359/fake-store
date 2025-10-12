import { BasePage } from './base.page';
import { Locator, Page } from '@playwright/test';

export class ProductCategoryPage extends BasePage {
  url = '/product-category';

  windsurfingInGreece: Locator;
  windsurfingInEgypt: Locator;
  climbingInIslandPeak: Locator;
  climbingInPoland: Locator;
  yogaInTuscany: Locator;
  yogaInPortugal: Locator;
  yogaInSpain: Locator;
  sailingInMasuria: Locator;
  addToBasketButton: Locator;
  showBasketLink: Locator;

  constructor(page: Page) {
    super(page);

    this.windsurfingInGreece = page.getByRole('heading', {
      name: 'Grecja – Limnos',
    });
    this.windsurfingInEgypt = page.getByRole('heading', {
      name: 'Egipt – El Gouna',
    });
    this.climbingInIslandPeak = page.getByRole('heading', {
      name: 'Wspinaczka Island Peak',
    });
    this.climbingInPoland = page.getByRole('heading', {
      name: 'Grań Kościelców',
    });
    this.yogaInTuscany = page.getByRole('heading', {
      name: 'Wczasy relaksacyjne z yogą w Toskanii',
    });
    this.yogaInPortugal = page.getByRole('heading', {
      name: 'Yoga i pilates w Portugalii',
    });
    this.yogaInSpain = page.getByRole('heading', {
      name: 'Yoga i pilates w Hiszpanii',
    });
    this.sailingInMasuria = page.getByRole('heading', {
      name: 'Kurs żeglarski na Mazurach',
    });
    this.addToBasketButton = page.getByRole('button', {
      name: 'Dodaj do koszyka',
    });
    this.showBasketLink = page.getByRole('link', {
      name: 'Zobacz koszyk',
    });
  }

  async clickWindsurfingInGreece(): Promise<void> {
    await this.windsurfingInGreece.click();
  }

  async clickWindsurfingInEgypt(): Promise<void> {
    await this.windsurfingInEgypt.click();
  }

  async clickClimbingInIslandPeak(): Promise<void> {
    await this.climbingInIslandPeak.click();
  }

  async clickClimbingInPoland(): Promise<void> {
    await this.climbingInPoland.click();
  }

  async clickYogaInTuscany(): Promise<void> {
    await this.yogaInTuscany.click();
  }

  async clickYogaInPortugal(): Promise<void> {
    await this.yogaInPortugal.click();
  }

  async clickYogaInSpain(): Promise<void> {
    await this.yogaInPortugal.click();
  }

  async clickSailingInMasuria(): Promise<void> {
    await this.sailingInMasuria.click();
  }

  async clickAddToBasketButton(): Promise<void> {
    await this.addToBasketButton.click();
  }

  async clickShowBasketButton(): Promise<void> {
    await this.showBasketLink.click();
  }
}
