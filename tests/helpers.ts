import { expect, type APIRequestContext } from '@playwright/test';

export async function loginAs(request: APIRequestContext, username: string) {
  const password = process.env.TEST_PASSWORD;
  if (!password) throw new Error('Set TEST_PASSWORD in .env before running tests');

  const response = await request.post('api/login', {
    data: { username, password }
  });
  expect(response.status(), await response.text()).toBe(200);

  const body = await response.json();
  const token = body.token ?? body.access_token ?? body.accessToken;
  expect(token, `Login for ${username} must return a token`).toBeTruthy();

  return { Authorization: `Bearer ${token}` };
}
