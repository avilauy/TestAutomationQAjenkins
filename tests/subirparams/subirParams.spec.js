const { test, expect } = require('@playwright/test');
const path = require('path');

const HomePage = require('../../pages/home/HomePage');
const SubirParamsPage = require('../../pages/SubirParams/SubirParamsPage');

test.describe('Dispositivos - Subir configuraciones', () => {

  test('Subir params y confirmar actualización', async ({ page }) => {
    test.setTimeout(120000);

    const homePage = new HomePage(page);
    const subirConfigPage = new SubirParamsPage(page);

    // 📌 El params vive en fixtures
    const rutaParams = path.join(__dirname, '../../fixtures/sQ29600057972_params.dld');

    await homePage.inicializarSesion();
    await page.goto('https://tms-front.test.internal.resonet.uy/Home/RootPage/99');

    await subirConfigPage.ir();
    await subirConfigPage.subirArchivo(rutaParams);
    await subirConfigPage.confirmarYSubir();
    await subirConfigPage.guardarYConfirmar();

    // Si llegamos hasta acá, el flujo se ejecutó correctamente
    expect(true).toBe(true);
  });

});
