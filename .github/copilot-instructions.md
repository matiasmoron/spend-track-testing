# Copilot Instructions for spend-track-testing

## Project Overview

This repository provides scalable E2E and API testing using Playwright (TypeScript) with Model Context Protocol (MCP) integration for automated test generation. The architecture emphasizes evidence collection, centralized configuration, and maintainable test patterns.

**🎯 Quality Assurance Focus**: This is a quality validation system for external applications. Test failures are expected and indicate bugs/quality issues in the target application, not framework problems.

## Architecture & Structure

- **Test Organization**: All tests in `src/tests/` with `e2e/` and `api/` subdirectories
- **Centralized Config**: `src/data/testConfig.ts` provides URLs, routes, credentials, and selectors
- **Evidence System**: `src/helpers/evidenceHelper.ts` captures organized screenshots with timestamped naming
- **MCP Integration**: `.github/prompts/playwright-generate-test.prompt.md` defines AI test generation workflow

## Critical Patterns

### Test Configuration Usage
Always import and use `testConfig` for consistency:
```typescript
import { testConfig } from '@/data/testConfig';
await page.goto(`${testConfig.baseUrl}${testConfig.routes.login}`);
```

### Evidence Collection Pattern
Every test should use `EvidenceHelper` for documentation:
```typescript
import { EvidenceHelper } from '@/helpers/evidenceHelper';
const evidence = new EvidenceHelper(page, 'test-name', 'feature');
await evidence.captureStep('step-name', 'Description');
```

### Test Structure Convention
- Use `test.describe()` for feature grouping
- Structure with `test.step()` for clear reporting
- Import pattern: `import { test, expect } from '@playwright/test';`
- File naming: `<feature>.spec.ts` in `src/tests/e2e/`

## Developer Workflows

### Essential Commands
- `yarn test` - Run all tests (configured for `src/tests/e2e/`)
- `yarn test:e2e:dev` - Development mode (headed Chrome)
- `yarn test:report` - View HTML reports with evidence
- `yarn lint:fix` - Auto-fix ESLint issues

### Quality Gates
Pre-commit hooks enforce: formatting (Prettier), type checking (TypeScript), linting (ESLint with Playwright rules)

### Test Generation Workflow
1. Check `src/data/testConfig.ts` for app config and selectors
2. Use MCP tools for exploration (`src/tests/e2e/` for final tests)
3. Follow evidence capture pattern for documentation
4. Execute and iterate until passing

## Integration Points

- **Target App**: Expense tracker at `expense-tracker-app-smoky-seven.vercel.app`
- **Evidence Storage**: `test-evidence/` with organized naming convention
- **Reporting**: HTML reports in `playwright-report/`, JUnit in `test-evidence/`
- **Browsers**: Chromium (dev), Firefox, WebKit (full suite)

## Locator Strategy

Hierarchy: `data-testid` > `getByRole/getByLabel` > CSS selectors. Predefined selectors in `testConfig.ts`:
```typescript
selectors.login.emailInput // 'textbox[name="Email"]'
selectors.login.togglePasswordButton // 'button[aria-label*="Toggle password"]'
```

## Key Files Reference

- `playwright.config.ts`: Test runner pointing to `src/tests/e2e`
- `.github/instructions/playwright-typescript.instructions.md`: Detailed authoring standards
- `src/tests/e2e/login.spec.ts`: Reference implementation with evidence capture
- `package.json`: Scripts for testing, quality, and reporting workflows

## Testing Philosophy

### Expected Test Failures
- Tests are designed to detect quality issues in external applications
- Failing tests indicate bugs in the target application, not test framework issues
- CI/CD workflows continue execution even with test failures (`continue-on-error: true`)
- All evidence is collected regardless of test outcome for quality analysis
