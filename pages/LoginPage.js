import { expect } from '@playwright/test';

export class LoginPage {
    constructor(page) {
        this.page = page;
        this.url = 'https://www.saucedemo.com/';
        this.usernameInput = page.locator('[data-test="username"]');
        this.passwordInput = page.locator('[data-test="password"]');
        this.loginButton = page.locator('[data-test="login-button"]');
        this.errorMessage = page.locator('[data-test="error"]');
        this.usenameXicon = page.locator('path').first();
        this.passwordXicon = page.locator('path').nth(1);
    }
    async navigate() {
        await this.page.goto(this.url);
    }
    async assertUrl() {
        await expect(this.page).toHaveURL(this.url);
    }
    async assertPasswordMasked() {
        await expect(this.passwordInput).toHaveAttribute('type', 'password');
    }
    async login(username, password) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
    async assertErrorState(errorText) {
        await expect(this.errorMessage).toHaveText(errorText);
        await expect(this.passwordInput).toHaveAttribute('type', 'password');
        await expect(this.usenameXicon).toBeVisible();
        await expect(this.passwordXicon).toBeVisible();
        await expect(this.usernameInput).toHaveClass('input_error form_input error');
        await expect(this.passwordInput).toHaveClass('input_error form_input error');
    }
}