class CampanasPage {
  constructor(page) {
    this.page = page;

    // Primer dispositivo disponible (Kendo ListBox)
    this.primerDispositivoDisponible = page
      .locator('#AvailableDevices ul.k-list li.k-item')
      .first();

    // Botón transferir todos
    this.btnTransferirTodos = page.locator(
      '#AvailableDevices a[data-command="transferAllTo"]'
    );

    // Inputs generales
    this.inputNombre = page.locator('#objcampaignName');
    this.inputInicio = page.locator('#objlaunchStartDatetime');
    this.inputFin = page.locator('#objlaunchEndDatetime');

    // Selects
    this.selectApp = page.locator('#objidApplication');
    this.selectVersion = page.locator('#objidAppVersion');

    // Tab selección dispositivos
    this.tabSeleccionDispositivos = page
      .locator('a:has-text("Selección de Dispositivos")')
      .first();

    this.inputSerie = page.locator('#objAFdeviceSerialNumber2');
    this.btnRefrescar = page.locator('#btnFillAvliableDevices');

    // Botones
    this.btnGuardar = page.locator('#btnSave');

    // Modal confirmación
    this.modalConfirmacion = page.locator('#diagPreSave');

    this.btnConfirmar = page.locator('#diagPreSave #OK_Lang');
 
  }

  obtenerFechaActual() {
    return new Date().toISOString().slice(0, 16);
  }
  
  //  await this.page.pause();
  obtenerFechaActualMas3Dias() {
    const fecha = new Date();
    fecha.setDate(fecha.getDate() + 3);
    return fecha.toISOString().slice(0, 16);
  }


async crearCampania(data) {
  //await this.page.pause();
  // Información general
  await this.inputNombre.waitFor({ state: 'visible' });
  await this.inputNombre.fill(data.nombre);

  await this.selectApp.selectOption(data.aplicacionValue);

  const fechaActual = this.obtenerFechaActual();
  await this.inputInicio.fill(fechaActual);

  const fechaFin = this.obtenerFechaActualMas3Dias();
  await this.inputFin.fill(fechaFin);

  //await this.inputFin.fill(fechaActual);

  await this.selectVersion.selectOption({ index: 1 });

  // Selección de dispositivos
  await this.irASeleccionDispositivos();
  await this.seleccionarDispositivo(data.dispositivoSerie);

  // Guardar + esperar backend
  await this.btnGuardar.click();

  await this.modalConfirmacion.waitFor({
    state: 'visible',
    timeout: 10000
  });

  await Promise.all([
    this.page.waitForResponse(resp =>
      resp.url().includes('/Campaign') && resp.status() === 200
    ),
    this.btnConfirmar.click()
  ]);

  // esperar cierre del modal
  await this.modalConfirmacion.waitFor({ state: 'hidden' });
}

  async sePermitioGuardar() {
  //  await this.page.pause();
    return await this.modalConfirmacion.isVisible();
  }

async irASeleccionDispositivos() {
  const tab = this.page.getByRole('tab', {
    name: 'Selección de Dispositivos'
  });

  await tab.click({ force: true });

  // Espera real: que cargue el input de serie
  await this.inputSerie.waitFor({
    state: 'visible',
    timeout: 15000
  });
}

  async seleccionarDispositivo(numeroSerie) {
    await this.inputSerie.waitFor({ state: 'visible', timeout: 10000 });
    await this.inputSerie.fill(numeroSerie);
    await this.inputSerie.press('Enter');

    await this.btnRefrescar.click();

    // Espera a que la grilla cargue
    await this.primerDispositivoDisponible.waitFor({
      state: 'visible',
      timeout: 15000
    });

    // Selecciona dispositivo
    await this.primerDispositivoDisponible.click();

    // Transferir a seleccionados
    await this.btnTransferirTodos.waitFor({
      state: 'visible',
      timeout: 10000
    });

    await this.btnTransferirTodos.click();
  }
}

module.exports = CampanasPage;
