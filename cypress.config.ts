import { defineConfig } from 'cypress';
import * as replay from '@replayio/cypress';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      replay.default(on, config);
      return config;
    },
  }
});



