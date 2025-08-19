import { test, expect } from '@playwright/test';
import { testConfig } from '../data/testConfig';
import { EvidenceHelper } from '../helpers/evidenceHelper';

test.describe('Login Feature', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the login page
    await page.goto(`${testConfig.baseUrl}${testConfig.routes.login}`);
  });

  test('should navigate to login page successfully', async ({ page }) => {
    const evidence = new EvidenceHelper(page, 'navigate-to-login', 'login');

    await test.step('Verify login page elements are visible', async () => {
      // Verify page title
      await expect(page).toHaveTitle('Spendly');

      // Verify URL
      await expect(page).toHaveURL(`${testConfig.baseUrl}${testConfig.routes.login}`);

      // Verify login form elements
      await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
      await expect(page.getByRole('textbox', { name: 'Email' })).toBeVisible();
      await expect(page.getByRole('textbox', { name: 'Password' })).toBeVisible();
      await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Register here' })).toBeVisible();

      // Capture evidence of successful page load
      await evidence.captureStep('page-loaded', 'Login page loaded with all elements visible');
    });
  });

  test('Login Happy Path - should login successfully with valid credentials', async ({ page }) => {
    const evidence = new EvidenceHelper(page, 'happy-path-login', 'login');

    await test.step('Fill in login credentials', async () => {
      // Fill email field
      await page.getByRole('textbox', { name: 'Email' }).fill(testConfig.testCredentials.email);

      // Fill password field
      await page
        .getByRole('textbox', { name: 'Password' })
        .fill(testConfig.testCredentials.password);

      // Capture evidence of filled form
      await evidence.captureStep('form-filled', 'Login form filled with test credentials');
    });

    await test.step('Submit login form and verify redirect', async () => {
      // Click login button
      await page.getByRole('button', { name: 'Login' }).click();

      // Wait for navigation to groups page
      await expect(page).toHaveURL(`${testConfig.baseUrl}${testConfig.routes.groups}`);

      // Verify we're on the groups page by checking for navigation elements
      await expect(page.getByRole('button', { name: 'Groups' })).toBeVisible();
      await expect(page.getByRole('button', { name: 'Account' })).toBeVisible();

      // Capture evidence of successful login and redirect
      await evidence.captureStep(
        'login-success',
        'Successfully logged in and redirected to groups page'
      );
    });
  });

  test('should show password toggle functionality', async ({ page }) => {
    const evidence = new EvidenceHelper(page, 'password-toggle', 'login');

    await test.step('Verify password toggle button works', async () => {
      const passwordInput = page.getByRole('textbox', { name: 'Password' });
      const toggleButton = page.getByRole('button', { name: /Toggle password/ });

      // Fill password field
      await passwordInput.fill('testpassword');

      // Verify toggle button is visible
      await expect(toggleButton).toBeVisible();

      // Click toggle button (this would change password visibility)
      await toggleButton.click();

      // Capture evidence of toggle functionality
      await evidence.captureStep('toggle-clicked', 'Password toggle button clicked successfully');
    });
  });

  test('should have register link pointing to correct page', async ({ page }) => {
    const evidence = new EvidenceHelper(page, 'register-link', 'login');

    await test.step('Verify register link navigation', async () => {
      const registerLink = page.getByRole('link', { name: 'Register here' });

      // Verify link is visible and has correct href
      await expect(registerLink).toBeVisible();
      await expect(registerLink).toHaveAttribute('href', testConfig.routes.register);

      // Capture evidence of register link
      await evidence.captureStep(
        'register-link-verified',
        'Register link is visible and points to correct page'
      );
    });
  });
});
