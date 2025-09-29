import { BasePage } from './base.page';
import { Locator, Page } from '@playwright/test';

export class BasketPage extends BasePage {
  url = '/koszyk';

  header: Locator;

  constructor(page: Page) {
    super(page);

    this.header = page.getByRole('heading');
  }
}
