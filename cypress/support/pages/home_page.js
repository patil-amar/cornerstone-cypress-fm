import headerSection from "./header";
class HomePage {
  logo() {
    return cy.get(".header-logo-text").findByText("Cornerstone Demo");
  }

  header() {
    return headerSection;
  }
}

export default new HomePage();
