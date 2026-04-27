export class InventoryPage {
    constructor(page) {
        this.page = page;
        this.twitterLink = page.locator('[data-test="social-twitter"]');
        this.facebookLink = page.locator('[data-test="social-facebook"]');
        this.linkedinLink = page.locator('[data-test="social-linkedin"]');
    }
    async navigate() {
        await this.page.goto('https://www.saucedemo.com/inventory.html');
    }
  }    