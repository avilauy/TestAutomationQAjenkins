const { test, expect } = require('@playwright/test');
const path = require('path');

const HomePage = require('../../pages/home/HomePage');
const SubirAPKPage = require('../../pages/SubirAPK/SubirAPKPage');
const { subirApk, VersionDuplicada } = require('../../fixtures/testData');

test.describe('Aplicaciones - Subir APK', () => {
  let homePage;
  let subirAPKPage;

  test.beforeEach(async ({ page }) => {
    test.setTimeout(120000);

    homePage = new HomePage(page);
    subirAPKPage = new SubirAPKPage(page);

    await homePage.inicializarSesion();
    await homePage.irAListadoAplicaciones();
  });

  test('Subir APK y validar que quede registrado', async () => {
    await subirAPKPage.buscarAplicacion(subirApk.codigoApp);
    await subirAPKPage.expandirAplicacion(subirApk.nombreApp);

    await subirAPKPage.crearVersionExitosa({
      version: subirApk.version,
      descripcion: subirApk.descripcion,
      breveDescripcion: 'Carga válida'
    });
  });

  test('APP-07 – Crear versión duplicada', async () => {
    await subirAPKPage.buscarAplicacion(VersionDuplicada.codigoApp);
    await subirAPKPage.expandirAplicacion(VersionDuplicada.nombreAppDuplicada);

    const mensaje = await subirAPKPage.crearVersionDuplicada({
      version: VersionDuplicada.version,
      descripcion: VersionDuplicada.descripcion,
      breveDescripcion: VersionDuplicada.breveDescripcion
    });

    expect(mensaje).toContain(
      'No es posible registrar una versión de aplicación ya existente'
    );
  });
});
