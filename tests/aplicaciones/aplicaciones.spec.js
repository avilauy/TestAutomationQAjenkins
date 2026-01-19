const { test, expect } = require('@playwright/test');
const HomePage = require('../../pages/home/HomePage.js');
const AplicacionesPage = require('../../pages/Aplicaciones/AplicacionesPage.js');
const { nuevaAppValida } = require('../../fixtures/testData.js');

test.describe('Aplicaciones - Validaciones', () => {
  let aplicacionesPage;
  let homePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    aplicacionesPage = new AplicacionesPage(page);

    // Sesión reutilizada: solo navegación
    await homePage.irA_Aplicaciones();
  });

  test('Crear App Exitosa', async () => {
    await aplicacionesPage.abrirFormularioNuevo();

    await aplicacionesPage.completarNombre(nuevaAppValida.nombre);
    await aplicacionesPage.completarCodigo(nuevaAppValida.codigo);
    await aplicacionesPage.seleccionarTipo(nuevaAppValida.tipo);
    await aplicacionesPage.seleccionarCategoria(nuevaAppValida.categoria);
    await aplicacionesPage.completarDescripcion(nuevaAppValida.descripcion);
    await aplicacionesPage.guardar();
    await aplicacionesPage.guardarAppSi();

  });


  test('Validar no permitir código duplicado en nueva aplicación', async () => {
    await aplicacionesPage.abrirFormularioNuevo();

    await aplicacionesPage.completarNombre(nuevaAppValida.nombre);
    await aplicacionesPage.completarCodigo(nuevaAppValida.CodigoDuplicado);
    await aplicacionesPage.seleccionarTipo(nuevaAppValida.tipo);
    await aplicacionesPage.seleccionarCategoria(nuevaAppValida.categoria);
    await aplicacionesPage.completarDescripcion(nuevaAppValida.descripcion);

    await aplicacionesPage.guardar();
    await aplicacionesPage.guardarAppSi();

    const mensaje = await aplicacionesPage.obtenerMensajeCodigoDuplicado();
    await expect(mensaje).toContain(
      'No'
    );
  });

  test('Validar habilitación del botón Guardar solo con todos los campos completos', async () => {
    await aplicacionesPage.abrirFormularioNuevo();

    expect(await aplicacionesPage.botonGuardarEstaDeshabilitado()).toBeTruthy();

    await aplicacionesPage.completarNombre(nuevaAppValida.nombre);
    await aplicacionesPage.completarCodigo(nuevaAppValida.codigo);
    await aplicacionesPage.seleccionarTipo(nuevaAppValida.tipo);
    await aplicacionesPage.seleccionarCategoria(nuevaAppValida.categoria);
    await aplicacionesPage.completarDescripcion(nuevaAppValida.descripcion);

    expect(await aplicacionesPage.botonGuardarEstaHabilitado()).toBeTruthy();
  });
});
