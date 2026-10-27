import { defineConfig } from '@playwright/test';
import 'dotenv/config';

const rawURL = process.env.API_BASE_URL || 'http://13.200.185.1/c/pratik-911613';
const baseURL = `${rawURL.replace(/\/+$/, '')}/`;

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  workers: 1,
  timeout: 30_000,
  retries: 0,
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }]
  ],
  use: {
    baseURL,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },
  projects: [
    { name: 'api', testMatch: '**/api/**/*.spec.ts' },
    { name: 'ui', testMatch: '**/ui/**/*.spec.ts', use: { baseURL: process.env.APP_URL || baseURL } }
  ]
});
