import { expect } from '@playwright/test';

export class CheckoutPage {
    constructor(page) {
        this.page = page;
        this.url = 'https://www.saucedemo.com/checkout-step-one.html';
        this.firstNameInput = page.locator('[data-test="firstName"]');
        this.lastNameInput = page.locator('[data-test="lastName"]');
        this.postalCodeInput = page.locator('[data-test="postalCode"]'); 
        this.continueButton = page.locator('[data-test="continue"]');
    }
    async navigate() {
        await this.page.goto(this.url);
    }
    async fillCheckoutInformation(firstName, lastName, postalCode) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.postalCodeInput.fill(postalCode);
        await this.continueButton.click();
    }
    async assertUrl() {
        await expect(this.page).toHaveURL(this.url);
    }
}