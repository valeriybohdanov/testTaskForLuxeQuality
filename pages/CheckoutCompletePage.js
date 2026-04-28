export class CheckoutCompletePage {
    constructor(page) {
        this.page = page;
        this.completeHeader = page.locator('.complete-header');
        this.backHomeButton = page.locator('[data-test="back-to-products"]');
    }
    async navigate() {
        await this.page.goto('https://www.saucedemo.com/checkout-complete.html');
    }
  }