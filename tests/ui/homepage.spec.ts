import { test, expect } from '@playwright/test';

test('UI-01 WholeCart home page loads', async ({ page }) => {
  
  const response = await page.goto('http://13.200.185.1/c/pratik-911613/');
  expect(response).not.toBeNull();
  expect(response!.status()).toBeLessThan(400);
  await expect(page.locator('body')).toContainText(/WholeCart/i);
});


test('Login as buyer1', async ({ page }) => {
  // Open the application
  await page.goto('http://13.200.185.1/c/pratik-911613/');

  // Enter username
  await page.getByTestId('username').fill('buyer1');

  // Enter password
  await page.getByTestId('password').fill('Test@123');

  // Click the Login button
  await page.getByTestId('login').click();
});
