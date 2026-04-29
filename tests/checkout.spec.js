import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { credentials } from '../testData';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { userData } from '../testData';
import { OverviewPage } from '../pages/OverviewPage';
import { CheckoutCompletePage } from '../pages/CheckoutCompletePage';

test('TC8: Valid Checkout Process', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    const overviewPage = new OverviewPage(page);
    const checkoutCompletePage = new CheckoutCompletePage(page);
    await loginPage.navigate();
    await loginPage.login(credentials.username, credentials.password);
    await inventoryPage.addToCartFirstItem();
    await expect(inventoryPage.cartLink).toHaveText('1');
    await inventoryPage.cartLink.click();
    await cartPage.assertUrl();
    const firstItemName = await inventoryPage.getFirstItemName();
    await expect(page.locator('[data-test="item-4-title-link"]')).toContainText(firstItemName);
    await cartPage.checkoutButton.click();
    await checkoutPage.assertUrl();
    const user = userData();
    await checkoutPage.fillCheckoutInformation(user.firstName, user.lastName, user.postalCode);
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');
    await expect(page.locator('[data-test="item-4-title-link"]')).toContainText(firstItemName);
    const firstItemPrice = await inventoryPage.getFirstItemPrice();
    await expect(overviewPage.totalPrice).toContainText(firstItemPrice);
    await overviewPage.finishCheckout();
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-complete.html');
    await expect(checkoutCompletePage.completeHeader).toHaveText('Thank you for your order!');
    await checkoutCompletePage.backHomeButton.click();
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html'); 
    await expect(inventoryPage.cartLink).toHaveText('');
});    

test('TC9: Checkout without products', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    await loginPage.navigate();   
    await loginPage.login(credentials.username, credentials.password);
    await inventoryPage.cartLink.click();
    await cartPage.assertUrl();
    await expect(page.locator('.cart_item')).not.toBeVisible();
    await cartPage.checkoutButton.click();
    await cartPage.assertUrl();
    await expect(cartPage).toContainText('Cart is empty');
});    

    