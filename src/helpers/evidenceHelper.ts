import { test, Page } from '@playwright/test';

/**
 * Evidence Helper - Manages test evidence collection
 * Captures screenshots for successful tests and organizes evidence by feature/date
 */
export class EvidenceHelper {
  private page: Page;
  private testName: string;
  private featureName: string;

  constructor(page: Page, testName: string, featureName: string) {
    this.page = page;
    this.testName = testName;
    this.featureName = featureName;
  }

  /**
   * Capture evidence for successful test steps
   * Creates organized screenshots with meaningful names
   */
  async captureSuccess(stepName: string): Promise<void> {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const sanitizedTestName = this.testName.replace(/[^a-zA-Z0-9]/g, '-');
    const sanitizedStepName = stepName.replace(/[^a-zA-Z0-9]/g, '-');

    const filename = `${this.featureName}__${sanitizedTestName}__${sanitizedStepName}__SUCCESS__${timestamp}.png`;

    await this.page.screenshot({
      path: `test-evidence/screenshots/${filename}`,
      fullPage: true,
      animations: 'disabled',
    });

    console.log(`✅ Evidence captured: ${filename}`);
  }

  /**
   * Capture evidence at key moments during test execution
   */
  async captureStep(stepName: string, description?: string): Promise<void> {
    await test.step(`📸 Capture evidence: ${stepName}`, async () => {
      await this.captureSuccess(stepName);
      if (description) {
        console.log(`📝 Step description: ${description}`);
      }
    });
  }

  /**
   * Generate a summary of test execution for evidence organization
   */
  static generateEvidenceSummary(testResults: any[]): string {
    const timestamp = new Date().toISOString();
    const summary = {
      executionTime: timestamp,
      totalTests: testResults.length,
      passed: testResults.filter(r => r.status === 'passed').length,
      failed: testResults.filter(r => r.status === 'failed').length,
      evidenceLocation: './test-evidence/',
      structure: {
        screenshots: 'Success cases and manual captures',
        videos: 'Failure cases (automatically captured)',
        traces: 'Detailed execution traces for debugging',
        reports: 'HTML and JUnit reports',
      },
    };

    return JSON.stringify(summary, null, 2);
  }
}

/**
 * Evidence configuration and naming conventions
 */
export const evidenceConfig = {
  paths: {
    screenshots: 'test-evidence/screenshots/',
    videos: 'test-evidence/videos/',
    traces: 'test-evidence/traces/',
    reports: 'test-evidence/reports/',
  },

  naming: {
    pattern: '{feature}__{testName}__{stepName}__{status}__{timestamp}',
    example: 'login__happy-path__form-submission__SUCCESS__2025-08-19T12-30-45',
  },

  retention: {
    screenshots: '30 days',
    videos: '7 days',
    traces: '7 days',
    description: 'Automatic cleanup recommended for CI/CD environments',
  },
};
