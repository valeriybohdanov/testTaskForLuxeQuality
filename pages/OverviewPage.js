export class OverviewPage {
    constructor(page) {
        this.page = page;
        this.finishButton = page.locator('[data-test="finish"]');
        this.totalPrice = page.locator('[data-test="subtotal-label"]');
    }
    async navigate() {
        await this.page.goto('https://www.saucedemo.com/checkout-step-two.html');
    }
    async finishCheckout() {
        await this.finishButton.click();
    }
  }