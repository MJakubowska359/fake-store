import { RegisterUserModel } from '../models/user.model';
import { BasePage } from './base.page';
import { Locator, Page } from '@playwright/test';

export class RegisterPage extends BasePage {
  url = '/moje-konto';
  userRegisterEmailInput: Locator;
  userRegisterPasswordInput: Locator;
  registerButton: Locator;
  paragraph: Locator;

  constructor(page: Page) {
    super(page);
    this.userRegisterEmailInput = this.page.locator('#reg_email');
    this.userRegisterPasswordInput = this.page.locator('#reg_password');
    this.registerButton = this.page.getByRole('button', {
      name: 'Zarejestruj się',
    });
    this.paragraph = this.page.locator('p');
  }

  async register(registerUserData: RegisterUserModel): Promise<void> {
    await this.userRegisterEmailInput.fill(registerUserData.userEmail);
    await this.userRegisterPasswordInput.fill(registerUserData.userPassword);
    await this.userRegisterPasswordInput.blur();
    await this.registerButton.click();
  }
}
