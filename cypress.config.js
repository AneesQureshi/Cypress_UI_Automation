const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: "mochawesome",
  reporterOptions: {
    reportDir: "cypress/reports",
    overwrite: false,
    html: true,
    json: true,
    embeddedScreenshots: true,
  e2e: {
    screenshotOnRunFailure: true, // take screenshots on failure
    setupNodeEvents(on, config) {
      // Get environment from CLI or default to 'dev'
      const envName = config.env.environment || "dev";


      // Define URLs for different environments
      const envUrls = {
        dev: "https://dummyjson.com/products/1",
        stage: "https://dummyjson.com/products/2",
        prod: "https://dummyjson.com/products/3"
      };

      // Override baseUrl dynamically
      config.baseUrl = envUrls[envName];

      console.log(`Running tests on: ${config.baseUrl}`);

      return config;
    },
  },
});
