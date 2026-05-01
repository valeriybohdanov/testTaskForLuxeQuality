import { test, expect } from '../fixtures';
import { credentials } from '../testData';

test('TC7: Footer Links', async ({ loginPage, inventoryPage }) => {
    await loginPage.navigate();
    await loginPage.login(credentials.username, credentials.password);
    await inventoryPage.openSocialLink('twitter', 'https://x.com/saucelabs');
    await inventoryPage.openSocialLink('facebook', 'https://www.facebook.com/saucelabs');
    await inventoryPage.openSocialLink('linkedin', 'https://www.linkedin.com/company/sauce-labs/');
});
    