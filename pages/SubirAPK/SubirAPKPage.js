class SubirAPKPage {
  constructor(page) {
    this.page = page;

    // filtros
    this.btnFiltros = page.locator('#btnAdvancedFilters');
    this.inputCodigoApp = page.locator('input[data-role="autocomplete"]');
    this.btnBuscar = page.locator('#btnFind');

    // TreeGrid
    this.grid = page.locator('table.k-selectable');

    // modal versión
    this.inputVersion = page.locator('#objversion');
    this.textAreaDescripcion = page.locator('#objdescriptionVF');
    this.inputDescripcionBreve = page.locator('#objshortDesc');

    this.btnGuardarVersion = page.locator('#btnSaveV');
    this.btnConfirmarGuardar = page.locator('button[onclick="CloseAndSaveV()"]');

    // mensaje error
    this.mensajeError = page.locator('#txtMensajeAlertV');
  }

  // -------------------------------
  // BÚSQUEDA
  // -------------------------------
  async buscarAplicacion(codigo) {
    await this.btnFiltros.click();
    await this.inputCodigoApp.fill(codigo);

    await this.page
      .getByRole('option', { name: codigo, exact: true })
      .first()
      .click();

    await this.btnBuscar.click();
    await this.grid.locator('tr.k-master-row').first().waitFor({ timeout: 15000 });
  }

  // -------------------------------
  // EXPANDIR APP
  // -------------------------------
  async expandirAplicacion(nombreApp) {
    const fila = this.grid
      .locator('tr.k-master-row')
      .filter({ hasText: nombreApp })
      .first();

    await fila.waitFor({ timeout: 15000 });

    const toggle = fila.locator('a.k-icon');
    if ((await toggle.getAttribute('class')).includes('k-i-expand')) {
      await toggle.click();
    }
  }

  // -------------------------------
  // CREAR VERSIÓN EXITOSA
  // -------------------------------
  async crearVersionExitosa({ version, descripcion, breveDescripcion }) {
    const filaApp = this.grid.locator('tr.k-master-row').first();
    const btnNueva = filaApp.locator('img[title="Nueva Versión de Aplicación"]');

    await btnNueva.click();

    await this.inputVersion.waitFor({ timeout: 15000 });
    await this.inputVersion.fill(version);
    await this.textAreaDescripcion.fill(descripcion);
    await this.inputDescripcionBreve.fill(breveDescripcion);

    await this.btnGuardarVersion.click();
    await this.btnConfirmarGuardar.click();

    // validar que la versión aparece en la grilla
    await this.grid
      .locator('tr.k-master-row')
      .filter({ hasText: version })
      .first()
      .waitFor({ state: 'visible', timeout: 30000 });
  }

  // -------------------------------
  // CREAR VERSIÓN DUPLICADA (APP-07)
  // -------------------------------
  async crearVersionDuplicada({ version, descripcion, breveDescripcion }) {
    const filaApp = this.grid.locator('tr.k-master-row').first();
    const btnNueva = filaApp.locator('img[title="Nueva Versión de Aplicación"]');

    await btnNueva.click();

    await this.inputVersion.waitFor({ timeout: 15000 });
    await this.inputVersion.fill(version);
    await this.textAreaDescripcion.fill(descripcion);
    await this.inputDescripcionBreve.fill(breveDescripcion);

    await this.btnGuardarVersion.click();
    await this.btnConfirmarGuardar.click();

    // esperar mensaje de error
    await this.mensajeError.waitFor({
      state: 'visible',
      timeout: 15000
    });

    return (await this.mensajeError.textContent()).trim();
  }
}

module.exports = SubirAPKPage;
