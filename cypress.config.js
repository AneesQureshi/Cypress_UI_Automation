const { defineConfig } = require("cypress");
const allureWriter = require("@shelex/cypress-allure-plugin/writer");
const { tagify } = require("cypress-tags");



module.exports = defineConfig({
  reporter: "mochawesome",
  reporterOptions: {
    reportDir: "cypress/reports",
    overwrite: true,
    html: true,
    json: true,
  },
  e2e: {
    supportFile: "cypress/support/e2e.js",

    env: {
      allure: true,
      allureResultsPath: "test-results/allure-results",
    },

    setupNodeEvents(on, config) {
      require('@cypress/grep/src/plugin')(config);
       require('@bahmutov/cy-grep/src/plugin')(config)
        on('file:preprocessor', tagify(config));
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
