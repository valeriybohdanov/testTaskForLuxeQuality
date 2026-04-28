import { expect } from '@playwright/test';
export class CheckoutPage {
    constructor(page) {
        this.page = page;
    }
    async navigate() {
        await this.page.goto('https://www.saucedemo.com/checkout-step-one.html');
    }
    async fillCheckoutInformation(firstName, lastName, postalCode) {
        await this.page.locator('[data-test="firstName"]').fill(firstName);
        await this.page.locator('[data-test="lastName"]').fill(lastName);
        await this.page.locator('[data-test="postalCode"]').fill(postalCode);
        await this.page.locator('[data-test="continue"]').click();
    }   
  }