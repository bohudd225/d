const assert = require('assert');

describe('webdriver.io page', () => {
  it('should fill the form using Facebook', () => {
    const user = process.env.CONTACTLAB_FBUSER_USER;
    const pass = process.env.CONTACTLAB_FBUSER_PASS;

    if (!user || !pass) {
      throw new Error('Required env variables not found: CONTACTLAB_FBUSER_USER, CONTACTLAB_FBUSER_PASS');
    }

    console.log('password', pass);

    browser.url('/');
    browser.click('.ui.button');
    const mainWindow = browser.windowHandle().value;
    const allWindows = browser.windowHandles()
    browser.window(allWindows.value[1]);
    browser.setValue('input[type=text]', user);
    browser.setValue('input[type=password]', pass);
    browser.click('input[type=submit]');
    browser.window(mainWindow);

    browser.pause(5000);

    if (browser.windowHandles().value.length !== 1) {
      throw new Error('The popup is still open!');
    }

    console.log(JSON.stringify(browser.log('browser'), null, 2))

    browser.element('#firstName').getValue().should.equal('Harry');
    browser.element('#lastName').getValue().should.equal('Valtchanovsen');
    browser.element('#email').getValue().should.equal(user);
  });
});
