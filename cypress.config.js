// cypress.config.cjs
const { defineConfig } = require("cypress");
const allureWriter = require('@shelex/cypress-allure-plugin/writer');

module.exports = defineConfig({
  reporter: "mochawesome",
  reporterOptions: {
    reportDir: "cypress/reports",
    overwrite: true,
    html: true,
    json: true
  },
  e2e: {
    screenshotOnRunFailure: true,
    specPattern: "cypress/e2e/component/*.cy.js",

    setupNodeEvents(on, config) {
      // 1️⃣ Enable Allure reporting
      allureWriter(on, config);

      // 2️⃣ Environment switching
      const envName = config.env.environment || "dev";
      const envUrls = {
        dev: "https://dummyjson.com/products/1",
        stage: "https://dummyjson.com/products/2",
        prod: "https://dummyjson.com/products/3",
      };
      config.baseUrl = envUrls[envName];
      console.log(`Running tests on: ${config.baseUrl}`);

      return config;
    }
  },
});
