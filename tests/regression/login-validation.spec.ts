import { LoginPage } from '../../src/pages/login.page';
import {
  incorrect_email,
  incorrect_username,
  without_password,
} from '../../src/test-data/user.data';
import { expect, test } from '@playwright/test';

test.describe('Login - negative scenarios @regression', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);

    await loginPage.goto();
  });

  test('User cannot log in without a password', async () => {
    // Arrange
    const expectedAlertContent = 'Błąd: pole hasła jest puste.';

    // Act
    await loginPage.login(without_password);

    // Assert
    await expect(loginPage.alert).toHaveText(expectedAlertContent);
  });

  test('User cannot log in with an invalid email', async () => {
    // Arrange
    const expectedAlertContent =
      'Nieznany adres e-mail. Proszę sprawdzić ponownie lub wypróbować swoją nazwę użytkownika.';

    // Act
    await loginPage.login(incorrect_email);

    // Assert
    await expect(loginPage.alert).toHaveText(expectedAlertContent);
  });

  test('User cannot log in with an invalid username', async () => {
    // Arrange
    const expectedAlertContent = `Błąd: brak ${incorrect_username.userEmail} wśród zarejestrowanych w witrynie użytkowników. Jeśli nie masz pewności co do nazwy użytkownika, użyj adresu e-mail.`;

    // Act
    await loginPage.login(incorrect_username);

    // Assert
    await expect(loginPage.alert).toHaveText(expectedAlertContent);
  });
});
