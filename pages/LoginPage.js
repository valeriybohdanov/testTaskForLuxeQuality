import { expect, test } from '@playwright/test';
export class LoginPage {
    constructor(page) {
        this.page = page;
        this.usernameInput = page.locator('[data-test="username"]');
        this.passwordInput = page.locator('[data-test="password"]');
        this.loginButton = page.locator('[data-test="login-button"]');
        this.errorMessage = page.locator('[data-test="error"]');
        this.usenameXicon = page.locator('path').first();
        this.passwordXicon = page.locator('path').nth(1);
        this.url = 'https://www.saucedemo.com/';
    }
    async navigate() {
      await test.step('Navigate to Login page and verify password field is masked', async() => {
        await this.page.goto(this.url);
        await expect(this.passwordInput).toHaveAttribute('type', 'password');
      });
    }
    async assertUrl() {
      await test.step('Verify URL is correct', async() => {
        await expect(this.page).toHaveURL(this.url);
      }); 
    }
    async login(username, password) {
      await test.step('Fill in Login form and click on Login btn', async() => {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
      });
    };
}
