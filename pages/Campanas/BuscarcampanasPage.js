class BuscarcampanasPage {
  constructor(page) {
    this.page = page;

    this.inputNombrecampana = page.locator('#objAFCampaignName');
    this.inputAplicacion = page.locator('#objAFidApplication');
    this.selectiIdversionApp = page.locator('#objAFidAppVersion');
    this.modalFiltros = page.locator('#diagAdvancedFilters');
    this.btnFiltros = page.locator('#btnAdvancedFilters');
    this.btnBuscarcamapana = page.locator('#btnFindAF');
    this.inputNumerodeSerieCampana = page.locator('#objAFdeviceSerialNumber');
    this.selectEstado = page.locator('#objAFstatus');

    this.grid = page.locator('#grid');
    this.resultadosTabla = page.locator('#grid .k-grid-content tbody tr');
    this.pagerInfo = page.locator('.k-pager-info');
    this.noRecords = page.locator('#grid .k-grid-norecords');
  }

  // =========================
  // FILTROS
  // =========================

  async abrirPanelFiltroBusquedaCampana() {
    if (await this.modalFiltros.isVisible()) return;

    await this.btnFiltros.waitFor({ state: 'visible', timeout: 10000 });
    await this.btnFiltros.click();
    await this.modalFiltros.waitFor({ state: 'visible', timeout: 5000 });
  }

  async inputNombreBusquedaCam(nombre) {
    await this.inputNombrecampana.waitFor({ state: 'visible', timeout: 10000 });
    await this.inputNombrecampana.fill(nombre);
  }

  async inputNumeroSerieCam(serie) {
    await this.inputNumerodeSerieCampana.waitFor({ state: 'visible', timeout: 10000 });
    await this.inputNumerodeSerieCampana.fill(serie);
  }

  async seleccionarEstado(valor) {
    await this.selectEstado.waitFor({ state: 'visible', timeout: 10000 });
    await this.selectEstado.selectOption({ value: valor });
  }

  // =========================
  // BUSCAR
  // =========================

  async btnbuscar() {
    await this.btnBuscarcamapana.waitFor({ state: 'visible', timeout: 10000 });
    await this.btnBuscarcamapana.click();
    await this.esperarResultadoBusqueda();
  }

  async esperarResultadoBusqueda() {
    const tbody = this.page.locator('#grid .k-grid-content tbody');

    // Snapshot previo del grid
    const before = await tbody.innerHTML();

    // Esperar que Kendo re-renderice el grid
    await this.page.waitForFunction(
      (oldHtml) => {
        const el = document.querySelector('#grid .k-grid-content tbody');
        return el && el.innerHTML !== oldHtml;
      },
      before,
      { timeout: 60000 }
    );

    // El pager siempre marca el final del render
    await this.pagerInfo.waitFor({ state: 'visible', timeout: 10000 });
  }

  // =========================
  // RESULTADOS
  // =========================

  async obtenerCantidadResultados() {
    return await this.resultadosTabla.count();
  }

  async hayResultados() {
    return (await this.obtenerCantidadResultados()) > 0;
  }

  async estaVacio() {
  const indicadorVacio = this.page.locator('.k-pager-info.k-label', { hasText: 'Vacío' });

  // Esperar a que termine la búsqueda
  await this.page.waitForLoadState('networkidle');
  await indicadorVacio.waitFor({ state: 'visible', timeout: 15000 });

  return await indicadorVacio.isVisible();
}

}

module.exports = BuscarcampanasPage;
