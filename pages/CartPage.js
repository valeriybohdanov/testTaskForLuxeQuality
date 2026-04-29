import { th } from "@faker-js/faker";
import { expect, test } from '@playwright/test';


export class CartPage {
    constructor(page) {
        this.page = page;
        this.checkoutButton = page.locator('[data-test="checkout"]');
        this.url = 'https://www.saucedemo.com/cart.html';
    }
    async navigate() {
      await test.step('Navigate to Cart page', async() => {
        await this.page.goto(this.url);
      });
    }
    async assertUrl() {
      await test.step('Verify URL is correct', async() => {
        await expect(this.page).toHaveURL(this.url);
      });
    }
  }
