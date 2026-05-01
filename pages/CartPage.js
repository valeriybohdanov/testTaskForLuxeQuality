import { expect, test } from '@playwright/test';
export class CartPage {
    constructor(page) {
        this.page = page;
        this.checkoutButton = page.locator('[data-test="checkout"]');
        this.url = 'https://www.saucedemo.com/cart.html';
        this.cartProductName = page.locator('[data-test="item-4-title-link"]');
        this.cartItem = page.locator('.cart_item');
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
    async assertEmptyCartMessage() {
      await test.step('Verify empty cart message', async() => {
        await expect(this.page.locator('.cart_list')).toContainText('Cart is empty');
      });
    }
  }
