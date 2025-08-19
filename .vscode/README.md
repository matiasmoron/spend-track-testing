# VSCode Configuration

This project includes comprehensive VSCode configuration for an optimal development experience.

## Recommended Extensions

When you open this project in VSCode, you'll be prompted to install the recommended extensions. These extensions provide:

### Essential Extensions

- **TypeScript** - Enhanced TypeScript support
- **Playwright** - Test runner integration and debugging
- **ESLint** - Real-time linting
- **Prettier** - Code formatting
- **GitLens** - Enhanced Git capabilities
- **Conventional Commits** - Commit message assistance

### Productivity Extensions

- **Markdown All in One** - Enhanced markdown editing
- **Path Intellisense** - Auto-complete for file paths
- **Todo Tree** - Track TODO comments
- **Code Spell Checker** - Catch typos

## Workspace Settings

The project includes pre-configured settings for:

- **Format on Save** - Automatically format code when saving
- **Auto-fix ESLint** - Fix linting issues on save
- **Organize Imports** - Sort and remove unused imports
- **File Nesting** - Group related files together
- **Excluded Folders** - Hide build artifacts and test evidence

## Tasks

Use `Cmd+Shift+P` → "Tasks: Run Task" to access these quick actions:

- **Format Code** - Run Prettier formatting
- **Check Formatting** - Verify code formatting
- **Lint Code** - Check for linting errors
- **Fix Lint Issues** - Auto-fix linting problems
- **Type Check** - Validate TypeScript types
- **Run E2E Tests (Dev)** - Run tests in development mode
- **Run E2E Tests (All Browsers)** - Run full test suite
- **Open Test Report** - View test results
- **Pre-commit Checks** - Run all quality checks
- **Install Dependencies** - Install/update packages

## Debug Configurations

Use `F5` or the Debug panel to run these configurations:

- **Debug Playwright Tests** - Debug all tests with breakpoints
- **Debug Current Playwright Test** - Debug the currently open test file
- **Run Playwright Test (Chromium Headed)** - Run current test visibly
- **Debug TypeScript** - Debug any TypeScript file

## Keyboard Shortcuts

| Action                | Shortcut                |
| --------------------- | ----------------------- |
| Format Document       | `Shift+Alt+F`           |
| Quick Fix             | `Cmd+.`                 |
| Go to Definition      | `F12`                   |
| Find References       | `Shift+F12`             |
| Rename Symbol         | `F2`                    |
| Run Task              | `Cmd+Shift+P` → "Tasks" |
| Open Terminal         | `Ctrl+\``               |
| Toggle Problems Panel | `Cmd+Shift+M`           |

## File Organization

The workspace is configured to:

- Nest related files (e.g., `login.spec.ts` under `login.ts`)
- Hide build artifacts and test evidence
- Group package files together
- Show test files alongside source files

## Git Integration

GitLens provides:

- Inline blame annotations
- File history
- Commit details
- Branch comparison

Conventional Commits extension helps with:

- Structured commit messages
- Type and scope suggestions
- Validation before commit

## Settings Sync

To share these settings across machines:

1. Enable Settings Sync in VSCode
2. Sign in with GitHub/Microsoft account
3. Select what to sync (Settings, Extensions, etc.)

## Troubleshooting

### Extensions not loading
- Restart VSCode
- Check Extensions tab for any errors
- Ensure all recommended extensions are installed

### Formatting not working
- Check that Prettier extension is installed
- Verify `.prettierrc` file exists
- Check file associations in settings

### Debugging not working
- Ensure TypeScript and Playwright extensions are installed
- Check that dependencies are installed (`yarn install`)
- Verify launch configurations in `.vscode/launch.json`

### Tasks not appearing
- Check `.vscode/tasks.json` exists
- Reload window: `Cmd+Shift+P` → "Developer: Reload Window"
- Verify yarn/npm is available in terminal
