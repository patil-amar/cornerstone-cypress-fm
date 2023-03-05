## How to run tests

1. Clone this repo and cd into the project

```
git clone https://github.com/patil-amar/cornerstone-cypress-fm.git
```

2. Install dependencies

```
npm install
```

3. Run Tests

To run on Chrome browser

```
npm run ci:test:chrome
```

To run on firefox browser

```
npm run ci:test:firefox
```

# To run cypress test runner

```
npx cypress run
select spec file to run on cypress test runner
```

# Notes

1. Tests use react testing library (https://testing-library.com/docs/react-testing-library/intro/) to query dom elements
2. All the custom commands are defined in support/commands
3. Test data used in the test are stored in fixtures
4. Feature files are in Cypress/e2e
5. Step definition files are in cypress/e2e/step_definitions
6. Page object classes are defined in cypress/support/pages
7. Most of the user actions on the page are defined as a method in the page objects and are called in step definition files
