import { test, expect } from '../fixtures';
import { credentials } from '../testData';

test('TC1: Valid Login', async ({ loginPage, inventoryPage }) => {
    await loginPage.navigate();
    await loginPage.login(credentials.username, credentials.password);
    await inventoryPage.assertUrl();
});

test('TC2: Login with Invalid Password', async ({ loginPage }) => {
    await loginPage.navigate();
    await loginPage.login(credentials.username, credentials.invalidPassword);
    await expect(loginPage.errorMessage).toHaveText('Epic sadface: Username and password do not match any user in this service');
    await expect(loginPage.passwordInput).toHaveAttribute('type', 'password');
    await expect(loginPage.usenameXicon).toBeVisible();
    await expect(loginPage.passwordXicon).toBeVisible();
    await expect(loginPage.usernameInput).toHaveClass('input_error form_input error');
    await expect(loginPage.passwordInput).toHaveClass('input_error form_input error');
});

test('TC3: Login with locked out test login', async ({ loginPage }) => {
    await loginPage.navigate();
    await loginPage.login(credentials.lockedUsername, credentials.password);
    await expect(loginPage.errorMessage).toHaveText('Epic sadface: Sorry, this user has been locked out.');
    await expect(loginPage.passwordInput).toHaveAttribute('type', 'password');
    await expect(loginPage.usenameXicon).toBeVisible();
    await expect(loginPage.passwordXicon).toBeVisible();
    await expect(loginPage.usernameInput).toHaveClass('input_error form_input error');
    await expect(loginPage.passwordInput).toHaveClass('input_error form_input error');
});

test('TC4: Logout', async ({ loginPage, inventoryPage }) => {
    await loginPage.navigate();
    await loginPage.login(credentials.username, credentials.password);
    await inventoryPage.assertUrl();
    await inventoryPage.burgerMenuButton.click();
    await expect(inventoryPage.menuItems).toHaveCount(4);
    await inventoryPage.logoutLink.click();
    await loginPage.assertUrl();
    await expect(loginPage.usernameInput).toBeEmpty();
    await expect(loginPage.passwordInput).toBeEmpty();
});