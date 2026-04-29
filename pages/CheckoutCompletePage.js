import { expect } from '@playwright/test';
import test from 'node:test';
export class CheckoutCompletePage {
    constructor(page) {
        this.page = page;
        this.completeHeader = page.locator('.complete-header');
        this.backHomeButton = page.locator('[data-test="back-to-products"]');
    }
    async navigate() {
      await test.step('Navigate to Checkout Complete page', async() => {
        await this.page.goto('https://www.saucedemo.com/checkout-complete.html');
      });
    }
    async assertUrl() {
      await test.step('Verify URL is correct', async() => {
        await expect(this.page).toHaveURL('https://www.saucedemo.com/checkout-complete.html');
      });
    }
}
