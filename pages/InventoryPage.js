import { expect } from '@playwright/test';
export class InventoryPage {
    constructor(page) {
        this.page = page;
        this.twitterLink = page.locator('[data-test="social-twitter"]');
        this.facebookLink = page.locator('[data-test="social-facebook"]');
        this.linkedinLink = page.locator('[data-test="social-linkedin"]');
        this.burgerMenuButton = page.locator('#react-burger-menu-btn');
        this.logoutLink = page.locator('#logout_sidebar_link');
        this.addButton = page.locator('.btn.btn_primary.btn_small.btn_inventory ')
        this.cartLink = page.locator('[data-test="shopping-cart-link"]')
        this.sortDropdown = page.locator('.product_sort_container');

    }
    async navigate() {
        await this.page.goto('https://www.saucedemo.com/inventory.html');
    }
    async addToCartFirstItem() {
        await this.addButton.first().click();     
    }
    async getFirstItemName() {
        return await this.page.locator('.inventory_item_name').first().textContent();
    } 
    async getFirstItemPrice() {
        return await this.page.locator('.inventory_item_price').first().textContent();
    } 
    async sortBy(option) {
        await expect(this.sortDropdown).toBeVisible();
        await this.sortDropdown.selectOption(option);

    } 
  }    