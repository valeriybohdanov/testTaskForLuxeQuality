export class CartPage {
    constructor(page) {
        this.page = page;
        this.checkoutButton = page.locator('[data-test="checkout"]');
    }
    async navigate() {
        await this.page.goto('https://www.saucedemo.com/cart.html');
    }
  }