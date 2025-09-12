// cypress.config.js
const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const { addCucumberPreprocessorPlugin } = require("@badeball/cypress-cucumber-preprocessor");
const esbuildPluginImport = require("@badeball/cypress-cucumber-preprocessor/esbuild");
const createEsbuildPlugin = esbuildPluginImport.createEsbuildPlugin || esbuildPluginImport;
const allureWriter = require("@shelex/cypress-allure-plugin/writer");

module.exports = defineConfig({
  reporter: "mochawesome",
  reporterOptions: {
    reportDir: "cypress/reports",
    overwrite: true,
    html: true,
    json: true,
  },

  e2e: {
    specPattern: [
      "cypress/e2e/**/*.feature",
      "cypress/e2e/**/*.cy.{js,ts}"
    ],
    supportFile: "cypress/support/e2e.js",

    env: {
      allure: true,
      allureResultsPath: "test-results/allure-results",
    },

    async setupNodeEvents(on, config) {
      // grep plugins (keep if you use grep)
      try { require('@cypress/grep/src/plugin')(config); } catch (e) { /* optional */ }
      try { require('@bahmutov/cy-grep/src/plugin')(config); } catch (e) { /* optional */ }

      // esbuild bundler with cucumber plugin
      const bundler = createBundler({
        plugins: [createEsbuildPlugin(config)],
      });

      // Use bundler for all files (.feature handled by cucumber preprocessor)
      on("file:preprocessor", bundler);

      // required by cucumber preprocessor
      await addCucumberPreprocessorPlugin(on, config);

      // Allure writer
      allureWriter(on, config);

      // Env switching
      const envName = config.env.environment || "dev";
      const envUrls = {
        dev: "https://dummyjson.com/products/1",
        stage: "https://dummyjson.com/products/2",
        prod: "https://dummyjson.com/products/3",
      };
      config.baseUrl = envUrls[envName];
      console.log(`Running tests on: ${config.baseUrl}`);

      return config;
    },
  },
});
