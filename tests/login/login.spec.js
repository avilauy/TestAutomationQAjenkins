const { test, expect } = require('@playwright/test');
const SystemLoginPage = require('../../pages/Login/SystemLoginPage.js');
const HomePage = require('../../pages/home/HomePage.js');
const { credentials } = require('../../fixtures/testData.js');

test.describe('Login - Validar ingreso al sistema', () => {
  test('Login exitoso', async ({ page }) => {
    const loginPage = new SystemLoginPage(page);
    const homePage = new HomePage(page);

    await page.goto('/');
    await loginPage.completarCredencialesLogin(credentials.user, credentials.pass);
    await loginPage.clickBotonLogin();
    await loginPage.esperarLoginExitoso();

    await expect(homePage.menuModulos).toBeVisible({ timeout: 10000 });
  });
});
