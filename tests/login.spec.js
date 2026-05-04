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
    await loginPage.assertErrorState('Epic sadface: Username and password do not match any user in this service');
});

test('TC3: Login with locked out test login', async ({ loginPage }) => {
    await loginPage.navigate();
    await loginPage.login(credentials.lockedUsername, credentials.password);
    await loginPage.assertErrorState('Epic sadface: Sorry, this user has been locked out.');
});

test('TC4: Logout', async ({ loginPage, inventoryPage }) => {
    await loginPage.navigate();
    await loginPage.login(credentials.username, credentials.password);
    await inventoryPage.assertUrl();
    await inventoryPage.openMenu();
    await inventoryPage.assertMenuItemsCount(4);
    await inventoryPage.logout();
    await loginPage.assertUrl();
    await expect(loginPage.usernameInput).toBeEmpty();
    await expect(loginPage.passwordInput).toBeEmpty();
});