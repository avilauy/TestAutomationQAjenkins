// ================================
// Carga de variables de entorno
// ================================
// Local: usa .env
// Jenkins/Docker: usa variables del sistema
try {
  require('dotenv').config();
} catch (error) {
  console.warn('dotenv no disponible, usando variables del sistema');
}

const { defineConfig, devices } = require('@playwright/test');

// ================================
// Validación mínima de variables
// ================================
const BASE_URL =
  process.env.BASE_URL ||
  'https://tms-front.test.internal.resonet.uy/';

// Recomendado para evitar conflictos con variables del SO
const TMS_USER = process.env.TMS_USER;
const TMS_PASSWORD = process.env.TMS_PASSWORD;

// ================================
// Configuración principal
// ================================
module.exports = defineConfig({

  // 📁 Directorio de tests
  testDir: './tests',

  // ================================
  // Ejecución
  // ================================
  workers: 1,
  fullyParallel: false,
  timeout: 30 * 1000,
  retries: 2,

  // ================================
  // Setup global
  // ================================
  globalSetup: require.resolve('./.playwright/global-setup'),

  testIgnore: [
    '**/global-setup.js',
  ],

  // ================================
  // Reportería
  // ================================
  reporter: [
    ['line'],
    ['allure-playwright', {
      outputFolder: 'allure-results',
    }],
  ],

  // ================================
  // Configuración compartida
  // ================================
  use: {

    // 🌐 URL base
    baseURL: BASE_URL,

    // 🔐 Sesión persistida
    storageState: '.playwright/storageState.json',

    // ================================
    // Navegador
    // ================================
    headless: true,

    viewport: {
      width: 1280,
      height: 720,
    },

    ignoreHTTPSErrors: true,

    // ================================
    // Evidencias
    // ================================
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
  },

  // ================================
  // Navegadores
  // ================================
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },

    // ================================
    // Cross-browser futuro
    // ================================

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