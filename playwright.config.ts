import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './src/e2e-tests',
  timeout: 30000,
  expect: {
    timeout: 5000,
  },
  fullyParallel: true,
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report' }],
    ['junit', { outputFile: 'test-evidence/junit-results.xml' }],
  ],
  use: {
    // Trace settings - more detailed for better debugging
    trace: 'on-first-retry',

    // Screenshot settings - capture on both success and failure
    screenshot: {
      mode: 'only-on-failure',
      fullPage: true,
    },

    // Video settings - capture on failure for detailed analysis
    video: {
      mode: 'retain-on-failure',
      size: { width: 1280, height: 720 },
    },
  },

  // Output directories for evidence
  outputDir: 'test-evidence',

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        // Custom screenshot path for success cases
        screenshot: {
          mode: 'only-on-failure',
          fullPage: true,
        },
        video: {
          mode: 'retain-on-failure',
          size: { width: 1280, height: 720 },
        },
      },
    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        screenshot: {
          mode: 'only-on-failure',
          fullPage: true,
        },
        video: {
          mode: 'retain-on-failure',
          size: { width: 1280, height: 720 },
        },
      },
    },
    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
        screenshot: {
          mode: 'only-on-failure',
          fullPage: true,
        },
        video: {
          mode: 'retain-on-failure',
          size: { width: 1280, height: 720 },
        },
      },
    },
  ],
});
