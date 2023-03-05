import headerSection from "./header";
class ProductDetailsPage {
  addToCartButton() {
    return cy.findByDisplayValue("Add to Cart");
  }

  continueShopping() {
    cy.get("body").then(($el) => {
      if ($el.find('[id="previewModal"]').length > 0) {
        cy.findByRole("button", { name: /continue shopping/i }).click();
      }
    });
  }

  addToCart() {
    this.addToCartButton().click();
    this.continueShopping();
  }

  header() {
    return headerSection;
  }
}

export default new ProductDetailsPage();
