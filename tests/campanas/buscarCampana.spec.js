const { test, expect } = require('@playwright/test');
const HomePage = require('../../pages/home/HomePage.js');
const { buscarcampana } = require('../../fixtures/testData.js');
const BuscarcampanasPage = require('../../pages/Campanas/BuscarcampanasPage.js');

test.describe('Campañas - filtro búsqueda', () => {
  let buscarcampanasPage;
  let homePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    buscarcampanasPage = new BuscarcampanasPage(page);

    await homePage.inicializarSesion();
    await homePage.irAGestionCampanias();
    await homePage.busquedaCampana();
  });

  test('Buscar campaña inexistente - NEGATIVO', async () => {
    test.setTimeout(60000);

    await buscarcampanasPage.seleccionarEstado(buscarcampana.Estado);
    await buscarcampanasPage.abrirPanelFiltroBusquedaCampana();
    await buscarcampanasPage.inputNombreBusquedaCam(buscarcampana.nombrecampana);
    await buscarcampanasPage.btnbuscar();

    await expect(await buscarcampanasPage.estaVacio()).toBe(true);
  });

  test('Numero de Serie - NEGATIVO', async () => {
    test.setTimeout(600000);

    await buscarcampanasPage.seleccionarEstado(buscarcampana.Estado);
    await buscarcampanasPage.abrirPanelFiltroBusquedaCampana();
    await buscarcampanasPage.inputNumeroSerieCam(buscarcampana.dispositivoSerie);
    await buscarcampanasPage.btnbuscar();

    await expect(await buscarcampanasPage.estaVacio()).toBe(true);
  });
});
