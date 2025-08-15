// cypress.config.cjs
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: "mochawesome",
  reporterOptions: {
    reportDir: "cypress/reports",
    overwrite: false,
    html: true,
    json: true,
    embeddedScreenshots: true,
  },
  e2e: {
    screenshotOnRunFailure: true,
    setupNodeEvents(on, config) {
      const envName = config.env.environment || "dev";

      const envUrls = {
        dev: "https://dummyjson.com/products/1",
        stage: "https://dummyjson.com/products/2",
        prod: "https://dummyjson.com/products/3",
      };

      config.baseUrl = envUrls[envName];
      console.log(`Running tests on(for force networkerror.cy.js): ${config.baseUrl}`);

      return config;
    },
  },
});
