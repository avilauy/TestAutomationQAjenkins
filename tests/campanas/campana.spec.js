const { test, expect } = require('@playwright/test');
const HomePage = require('../../pages/home/HomePage.js');
const CampanasPage = require('../../pages/Campanas/CampanasPage.js');
const { campananuevo } = require('../../fixtures/testData.js');

test.describe('Campañas - Validaciones', () => {
  let campanasPage;
  let homePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    campanasPage = new CampanasPage(page);

    await homePage.irAGestionCampanias();
    await homePage.inicializarSesion();
    await homePage.clickNuevo();

  });

  test('Crear Campaña', async () => {
    test.setTimeout(60000);

    await campanasPage.crearCampania(campananuevo);
    const seGuardo = await campanasPage.sePermitioGuardar();
    expect(seGuardo).toBeFalsy();
  });
});
