# Saucedemo Playwright Tests

## Description
Automated end-to-end tests for [saucedemo.com](https://www.saucedemo.com) using Playwright.

## Project Structure
```
saucedemo-playwright/
├── pages/
│   ├── LoginPage.js
│   ├── InventoryPage.js
│   ├── CartPage.js
│   ├── CheckoutPage.js
│   └── CheckoutCompletePage.js.js
├── tests/
│   ├── login.spec.js
│   ├── cart.spec.js
│   ├── products.spec.js
│   ├── footer.spec.js
│   └── checkout.spec.js
├── testData.js
└── playwright.config.js
```

## Test Cases
- **TC1-TC4**: Login & Logout
- **TC5**: Cart persistence after logout
- **TC6**: Product sorting
- **TC7**: Footer Links
- **TC8-TC9**: Checkout

## Prerequisites
- Node.js
- npm

## How to run

Install dependencies:
```
npm install
```

Run tests:
```
npx playwright test
```

Run tests with UI mode:
```
npx playwright test --ui
```