import { BasePage } from './base.page';
import { Locator, Page } from '@playwright/test';

export class ShopPage extends BasePage {
  url = '/shop';

  windsurfingCategory: Locator;
  climbingCategory: Locator;
  yogaAndPilatesCategory: Locator;
  sailingCategory: Locator;

  constructor(page: Page) {
    super(page);
    this.windsurfingCategory = this.page.getByRole('heading', {
      name: 'Windsurfing',
    });
    this.climbingCategory = this.page.getByRole('heading', {
      name: 'Wspinaczka',
    });
    this.yogaAndPilatesCategory = this.page.getByRole('heading', {
      name: 'Yoga i pilates',
    });
    this.sailingCategory = this.page.getByRole('heading', {
      name: 'Żeglarstwo',
    });
  }

  async clickWindsurfingCategory(): Promise<void> {
    await this.windsurfingCategory.click();
  }

  async clickClimbingCategory(): Promise<void> {
    await this.climbingCategory.click();
  }

  async clickYogaAndPilatesCategory(): Promise<void> {
    await this.yogaAndPilatesCategory.click();
  }

  async clickSailingCategory(): Promise<void> {
    await this.sailingCategory.click();
  }
}
