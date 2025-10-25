import { RegisterUserModel } from '../models/user.model';
import { BasePage } from './base.page';
import { faker } from '@faker-js/faker/locale/en';
import { Locator, Page } from '@playwright/test';

export class MainAccountPage extends BasePage {
  url = '/moje-konto';

  deleteAccountLink: Locator;
  accountSettingsLink: Locator;
  logoutLink: Locator;

  // First name and Last name
  firstNameInput: Locator;
  lastNameInput: Locator;

  // Change password
  currentlyPasswordInput: Locator;
  newPasswordInput: Locator;
  submitPasswordInput: Locator;
  saveChanges: Locator;

  header: Locator;

  constructor(page: Page) {
    super(page);

    this.deleteAccountLink = this.page.getByRole('link', {
      name: 'Delete Account',
    });
    this.accountSettingsLink = this.page.locator('li').getByRole('link', {
      name: 'Edycja konta',
    });
    this.logoutLink = this.page.locator('li').getByRole('link', {
      name: 'Wyloguj',
    });

    // First name and las name
    this.firstNameInput = this.page.locator('#account_first_name');
    this.lastNameInput = this.page.locator('#account_last_name');

    // Reset password
    this.currentlyPasswordInput = this.page.locator('#password_current');
    this.newPasswordInput = this.page.locator('#password_1');
    this.submitPasswordInput = this.page.locator('#password_2');
    this.saveChanges = this.page.getByRole('button', { name: 'Zapisz zmiany' });

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

  async clickEditAccount(): Promise<void> {
    await this.accountSettingsLink.click();
  }

  async changePassword(registerUserData: RegisterUserModel): Promise<void> {
    await this.firstNameInput.fill(
      faker.person.firstName().replace(/[^A-Za-z]/g, ''),
    );
    await this.lastNameInput.fill(
      faker.person.lastName().replace(/[^A-Za-z]/g, ''),
    );
    await this.currentlyPasswordInput.fill(registerUserData.userPassword);
    await this.newPasswordInput.fill('testoweH4sł@');
    await this.submitPasswordInput.fill('testoweH4sł@');
    await this.saveChanges.click();
  }

  async clickLogoutButton(): Promise<void> {
    await this.logoutLink.click();
  }
}
