import { test } from '../fixtures';
import { credentials } from '../testData';

const socialLinks = [
    { name: 'twitter', url: 'https://x.com/saucelabs' },
    { name: 'facebook', url: 'https://www.facebook.com/saucelabs' },
    { name: 'linkedin', url: 'https://www.linkedin.com/company/sauce-labs/' },
];
test('TC7: Footer Links', async ({ loginPage, inventoryPage }) => {
    await loginPage.navigate();
    await loginPage.login(credentials.username, credentials.password);

    for (const { name, url } of socialLinks) {
        await inventoryPage.openSocialLink(name, url);
    }
});