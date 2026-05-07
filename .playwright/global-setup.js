// ================================
// Carga de variables de entorno
// ================================
// Permite usar credenciales desde .env en local
// o desde variables de entorno en CI/CD (Jenkins, Docker)
require('dotenv').config();

const { chromium } = require('@playwright/test');

// ================================
// Page Object del login
// ================================
const SystemLoginPage = require('../pages/Login/SystemLoginPage');

// ================================
// Setup global de autenticación
// ================================
// Este archivo se ejecuta UNA sola vez antes de todos los tests.
// Su objetivo es:
// 1. Hacer login técnico
// 2. Guardar la sesión en storageState
// 3. Reutilizarla en todos los tests
// ================================
module.exports = async () => {

  // ================================
  // Lanzamiento del navegador
  // ================================
  // headless por defecto (ideal para CI)
  const browser = await chromium.launch();

  const page = await browser.newPage();

  // Instancia del Page Object
  const loginPage = new SystemLoginPage(page);

  // ================================
  // Navegación al login
  // ================================
  // Usa variable de entorno si existe, sino fallback
  await page.goto(
    process.env.BASE_URL || 'https://tms-front.test.internal.resonet.uy/'
  );

  // ================================
  // Credenciales (desde variables de entorno)
  // ================================
  //  Importante:
  // - No usar datos hardcodeados
  // - No usar fixtures para secretos
  const user = process.env.USER_ADMIN;
  const pass = process.env.PASSWORD_ADMIN;

  // Validación defensiva (evita errores silenciosos)
  if (!user || !pass) {
    throw new Error('❌ Credenciales no definidas en variables de entorno');
  }

  // ================================
  // Flujo de login reutilizable
  // ================================
  await loginPage.completarCredencialesLogin(user, pass);
  await loginPage.clickBotonLogin();
  await loginPage.esperarLoginExitoso();

  // ================================
  // Persistencia de sesión
  // ================================
  // Guarda cookies y estado autenticado
  // para reutilizar en todos los tests
  await page.context().storageState({
    path: '.playwright/storageState.json',
  });

  // ================================
  // Cierre del navegador
  // ================================
  await browser.close();
};