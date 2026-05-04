import { test, expect } from '../fixtures';
import { credentials, userData } from '../testData';

test('TC8: Valid Checkout Process', async ({ loginPage, inventoryPage, cartPage, checkoutPage, overviewPage, checkoutCompletePage }) => {
    await loginPage.navigate();
    await loginPage.login(credentials.username, credentials.password);
    await inventoryPage.addToCartFirstItem();
    await inventoryPage.assertCartCount('1');
    await inventoryPage.goToCart();
    await cartPage.assertUrl();
    const firstItemName = await inventoryPage.getFirstItemName();
    await cartPage.assertProductName(firstItemName);
    await cartPage.goToCheckout();
    await checkoutPage.assertUrl();
    const user = userData();
    await checkoutPage.fillCheckoutInformation(user.firstName, user.lastName, user.postalCode);
    await overviewPage.assertUrl();
    await cartPage.assertProductName(firstItemName);
    const firstItemPrice = await inventoryPage.getFirstItemPrice();
    await overviewPage.assertTotalPrice(firstItemPrice);
    await overviewPage.finishCheckout();
    await checkoutCompletePage.assertUrl();
    await checkoutCompletePage.assertCompleteHeader();
    await checkoutCompletePage.goBackHome();
    await inventoryPage.assertUrl();
    await inventoryPage.assertCartCount('');
});

test('TC9: Checkout without products', async ({ loginPage, inventoryPage, cartPage }) => {
    await loginPage.navigate();
    await loginPage.login(credentials.username, credentials.password);
    await inventoryPage.goToCart();
    await cartPage.assertUrl();
    await cartPage.assertCartEmpty();
    await cartPage.goToCheckout();
    await cartPage.assertUrl();
    await cartPage.assertEmptyCartMessage();
});
