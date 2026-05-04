import { expect } from '@playwright/test';

export class OverviewPage {
    constructor(page) {
        this.page = page;
        this.url = 'https://www.saucedemo.com/checkout-step-two.html';
        this.finishButton = page.locator('[data-test="finish"]');
        this.totalPrice = page.locator('[data-test="subtotal-label"]');
    }
    async navigate() {
        await this.page.goto(this.url);
    }
    async finishCheckout() {
        await this.finishButton.click();
    }
    async assertUrl() {
        await expect(this.page).toHaveURL(this.url);
    }
    async assertTotalPrice(price) {
        await expect(this.totalPrice).toContainText(price);
    }
}