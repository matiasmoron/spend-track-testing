import { expect, test } from '@playwright/test';
import { testConfig } from '../../data/testConfig';
import { EvidenceHelper } from '../../helpers/evidenceHelper';

test.describe('Groups Feature', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the login page first
    await page.goto(`${testConfig.baseUrl}${testConfig.routes.login}`);

    // Login with valid credentials to access groups
    await page.getByRole('textbox', { name: 'Email' }).fill(testConfig.testCredentials.email);
    await page.getByRole('textbox', { name: 'Password' }).fill(testConfig.testCredentials.password);
    await page.getByRole('button', { name: 'Login' }).click();

    // Wait for redirect to groups page
    await expect(page).toHaveURL(`${testConfig.baseUrl}${testConfig.routes.groups}`);
  });

  test('should navigate to groups page successfully after login', async ({ page }) => {
    const evidence = new EvidenceHelper(page, 'navigate-to-groups', 'groups');

    await test.step('Verify groups page elements are visible', async () => {
      // Verify page title
      await expect(page).toHaveTitle('Spendly');

      // Verify URL
      await expect(page).toHaveURL(`${testConfig.baseUrl}${testConfig.routes.groups}`);

      // Verify main navigation elements
      await expect(page.getByRole('button', { name: 'Groups' })).toBeVisible();
      await expect(page.getByRole('button', { name: 'Account' })).toBeVisible();

      // Verify New Group button is present
      await expect(page.getByRole('button', { name: 'New Group' })).toBeVisible();

      // Capture evidence of successful page load
      await evidence.captureStep('page-loaded', 'Groups page loaded with all elements visible');
    });
  });

  test('should verify New Group button functionality and navigation', async ({ page }) => {
    const evidence = new EvidenceHelper(page, 'new-group-navigation', 'groups');

    await test.step('1. Click on New Group button (+ icon) in bottom left', async () => {
      // Verify we're on groups page
      await expect(page).toHaveURL(`${testConfig.baseUrl}${testConfig.routes.groups}`);

      // Click the New Group button with + icon
      await page.getByRole('button', { name: 'New Group' }).click();

      // Capture evidence of clicking New Group button
      await evidence.captureStep('clicked-new-group', 'Clicked New Group button with + icon');
    });

    await test.step('2. Verify redirection to /groups/new', async () => {
      // Verify redirection to new group creation page
      await expect(page).toHaveURL(`${testConfig.baseUrl}/groups/new`);

      // Verify we're on the new group form
      await expect(page.getByText('Create group')).toBeVisible();

      // Capture evidence of successful redirection
      await evidence.captureStep('redirected-to-new', 'Successfully redirected to /groups/new');
    });

    await test.step('3. Click back arrow in top left corner', async () => {
      // Click the back arrow button in top left
      await page.getByRole('button', { name: 'Back' }).click();

      // Capture evidence of clicking back arrow
      await evidence.captureStep('clicked-back-arrow', 'Clicked back arrow in top left corner');
    });

    await test.step('4. Verify return to /groups URL', async () => {
      // Verify we're back to groups page
      await expect(page).toHaveURL(`${testConfig.baseUrl}${testConfig.routes.groups}`);

      // Verify groups page elements are visible again
      await expect(page.getByRole('button', { name: 'New Group' })).toBeVisible();
      await expect(page.getByRole('button', { name: 'Groups', exact: true })).toBeVisible();

      // Capture evidence of successful return to groups page
      await evidence.captureStep('returned-to-groups', 'Successfully returned to /groups page');
    });
  });
});
