import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { credentials } from '../testData';

test('TC6: Sorting', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    await loginPage.navigate();
    await loginPage.login(credentials.username, credentials.password);
    await inventoryPage.assertUrl();

    await inventoryPage.sortBy('az');
    const namesAZ = await page.locator('[data-test="inventory-item-name"]').allTextContents();
    expect(namesAZ).toEqual([...namesAZ].sort());

    await inventoryPage.sortBy('za');
    const namesZA = await page.locator('[data-test="inventory-item-name"]').allTextContents();
    expect(namesZA).toEqual([...namesZA].sort().reverse());

    await inventoryPage.sortBy('lohi');
    const pricesLoHi = await page.locator('[data-test="inventory-item-price"]').allTextContents();
    const numericLoHi = pricesLoHi.map(p => parseFloat(p.replace('$', '')));
    expect(numericLoHi).toEqual([...numericLoHi].sort((a, b) => a - b));

    await inventoryPage.sortBy('hilo');
    const pricesHiLo = await page.locator('[data-test="inventory-item-price"]').allTextContents();
    const numericHiLo = pricesHiLo.map(p => parseFloat(p.replace('$', '')));
    expect(numericHiLo).toEqual([...numericHiLo].sort((a, b) => b - a));
});    