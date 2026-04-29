import { expect, test } from '@playwright/test';
export class CheckoutPage {
    constructor(page) {
        this.page = page;
    }
    async navigate() {
      await test.step('Navigate to Checkout page', async() => {
        await this.page.goto('https://www.saucedemo.com/checkout-step-one.html');
      });
    }
    async fillCheckoutInformation(firstName, lastName, postalCode) {
      await test.step('Fill in checkout information and click on Continue btn', async() => {
        await this.page.locator('[data-test="firstName"]').fill(firstName);
        await this.page.locator('[data-test="lastName"]').fill(lastName);
        await this.page.locator('[data-test="postalCode"]').fill(postalCode);
        await this.page.locator('[data-test="continue"]').click();
      });
    }
    async assertUrl() {
      await test.step('Verify URL is correct', async() => {
        await expect(this.page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');
      }); 
    }
  }
  