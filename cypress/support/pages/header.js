class Header {
  cartLink() {
    return cy.get(".navUser-section").findByRole("link", { name: /cart/i });
  }

  clickSearchButton() {
    cy.findByRole("button", { name: "Search" }).click();
  }

  previewCart() {
    return {
      checkOutNowButton: cy
        .get(".previewCart")
        .findByRole("link", { name: /check out now/i }),
    };
  }

  navigateToCheckout() {
    cy.intercept("GET", "/api/storefront/checkout-settings?checkoutId=*").as(
      "checkoutPage"
    );
    this.cartLink().click();
    this.previewCart().checkOutNowButton.click({ force: true });
    cy.wait("@checkoutPage", { timeout: 60000 });
    cy.url().should("include", "/checkout");
  }
}

export default new Header();
