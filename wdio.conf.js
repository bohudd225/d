exports.config = {
  port: '9515',
  path: '/',
    specs: [
        './e2e/*.js'
    ],
    exclude: [
    ],
    maxInstances: 10,
    capabilities: [{
        browserName: 'chrome'
    }],
    sync: true,
    logLevel: 'command',
    coloredLogs: true,
    bail: 0,
    screenshotPath: './errorShots/',
    baseUrl: 'http://localhost:8080',
    waitforTimeout: 10000,
    connectionRetryTimeout: 90000,
    connectionRetryCount: 3,
    services: [
      'chromedriver'
    ],
    framework: 'mocha',
    mochaOpts: {
        timeout: 20000 * 1000,
        ui: 'bdd'
    },
    before: function (capabilities, specs) {
      const chai = require('chai');
      global.expect = chai.expect;
      chai.Should();
    }
}
