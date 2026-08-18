const { defineConfig } = require('cypress');

module.exports = defineConfig({
  projectId: "z1t2nm",
  e2e: {
    baseUrl: 'http://qamid.tmweb.ru',
    viewportWidth: 1280,
    viewportHeight: 800,
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 30000,
    video: false,
    screenshotOnRunFailure: true,
    chromeWebSecurity: false,
    setupNodeEvents(on, config) {
      // Отключаем менеджер паролей и предупреждения об утечках в Chrome
      on('before:browser:launch', (browser, launchOptions) => {
        if (browser.family === 'chromium') {
          launchOptions.args.push('--disable-save-password-bubble');
          launchOptions.args.push('--autofill-server-communication-enabled=false');
          launchOptions.args.push('--password-store=basic');
        }
        return launchOptions;
      });
      return config;
    },
  },
});