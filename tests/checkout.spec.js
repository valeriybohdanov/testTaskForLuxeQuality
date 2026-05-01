import { test, expect } from '../fixtures';
import { credentials, userData } from '../testData';

test('TC8: Valid Checkout Process', async ({ loginPage, inventoryPage, cartPage, checkoutPage, overviewPage, checkoutCompletePage }) => {
    
    await loginPage.navigate();
    await loginPage.login(credentials.username, credentials.password);
    await inventoryPage.addToCartFirstItem();
    await expect(inventoryPage.cartLink).toHaveText('1');
    await inventoryPage.cartLink.click();
    await cartPage.assertUrl();
    const firstItemName = await inventoryPage.getFirstItemName();
    await expect(cartPage.cartProductName).toContainText(firstItemName);
    await cartPage.checkoutButton.click();
    await checkoutPage.assertUrl();
    const user = userData();
    await checkoutPage.fillCheckoutInformation(user.firstName, user.lastName, user.postalCode);
    await overviewPage.assertUrl();
    await expect(cartPage.cartProductName).toContainText(firstItemName);
    const firstItemPrice = await inventoryPage.getFirstItemPrice();
    await expect(overviewPage.totalPrice).toContainText(firstItemPrice);
    await overviewPage.finishCheckout();
    await checkoutCompletePage.assertUrl();
    await expect(checkoutCompletePage.completeHeader).toHaveText('Thank you for your order!');
    await checkoutCompletePage.backHomeButton.click();
    await inventoryPage.assertUrl();
    await expect(inventoryPage.cartLink).toHaveText('');
});    

test('TC9: Checkout without products', async ({ loginPage, inventoryPage, cartPage }) => {
    await loginPage.navigate();   
    await loginPage.login(credentials.username, credentials.password);
    await inventoryPage.cartLink.click();
    await cartPage.assertUrl();
    await expect(cartPage.cartItem).not.toBeVisible();
    await cartPage.checkoutButton.click();
    await cartPage.assertUrl();
    await cartPage.assertEmptyCartMessage();
});    
