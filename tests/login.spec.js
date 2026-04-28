import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { credentials } from '../testData';

test('TC1: Valid Login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    await loginPage.navigate();
    await expect(loginPage.passwordInput).toHaveAttribute('type', 'password');
    await loginPage.login(credentials.username, credentials.password);
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
});

test('TC2: Login with Invalid Password', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login(credentials.username, credentials.invalidPassword);
    await expect(loginPage.errorMessage).toHaveText('Epic sadface: Username and password do not match any user in this service');
    await expect(loginPage.passwordInput).toHaveAttribute('type', 'password');
    await expect(loginPage.usenameXicon).toBeVisible();
    await expect(loginPage.passwordXicon).toBeVisible();
    await expect(loginPage.usernameInput).toHaveClass('input_error form_input error');
    await expect(loginPage.passwordInput).toHaveClass('input_error form_input error');
});

test('TC3: Login with locked out test login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login(credentials.lockedUsername, credentials.password);
    await expect(loginPage.errorMessage).toHaveText('Epic sadface: Sorry, this user has been locked out.');
    await expect(loginPage.passwordInput).toHaveAttribute('type', 'password');
    await expect(loginPage.usenameXicon).toBeVisible();
    await expect(loginPage.passwordXicon).toBeVisible();
    await expect(loginPage.usernameInput).toHaveClass('input_error form_input error');
    await expect(loginPage.passwordInput).toHaveClass('input_error form_input error');
});

test('TC4: Logout', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    await loginPage.navigate();
    await loginPage.login(credentials.username, credentials.password);
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    await inventoryPage.burgerMenuButton.click();
    const menuItems = page.locator('.bm-item');
    await expect(menuItems).toHaveCount(4);
    await inventoryPage.logoutLink.click();
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(loginPage.usernameInput).toBeEmpty();
    await expect(loginPage.passwordInput).toBeEmpty();
});