import { BasePage } from './base.page';
import { Locator, Page } from '@playwright/test';

export class MainAccountPage extends BasePage {
  url = '/moje-konto';

  logoutLink: Locator;

  header: Locator;

  constructor(page: Page) {
    super(page);

    this.logoutLink = this.page.locator('li').getByRole('link', {
      name: 'Wyloguj',
    });

    this.header = this.page.getByRole('heading');
  }

  async clickLogoutButton(): Promise<void> {
    await this.logoutLink.click();
  }
}
