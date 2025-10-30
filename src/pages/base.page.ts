import { Locator, Page } from '@playwright/test';

export class BasePage {
  url = '';

  productAmount: Locator;
  previewBasketContent: Locator;
  searchEngineInput: Locator;

  header: Locator;
  information: Locator;

  constructor(protected page: Page) {
    this.productAmount = page.locator('.cart-contents .amount');
    this.previewBasketContent = page
      .locator('#site-header-cart')
      .getByRole('link')
      .nth(2);
    this.searchEngineInput = page.getByRole('searchbox', { name: 'Szukaj' });

    this.header = page.getByRole('heading');
    this.information = page.getByText(
      'Nie znaleziono produktów, których szukasz.',
    );
  }

  async goto(): Promise<void> {
    await this.page.goto(this.url);
  }

  async hoverBasketPreview(): Promise<void> {
    await this.productAmount.hover();
  }

  async fillPrizeInSearchEngine(): Promise<void> {
    await this.searchEngineInput.fill('2 599,00 zł');
    await this.searchEngineInput.press('Enter');
  }

  async fillPartOfProductNameInSearchEngine(): Promise<void> {
    await this.searchEngineInput.fill('Grecja');
    await this.searchEngineInput.press('Enter');
  }
}
