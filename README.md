# Saucedemo Playwright Tests

## Description
Automated end-to-end tests for [saucedemo.com](https://www.saucedemo.com) using Playwright.

## Project Structure

saucedemo-playwright/
├── pages/
│   ├── LoginPage.js
│   └── InventoryPage.js
├── tests/
│   └── footer.spec.js
├── testData.js
└── playwright.config.js

## Test Cases
- **TC7**: Footer Links — verifies that Twitter, Facebook and LinkedIn icons open correct pages in a new tab

## Prerequisites
- Node.js
- npm

## How to run

Install dependencies:
npm install

Run tests:
npx playwright test

Run tests with UI mode:
npx playwright test --ui