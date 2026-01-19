const path = require('path');

class SubirParamsPage {
  constructor(page) {
    this.page = page;

    // ===============================
    // Navegación
    // ===============================
    this.linkModulos = page.getByRole('link', { name: 'Módulos' });
    this.linkDispositivos = page.getByRole('link', { name: 'Dispositivos' });
    this.linkSubirConfiguraciones = page.getByRole('link', { name: 'Subir configuraciones' });

    // ===============================
    // Upload
    // ===============================
    this.btnAgregarArchivo = page.locator('#btnAddNewAppVeriosnFiles');
    this.inputFile = page.locator('input[type="file"]');
    this.btnCerrarUpload = page.locator('button[onclick="CloseConfigUpload()"] span');

    // ===============================
    // Confirmación
    // ===============================
    this.chkConfirmacion = page.locator('div.custom-control');
    this.btnSubir = page.getByRole('button', { name: 'Subir configuraciones' });

    // ===============================
    // Guardar
    // ===============================
    this.btnGuardar = page.getByRole('button', { name: 'Guardar' });
    this.btnOK = page.locator('input#btnCancel[value="OK"]');
  }

  // ======================================================
  // Navegación
  // ======================================================
  async ir() {
    await this.linkModulos.waitFor({ state: 'visible', timeout: 20000 });
    await this.linkModulos.click();

    await this.linkDispositivos.waitFor({ state: 'visible', timeout: 20000 });
    await this.linkDispositivos.click();

    await this.linkSubirConfiguraciones.waitFor({ state: 'visible', timeout: 20000 });
    await this.linkSubirConfiguraciones.click();

    // Bloqueo funcional: esperar que el botón de upload exista
    await this.btnAgregarArchivo.waitFor({ state: 'visible', timeout: 30000 });
  }

  // ======================================================
  // Subida de archivo (equivalente a Python)
  // ======================================================
  async subirArchivo(nombreArchivo) {
    // Construimos la ruta real del archivo en fixtures
    const rutaParams = path.resolve(__dirname, '../../../fixtures', nombreArchivo);

    // Validación dura para evitar ENOENT silencioso
    require('fs').statSync(rutaParams);

    // Abrir modal de upload
    await this.btnAgregarArchivo.click();

    // Esperar input real del file
    await this.inputFile.waitFor({ state: 'attached', timeout: 20000 });
    await this.inputFile.setInputFiles(rutaParams);

    // Cerrar modal de carga (CloseConfigUpload)
    await this.btnCerrarUpload.waitFor({ state: 'visible', timeout: 20000 });
    await this.btnCerrarUpload.click();
  }

  // ======================================================
  // Confirmar y subir
  // ======================================================
  async confirmarYSubir() {
    await this.chkConfirmacion.waitFor({ state: 'visible', timeout: 20000 });
    await this.chkConfirmacion.click();

    await this.btnSubir.waitFor({ state: 'visible', timeout: 20000 });
    await this.btnSubir.click();
  }

  // ======================================================
  // Guardar y OK
  // ======================================================
  async guardarYConfirmar() {
    //await this.page.pause();

    await this.btnGuardar.waitFor({ state: 'visible', timeout: 20000 });
    await this.btnGuardar.click();

    await this.btnOK.waitFor({ state: 'visible', timeout: 20000 });
    await this.btnOK.click();
    //await this.page.pause();

  }
}

module.exports = SubirParamsPage;
