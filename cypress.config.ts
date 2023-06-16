const { defineConfig } = require('cypress');
const replay = require("@replayio/cypress")

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      replay.default(on, config);
      return config;
    },
  },
});