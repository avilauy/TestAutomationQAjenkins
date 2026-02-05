// playwright.config.js
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',

  // Ejecutar de a uno (evita timeouts y bloqueos)
  workers: 1,
  fullyParallel: false,

  timeout: 30 * 1000,
  retries: 2,

  // Login técnico (una sola vez)
  //globalSetup: require.resolve('./.playwright/global-setup'),

  globalSetup: undefined,

  testIgnore: [
    '**/global-setup.js',
  ],

  use: {
    baseURL: 'https://tms-front.test.internal.resonet.uy/',
    storageState: '.playwright/storageState.json',

    headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,

    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
  },

reporter: [
  ['html', { open: 'never' }],
  ['allure-playwright', { outputFolder: 'allure-results' }],
],

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],
});
