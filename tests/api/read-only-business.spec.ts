import { test, expect } from '@playwright/test';
import { loginAs } from '../helpers';

const buyer = process.env.BUYER_USERNAME || 'buyer1';
const buyer2 = process.env.BUYER2_USERNAME || 'buyer2';

// Read-only business checks. No orders, stock, refunds or settings are modified.
test('BUS-01 buyer can retrieve invoice list', async ({ request }) => {
  const headers = await loginAs(request, buyer);
  const response = await request.get('api/invoices', { headers });
  expect(response.status(), await response.text()).toBe(200);
  expect(await response.json()).not.toBeNull();
});

test('BUS-02 buyer can retrieve inquiries', async ({ request }) => {
  const headers = await loginAs(request, buyer);
  const response = await request.get('api/inquiries', { headers });
  expect(response.status(), await response.text()).toBe(200);
  expect(await response.json()).not.toBeNull();
});

test('BUS-03 buyer cannot access operator buyer list', async ({ request }) => {
  const headers = await loginAs(request, buyer);
  const response = await request.get('api/admin/buyers', { headers });
  expect([401, 403], await response.text()).toContain(response.status());
});

test('BUS-04 buyer cannot access seller products', async ({ request }) => {
  const headers = await loginAs(request, buyer);
  const response = await request.get('api/seller/products', { headers });
  expect([401, 403], await response.text()).toContain(response.status());
});

test('BUS-05 second buyer can access own orders', async ({ request }) => {
  const headers = await loginAs(request, buyer2);
  const response = await request.get('api/orders', { headers });
  expect(response.status(), await response.text()).toBe(200);
  expect(await response.json()).not.toBeNull();
});

