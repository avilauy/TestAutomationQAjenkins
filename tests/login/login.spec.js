const { test, expect } = require('@playwright/test');
const SystemLoginPage = require('../../pages/Login/SystemLoginPage');
const HomePage = require('../../pages/home/HomePage');
const { credentials } = require('../../fixtures/testData');

test.describe('Login - Validar ingreso al sistema', () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new SystemLoginPage(page);

    await page.goto('/', { waitUntil: 'domcontentloaded' });

    await loginPage.completarCredencialesLogin(
      credentials.user,
      credentials.pass
    );

    await loginPage.clickBotonLogin();
    await loginPage.esperarLoginExitoso();
  });

  test('Login exitoso', async ({ page }) => {
    const homePage = new HomePage(page);

    await expect(homePage.menuModulos)
      .toBeVisible({ timeout: 15000 });
  });

});
