import { test, expect } from '../fixtures';
import { credentials } from '../testData';

test('TC5: Saving the card after logout', async ({ loginPage, inventoryPage, cartPage }) => {
    await loginPage.navigate();
    await loginPage.login(credentials.username, credentials.password);
    await inventoryPage.assertUrl();
    await inventoryPage.addToCartFirstItem();
    await inventoryPage.assertCartCount('1');
    await inventoryPage.openMenu();
    await inventoryPage.assertMenuItemsCount(4);
    await inventoryPage.logout();
    await loginPage.assertUrl();
    await expect(loginPage.usernameInput).toBeEmpty();
    await expect(loginPage.passwordInput).toBeEmpty();
    await loginPage.login(credentials.username, credentials.password);
    await inventoryPage.assertUrl();
    await inventoryPage.goToCart();
    await cartPage.assertUrl();
    const firstItemName = await inventoryPage.getFirstItemName();
    await cartPage.assertProductName(firstItemName);
});
