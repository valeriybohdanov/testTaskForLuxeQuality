import { test, expect } from '@playwright/test';
export class OverviewPage {
    constructor(page) {
        this.page = page;
        this.finishButton = page.locator('[data-test="finish"]');
        this.totalPrice = page.locator('[data-test="subtotal-label"]');
    }
    async navigate() {
      await test.step('Navigate to Overview page', async() => {
        await this.page.goto('https://www.saucedemo.com/checkout-step-two.html');
      });
    }
    async finishCheckout() {
      await test.step('Click on Finish btn', async() => {
        await this.finishButton.click();
      });
    }
    async assertUrl() {
      await test.step('Verify URL is correct', async() => {
        await expect(this.page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');
      }); 
    }
  }