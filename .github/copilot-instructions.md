# Copilot Instructions for spend-track-testing

## Project Overview

This repository is designed for scalable, maintainable E2E and integration testing using Playwright (TypeScript) and Model Context Protocol (MCP) servers. The goal is to automate robust test suite generation based on use cases, with a focus on high coverage and reliability.

## Architecture & Structure

- **E2E Tests**: Located in `src/e2e-tests/`, written in Playwright/TypeScript. Follows modular, feature-based organization.
- **API Tests**: Reserved for `src/api-tests/` (future use). Prefer Jest/Supertest for API, Playwright for browser-based scenarios.
- **Helpers**: Shared utilities/fixtures in `src/helpers/`.
- **Test Data**: Mocks and scenario data in `src/data/`.
- **Config Files**: `playwright.config.ts` (test runner config), `eslint.config.mjs` (linting), `tsconfig.json` (TypeScript).
- **Test Standards**: See `.github/instructions/playwright-typescript.instructions.md` for detailed test authoring guidelines.

## Key Conventions & Patterns

- **Locators**: Always prefer `data-testid` attributes. If unavailable, use resilient user-facing selectors (`getByRole`, `getByLabel`, etc.).
- **Assertions**: Use Playwright's auto-retrying web-first assertions (e.g., `await expect(locator).toHaveText()`).
- **Test Grouping**: Use `test.describe()` for feature grouping, `beforeEach` for setup.
- **Naming**: Test files should follow `<feature-or-page>.spec.ts` and reside in `src/e2e-tests/`.
- **Linting**: Run `yarn lint` or `npm run lint` to check code quality. ESLint rules enforce Playwright and TypeScript best practices.
- **Test Execution**: Run E2E tests with `npx playwright test --project=chromium` (see config for other browsers).
- **Reporting**: HTML reports are generated in `playwright-report/`.
- **Trace/Screenshot/Video**: Enabled for failures (see `playwright.config.ts`).

## Developer Workflows

- **Add new E2E test**: Place in `src/e2e-tests/`, follow Playwright/TypeScript conventions, reference `.github/instructions/playwright-typescript.instructions.md`.
- **Lint**: `yarn lint` or `npm run lint`.
- **Run tests**: `npx playwright test` (optionally specify browser/project).
- **Debug**: Use Playwright's built-in trace viewer and HTML report.

## Integration Points

- **MCP Server**: Used for automated test generation (see README for context).
- **Playwright**: Main E2E test framework.
- **TypeScript**: All test and helper code is strongly typed.

## Example: Minimal E2E Test

```typescript
import { test, expect } from '@playwright/test';

test.describe('Login Feature', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://your-app-url');
  });

  test('should log in with valid credentials', async ({ page }) => {
    await page.getByTestId('username-input').fill('user');
    await page.getByTestId('password-input').fill('pass');
    await page.getByTestId('login-button').click();
    await expect(page.getByTestId('dashboard')).toBeVisible();
  });
});
```

## References

- `.github/instructions/playwright-typescript.instructions.md`: Test authoring standards
- `playwright.config.ts`: Runner config and browser settings
- `eslint.config.mjs`: Linting rules
- `README.md`: Project overview and rationale

---

If any section is unclear or missing, please provide feedback to improve these instructions.
