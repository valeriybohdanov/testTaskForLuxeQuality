import { test, expect } from '../fixtures';
import { credentials } from '../testData';

test('TC5: Saving the card after logout ', async ({ loginPage, inventoryPage, cartPage }) => {
    await loginPage.navigate();
    await loginPage.login(credentials.username, credentials.password);
    await inventoryPage.assertUrl();
    await inventoryPage.addToCartFirstItem();
    await expect(inventoryPage.cartLink).toHaveText('1');
    await inventoryPage.burgerMenuButton.click();
    await expect(inventoryPage.menuItems).toHaveCount(4);
    await inventoryPage.logoutLink.click();
    await loginPage.assertUrl();
    await expect(loginPage.usernameInput).toBeEmpty();
    await expect(loginPage.passwordInput).toBeEmpty();
    await loginPage.login(credentials.username, credentials.password);
    await inventoryPage.assertUrl();
    await inventoryPage.cartLink.click();
    await cartPage.assertUrl();
    const firstItemName = await inventoryPage.getFirstItemName();
    await expect(cartPage.cartProductName).toContainText(firstItemName);
});    
