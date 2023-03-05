// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

import "@testing-library/cypress/add-commands";
import homePage from "../support/pages/home_page";
import searchResultPage from "../support/pages/search_result_page";

Cypress.Commands.add("searchForProduct", (searchText) => {
  cy.intercept("GET", "/search.php?search_query=*").as("searchResults");
  homePage.header().clickSearchButton();
  cy.findAllByPlaceholderText("Search the store")
    .first()
    .clear()
    .type(`${searchText} {enter}`);
  cy.wait("@searchResults");

  searchResultPage.waitForSearchResultPageToLoad();
});
