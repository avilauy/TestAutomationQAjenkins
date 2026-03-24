// ================================
// Carga de variables de entorno
// ================================
// Permite leer variables desde el archivo .env en entorno local.
// En CI/CD (Jenkins, Docker), estas variables vendrán del sistema.
require('dotenv').config();

const { defineConfig, devices } = require('@playwright/test');

// ================================
// Configuración principal de Playwright
// ================================
module.exports = defineConfig({

  // 📁 Directorio donde viven los tests
  testDir: './tests',

  // ================================
  // Control de ejecución (clave para CI)
  // ================================

  // Ejecuta pruebas en un solo worker (evita conflictos de estado/session)
  workers: 1,

  // Evita ejecución paralela total (útil cuando hay dependencias entre tests)
  fullyParallel: false,

  // Tiempo máximo por test (30 segundos)
  timeout: 30 * 1000,

  // Reintentos automáticos en caso de fallo (útil para estabilidad en CI)
  retries: 2,

  // ================================
  // Setup global
  // ================================

  // Ejecuta login técnico una sola vez antes de todos los tests
  // Generalmente genera el storageState.json
  globalSetup: require.resolve('./.playwright/global-setup'),

  // Evita que el archivo de setup se ejecute como test
  testIgnore: [
    '**/global-setup.js',
  ],

  // ================================
  // Reportería
  // ================================

  reporter: [
    ['line'], // salida simple en consola
    ['allure-playwright', { outputFolder: 'allure-results' }], // integración con Allure
  ],

  // ================================
  // Configuración compartida de tests
  // ================================
  use: {

    // 🌐 URL base de la aplicación
    // - Usa variable de entorno si existe (.env, Jenkins, Docker)
    // - Fallback a URL interna para evitar romper ejecución local
    baseURL: process.env.BASE_URL || 'https://tms-front.test.internal.resonet.uy/',

    // 🔐 Estado de sesión persistido
    // Permite reutilizar login sin repetir autenticación en cada test
    storageState: '.playwright/storageState.json',

    // ================================
    // Configuración del navegador
    // ================================

    // Ejecuta con UI (cambiar a true en CI si necesitas headless)
    headless: true,

    // Resolución estándar de viewport
    viewport: { width: 1280, height: 720 },

    // Ignora errores SSL (útil en ambientes internos o certificados no válidos)
    ignoreHTTPSErrors: true,

    // ================================
    // Evidencias de ejecución
    // ================================

    // Screenshot solo en fallo
    screenshot: 'only-on-failure',

    // Video solo si falla
    video: 'retain-on-failure',

    // Trace completo en fallo (debug avanzado)
    trace: 'retain-on-failure',
  },

  // ================================
  // Configuración de navegadores
  // ================================
  projects: [
    {
      name: 'chromium',

      // Usa configuración base de Chrome Desktop
      use: { ...devices['Desktop Chrome'] },
    },

    // Listos para escalar cobertura cross-browser

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