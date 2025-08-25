import { expect, test } from '@playwright/test';
import { testConfig } from '../../data/testConfig';
import { EvidenceHelper } from '../../helpers/evidenceHelper';
import { TestDataGenerator } from '../../helpers/testDataGenerator';

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

  test('should show error message when trying to register with an email that already exists', async ({
    page,
  }) => {
    const evidence = new EvidenceHelper(page, 'email-already-registered', 'register');

    // Generate test user with existing email
    const existingEmailUser = TestDataGenerator.generateExistingEmailTestUser();

    await test.step('1. Fill Name field with realistic name', async () => {
      // Fill Name field with realistic name from Faker
      await page.getByRole('textbox', { name: 'Name' }).fill(existingEmailUser.name);

      // Capture evidence of Name field filled
      await evidence.captureStep(
        'name-field-filled',
        `Name field filled with realistic name: "${existingEmailUser.name}"`
      );
    });

    await test.step('2. Fill Email field with existing email "fedegastos@gmail.com"', async () => {
      // Fill Email field with an email that already exists in the system
      await page.getByRole('textbox', { name: 'Email' }).fill(existingEmailUser.email);

      // Capture evidence of Email field filled with existing email
      await evidence.captureStep(
        'email-field-filled-existing',
        `Email field filled with existing email "${existingEmailUser.email}"`
      );
    });

    await test.step('3. Fill Password field with generated password', async () => {
      // Fill Password field with generated password
      await page.getByRole('textbox', { name: 'Password' }).fill(existingEmailUser.password);

      // Capture evidence of Password field filled
      await evidence.captureStep(
        'password-field-filled',
        'Password field filled with generated password'
      );
    });

    await test.step('4. Click Register button', async () => {
      // Click the Register button
      await page.locator('button[type="submit"]').click();

      // Capture evidence of clicking register with existing email
      await evidence.captureStep(
        'register-button-clicked-existing-email',
        'Register button clicked with existing email'
      );
    });

    await test.step('5. Verify error message appears for existing email', async () => {
      // Verify that the error message appears
      await expect(page.getByText('The email is already registered.')).toBeVisible();

      // Capture evidence of error message displayed
      await evidence.captureStep(
        'email-already-registered-error',
        'Error message displayed: "The email is already registered."'
      );
    });

    await test.step('6. Close error dialog', async () => {
      // Click OK button to close the error dialog
      await page.getByRole('button', { name: 'OK' }).click();

      // Verify the dialog is closed and we're still on register page
      await expect(page).toHaveURL(`${testConfig.baseUrl}${testConfig.routes.register}`);

      // Capture evidence of error dialog closed
      await evidence.captureStep(
        'error-dialog-closed',
        'Error dialog closed and user remains on register page'
      );
    });
  });

  test('Register Happy Path - should register successfully with valid credentials', async ({
    page,
  }) => {
    const evidence = new EvidenceHelper(page, 'successful-registration', 'register');

    // Generate random test data using TestDataGenerator
    const testUser = TestDataGenerator.generateRegistrationTestUser();

    await test.step('1. Fill Name field with random name', async () => {
      // Fill Name field with random 10-character name
      await page.getByRole('textbox', { name: 'Name' }).fill(testUser.name);

      // Capture evidence of Name field filled
      await evidence.captureStep(
        'name-field-filled-random',
        `Name field filled with random name: "${testUser.name}"`
      );
    });

    await test.step('2. Fill Email field with random email', async () => {
      // Fill Email field with random email
      await page.getByRole('textbox', { name: 'Email' }).fill(testUser.email);

      // Capture evidence of Email field filled
      await evidence.captureStep(
        'email-field-filled-random',
        `Email field filled with random email: "${testUser.email}"`
      );
    });

    await test.step('3. Fill Password field with "1234567"', async () => {
      // Fill Password field with specified password
      await page.getByRole('textbox', { name: 'Password' }).fill(testUser.password);

      // Capture evidence of Password field filled
      await evidence.captureStep('password-field-filled', 'Password field filled with "1234567"');
    });

    await test.step('4. Click Register button', async () => {
      // Click the Register button
      await page.locator('button[type="submit"]').click();

      // Capture evidence of clicking register
      await evidence.captureStep(
        'register-button-clicked',
        'Register button clicked with valid data'
      );
    });

    await test.step('5. Verify success message appears', async () => {
      // Verify that the success message appears
      await expect(
        page.getByText('Registration successful! Redirecting to login...')
      ).toBeVisible();

      // Capture evidence of success message displayed
      await evidence.captureStep(
        'registration-success-message',
        'Success message displayed: "Registration successful! Redirecting to login..."'
      );
    });

    await test.step('6. Verify automatic redirection to login page', async () => {
      // Wait for and verify redirection to login page
      await expect(page).toHaveURL(`${testConfig.baseUrl}${testConfig.routes.login}`);

      // Verify login page elements are visible
      await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
      await expect(page.getByRole('textbox', { name: 'Email' })).toBeVisible();
      await expect(page.getByRole('textbox', { name: 'Password' })).toBeVisible();

      // Capture evidence of successful redirection
      await evidence.captureStep(
        'redirected-to-login-success',
        'Successfully redirected to login page after registration'
      );
    });
  });

  // Los tests adicionales se agregarán aquí paso a paso
});
