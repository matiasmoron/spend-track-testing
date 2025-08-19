import { expect, test } from '@playwright/test';
import { testConfig } from '../../data/testConfig';
import { EvidenceHelper } from '../../helpers/evidenceHelper';

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

  test('should toggle password visibility correctly', async ({ page }) => {
    const evidence = new EvidenceHelper(page, 'password-toggle', 'login');

    await test.step('Enter password text', async () => {
      const passwordInput = page.getByRole('textbox', { name: 'Password' });
      await passwordInput.fill('testpassword123');
      await expect(passwordInput).toHaveValue('testpassword123');

      // Capture evidence of password filled
      await evidence.captureStep('password-filled', 'Password field filled with test data');
    });

    await test.step('Verify password is initially hidden', async () => {
      const passwordInput = page.getByRole('textbox', { name: 'Password' });
      const toggleButton = page.getByRole('button', { name: 'Toggle password visibility' });

      // Verify input type is password (hidden)
      await expect(passwordInput).toHaveAttribute('type', 'password');

      // Verify toggle button shows "visibility_off" icon (eye with slash = password hidden)
      // This should show visibility_off when password is hidden, but app shows visibility (BUG)
      await expect(toggleButton).toContainText('visibility_off');

      // Verify button is not in pressed state
      await expect(toggleButton).toHaveAttribute('aria-pressed', 'false');

      // Capture evidence of initial hidden state
      await evidence.captureStep(
        'password-hidden-initial',
        'Password is initially hidden - expecting visibility_off icon'
      );
    });

    await test.step('Click toggle to show password', async () => {
      const passwordInput = page.getByRole('textbox', { name: 'Password' });
      const toggleButton = page.getByRole('button', { name: 'Toggle password visibility' });

      await toggleButton.click();

      // Verify input type changed to text (visible)
      await expect(passwordInput).toHaveAttribute('type', 'text');

      // Verify toggle button shows "visibility" icon (eye open = password visible)
      // This should show visibility when password is visible, but app shows visibility_off (BUG)
      await expect(toggleButton).toContainText('visibility');

      // Verify button is in pressed state
      await expect(toggleButton).toHaveAttribute('aria-pressed', 'true');

      // Verify password value is still there
      await expect(passwordInput).toHaveValue('testpassword123');

      // Capture evidence of password visible state
      await evidence.captureStep(
        'password-visible',
        'Password is now visible - expecting visibility icon'
      );
    });

    await test.step('Click toggle again to hide password', async () => {
      const passwordInput = page.getByRole('textbox', { name: 'Password' });
      const toggleButton = page.getByRole('button', { name: 'Toggle password visibility' });

      await toggleButton.click();

      // Verify input type changed back to password (hidden)
      await expect(passwordInput).toHaveAttribute('type', 'password');

      // Verify toggle button shows "visibility_off" icon again (eye with slash = password hidden)
      // This should show visibility_off when password is hidden, but app shows visibility (BUG)
      await expect(toggleButton).toContainText('visibility_off');

      // Verify button is not in pressed state
      await expect(toggleButton).toHaveAttribute('aria-pressed', 'false');

      // Verify password value is preserved
      await expect(passwordInput).toHaveValue('testpassword123');

      // Capture evidence of password hidden again
      await evidence.captureStep(
        'password-hidden-again',
        'Password is hidden again - expecting visibility_off icon'
      );
    });
  });

  test('should preserve password value during multiple visibility toggles', async ({ page }) => {
    const evidence = new EvidenceHelper(page, 'password-preservation', 'login');

    await test.step('Test password preservation through multiple toggles', async () => {
      const passwordInput = page.getByRole('textbox', { name: 'Password' });
      const toggleButton = page.getByRole('button', { name: 'Toggle password visibility' });
      const testPassword = 'mySecurePassword123!';

      await passwordInput.fill(testPassword);

      // Initial state - password hidden
      await expect(passwordInput).toHaveAttribute('type', 'password');
      await expect(passwordInput).toHaveValue(testPassword);

      // Show password
      await toggleButton.click();
      await expect(passwordInput).toHaveAttribute('type', 'text');
      await expect(passwordInput).toHaveValue(testPassword);

      // Hide password again
      await toggleButton.click();
      await expect(passwordInput).toHaveAttribute('type', 'password');
      await expect(passwordInput).toHaveValue(testPassword);

      // Show password one more time
      await toggleButton.click();
      await expect(passwordInput).toHaveAttribute('type', 'text');
      await expect(passwordInput).toHaveValue(testPassword);

      // Capture evidence of successful preservation
      await evidence.captureStep(
        'value-preserved',
        'Password value preserved through multiple toggles'
      );
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
