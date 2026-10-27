import { test, expect } from '@playwright/test';
import { loginAs } from '../helpers';

test('SELL-01 seller can view their orders', async ({ request }) => {
  const headers = await loginAs(request, process.env.SELLER_USERNAME || 'seller1');
  const response = await request.get('api/seller/orders', { headers });
  expect(response.status(), await response.text()).toBe(200);
});
