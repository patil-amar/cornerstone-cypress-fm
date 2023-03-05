import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";
import checkoutPage from "../../support/pages/checkout_page";
import homePage from "../../support/pages/home_page";
import productDetailsPage from "../../support/pages/product_details_page";
import orderConfirmationPage from "../../support/pages/order_confirmation_page";
import searchResultPage from "../../support/pages/search_result_page";

Given(/^I visit cornerstone website$/, () => {
  cy.visit("/");
  homePage.logo().should("be.visible");
});

When(/^I search for a product "([^"]*)"$/, (productName) => {
  cy.searchForProduct(productName);
});

Given(
  /^I view the product details page for the product "([^"]*)"$/,
  (productName) => {
    searchResultPage.goToProductDetailsPage(productName);
  }
);

When(/^I add an item to the cart$/, () => {
  productDetailsPage.addToCart();
});

Given(/^I navigate to checkout page$/, () => {
  cy.intercept("GET", "/api/storefront/checkout/*").as("checkoutItems");
  homePage.header().navigateToCheckout();
  cy.wait("@checkoutItems").then(({ response }) => {
    this.subTotal = response.body.subtotal;
  });
});

Then(
  /^I should see item "([^"]*)" in summary component on the (checkout|order confirmation) page$/,
  (productName, pageName) => {
    cy.fixture("product").then((fixture) => {
      const expectedProduct = {
        itemCount: 1,
        productName: productName,
        productPrice: fixture[productName].price,
        totalPrice: this.subTotal,
      };
      if (pageName === "checkout") {
        checkoutPage
          .orderSummary()
          .orderSummaryShouldBeDisplayed(expectedProduct);
      } else {
        orderConfirmationPage
          .orderSummary()
          .orderSummaryShouldBeDisplayed(expectedProduct);
      }
    });
  }
);

When(
  /^I place an order with (same|different) shipping and billing details on the checkout page$/,
  (addressType) => {
    cy.intercept("GET", "/api/storefront/orders/*").as("orderConfirmation");
    if (addressType === "same") {
      checkoutPage.placeOrderWithSameBillingAndShippingDetails();
    } else {
      checkoutPage.placeOrderWithDifferentBillingAndShippingDetails();
    }
    cy.wait("@orderConfirmation").then(({ response }) => {
      this.orderNumber = response.body.orderId;
      this.subTotal = response.body.orderAmount;
      this.userName = response.body.billingAddress.firstName;
    });
  }
);

Then(
  /^I am presented with a purchase confirmation number for that order$/,
  () => {
    cy.url().should("include", "/checkout/order-confirmation");
    orderConfirmationPage.orderConfirmationNumberShouldBeDisplayed(
      this.orderNumber
    );
  }
);

Then(/^I should see thank you message on the order confirmation page$/, () => {
  cy.url().should("include", "/checkout/order-confirmation");
  orderConfirmationPage.assertThankYouMessage(this.userName);
});
