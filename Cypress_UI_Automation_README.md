# Cypress UI Automation

End-to-end web automation framework built with [Cypress](https://www.cypress.io/).  
Covers functional flows such as login, signup, product search, cart, checkout, and validations.  
Implements Page Object Model (POM), custom commands, and data-driven testing.

## Tech Stack
- Cypress 13+
- JavaScript (ES6+)
- Mocha + Chai assertions
- Page Object Model (POM)
- Mochawesome / Allure reporting (planned)
- GitHub Actions (CI/CD) (planned)

## Project Structure
cypress/  
    ├── e2e/        # Test cases  
    ├── fixtures/   # Test data in JSON  
    ├── pages/      # Page Object Models  
    ├── support/    # Custom commands & hooks  
reports/            # Test reports (if enabled)  
cypress.config.js  

## Setup & Run
```bash
npm install
npx cypress open     # Run interactive
npx cypress run      # Run headless
npx cypress run --spec "cypress/e2e/login.cy.js"   # Run single spec
```

## Features
- End-to-end coverage of major UI flows
- Custom commands for reusability
- Data-driven testing using fixtures
- Screenshots & video on failures
- Retry logic for flaky tests
- API intercept & stubbing (`cy.intercept`)

## Continuous Integration
- GitHub Actions pipeline planned
- Run tests in headless mode
- Upload HTML reports as build artifacts

## Future Enhancements
- Add Allure report integration
- Parallel execution across browsers
- Dashboard reporting
