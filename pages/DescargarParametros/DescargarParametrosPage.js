class DescargarParametrosPage {


  constructor(page) {
    this.page = page;
    // =========================
    // FILTROS AVANZADOS
    // =========================
    this.btnFiltrosAvanzados = page.locator('#btnAdvancedFilters');
    this.inputNumeroSerie = page.locator('#objAFdeviceSerialNumber');
    this.btnBuscar = page.locator('#diagAdvancedFilters button.btn-primary');
    // =========================
    // GRID
    // =========================
    this.filaPorSerie = (serie) =>
    this.page.locator(`img[title="Editar"][onclick*="${serie}"]`);
    // =========================
    // API KEY
    // =========================
    this.iconoApiKeyPendiente = page.locator(
      '#tabstrip-1 > div:nth-child(21) > table > tbody > tr > td:nth-child(1) > a > img'
    );
 //   this.chkReiniciarApiKey = page.locator(
 //     '#tabstrip-1 > div:nth-child(21) > table > tbody > tr > td:nth-child(2) > div > label'
 //   );
    this.chkReiniciarApiKey = page.locator('input[type="checkbox"][id*="Reset"]');

    //this.confirma = page.locator('#OK_Lang');
    this.btnconfirma = page.locator('#diagPreSave #OK_Lang');
    this.btnGuardar = page.locator('#btnSave');
    this.btnArchivos = page.locator('#tabstrip-tab-8');

    this.btnDescargar = page.locator('#iconButtonDownloadDeviceFiles');
  }
  // --------------------------------------------------
  // BUSCAR POR NÚMERO DE SERIE
  // --------------------------------------------------
  async buscarPorNumeroSerie(serial) {
    await this.btnFiltrosAvanzados.waitFor({ state: 'visible', timeout: 15000 });
    await this.btnFiltrosAvanzados.click();

    await this.inputNumeroSerie.waitFor({ state: 'visible', timeout: 10000 });
    await this.inputNumeroSerie.fill(serial);

    await this.btnBuscar.click();
  }

  // --------------------------------------------------
  // ABRIR DISPOSITIVO (LÁPIZ)
  // --------------------------------------------------

  async abrirDispositivo(serie) {
  const lapiz = this.filaPorSerie(serie);

  await lapiz.waitFor({ state: 'visible', timeout: 15000 });
  await lapiz.click();
}

  /**
 * Selecciona el primer registro disponible en una grilla.
 * Si no existen registros, deja un mensaje en consola y no falla el test.
 */
 // await this.page.pause();

async seleccionarArchivoParams() {

  await this.btnArchivos.waitFor({ state: 'visible', timeout: 10000 });
  await this.btnArchivos.click();

  const filas = this.page.locator('#gridDeviceFiles tbody tr');
  await filas.first().waitFor({ state: 'visible', timeout: 15000 });

  const total = await filas.count();

  if (total === 0) {
    console.log('No hay archivos en la grilla');
    return false;
  }

  // Todas las celdas que contienen "param"
  const celdasParam = this.page.locator(
    '#gridDeviceFiles tbody td',
    { hasText: /param/i }
  );

  const cantidad = await celdasParam.count();

  if (cantidad === 0) {
    console.log('No se encontraron archivos que contengan "params"');
    return false;
  }

  // Intentar encontrar exactamente params.dld
  for (let i = 0; i < cantidad; i++) {
    const celda = celdasParam.nth(i);
    const texto = (await celda.innerText()).trim();

    if (texto.toLowerCase() === 'params.dld') {
      await celda.click();
      console.log(`Archivo seleccionado: ${texto}`);
      return await this.descargar();
    }
  }

  // Si no existe params.dld, usar el primero que contenga "param"
  const fallback = celdasParam.first();
  const nombre = await fallback.innerText();
  await fallback.click();

  console.log(`params.dld no existe. Usando: ${nombre}`);

  return await this.descargar();
}

async descargar() {
  await this.btnDescargar.waitFor({ state: 'visible', timeout: 10000 });
  await this.btnDescargar.click();
  console.log('Descarga iniciada');
  return true;
}


}

module.exports = DescargarParametrosPage;
