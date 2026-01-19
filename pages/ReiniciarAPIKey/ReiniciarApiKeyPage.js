class ReiniciarApiKeyPage {


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

    //this.btnconfirma = page.locator('#OK_Lang');
    this.btnconfirma = page.locator('#diagPreSave #OK_Lang');
    this.btnGuardar = page.locator('#btnSave');
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

  // --------------------------------------------------
  // REINICIAR API KEY (REGLA DE NEGOCIO)
  // --------------------------------------------------
async reiniciarApiKeySiCorresponde() {

  // 1️⃣ Si está pendiente → no hacer nada
  if (await this.iconoApiKeyPendiente.isVisible().catch(() => false)) {
    return 'PENDIENTE';
  }

  // 2️⃣ Si el checkbox está deshabilitado → backend no permite reset
  if (await this.chkReiniciarApiKey.isDisabled()) {
    return 'NO_DISPONIBLE';
  }

  // 3️⃣ Reset permitido
  await this.chkReiniciarApiKey.check({ force: true });

  
  await this.btnGuardar.click();
  await this.btnconfirma.click();
  return 'REINICIADO';
}

}

module.exports = ReiniciarApiKeyPage;
