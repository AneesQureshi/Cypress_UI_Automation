const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      experimentalSessionAndOrigin: true;
    },
    downloadsFolder: "cypress/downloads", // <-- custom folder
  },

  component: {
    devServer: {
      framework: "react",
      bundler: "webpack",
    },
  },
});
