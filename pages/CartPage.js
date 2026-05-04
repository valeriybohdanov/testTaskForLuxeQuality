import { expect } from '@playwright/test';

export class CartPage {
    constructor(page) {
        this.page = page;
        this.checkoutButton = page.locator('[data-test="checkout"]');
        this.url = 'https://www.saucedemo.com/cart.html';
        this.cartProductName = page.locator('[data-test="item-4-title-link"]');
        this.cartItem = page.locator('.cart_item');
        this.cartList = page.locator('.cart_list'); 
    }
    async navigate() {
        await this.page.goto(this.url);
    }
    async assertUrl() {
        await expect(this.page).toHaveURL(this.url);
    }
    async assertEmptyCartMessage() {
        await expect(this.cartList).toContainText('Cart is empty'); 
    }
    async assertProductName(name) {
        await expect(this.cartProductName).toContainText(name);
    }
    async goToCheckout() {
        await this.checkoutButton.click();
    }
    async assertTotalPrice(price) {
        await expect(this.totalPrice).toContainText(price);
    }
    async assertCartEmpty() {
        await expect(this.cartItem).not.toBeVisible();
    }
}