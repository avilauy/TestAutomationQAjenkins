class AplicacionesPage {
  constructor(page) {
    this.page = page;

    // BOTONES PRINCIPALES
    this.btnNuevo = page.getByRole('button', { name: 'Nuevo' });
    this.btnGuardar = page.getByRole('button', { name: 'Guardar' });
    this.btnCancelar = page.getByRole('button', { name: 'Cancelar' });
    this.btnGuardarAppSi = page.getByRole('button', { name: 'Si' });

    // CAMPOS DEL FORMULARIO CREAR APP
    this.inputNombre = page.locator('#objname');
    this.inputCodigo = page.locator('#objappCode');
    this.comboTipo = page.locator('#objApplicationtypes');
    this.comboCategoria = page.locator('#objApplicationcategories');
                                         
    // MODAL DESCRIPCIÓN
    this.inputDescripcionAbreModal = page.locator('#objdescription');
    this.modalDescripcionInput = page.locator('#objModalTextarea');
    this.modalDescripcionBtnCerrar = page.locator('#diagModalTextarea .modal-header.bg-primary button.close');

    // MENSAJES Y ALERTAS
    this.codAppDuplicado = page.locator('#txtMensajeAlert');
  }


  async abrirFormularioNuevo() {
    await this.btnNuevo.click();                // Clic en “Nuevo”
    await this.inputNombre.waitFor({            // Espera al campo nombre del formulario
      state: 'visible',
      timeout: 15000
    });
  }

  async completarNombre(nombre) {
    await this.inputNombre.fill(nombre);
  }

  async completarCodigo(codigo) {
    await this.inputCodigo.fill(codigo);
  }

  async seleccionarTipo(valor) {
    await this.comboTipo.selectOption(valor);
  }

  async seleccionarCategoria(valor) {
    await this.comboCategoria.selectOption(valor);
  }

  async completarDescripcion(texto) {
    await this.inputDescripcionAbreModal.click();
    await this.modalDescripcionInput.waitFor({ state: 'visible', timeout: 10000 });
    await this.modalDescripcionInput.fill(texto);
    await this.modalDescripcionBtnCerrar.click();
    await this.page.waitForTimeout(300);
  }

  async guardar() {
    //await this.page.pause();
    await this.btnGuardar.click();
  }

  async guardarAppSi() {
    await this.btnGuardarAppSi.click();
  }

  async obtenerMensajeCodigoDuplicado() {
    await this.codAppDuplicado.waitFor({ state: 'visible', timeout: 5000 });
    return await this.codAppDuplicado.innerText();
  }

  async botonGuardarEstaDeshabilitado() {
    return (await this.btnGuardar.getAttribute('disabled')) !== null;
  }

  async botonGuardarEstaHabilitado() {
    return (await this.btnGuardar.getAttribute('disabled')) === null;
  }
}

module.exports = AplicacionesPage;
