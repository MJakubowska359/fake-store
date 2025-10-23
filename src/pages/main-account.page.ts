import { BasePage } from './base.page';
import { Locator, Page } from '@playwright/test';

export class MainAccountPage extends BasePage {
  url = '/moje-konto';

  deleteAccountLink: Locator;
  logoutLink: Locator;

  header: Locator;

  constructor(page: Page) {
    super(page);

    this.deleteAccountLink = this.page.getByRole('link', {
      name: 'Delete Account',
    });
    this.logoutLink = this.page.locator('li').getByRole('link', {
      name: 'Wyloguj',
    });

    this.header = this.page.getByRole('heading');
  }

  async deleteAccount(): Promise<void> {
    this.page.once('dialog', (dialog) => {
      // eslint-disable-next-line no-console
      console.log(`Dialog message: ${dialog.message()}`);
      dialog.accept().catch(() => {});
    });
    await this.deleteAccountLink.click();
  }

  async clickLogoutButton(): Promise<void> {
    await this.logoutLink.click();
  }
}
