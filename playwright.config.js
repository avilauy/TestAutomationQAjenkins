// playwright.config.js
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',

  // Ejecución controlada (ideal para Jenkins)
  workers: 1,
  fullyParallel: false,

  timeout: 30 * 1000,
  retries: 2,

  // Login técnico (una sola vez)
  globalSetup: require.resolve('./.playwright/global-setup'),

  testIgnore: [
    '**/global-setup.js',
  ],

  // REPORTERS
  reporter: [
    ['line'],
    ['allure-playwright', { outputFolder: 'allure-results' }],
  ],

  use: {
    baseURL: 'https://tms-front.test.internal.resonet.uy/',
    storageState: '.playwright/storageState.json',

    headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,

    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // Firefox y WebKit listos para activar si se necesitan
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
