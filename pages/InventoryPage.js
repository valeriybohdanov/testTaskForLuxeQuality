import { expect, test } from '@playwright/test';
export class InventoryPage {
    constructor(page) {
        this.page = page;
        this.twitterLink = page.locator('[data-test="social-twitter"]');
        this.facebookLink = page.locator('[data-test="social-facebook"]');
        this.linkedinLink = page.locator('[data-test="social-linkedin"]');
        this.burgerMenuButton = page.locator('#react-burger-menu-btn');
        this.logoutLink = page.locator('#logout_sidebar_link');
        this.addButton = page.locator('.btn.btn_primary.btn_small.btn_inventory')
        this.cartLink = page.locator('[data-test="shopping-cart-link"]')
        this.sortDropdown = page.locator('.product_sort_container');
        this.url = 'https://www.saucedemo.com/inventory.html';
        this.menuItems = page.locator('.bm-item');
    }
    async navigate() {
      await test.step('Navigate to Inventory page', async() => {  
        await this.page.goto(this.url);
      });
    }
    async assertUrl() {
      await test.step('Verify URL is correct', async() => {
        await expect(this.page).toHaveURL(this.url);
      });
    }
    async addToCartFirstItem() {
      await test.step('Add first item from products list to cart', async() => {
        await this.addButton.first().click();
      });
    }
    async getFirstItemName() {
      return await test.step('Get name of the first item from products list', async() => {
        return await this.page.locator('.inventory_item_name').first().textContent();
      });
    } 
    async getFirstItemPrice() {
      return await test.step('Get price of the first item from products list', async() => {
        return await this.page.locator('.inventory_item_price').first().textContent();
      });
    }  
    async sortBy(option) {
      await test.step(`Verify Dropdown is visible andSort products by ${option} option`, async() => {
        await expect(this.sortDropdown).toBeVisible();
        await this.sortDropdown.selectOption(option);
      });
    };
    async getItemNames() {
      return await test.step('Get names of all items from products list', async() => {
        return await this.page.locator('[data-test="inventory-item-name"]').allTextContents();
      });
    }
    async getItemPrices() {
      return await test.step('Get prices of all items from products list', async() => {
        return await this.page.locator('[data-test="inventory-item-price"]').allTextContents();
      });
    };
    async getNumericPrices() {
      return await test.step('Get numeric prices of all items from products list', async() => {
        const prices = await this.getItemPrices();
        return prices.map(p => parseFloat(p.replace('$', '')));
      });
    }
    async openSocialLink(link, expectedUrl) {
      await test.step(`Open ${link} social link and verify URL`, async() => {
        const [newPage] = await Promise.all([
          this.page.context().waitForEvent('page'),
          this[`${link}Link`].click()
        ]);
        await newPage.waitForLoadState();
        await expect(newPage).toHaveURL(expectedUrl);
        await newPage.close();
      });
    }
  }    
