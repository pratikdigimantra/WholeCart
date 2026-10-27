import { test, expect } from '@playwright/test';
import { loginAs } from '../helpers';

const buyer = process.env.BUYER_USERNAME || 'buyer1';

test('AUTH-01 buyer login returns a usable token', async ({ request }) => {
  const headers = await loginAs(request, buyer);
  const response = await request.get('api/me', { headers });
  expect(response.status(), await response.text()).toBe(200);
  expect(JSON.stringify(await response.json()).toLowerCase()).toContain(buyer.toLowerCase());
});

test('AUTH-02 incorrect password is rejected', async ({ request }) => {
  const response = await request.post('api/login', {
    data: { username: buyer, password: 'WrongPassword-123!' }
  });
  expect([400, 401, 403]).toContain(response.status());
});

test('AUTH-03 unauthenticated account request is rejected', async ({ request }) => {
  const response = await request.get('api/me');
  expect([401, 403]).toContain(response.status());
});
