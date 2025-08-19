# Conventional Commits Guide

This project uses [Conventional Commits](https://www.conventionalcommits.org/) to ensure consistent and meaningful commit messages.

## Commit Message Format

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

## Types

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **perf**: A code change that improves performance
- **test**: Adding missing tests or correcting existing tests
- **build**: Changes that affect the build system or external dependencies
- **ci**: Changes to our CI configuration files and scripts
- **chore**: Other changes that don't modify src or test files
- **revert**: Reverts a previous commit

## Examples

### Good commit messages:

```
feat: add user authentication
fix: resolve login redirect issue
docs: update API documentation
test: add unit tests for login component
style: format code with prettier
refactor: extract user service logic
perf: optimize database queries
build: update webpack configuration
ci: add automated testing workflow
chore: update dependencies
```

### Bad commit messages:

```
Update code
Fix bug
WIP
Changes
Updated files
```

## Rules

- Subject line must be lowercase and not end with a period
- Subject line should be 100 characters or less
- Body lines should be 100 characters or less
- Use imperative mood ("add" not "added" or "adds")

## Validation

Commit messages are automatically validated using commitlint:

- Pre-commit hooks run on every commit
- Use `yarn commitlint` to manually check the last commit
- Invalid commit messages will prevent the commit from being created

## Scope (Optional)

You can add a scope to provide additional context:

```
feat(auth): add OAuth2 integration
fix(ui): resolve button alignment issue
test(login): add integration tests
```

Common scopes in this project:

- `auth`: Authentication related
- `ui`: User interface
- `api`: API related
- `test`: Test related
- `config`: Configuration changes
