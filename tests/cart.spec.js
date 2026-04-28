import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { credentials } from '../testData';
import { CartPage } from '../pages/CartPage';

test('TC5: Saving the card after logout ', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    await loginPage.navigate();
    await loginPage.login(credentials.username, credentials.password);
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    await inventoryPage.addToCartFirstItem();
    await expect(inventoryPage.cartLink).toHaveText('1');
    await inventoryPage.burgerMenuButton.click();
    const menuItems = page.locator('.bm-item');
    await expect(menuItems).toHaveCount(4);
    await inventoryPage.logoutLink.click();
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(loginPage.usernameInput).toBeEmpty();
    await expect(loginPage.passwordInput).toBeEmpty();
    await loginPage.login(credentials.username, credentials.password);
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    await inventoryPage.cartLink.click();
    await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');
    const firstItemName = await inventoryPage.getFirstItemName();
    await expect(page.locator('[data-test="item-4-title-link"]')).toContainText(firstItemName);
});    
