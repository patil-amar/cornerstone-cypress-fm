class OrderSummarySection {
  orderSummaryShouldBeDisplayed({
    itemCount,
    productName,
    productPrice,
    totalPrice,
  }) {
    const itemSting = itemCount > 1 ? "Items" : "Item";
    cy.get(".layout-cart").within(() => {
      cy.findByText("Order Summary").should("be.visible");
      cy.findByTestId("cart-count-total")
        .invoke("text")
        .should("eql", `${itemCount} ${itemSting}`);

      cy.findByTestId("cart-item-product-title")
        .invoke("text")
        .should("include", productName);

      cy.findByTestId("cart-subtotal")
        .findByTestId("cart-price-value")
        .invoke("text")
        .should("eql", productPrice);

      cy.findByTestId("cart-total")
        .findByTestId("cart-price-value")
        .invoke("text")
        .should("eql", `$${totalPrice}.00`);
    });
  }
}

export default new OrderSummarySection();
