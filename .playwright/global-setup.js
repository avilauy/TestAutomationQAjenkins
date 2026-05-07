// ================================
// Carga de variables de entorno
// ================================
// Local: usa archivo .env
// Jenkins/Docker: usa variables del sistema
try {
  require('dotenv').config();
} catch (error) {
  console.warn('dotenv no disponible, usando variables del sistema');
}

const { chromium } = require('@playwright/test');

// ================================
// Page Object del login
// ================================
const SystemLoginPage = require('../pages/Login/SystemLoginPage');

// ================================
// Setup global de autenticación
// ================================
// Este archivo se ejecuta UNA vez antes
// de todos los tests.
//
// Objetivos:
// 1. Realizar login técnico
// 2. Persistir sesión autenticada
// 3. Reutilizar storageState
// ================================
module.exports = async () => {

  // ================================
  // Variables de entorno
  // ================================
  const BASE_URL =
    process.env.BASE_URL ||
    'https://tms-front.test.internal.resonet.uy/';

  // Recomendado:
  // evitar USER/PASSWORD por conflictos SO
  const user = process.env.TMS_USER;
  const pass = process.env.TMS_PASSWORD;

  // ================================
  // Validación defensiva
  // ================================
  if (!user || !pass) {
    console.error('❌ Variables detectadas:');
    console.error('BASE_URL:', BASE_URL);
    console.error('TMS_USER:', user ? 'OK' : 'NO DEFINIDO');
    console.error('TMS_PASSWORD:', pass ? 'OK' : 'NO DEFINIDO');

    throw new Error(
      '❌ Credenciales no definidas en variables de entorno'
    );
  }

  // ================================
  // Lanzamiento navegador
  // ================================
  const browser = await chromium.launch({
    headless: true,
  });

  const page = await browser.newPage();

  // ================================
  // Instancia Page Object
  // ================================
  const loginPage = new SystemLoginPage(page);

  // ================================
  // Navegación
  // ================================
  await page.goto(BASE_URL, {
    waitUntil: 'networkidle',
  });

  // ================================
  // Login reutilizable
  // ================================
  await loginPage.completarCredencialesLogin(user, pass);

  await loginPage.clickBotonLogin();

  await loginPage.esperarLoginExitoso();

  // ================================
  // Persistencia de sesión
  // ================================
  await page.context().storageState({
    path: '.playwright/storageState.json',
  });

  console.log('✅ storageState generado correctamente');

  // ================================
  // Cierre navegador
  // ================================
  await browser.close();
};