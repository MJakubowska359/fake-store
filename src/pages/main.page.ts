import { BasePage } from './base.page';
import { Locator, Page } from '@playwright/test';

export class MainPage extends BasePage {
  url = '';

  header: Locator;

  constructor(page: Page) {
    super(page);

    this.header = page.getByRole('heading');
  }
}
