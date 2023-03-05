import orderSummarySection from "./order_summary_section";

class OrderConfirmationPage {
  orderSummary() {
    return orderSummarySection;
  }

  orderConfirmationStatusText() {
    return cy.findByTestId("order-confirmation-order-status-text", {
      timeout: 60000,
    });
  }

  orderConfirmationNumberText() {
    return cy.findByTestId("order-confirmation-order-number-text");
  }

  orderConfirmationNumberShouldBeDisplayed(orderNumber) {
    this.orderConfirmationNumberText().should("be.visible");
    this.orderConfirmationNumberText().then(() => {
      cy.contains(`Your order number is ${orderNumber}`).should("be.visible");
    });
  }

  assertThankYouMessage(userName) {
    cy.findByTestId("order-confirmation-heading").findByText(
      `Thank you ${userName}!`
    );
  }
}

export default new OrderConfirmationPage();
