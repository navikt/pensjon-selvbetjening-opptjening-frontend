const { defineConfig } = require("cypress");
const {
  addMatchImageSnapshotPlugin,
} = require("cypress-image-snapshot/plugin");

const viewportWidth = 1000;
const viewportHeight = 660;

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://127.0.0.1:3000",
    specPattern: "cypress/integration/**/*.{js,jsx,ts,tsx}",
    supportFile: "cypress/support/index.js",
    setupNodeEvents(on, config) {
      on("before:browser:launch", (browser = {}, launchOptions) => {
        if (browser.family === "chromium") {
          launchOptions.args.push(
            `--window-size=${viewportWidth},${viewportHeight}`,
          );
          launchOptions.args.push("--force-device-scale-factor=1");
          launchOptions.args.push("--high-dpi-support=1");
        }

        return launchOptions;
      });

      addMatchImageSnapshotPlugin(on, config);
      on("task", {
        failed: require("cypress-failed-log/src/failed")(),
      });

      return config;
    },
  },
  viewportWidth,
  viewportHeight,
  chromeWebSecurity: false,
  video: false,
});
