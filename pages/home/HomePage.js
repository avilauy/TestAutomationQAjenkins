class HomePage {
  constructor(page) {
    this.page = page;

    // -------------------------
    // SELECTORES PRINCIPALES
    // -------------------------
    this.menuModulos = page.getByRole('link', { name: 'Módulos' });

    this.subMenuAplicaciones = page
      .locator('a.dropdown-item[data-bs-toggle="dropdown"]')
      .filter({ hasText: /^Aplicaciones$/ });

    this.opcionAplicaciones = page
      .locator('a.dropdown-item[href="/Applications/ApplicationsIndex/210"]')
      .filter({ hasText: /^Aplicaciones$/ });

    // PANTALLA DE CREAR APLICACIÓN
    this.formNuevoAppCampoNombre = page.locator('#objname');

    // LISTADO
    this.btnFiltrosListado = page.locator('#btnAdvancedFilters');
    this.modalFiltroNombre = page.locator('#objAFname');

    // URL home
    this.urlHome = 'https://tms-front.test.internal.resonet.uy/Home/RootPage/99';

    this.menuDistribucion = page.getByRole('link', { name: 'Distribución' });

    //  forzar que sea un LINK
    this.menuGestionCampanias = page.getByRole('link', {
      name: 'Gestión de Campañas',
      exact: true
    });

    this.btnNuevo = page.locator('#btnAddNew');

    this.grid = page.locator('#grid');
    this.resultadosTabla = page.locator('#grid .k-grid-content tbody tr');
    this.pagerInfo = page.locator('.k-pager-info');

    // -------------------------
    // SELECTORES DISPOSITIVOS
    // -------------------------
    this.subMenuDispositivos = page
      .locator('#drp205 > ul > li:nth-child(1) > a');

    this.opcionAdministracionDispositivos = page
      .locator('#drp205 > ul > li:nth-child(1) > ul > li:nth-child(1) > a');

    this.urlAdministracionDispositivos =
      'https://tms-front.test.internal.resonet.uy/ManageDevice/ManageDeviceIndex/208';


  }

  // --------------------------------------------------
  // IR A PANTALLA DE CREACIÓN DE APLICACIONES
  // --------------------------------------------------
  async irA_Aplicaciones() {
    await this.page.goto(this.urlHome, { waitUntil: 'load' });

    await this.menuModulos.waitFor({ state: 'visible', timeout: 15000 });
    await this.menuModulos.click();

    // Esperar y clickear submenú Aplicaciones
    const aplicacionesLink = this.subMenuAplicaciones.first();
    await aplicacionesLink.waitFor({ state: 'visible', timeout: 10000 });
    await aplicacionesLink.click();

    // Esperar y clickear enlace final Aplicaciones
    const opcionLink = this.opcionAplicaciones.first();
    await opcionLink.waitFor({ state: 'visible', timeout: 10000 });
    await opcionLink.click();
  }

  // --------------------------------------------------
  // IR A LISTADO DE APLICACIONES
  // --------------------------------------------------
  async irAListadoAplicaciones() {
    await this.page.goto(this.urlHome, { waitUntil: 'load' });

    await this.menuModulos.waitFor({ state: 'visible', timeout: 15000 });
    await this.menuModulos.click();

    const aplicacionesLink = this.subMenuAplicaciones.first();
    await aplicacionesLink.waitFor({ state: 'visible', timeout: 10000 });
    await aplicacionesLink.click();

    const opcionLink = this.opcionAplicaciones.first();
    await opcionLink.waitFor({ state: 'visible', timeout: 10000 });
    await opcionLink.click();

    // Confirmar que el listado cargó
    await this.btnFiltrosListado.waitFor({ state: 'visible', timeout: 15000 });
  }

  // --------------------------------------------------
  // IR A GESTIÓN DE CAMPAÑAS
  // --------------------------------------------------
  async irAGestionCampanias() {
    await this.page.goto(this.urlHome, { waitUntil: 'load' });

    await this.menuModulos.waitFor({ state: 'visible', timeout: 15000 });
    await this.menuModulos.hover();

    await this.menuDistribucion.waitFor({ state: 'visible', timeout: 8000 });
    await this.menuDistribucion.hover();

    await this.menuGestionCampanias.waitFor({ state: 'visible', timeout: 15000 });
    await this.menuGestionCampanias.click();

    await this.page.waitForURL(/Campaigns\/CampaignsIndex/, { timeout: 15000 });
  }

  // --------------------------------------------------
  // BOTÓN NUEVO
  // --------------------------------------------------
  async clickNuevo() {
    await this.btnNuevo.waitFor({ state: 'visible', timeout: 15000 });
    await this.btnNuevo.click();
  }

  async busquedaCampana (){  
    await this.btnFiltrosListado.waitFor({ state: 'visible', timeout: 15000 });
    await this.btnFiltrosListado.click();
  }
  
  async inicializarSesion() {
  // Espera a que el front cargue completamente
  await this.page.waitForLoadState('networkidle');

  // Fuerza una navegación interna
  await this.page.reload();

  // Espera nuevamente estado estable
  await this.page.waitForLoadState('networkidle');
}

  // --------------------------------------------------
  // IR A ADMINISTRACIÓN DE DISPOSITIVOS
  // --------------------------------------------------
  async irAAdministracionDispositivos() {
    await this.page.goto(this.urlHome, { waitUntil: 'load' });

    await this.menuModulos.waitFor({ state: 'visible', timeout: 15000 });
    await this.menuModulos.click();

    await this.subMenuDispositivos.waitFor({ state: 'visible', timeout: 10000 });
    await this.subMenuDispositivos.click();

    await this.opcionAdministracionDispositivos.waitFor({ state: 'visible', timeout: 10000 });
    await this.opcionAdministracionDispositivos.click();

    await this.page.waitForURL(/ManageDevice\/ManageDeviceIndex/, { timeout: 15000 });
  }

}

module.exports = HomePage;

//await this.page.pause();
