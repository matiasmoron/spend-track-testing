---
mode: agent
description: 'Generate a Playwright test based on a scenario using Playwright MCP'
tools: ['changes', 'codebase', 'editFiles', 'fetch', 'findTestFiles', 'problems', 'runCommands', 'runTasks', 'runTests', 'search', 'searchResults', 'terminalLastCommand', 'terminalSelection', 'testFailure', 'playwright']
model: 'Claude Sonnet 4'
---

# Test Generation with Playwright MCP

Your goal is to generate a Playwright test based on the provided scenario after completing all prescribed steps.

## Configuration Guidelines

Before starting test generation, review the project configuration:

1. **Test Configuration**: Check `src/data/testConfig.ts` for:
   - Application base URL and environment variables
   - Predefined routes for navigation
   - Test credentials for authentication scenarios
   - Common selectors for consistent element targeting

2. **Test Structure**: Follow the existing pattern in `src/tests/e2e/`:
   - Import and use `testConfig` from `@/data/testConfig`
   - Use `EvidenceHelper` for screenshot capture
   - Structure tests with `test.describe()` and `test.step()`
   - Follow semantic locator patterns (`getByRole`, `getByLabel`, etc.)

3. **Evidence Capture**: Use the project's evidence system:
   - Import `EvidenceHelper` from `@/helpers/evidenceHelper`
   - Capture screenshots at key test steps
   - Use descriptive step names for documentation

## Specific Instructions

- You are given a scenario, and you need to generate a playwright test for it. If the user does not provide a scenario, you will ask them to provide one.
- **FIRST STEP**: Always check `src/data/testConfig.ts` to understand:
  - Base URL for the application (`testConfig.baseUrl`)
  - Available routes (`testConfig.routes`)
  - Test credentials (`testConfig.testCredentials`)
  - Pre-defined selectors (`selectors` object if available)
- DO NOT generate test code prematurely or based solely on the scenario without completing all prescribed steps.
- DO run steps one by one using the tools provided by the Playwright MCP.
- Use the configuration from `testConfig.ts` in your generated tests for consistency
- Only after all steps are completed, emit a Playwright TypeScript test that uses `@playwright/test` based on message history
- Save generated test file in the `src/tests/e2e/` directory
- Execute the test file and iterate until the test passes
