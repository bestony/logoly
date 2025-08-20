# Continuous Integration (CI) Documentation

This document describes the automated CI/CD setup for the Logoly project.

## GitHub Actions Workflows

### 1. CI Workflow (`.github/workflows/ci.yml`)

**Triggers:**
- Push to `main` or `master` branches
- Pull requests to `main` or `master` branches

**Jobs:**

#### Test Job
- **Matrix Strategy**: Tests on Node.js versions 18 and 20
- **Steps:**
  1. Checkout code
  2. Setup Node.js with npm caching
  3. Install dependencies (`npm ci`)
  4. Run tests (`npm run test:run`)
  5. Build project (`npm run build`)

#### Test Coverage Job
- **Environment**: Node.js 20
- **Steps:**
  1. Checkout code
  2. Setup Node.js with npm caching
  3. Install dependencies (`npm ci`)
  4. Run tests with coverage (`npm run test:run -- --coverage`)
  5. Upload coverage to Codecov

### 2. Dependency Review (`.github/workflows/dependency-review.yml`)

**Triggers:**
- Pull requests to `main` or `master` branches

**Purpose:**
- Reviews dependency changes for security vulnerabilities
- Fails on moderate or higher severity issues
- Allows common open-source licenses (MIT, Apache-2.0, BSD variants, ISC)

### 3. CodeQL Security Analysis (`.github/workflows/codeql.yml`)

**Triggers:**
- Push to `main` or `master` branches
- Pull requests to `main` or `master` branches
- Scheduled runs (weekly on Mondays at 2 AM)

**Purpose:**
- Static code analysis for security vulnerabilities
- JavaScript/TypeScript language analysis
- Results available in GitHub Security tab

## Test Commands

The project includes several test-related npm scripts:

```bash
# Run tests in watch mode (development)
npm test

# Run tests once (CI)
npm run test:run

# Run tests with coverage
npm run test:coverage

# Run tests with UI (development)
npm run test:ui
```

## Coverage Reporting

- **Provider**: Vitest with v8 coverage
- **Reporters**: Text (console), LCOV (codecov), HTML (local viewing)
- **Upload**: Automatically uploaded to Codecov on CI runs
- **Exclusions**: node_modules, dist, coverage, test files

## Test Structure

The test suite includes:
- **23 total tests** across 6 test files
- **Store tests**: Pinia state management (4 tests)
- **Component tests**: Vue components (12 tests)
- **Router tests**: Vue Router configuration (3 tests)
- **Generator tests**: Logo generators (4 tests)

## Security Features

1. **Dependency scanning**: Reviews new dependencies for vulnerabilities
2. **Code scanning**: Static analysis with CodeQL
3. **License checking**: Ensures only approved licenses are used
4. **Automated security updates**: Via Dependabot (existing)

## Coverage Targets

Current coverage includes:
- Store functionality: 100%
- Tested components: High coverage on business logic
- Router configuration: 66.66%
- Overall: 33.44% (room for improvement in untested components)

## Local Development

To run the same checks locally:

```bash
# Install dependencies
npm ci

# Run tests
npm run test:run

# Generate coverage report
npm run test:coverage

# Build project
npm run build
```

## CI Status

All workflows must pass for pull requests to be merged:
- ✅ Tests pass on Node.js 18 & 20
- ✅ Build succeeds
- ✅ No high-severity dependency vulnerabilities
- ✅ CodeQL security analysis passes