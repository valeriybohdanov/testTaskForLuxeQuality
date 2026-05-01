import { test, expect } from '../fixtures';
import { credentials } from '../testData';

test('TC6: Sorting', async ({ loginPage, inventoryPage }) => {
    await loginPage.navigate();
    await loginPage.login(credentials.username, credentials.password);
    await inventoryPage.assertUrl();

    await inventoryPage.sortBy('az');
    const namesAZ = await inventoryPage.getItemNames();
    expect(namesAZ).toEqual([...namesAZ].sort());

    await inventoryPage.sortBy('za');
    const namesZA = await inventoryPage.getItemNames();
    expect(namesZA).toEqual([...namesZA].sort().reverse());

    await inventoryPage.sortBy('lohi');
    const pricesLoHi = await inventoryPage.getNumericPrices();
    expect(pricesLoHi).toEqual([...pricesLoHi].sort((a, b) => a - b));

    await inventoryPage.sortBy('hilo');
    const pricesHiLo = await inventoryPage.getNumericPrices();
    expect(pricesHiLo).toEqual([...pricesHiLo].sort((a, b) => b - a));
});    