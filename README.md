# spend-track-testing

## Introduction

This repository provides a comprehensive, scalable, and maintainable solution for end-to-end (E2E) and integration testing using Playwright and TypeScript, enhanced by Model Context Protocol (MCP) servers. The project automates test generation based on defined use cases, ensuring high coverage, reliability, and maintainability with enterprise-grade tooling and best practices.

## 🚀 Features

- **Automated Test Generation** - MCP server integration for intelligent test creation
- **Comprehensive Quality Tooling** - ESLint, Prettier, TypeScript, and Husky pre-commit hooks
- **Evidence Collection** - Automated screenshots, videos, and traces for test documentation
- **VSCode Integration** - Full development environment configuration
- **Conventional Commits** - Enforced commit message standards with commitlint
- **Multi-browser Testing** - Chromium, Firefox, and WebKit support
- **Environment Configuration** - Flexible config management with .env support

## 📁 Project Structure

```text
spend-track-testing/
├── .github/
│   ├── copilot-instructions.md              # AI agent guidelines
│   ├── instructions/
│   │   └── playwright-typescript.instructions.md
│   └── prompts/
│       └── playwright-generate-test.prompt.md
├── .husky/                                   # Git hooks
│   ├── pre-commit                          # Code quality checks
│   └── commit-msg                          # Commit message validation
├── .vscode/                                 # VSCode configuration
│   ├── extensions.json                     # Recommended extensions
│   ├── settings.json                       # Workspace settings
│   ├── tasks.json                          # Development tasks
│   ├── launch.json                         # Debug configurations
│   └── README.md                           # VSCode setup guide
├── docs/
│   └── CONVENTIONAL_COMMITS.md             # Commit message guidelines
├── src/
│   ├── api-tests/                          # API test suites (future)
│   ├── e2e-tests/                          # Playwright E2E tests
│   │   └── login.spec.ts                   # Login flow tests
│   ├── helpers/                            # Test utilities
│   │   └── evidenceHelper.ts               # Evidence collection
│   └── data/                               # Test data and configuration
│       └── testConfig.ts                   # Centralized test config
├── test-evidence/                          # Test execution evidence
│   ├── screenshots/                        # Success case captures
│   ├── videos/                             # Failure recordings
│   ├── traces/                             # Debug traces
│   └── README.md                           # Evidence documentation
├── .env                                    # Environment variables
├── .prettierrc                             # Code formatting rules
├── .gitignore                              # Git exclusions
├── commitlint.config.js                   # Commit message rules
├── eslint.config.mjs                      # Linting configuration
├── playwright.config.ts                   # Playwright settings
├── package.json                           # Dependencies and scripts
└── tsconfig.json                          # TypeScript configuration
```

## 🛠️ Development Scripts

```bash
# Code Quality
yarn lint              # Run ESLint checks
yarn lint:fix           # Fix ESLint issues automatically
yarn format             # Format code with Prettier
yarn format:check       # Check code formatting
yarn type-check         # TypeScript type validation
yarn check-types        # Alias for type-check

# Testing
yarn test               # Run all Playwright tests
yarn test:e2e:dev      # Development mode (Chromium, headed)
yarn test:e2e:ui       # Interactive UI mode
yarn test:e2e:debug    # Debug mode with breakpoints
yarn test:report       # Open HTML test report

# Git & Commits
yarn commitlint        # Validate commit messages
.husky/pre-commit      # Run all quality checks
```

## 🧪 Test Evidence System

Automated evidence collection for comprehensive test documentation:

### Evidence Types

- **Screenshots** - Success cases with descriptive names
- **Videos** - Failure cases for detailed analysis (1280x720)
- **Traces** - Detailed execution traces for debugging
- **Reports** - HTML and JUnit format reports

### Naming Convention

```
{feature}__{testName}__{stepName}__{status}__{timestamp}
```

**Example:**

```
login__happy-path-login__form-filled__SUCCESS__2025-08-19T12-30-45-123Z.png
```

### Usage

```typescript
import { EvidenceHelper } from '../helpers/evidenceHelper';

const evidence = new EvidenceHelper(page, 'test-name', 'feature');
await evidence.captureStep('step-name', 'Description of what happened');
```

## ⚙️ Configuration

### Environment Variables (.env)

```bash
APP_URL=https://expense-tracker-app-smoky-seven.vercel.app
TEST_EMAIL=fedegastos@gmail.com
TEST_PASSWORD=supersegura123
```

### Test Configuration (src/data/testConfig.ts)

- Centralized URL and route management
- Environment variable integration
- Reusable selector definitions
- Test credential management

## 🔧 Quality Assurance

### Pre-commit Hooks

Automatically run before each commit:

1. **Code Formatting** - Prettier formatting check
2. **Type Checking** - TypeScript validation
3. **Linting** - ESLint code quality checks

### Commit Message Standards

Enforced conventional commit format:

```
type(scope): description

feat: add user authentication
```

## 🚀 Deployment & CI/CD

### Automated Test Reports

Test reports are automatically deployed to Vercel on every push and pull request:

- **Live Reports**: Available at your Vercel deployment URL
- **Automatic Generation**: Tests run in GitHub Actions
- **Evidence Collection**: Screenshots, videos, and traces included
- **PR Comments**: Results posted as comments on pull requests

### Manual Deployment

```bash
# Prepare and deploy reports manually
./scripts/deploy-reports.sh --deploy

# Or step by step
yarn build:reports
yarn deploy:reports
```

### Vercel Setup

1. Install Vercel CLI: `npm i -g vercel`
2. Link project: `vercel link`
3. Set environment variables in Vercel dashboard
4. Add `VERCEL_TOKEN` to GitHub repository secrets

### GitHub Actions

The CI/CD pipeline (`test-and-deploy.yml`) automatically:

1. Runs code quality checks (lint, format, type-check)
2. Executes E2E tests with evidence collection
3. Uploads test artifacts
4. Deploys HTML reports to Vercel
5. Comments results on pull requests

## 💻 Development Environment
fix: resolve login redirect issue
docs: update API documentation
test: add integration tests
```

### Code Quality Tools

- **ESLint** - Code linting with TypeScript and Playwright rules
- **Prettier** - Consistent code formatting
- **Husky** - Git hook management
- **Commitlint** - Commit message validation

## 🖥️ VSCode Integration

### Recommended Extensions

- TypeScript & Playwright support
- ESLint & Prettier integration
- GitLens & Conventional Commits
- Markdown tools & productivity extensions

### Features

- Format on save
- Auto-fix ESLint issues
- Organize imports
- File nesting
- Debug configurations
- Task runner integration

## 🎯 Testing Strategy

### E2E Testing with Playwright

- **Multi-browser** - Chromium, Firefox, WebKit
- **Resilient selectors** - data-testid preferred, fallback to role-based
- **Auto-waiting** - Built-in wait mechanisms
- **Evidence collection** - Screenshots and videos
- **Parallel execution** - Faster test runs

### Test Organization

- Feature-based test files (`login.spec.ts`)
- Descriptive test and step titles
- Reusable helper functions
- Centralized configuration

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Yarn package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/matiasmoron/spend-track-testing.git
cd spend-track-testing

# Install dependencies
yarn install

# Install Playwright browsers
npx playwright install

# Run tests in development mode
yarn test:e2e:dev
```

### First Test Run

```bash
# Run all tests
yarn test

# Run in development mode (visible browser)
yarn test:e2e:dev

# View test report
yarn test:report
```

## 📚 Documentation

- **[Conventional Commits Guide](docs/CONVENTIONAL_COMMITS.md)** - Commit message standards
- **[Test Evidence Documentation](test-evidence/README.md)** - Evidence collection guide
- **[VSCode Setup Guide](.vscode/README.md)** - Development environment
- **[Playwright Instructions](.github/instructions/playwright-typescript.instructions.md)** - Test writing guidelines

## 🤝 Contributing

1. **Setup** - Follow VSCode configuration for optimal experience
2. **Code Quality** - All checks must pass before commit
3. **Commit Messages** - Use conventional commit format
4. **Testing** - Ensure tests pass in all browsers
5. **Evidence** - Capture evidence for new test scenarios

## 🔄 CI/CD Integration

The project is ready for CI/CD integration with:

- **Pre-commit hooks** for local validation
- **Evidence collection** for test documentation
- **Multiple output formats** (HTML, JUnit)
- **Configurable browser selection**
- **Environment variable support**

---

This comprehensive testing framework ensures robust, maintainable, and scalable test automation that grows with your application.
