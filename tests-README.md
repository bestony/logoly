# Tests for Logoly

This directory contains unit tests for the Logoly Vue.js application.

## Test Structure

### Store Tests (`src/stores/__tests__/`)
- **store.test.js**: Tests for the Pinia store that manages application state
  - Tests initial state values
  - Tests prefix and suffix update methods
  - Verifies state independence

### Component Tests (`src/components/__tests__/`)
- **FontSelector.test.js**: Tests for the font selection component
  - Renders correctly
  - Contains expected font options
  - Uses store values correctly
  
- **ExportBtn.test.js**: Tests for the export functionality
  - Tests mocked dependencies (dom-to-image, vue-gtag)
  - Verifies required dependencies are available

### Generator Tests (`src/components/generator/__tests__/`)
- **Pornhub.test.js**: Tests for the Pornhub-style logo generator
  - Component rendering
  - Store integration
  - Initial values
  - Computed properties
  - Twitter sharing functionality

### Router Tests (`src/router/__tests__/`)
- **index.test.js**: Tests for Vue Router configuration
  - Route definitions
  - Route names
  - Analytics meta configuration

## Running Tests

```bash
# Run tests once
npm run test:run

# Run tests in watch mode
npm test

# Run tests with UI
npm run test:ui
```

## Test Coverage

The tests cover the core functionality of the application:
- ✅ State management (Pinia store)
- ✅ Component rendering and behavior
- ✅ Router configuration
- ✅ Key computed properties and methods

## Testing Approach

- Uses **Vitest** as the test runner (optimized for Vite projects)
- Uses **Vue Test Utils** for component testing
- Mocks external dependencies (Vuetify, dom-to-image, etc.) to focus on business logic
- Tests are isolated and don't depend on each other
- Each test file focuses on a specific module/component