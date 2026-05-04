import { expect } from '@playwright/test';

export class CheckoutCompletePage {
    constructor(page) {
        this.page = page;
        this.url = 'https://www.saucedemo.com/checkout-complete.html';
        this.completeHeader = page.locator('.complete-header');
        this.backHomeButton = page.locator('[data-test="back-to-products"]');
    }
    async navigate() {
        await this.page.goto(this.url);
    }
    async assertUrl() {
        await expect(this.page).toHaveURL(this.url);
    }
    async assertCompleteHeader() {
        await expect(this.completeHeader).toHaveText('Thank you for your order!');
    }
    async goBackHome() {
        await this.backHomeButton.click();
    }
}