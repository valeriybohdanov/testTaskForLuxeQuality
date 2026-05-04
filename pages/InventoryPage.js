import { expect } from '@playwright/test';

export class InventoryPage {
    constructor(page) {
        this.page = page;
        this.url = 'https://www.saucedemo.com/inventory.html';
        this.twitterLink = page.locator('[data-test="social-twitter"]');
        this.facebookLink = page.locator('[data-test="social-facebook"]');
        this.linkedinLink = page.locator('[data-test="social-linkedin"]');
        this.burgerMenuButton = page.locator('#react-burger-menu-btn');
        this.logoutLink = page.locator('#logout_sidebar_link');
        this.addButton = page.locator('.btn.btn_primary.btn_small.btn_inventory');
        this.cartLink = page.locator('[data-test="shopping-cart-link"]');
        this.sortDropdown = page.locator('.product_sort_container');
        this.menuItems = page.locator('.bm-item');
        this.firstItemName = page.locator('.inventory_item_name').first();
        this.firstItemPrice = page.locator('.inventory_item_price').first();
        this.itemNames = page.locator('[data-test="inventory-item-name"]');
        this.itemPrices = page.locator('[data-test="inventory-item-price"]');
    }
    async navigate() {
        await this.page.goto(this.url);
    }
    async assertUrl() {
        await expect(this.page).toHaveURL(this.url);
    }
    async addToCartFirstItem() {
        await this.addButton.first().click();
    }
    async getFirstItemName() {
        return await this.firstItemName.textContent();
    }
    async getFirstItemPrice() {
        return await this.firstItemPrice.textContent();
    }
    async sortBy(option) {
        await expect(this.sortDropdown).toBeVisible();
        await this.sortDropdown.selectOption(option);
    }
    async getItemNames() {
        return await this.itemNames.allTextContents();
    }
    async getItemPrices() {
        return await this.itemPrices.allTextContents();
    }
    async getNumericPrices() {
        const prices = await this.getItemPrices();
        return prices.map(p => parseFloat(p.replace('$', '')));
    }
    async openSocialLink(link, expectedUrl) {
        const [newPage] = await Promise.all([
            this.page.context().waitForEvent('page'),
            this[`${link}Link`].click()
        ]);
        await newPage.waitForLoadState();
        await expect(newPage).toHaveURL(expectedUrl);
        await newPage.close();
    }
    async openMenu() {
        await this.burgerMenuButton.click();
    }
    async assertMenuItemsCount(count) {
        await expect(this.menuItems).toHaveCount(count);
    }
    async logout() {
        await this.logoutLink.click();
    }
    async assertCartCount(count) {
        await expect(this.cartLink).toHaveText(count);
    }
    async goToCart() {
        await this.cartLink.click();
    }    
}