class SystemLoginPage {
  constructor(page) {
    this.page = page;

    this.inputUsername = '#e-mail';
    this.inputPassword = '#password';
    this.loginButton = '#contact-submit';

    // elemento real que solo existe cuando el usuario ya está logueado
    this.selectorHome = 'a.navbar-brand';
  }

  async completarCredencialesLogin(username, password) {
    await this.page.locator(this.inputUsername).fill('');
    await this.page.locator(this.inputUsername).type(username, { delay: 50 });

    await this.page.locator(this.inputPassword).fill('');
    await this.page.locator(this.inputPassword).type(password, { delay: 50 });
  }

  async clickBotonLogin() {
    await this.page.locator(this.loginButton).waitFor({ state: 'visible', timeout: 15000 });
    await this.page.locator(this.loginButton).click();
  }

  async esperarLoginExitoso() {
    // Aquí está la clave:
    // esperamos el DOM del HOME, no la URL
    await this.page.locator(this.selectorHome).waitFor({
      state: 'visible',
      timeout: 60000
    });
  }
}

module.exports = SystemLoginPage;
