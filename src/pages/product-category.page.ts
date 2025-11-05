import { BasePage } from './base.page';
import { Locator, Page } from '@playwright/test';

export class ProductCategoryPage extends BasePage {
  url = '/product-category';

  windsurfingInGreece: Locator;
  windsurfingInEgypt: Locator;
  climbingInIslandPeak: Locator;
  climbingInPoland: Locator;
  yogaInJapan: Locator;
  yogaInTuscany: Locator;
  yogaInSpain: Locator;
  yogaInPortugal: Locator;
  yogaInMalta: Locator;
  sailingInMasuria: Locator;
  addToBasketButton: Locator;
  showBasketLink: Locator;
  sortProduct: Locator;
  priceUnderProduct: Locator;

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
    this.yogaInJapan = page.getByRole('heading', {
      name: 'Wakacje z yogą w Kraju Kwitnącej Wiśni',
    });
    this.yogaInTuscany = page.getByRole('heading', {
      name: 'Wczasy relaksacyjne z yogą w Toskanii',
    });
    this.yogaInSpain = page.getByRole('heading', {
      name: 'Yoga i pilates w Hiszpanii',
    });
    this.yogaInPortugal = page.getByRole('heading', {
      name: 'Yoga i pilates w Portugalii',
    });
    this.yogaInMalta = page.getByRole('heading', {
      name: 'Zmień swoją sylwetkę! Yoga na Malcie',
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
    this.sortProduct = page.locator('.orderby');
    this.priceUnderProduct = page.locator('.price');
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

  async clickYogaInJapan(): Promise<void> {
    await this.yogaInJapan.click();
  }

  async clickYogaInTuscany(): Promise<void> {
    await this.yogaInTuscany.click();
  }

  async clickYogaInSpain(): Promise<void> {
    await this.yogaInSpain.click();
  }

  async clickYogaInPortugal(): Promise<void> {
    await this.yogaInPortugal.click();
  }

  async clickYogaInMalta(): Promise<void> {
    await this.yogaInMalta.click();
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

  async sortByLowestPrice(): Promise<void> {
    await this.sortProduct.first().selectOption('price');
  }
}
