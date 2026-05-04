import { test, expect } from '../fixtures';
import { credentials } from '../testData';

const sortingCases = [
    {
        option: 'az',
        getValues: (inventoryPage) => inventoryPage.getItemNames(),
        verify: (values) => expect(values).toEqual([...values].sort())
    },
    {
        option: 'za',
        getValues: (inventoryPage) => inventoryPage.getItemNames(),
        verify: (values) => expect(values).toEqual([...values].sort().reverse())
    },
    {
        option: 'lohi',
        getValues: (inventoryPage) => inventoryPage.getNumericPrices(),
        verify: (values) => expect(values).toEqual([...values].sort((a, b) => a - b))
    },
    {
        option: 'hilo',
        getValues: (inventoryPage) => inventoryPage.getNumericPrices(),
        verify: (values) => expect(values).toEqual([...values].sort((a, b) => b - a))
    },
];

test('TC6: Sorting', async ({ loginPage, inventoryPage }) => {
    await loginPage.navigate();
    await loginPage.login(credentials.username, credentials.password);
    await inventoryPage.assertUrl();

    for (const { option, getValues, verify } of sortingCases) {
        await inventoryPage.sortBy(option);
        const values = await getValues(inventoryPage);
        verify(values);
    }
});
