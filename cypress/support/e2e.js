require("./commands");
import { configure } from "@testing-library/cypress";

configure({ testIdAttribute: "data-test" });

// Disable uncaught exception as there are few errors thrown
Cypress.on("uncaught:exception", (err) => {
  return false;
});
