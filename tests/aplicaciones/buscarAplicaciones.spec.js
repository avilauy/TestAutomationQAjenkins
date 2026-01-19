const { test, expect } = require('@playwright/test');
const HomePage = require('../../pages/home/HomePage');
const BuscarAplicacionesPage = require('../../pages/Aplicaciones/BuscarAplicacionesPage');
const { buscarAppData, buscarAppNegativos } = require('../../fixtures/testData');

test.describe('Búsqueda de Aplicaciones', () => {
  let homePage;
  let buscarPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    buscarPage = new BuscarAplicacionesPage(page);

    await homePage.irAListadoAplicaciones();
  });

  test('Buscar aplicación existente - POSITIVO', async () => {
    await buscarPage.abrirPanelFiltros();

    await buscarPage.seleccionarTipo(buscarAppData.tipo);
    await buscarPage.seleccionarCategoria(buscarAppData.categoria);
    await buscarPage.seleccionarEstadoAplicacion(buscarAppData.estado);

    await buscarPage.buscar();

    expect(await buscarPage.hayResultados()).toBe(true);
  });

  test('Buscar con tipo incorrecto - NEGATIVO', async () => {
    await buscarPage.abrirPanelFiltros();
    await buscarPage.seleccionarTipo(buscarAppNegativos.tipoErroneo);

    await buscarPage.buscar();

    expect(await buscarPage.estaVacio()).toBe(true);
  });

  test('Buscar con categoría incorrecta - NEGATIVO', async () => {
    await buscarPage.abrirPanelFiltros();
    await buscarPage.seleccionarCategoria(buscarAppNegativos.categoriaErronea);

    await buscarPage.buscar();

    expect(await buscarPage.estaVacio()).toBe(true);
  });

  test('Buscar con código inexistente - NEGATIVO', async () => {
    await buscarPage.abrirPanelFiltros();
    await buscarPage.completarCodigo(buscarAppNegativos.codigoInexistente);

    await buscarPage.buscar();

    expect(await buscarPage.estaVacio()).toBe(true);
  });

  test('Buscar con combinación inválida múltiple - NEGATIVO', async () => {
    await buscarPage.abrirPanelFiltros();

    await buscarPage.seleccionarTipo(buscarAppNegativos.tipoErroneo);
    await buscarPage.seleccionarCategoria(buscarAppNegativos.categoriaErronea);
    await buscarPage.seleccionarEstadoAplicacion(buscarAppNegativos.estadoErroneo);
    await buscarPage.completarCodigo('XXXX5544');

    await buscarPage.buscar();

    expect(await buscarPage.estaVacio()).toBe(true);
  });

  test('Descarga Excel - SOLO con resultados', async () => {

    const archivo = await buscarPage.exportarExcel();
    expect(archivo).toBeTruthy();
  });
});
