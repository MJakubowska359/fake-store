import { RegisterUserModel } from '../models/user.model';
import { BasePage } from './base.page';
import { faker } from '@faker-js/faker/locale/en';
import { Locator, Page } from '@playwright/test';

export class MainAccountPage extends BasePage {
  url = '/moje-konto';

  deleteAccountLink: Locator;
  accountSettingsLink: Locator;
  addressLink: Locator;
  logoutLink: Locator;

  // First name and Last name
  firstNameInput: Locator;
  lastNameInput: Locator;

  // Change password
  currentlyPasswordInput: Locator;
  newPasswordInput: Locator;
  submitPasswordInput: Locator;
  saveChanges: Locator;

  // A billing address
  addBillingAddressIcon: Locator;
  countyList: Locator;
  streetInput: Locator;
  postCodeInput: Locator;
  cityInput: Locator;
  stateList: Locator;
  phoneNumberInput: Locator;
  emailAddressInput: Locator;
  saveAddress: Locator;

  // A shipping address
  addShippingAddressIcon: Locator;

  header: Locator;
  alert: Locator;

  constructor(page: Page) {
    super(page);

    this.deleteAccountLink = this.page.getByRole('link', {
      name: 'Delete Account',
    });
    this.accountSettingsLink = this.page.locator('li').getByRole('link', {
      name: 'Edycja konta',
    });
    this.addressLink = this.page.locator('li').getByRole('link', {
      name: 'Adres',
    });
    this.logoutLink = this.page.locator('li').getByRole('link', {
      name: 'Wyloguj',
    });

    // First name and las name
    this.firstNameInput = this.page.locator('[id$="_first_name"]');
    this.lastNameInput = this.page.locator('[id$="_last_name"]');

    // Reset password
    this.currentlyPasswordInput = this.page.locator('#password_current');
    this.newPasswordInput = this.page.locator('#password_1');
    this.submitPasswordInput = this.page.locator('#password_2');
    this.saveChanges = this.page.getByRole('button', { name: 'Zapisz zmiany' });

    // A billing address
    this.addBillingAddressIcon = this.page.getByRole('link', {
      name: 'Dodaj Adres rozliczeniowy',
    });
    this.countyList = this.page.locator('[id$="_country"]');
    this.streetInput = this.page.locator('[id$="_address_1"]');
    this.postCodeInput = this.page.locator('[id$="_postcode"]');
    this.cityInput = this.page.locator('[id$="_city"]');
    this.stateList = this.page.locator('[id$="_state"]');
    this.phoneNumberInput = this.page.locator('[id$="_phone"]');
    this.emailAddressInput = this.page.locator('[id$="_email"]');
    this.saveAddress = this.page.getByRole('button', { name: 'Zapisz adres' });

    // A shipping address
    this.addShippingAddressIcon = this.page.getByRole('link', {
      name: 'Dodaj Adres do wysyłki',
    });

    this.header = this.page.getByRole('heading');
    this.alert = this.page.getByRole('alert');
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

  async clickAddressSettings(): Promise<void> {
    await this.addressLink.click();
  }

  async clickAddBillingAddressIcon(): Promise<void> {
    await this.addBillingAddressIcon.click();
  }

  async clickAddShippingAddressIcon(): Promise<void> {
    await this.addShippingAddressIcon.click();
  }

  async fillBillingAddressForm(): Promise<void> {
    await this.firstNameInput.fill(
      faker.person.firstName().replace(/[^A-Za-z]/g, ''),
    );
    await this.lastNameInput.fill(
      faker.person.lastName().replace(/[^A-Za-z]/g, ''),
    );
    await this.countyList.selectOption('Niemcy');
    await this.streetInput.fill(
      faker.location.streetAddress({ useFullAddress: true }),
    );
    await this.postCodeInput.fill(faker.location.zipCode({ format: '#####' }));
    await this.cityInput.fill(faker.location.city());
    await this.stateList.selectOption('Hesja');
    await this.phoneNumberInput.fill(
      faker.phone.number({ style: 'international' }),
    );
  }

  async fillShippingAddressForm(): Promise<void> {
    await this.firstNameInput.fill(
      faker.person.firstName().replace(/[^A-Za-z]/g, ''),
    );
    await this.lastNameInput.fill(
      faker.person.lastName().replace(/[^A-Za-z]/g, ''),
    );
    await this.countyList.selectOption('Polska');
    await this.streetInput.fill(
      faker.location.streetAddress({ useFullAddress: true }),
    );
    await this.postCodeInput.fill(faker.location.zipCode({ format: '##-###' }));
    await this.cityInput.fill(faker.location.city());
  }

  async clickSaveAddressButton(): Promise<void> {
    await this.saveAddress.click();
  }

  async clickLogoutButton(): Promise<void> {
    await this.logoutLink.click();
  }
}
