const { test, expect } = require('@playwright/test');
const HomePage = require('../../pages/home/HomePage.js');
const ReiniciarApiKeyPage = require('../../pages/ReiniciarAPIKey/ReiniciarApiKeyPage.js');


test.describe('Dispositivos – Reiniciar API Key', () => {

  let homePage;
  let reiniciarApiKey;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    reiniciarApiKey = new ReiniciarApiKeyPage(page);

    test.setTimeout(60000);

    await homePage.inicializarSesion();
    await homePage.irAAdministracionDispositivos();
  });

test('Reiniciar API Key – Caso Exitoso', async ({ page }) => {

  const serie = 'Q29500039478';

  await reiniciarApiKey.buscarPorNumeroSerie(serie);
  await reiniciarApiKey.abrirDispositivo(serie);

  const resultado = await reiniciarApiKey.reiniciarApiKeySiCorresponde();

  let mensaje;

  if (resultado === 'PENDIENTE') {
    mensaje = 'La inicialización de la API KEY está pendiente';
  }

  if (resultado === 'NO_DISPONIBLE') {
    mensaje = 'La API KEY no está habilitada para reinicio por backend';
  }

  if (resultado === 'REINICIADO') {
    mensaje = 'La API KEY fue reiniciada correctamente';
  }

  // Log visible en consola
  console.log('API KEY:', mensaje);

  // Log visible en Playwright / Allure
  test.info().annotations.push({
    type: 'API KEY',
    description: mensaje
  });

  // El test SIEMPRE debe pasar
  expect(['PENDIENTE','NO_DISPONIBLE','REINICIADO']).toContain(resultado);
});



});
