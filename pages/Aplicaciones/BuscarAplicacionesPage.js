class BuscarAplicacionesPage {
  constructor(page) {
    this.page = page;

    // =========================
    // SELECTORES (CONGELADOS)
    // =========================
    this.selectTipo = page.locator('#objAFApplicationtypes');
    this.selectCategoria = page.locator('#objAFApplicationcategories');
    this.selectEstado = page.locator('#objAFApplicationstatus');
    this.inputCodigo = page.locator('#objAFappCode');

    this.btnBuscar = page.locator('#btnFind');
    this.btnExportarExcel = page.locator('#btnExcel');
    this.btnFiltros = page.locator('#btnAdvancedFilters');
    this.modalFiltros = page.locator('#diagAdvancedFilters');
    this.autocompleteCerrar = page.locator('#autocompleteClose');

    this.grid = page.locator('#grid');
    this.resultadosTabla = page.locator('#grid .k-grid-content tbody tr');
    this.pagerInfo = page.locator('.k-pager-info');
  }

  // =========================
  // FILTROS
  // =========================

  async abrirPanelFiltros() {
    if (await this.modalFiltros.isVisible()) return;

    await this.btnFiltros.waitFor({ state: 'visible', timeout: 10000 });
    await this.btnFiltros.click();
    await this.modalFiltros.waitFor({ state: 'visible', timeout: 5000 });
  }

  async seleccionarTipo(valor) {
    if (!valor) return;
    await this.selectTipo.waitFor({ state: 'visible', timeout: 10000 });
    await this.selectTipo.selectOption({ value: valor });
  }

  async seleccionarCategoria(valor) {
    if (!valor) return;
    await this.selectCategoria.waitFor({ state: 'visible', timeout: 10000 });
    await this.selectCategoria.selectOption({ value: valor });
  }

  async seleccionarEstadoAplicacion(valor) {
    if (!valor) return;
    await this.selectEstado.waitFor({ state: 'visible', timeout: 10000 });
    await this.selectEstado.selectOption({ value: valor });
  }

async completarCodigo(codigo) {
  await this.inputCodigo.waitFor({ state: 'visible', timeout: 10000 });
  await this.inputCodigo.fill(codigo);

  // cerrar autocomplete con Enter
  await this.inputCodigo.press('Enter');

  // backup por si queda abierto
  await this.cerrarAutocomplete();
}


  async cerrarAutocomplete() {
    if (await this.autocompleteCerrar.isVisible()) {
      await this.autocompleteCerrar.click();
    }
  }

  // =========================
  // BÚSQUEDA
  // =========================

 async buscar() {
   await this.btnBuscar.waitFor({ state: 'visible', timeout: 100000 });
   await this.btnBuscar.click();
   await this.esperarResultadoBusqueda(100000);
 }

  // =========================
  // ESPERA REAL DEL GRID
  // =========================

  async esperarResultadoBusqueda(timeout=100000) {
    // Kendo hace llamadas async
    await this.page.waitForLoadState('networkidle');

    // El grid siempre existe
    await this.grid.waitFor({ state: 'visible', timeout: 10000 });

    // El pager define el estado final (Vacío / X ítems)
    await this.pagerInfo.waitFor({ state: 'visible', timeout: 10000 });
  }

  // =========================
  // RESULTADOS
  // =========================

  async obtenerCantidadResultados() {
    // Si está vacío, count() devuelve 0 sin timeout
    return await this.resultadosTabla.count();
  }

  async hayResultados() {
    return (await this.obtenerCantidadResultados()) > 0;
  }


  async estaVacio() {
  // Esperar que el grid haya terminado de renderizar
  await this.pagerInfo.waitFor({ state: 'visible', timeout: 100000 });

  const cantidadFilas = await this.resultadosTabla.count();
  return cantidadFilas === 0;
}


  // =========================
  // EXPORTACIÓN
  // =========================

  async exportarExcel() {
    //await this.page.pause();
    await this.btnExportarExcel.waitFor({ state: 'visible', timeout: 10000 });


    await this.btnExportarExcel.click();
    await this.page.waitForTimeout(300);
    return 'descarga.xlsx';
  }
}

module.exports = BuscarAplicacionesPage;
