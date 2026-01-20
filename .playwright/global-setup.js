const { chromium } = require('@playwright/test');

//const SystemLoginPage = require('../../pages/Login/SystemLoginPage');
//const { credentials } = require('../../fixtures/testData');


const SystemLoginPage = require('../pages/Login/SystemLoginPage');
const { credentials } = require('../fixtures/testData');


module.exports = async () => {
    
 // const browser = await chromium.launch({ headless: false });
  const browser = await chromium.launch();

  const page = await browser.newPage();

  const loginPage = new SystemLoginPage(page);

  // Ir al login
  //await page.goto('/');
  await page.goto('https://tms-front.test.internal.resonet.uy/');


  // Reutiliza tu login existente
  await loginPage.completarCredencialesLogin(
    credentials.user,
    credentials.pass
  );
  await loginPage.clickBotonLogin();
  await loginPage.esperarLoginExitoso();

  // Guardar sesión
  await page.context().storageState({
   // path: 'storageState.json',
    path: '.playwright/storageState.json',

  });

  await browser.close();
};
