import { test, expect } from '@playwright/test';
import { loginAs } from '../helpers';

const buyer = process.env.BUYER_USERNAME || 'buyer1';

test('BUY-01 buyer can view catalogue', async ({ request }) => {
  const headers = await loginAs(request, buyer);
  const response = await request.get('api/products', { headers });
  expect(response.status(), await response.text()).toBe(200);
  const products = await response.json();
  expect(products).not.toBeNull();
});

test('BUY-02 buyer can view delivery slots for a valid date', async ({ request }) => {
  const headers = await loginAs(request, buyer);
  // Use application timezone rather than UTC to avoid date-boundary errors.
  const date = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Kolkata', year: 'numeric', month: '2-digit', day: '2-digit'
  }).format(new Date());
  const response = await request.get('api/slots', { headers, params: { date } });
  expect(response.status(), await response.text()).toBe(200);
  expect(await response.json()).not.toBeNull();
});

test('BUY-03 buyer can read their cart', async ({ request }) => {
  const headers = await loginAs(request, buyer);
  const response = await request.get('api/cart', { headers });
  expect(response.status(), await response.text()).toBe(200);
});

test('BUY-04 buyer can read their orders', async ({ request }) => {
  const headers = await loginAs(request, buyer);
  const response = await request.get('api/orders', { headers });
  expect(response.status(), await response.text()).toBe(200);
  expect(await response.json()).not.toBeNull();
});
