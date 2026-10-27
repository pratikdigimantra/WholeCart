import { test, expect } from '@playwright/test';
import { loginAs } from '../helpers';

test('SEC-01 unauthenticated cart access is denied', async ({ request }) => {
  const response = await request.get('api/cart');
  expect([401, 403]).toContain(response.status());
});

test('SEC-02 buyer cannot access operator settings', async ({ request }) => {
  const headers = await loginAs(request, process.env.BUYER_USERNAME || 'buyer1');
  const response = await request.get('api/admin/settings', { headers });
  expect([401, 403]).toContain(response.status());
});

test('SEC-03 buyer cannot access seller orders', async ({ request }) => {
  const headers = await loginAs(request, process.env.BUYER_USERNAME || 'buyer1');
  const response = await request.get('api/seller/orders', { headers });
  expect([401, 403]).toContain(response.status());
});

test('SEC-04 operator can read admin settings', async ({ request }) => {
  const headers = await loginAs(request, process.env.OPERATOR_USERNAME || 'operator');
  const response = await request.get('api/admin/settings', { headers });
  expect(response.status(), await response.text()).toBe(200);
});
