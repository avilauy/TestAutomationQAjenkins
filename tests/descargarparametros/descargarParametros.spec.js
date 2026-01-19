const { test, expect } = require('@playwright/test');
const HomePage = require('../../pages/home/HomePage.js');
const DescargarParametrosPage = require('../../pages/DescargarParametros/DescargarParametrosPage.js');


test.describe('Descargar Parametros', () => {

  let homePage;
  let descargarParametrosPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    descargarParametrosPage = new DescargarParametrosPage(page);

    test.setTimeout(60000);

    await homePage.inicializarSesion();
    await homePage.irAAdministracionDispositivos();
  });

test('Descargar Parametros', async ({ page }) => {

  const serie = 'Q29500039799';

  await descargarParametrosPage.buscarPorNumeroSerie(serie);
  await descargarParametrosPage.abrirDispositivo(serie);
  await descargarParametrosPage.seleccionarArchivoParams();
});

});
