# Playwright + Cucumber BDD Example

## How to run the BDD test

1. Install dependencies (if not already):
   ```bash
   npm install
   ```
2. Run the Cucumber test:
   ```bash
   npx cucumber-js
   ```

## Files added
- `features/homepage.feature`: Gherkin feature file
- `features/step-definitions/homepage.steps.ts`: Step definitions using Playwright
- `cucumber.js`: Cucumber config for TypeScript

## Example scenario
- Opens the Magento home page and checks the page title.
