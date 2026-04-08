const { defineConfig } = require("cypress");
const {
  addMatchImageSnapshotPlugin,
} = require("cypress-image-snapshot/plugin");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://127.0.0.1:3000",
    specPattern: "cypress/integration/**/*.{js,jsx,ts,tsx}",
    supportFile: "cypress/support/index.js",
    setupNodeEvents(on, config) {
      addMatchImageSnapshotPlugin(on, config);
      on("task", {
        failed: require("cypress-failed-log/src/failed")(),
      });

      return config;
    },
  },
  viewportWidth: 1000,
  viewportHeight: 660,
  chromeWebSecurity: false,
  video: false,
});
