import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173',  // your dev server URL
    supportFile: 'test/e2e/support.e2e.ts', // adjust if needed
    specPattern: 'test/e2e/**/*.e2e.ts',
  },
});
