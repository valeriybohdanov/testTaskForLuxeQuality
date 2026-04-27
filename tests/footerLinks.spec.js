import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { credentials } from '../testData';

test('Footer Links', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    await loginPage.navigate();
    await loginPage.login(credentials.username, credentials.password);
    
    const [twitterPage] = await Promise.all([
    page.context().waitForEvent('page'),
    inventoryPage.twitterLink.click()
    ]);
    await twitterPage.waitForLoadState();
    await expect(twitterPage).toHaveURL('https://x.com/saucelabs');
    await twitterPage.close();

    const [facebookPage] = await Promise.all([
    page.context().waitForEvent('page'),
    inventoryPage.facebookLink.click()
    ]);
    await facebookPage.waitForLoadState();
    await expect(facebookPage).toHaveURL('https://www.facebook.com/saucelabs');
    await facebookPage.close();

    const [linkedinPage] = await Promise.all([
    page.context().waitForEvent('page'),
    inventoryPage.linkedinLink.click()
    ]);
    await linkedinPage.waitForLoadState();
    await expect(linkedinPage).toHaveURL('https://www.linkedin.com/company/sauce-labs/');
    await linkedinPage.close();
});
    