import { LoginUserModel } from '../models/user.model';
import { BasePage } from './base.page';
import { Locator, Page } from '@playwright/test';

export class LoginPage extends BasePage {
  url = '/moje-konto';

  userLoginEmailInput: Locator;
  userLoginPasswordInput: Locator;
  loginButton: Locator;
  rememberPasswordLink: Locator;
  userLoginUsernameInput: Locator;
  resetPasswordButton: Locator;

  header: Locator;
  alert: Locator;

  constructor(page: Page) {
    super(page);
    this.userLoginEmailInput = this.page.locator('#username');
    this.userLoginPasswordInput = this.page.locator('#password');
    this.loginButton = this.page.getByRole('button', {
      name: 'Zaloguj się',
    });
    this.rememberPasswordLink = this.page.getByRole('link', {
      name: 'Nie pamiętasz hasła?',
    });
    this.userLoginUsernameInput = this.page.locator('#user_login');
    this.resetPasswordButton = this.page.getByRole('button', {
      name: 'Resetuj hasło',
    });

    this.header = this.page.getByRole('heading');
    this.alert = this.page.getByRole('alert');
  }

  async login(loginUserData: LoginUserModel): Promise<void> {
    await this.userLoginEmailInput.fill(loginUserData.userEmail);
    await this.userLoginPasswordInput.fill(loginUserData.userPassword);
    await this.userLoginPasswordInput.blur();
    await this.loginButton.click();
  }

  async clickResetPasswordOption(): Promise<void> {
    await this.rememberPasswordLink.click();
  }

  async resetPassword(loginUserData: LoginUserModel): Promise<void> {
    await this.userLoginUsernameInput.fill(loginUserData.userEmail);
    await this.resetPasswordButton.click();
  }
}
