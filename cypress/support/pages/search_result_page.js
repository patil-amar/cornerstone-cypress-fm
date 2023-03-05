import headerSection from "./header";
class SearchResultPage {
  searchResults() {
    return cy.findAllByTestId(/card/);
  }
  filterSideBar() {
    return cy.get('[id="facetedSearch"]');
  }

  goToProductDetailsPage(productName) {
    this.searchResults().find(".card-title").findByText(productName).click();
  }

  waitForSearchResultPageToLoad() {
    this.filterSideBar().should("be.visible");
    this.searchResults().its("length").should("be.greaterThan", 0);
  }

  header() {
    return headerSection;
  }
}

export default new SearchResultPage();
