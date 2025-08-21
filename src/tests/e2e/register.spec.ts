import { expect, test } from '@playwright/test';
import { testConfig } from '../../data/testConfig';
import { EvidenceHelper } from '../../helpers/evidenceHelper';

test.describe('Register Feature', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the register page
    await page.goto(`${testConfig.baseUrl}${testConfig.routes.register}`);
  });

  test('should navigate between register and login pages using navigation arrows and links', async ({
    page,
  }) => {
    const evidence = new EvidenceHelper(page, 'navigate-register-login-flow', 'register');

    await test.step('1. Click on the back arrow in register page', async () => {
      // Click the back arrow (flecha) in the top left
      await page.getByRole('button', { name: 'register.back' }).click();

      // Capture evidence of clicking the back arrow
      await evidence.captureStep('clicked-back-arrow', 'Clicked back arrow from register page');
    });

    await test.step('2. Verify redirection to login URL', async () => {
      // Verify we're redirected to login page
      await expect(page).toHaveURL(`${testConfig.baseUrl}${testConfig.routes.login}`);

      // Verify login page elements are visible
      await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();

      // Capture evidence of successful redirection to login
      await evidence.captureStep('redirected-to-login', 'Successfully redirected to login page');
    });

    await test.step('3. Click on "Register here" link in login page', async () => {
      // Click the "Register here" link
      await page.getByRole('link', { name: 'Register here' }).click();

      // Capture evidence of clicking register link
      await evidence.captureStep(
        'clicked-register-link',
        'Clicked "Register here" link from login page'
      );
    });

    await test.step('4. Verify we are back to register URL', async () => {
      // Verify we're back to register page
      await expect(page).toHaveURL(`${testConfig.baseUrl}${testConfig.routes.register}`);

      // Verify register page elements are visible
      await expect(page.getByRole('heading', { name: 'Register' })).toBeVisible();
      await expect(page.getByRole('textbox', { name: 'Name' })).toBeVisible();
      await expect(page.getByRole('textbox', { name: 'Email' })).toBeVisible();
      await expect(page.getByRole('textbox', { name: 'Password' })).toBeVisible();

      // Capture evidence of successful return to register page
      await evidence.captureStep(
        'back-to-register',
        'Successfully navigated back to register page'
      );
    });
  });

  test('should validate required fields when submitting empty form', async ({ page }) => {
    const evidence = new EvidenceHelper(page, 'validate-required-fields', 'register');

    await test.step('1. Click Register button with empty form', async () => {
      // Click the Register button without filling any fields
      // await page.locator('button[type="submit"]').click();

      await page.getByRole('button', { name: /Register/ }).click();

      // Capture evidence of clicking register with empty form
      await evidence.captureStep(
        'clicked-register-empty',
        'Clicked Register button with empty form'
      );
    });

    await test.step('2. Verify validation message appears', async () => {
      // Verify that the validation message appears below the button
      await expect(page.getByText('Please complete all fields correctly.')).toBeVisible();

      // Capture evidence of validation message shown
      await evidence.captureStep(
        'validation-message-displayed',
        'Validation message displayed for empty form'
      );
    });
  });

  test('should show individual field validation messages when submitting empty form', async ({
    page,
  }) => {
    const evidence = new EvidenceHelper(page, 'individual-field-validation', 'register');

    await test.step('1. Click Register button with empty form', async () => {
      // Click the Register button without filling any fields
      await page.locator('button[type="submit"]').click();

      // Capture evidence of clicking register with empty form
      await evidence.captureStep(
        'clicked-register-for-field-validation',
        'Clicked Register button to trigger individual field validation'
      );
    });

    await test.step('2. Verify individual field validation messages appear', async () => {
      // Verify Name field validation message
      await expect(page.getByText('Name is required')).toBeVisible();

      // Verify Email field validation message
      await expect(page.getByText('Email is required')).toBeVisible();

      // Verify Password field validation message
      await expect(page.getByText('Password is required')).toBeVisible();

      // Capture evidence of individual field validation messages
      await evidence.captureStep(
        'individual-field-messages-displayed',
        'Individual validation messages displayed for each required field'
      );
    });
  });

  test('should treat whitespace-only fields as empty and show validation messages', async ({
    page,
  }) => {
    const evidence = new EvidenceHelper(page, 'whitespace-validation', 'register');

    await test.step('1. Navigate to register URL', async () => {
      // We're already on register page from beforeEach, just verify
      await expect(page).toHaveURL(`${testConfig.baseUrl}${testConfig.routes.register}`);

      // Capture evidence of being on register page
      await evidence.captureStep(
        'on-register-page',
        'On register page ready to test whitespace validation'
      );
    });

    await test.step('2. Fill Name field with whitespace only', async () => {
      // Fill Name field with spaces only
      await page.getByRole('textbox', { name: 'Name' }).fill('   ');

      // Capture evidence of Name field filled with spaces
      await evidence.captureStep('name-field-whitespace', 'Name field filled with whitespace only');
    });

    await test.step('3. Fill Email field with whitespace only', async () => {
      // Fill Email field with spaces only
      await page.getByRole('textbox', { name: 'Email' }).fill('   ');

      // Capture evidence of Email field filled with spaces
      await evidence.captureStep(
        'email-field-whitespace',
        'Email field filled with whitespace only'
      );
    });

    await test.step('4. Fill Password field with whitespace only', async () => {
      // Fill Password field with spaces only
      await page.getByRole('textbox', { name: 'Password' }).fill('   ');

      // Capture evidence of Password field filled with spaces
      await evidence.captureStep(
        'password-field-whitespace',
        'Password field filled with whitespace only'
      );
    });

    await test.step('5. Click Register button', async () => {
      // Click the Register button
      await page.locator('button[type="submit"]').click();

      // Capture evidence of clicking register with whitespace-only fields
      await evidence.captureStep(
        'clicked-register-whitespace',
        'Clicked Register button with whitespace-only fields'
      );
    });

    await test.step('6. Verify validation messages appear for whitespace-only fields', async () => {
      // Verify Name field validation message appears
      await expect(page.getByText('Name is required')).toBeVisible();

      // Verify Email field validation message appears
      await expect(page.getByText('Email is required')).toBeVisible();

      // Verify Password field validation message appears
      await expect(page.getByText('Password is required')).toBeVisible();

      // Capture evidence of validation messages for whitespace-only fields
      await evidence.captureStep(
        'whitespace-validation-messages',
        'Validation messages displayed for whitespace-only fields treated as empty'
      );
    });
  });

  test('should toggle password visibility correctly', async ({ page }) => {
    const evidence = new EvidenceHelper(page, 'password-toggle', 'register');

    await test.step('1. Fill Password field with test password', async () => {
      // Fill Password field with "123456"
      await page.getByRole('textbox', { name: 'Password' }).fill('123456');

      // Verify the password was filled correctly
      await expect(page.getByRole('textbox', { name: 'Password' })).toHaveValue('123456');

      // Capture evidence of password filled
      await evidence.captureStep('password-filled', 'Password field filled with "123456"');
    });

    await test.step('2. Click eye icon to hide password and verify it is hidden', async () => {
      const passwordInput = page.getByRole('textbox', { name: 'Password' });
      const toggleButton = page.getByRole('button', { name: 'register.togglePasswordVisibility' });

      // Initially password should be visible (type="text" or type="password")
      // Click the eye icon to toggle
      await toggleButton.click();

      // Verify the password is now hidden (input type should be "password")
      await expect(passwordInput).toHaveAttribute('type', 'password');

      // Verify the eye icon is now "tachado" (crossed out) - visibility_off
      const toggleIcon = toggleButton.locator('img');
      await expect(toggleIcon).toHaveAttribute('alt', 'visibility_off');

      // Verify button is in pressed state
      await expect(toggleButton).toHaveAttribute('aria-pressed', 'true');

      // Verify password value is still there but hidden
      await expect(passwordInput).toHaveValue('123456');

      // Capture evidence of password now hidden with crossed eye
      await evidence.captureStep(
        'password-hidden-eye-crossed',
        'Password hidden with crossed eye icon (visibility_off)'
      );
    });

    await test.step('3. Click eye icon again to show password and verify it is visible', async () => {
      const passwordInput = page.getByRole('textbox', { name: 'Password' });
      const toggleButton = page.getByRole('button', { name: 'register.togglePasswordVisibility' });

      // Click the eye icon again to show password
      await toggleButton.click();

      // Verify the password is now visible (input type should be "text")
      await expect(passwordInput).toHaveAttribute('type', 'text');

      // Verify the eye icon is now NOT crossed out - visibility
      const toggleIcon = toggleButton.locator('img');
      await expect(toggleIcon).toHaveAttribute('alt', 'visibility');

      // Verify button is not in pressed state
      await expect(toggleButton).toHaveAttribute('aria-pressed', 'false');

      // Verify password value is still there and visible
      await expect(passwordInput).toHaveValue('123456');

      // Capture evidence of password now visible with normal eye
      await evidence.captureStep(
        'password-visible-eye-normal',
        'Password visible with normal eye icon (visibility)'
      );
    });
  });

  test('should show minimum password length validation message', async ({ page }) => {
    const evidence = new EvidenceHelper(page, 'password-minimum-validation', 'register');

    await test.step('1. Enter short password (123) in password field', async () => {
      // Locate the password field and enter a short password
      const passwordInput = page.getByRole('textbox', { name: 'Password' });
      await passwordInput.fill('123');

      // Capture evidence of short password entered
      await evidence.captureStep('short-password-entered', 'Short password "123" entered');
    });

    await test.step('2. Click register button to trigger validation', async () => {
      // Set up dialog handler before clicking register
      page.on('dialog', async dialog => {
        await dialog.accept();
      });

      // Click the register button to trigger validation
      await page.getByRole('button', { name: 'Register', exact: true }).click();

      // Capture evidence of register button clicked
      await evidence.captureStep('register-button-clicked', 'Register button clicked');
    });

    await test.step('3. Verify minimum characters validation message appears below Password field', async () => {
      // Verify the validation message appears below the password field
      await expect(page.getByText('Minimum 6 characters')).toBeVisible();

      // Capture evidence of validation message displayed
      await evidence.captureStep(
        'validation-message-visible',
        'Minimum 6 characters validation message is displayed below Password field'
      );
    });
  });

  // Los tests adicionales se agregarán aquí paso a paso
});
