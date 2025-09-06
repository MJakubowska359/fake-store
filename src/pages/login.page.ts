import { LoginUserModel } from '../models/user.model';
import { BasePage } from './base.page';
import { Locator, Page } from '@playwright/test';

export class LoginPage extends BasePage {
  url = '/moje-konto';
  userLoginEmailInput: Locator;
  userLoginPasswordInput: Locator;
  loginButton: Locator;
  paragraph: Locator;
  alert: Locator;

  constructor(page: Page) {
    super(page);
    this.userLoginEmailInput = this.page.locator('#username');
    this.userLoginPasswordInput = this.page.locator('#password');
    this.loginButton = this.page.getByRole('button', {
      name: 'Zaloguj się',
    });
    this.paragraph = this.page.locator('p');
    this.alert = this.page.getByRole('alert');
  }

  async login(loginUserData: LoginUserModel): Promise<void> {
    await this.userLoginEmailInput.fill(loginUserData.userEmail);
    await this.userLoginPasswordInput.fill(loginUserData.userPassword);
    await this.userLoginPasswordInput.blur();
    await this.loginButton.click();
  }
}
