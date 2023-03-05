import { faker } from "@faker-js/faker";
import headerSection from "./header";
import orderSummarySection from "./order_summary_section";

class CheckoutPage {
  orderSummary() {
    return orderSummarySection;
  }

  header() {
    return headerSection;
  }

  clickSearchButton() {
    cy.findByRole("button", { name: /search/i }).click();
  }

  typeRandomEmail() {
    const emailAddress = faker.internet.email();
    cy.findByRole("textbox", { name: /email/i })
      .should("be.empty")
      .type(emailAddress)
      .should("have.value", emailAddress);
  }

  agreeWithPolicy() {
    cy.get('[id="privacyPolicy"]')
      .click({ force: true })
      .should("have.attr", "value", "true");
  }

  clickContinueButton() {
    cy.findByRole("button", { name: "Continue" }).click();
  }

  generateAddress(countryName) {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const streetName = faker.address.streetName();
    const cityName = faker.address.cityName();
    const zipCodeByState = faker.address.zipCodeByState();
    const phoneNumber = faker.phone.number();
    return cy.fixture("address").then((address) => {
      const countryData = address.country[countryName];
      const country = countryData.countryCode;
      const state = countryData.stateCode;
      return {
        country,
        firstName,
        lastName,
        streetName,
        cityName,
        state,
        zipCodeByState,
        phoneNumber,
      };
    });
  }

  enterShippingAddress(countryName) {
    cy.get('[id="checkoutShippingAddress"]').within(() => {
      this.generateAddress(countryName).then((address) => {
        this.typeAddress(address);
      });
    });
  }

  enterBillingAddress(countryName) {
    cy.get('[id="checkoutBillingAddress"]').within(() => {
      this.generateAddress(countryName).then((address) => {
        this.typeAddress(address);
      });
    });
  }

  typeAddress({
    country,
    firstName,
    lastName,
    streetName,
    cityName,
    state,
    zipCodeByState,
    phoneNumber,
  }) {
    cy.findByTestId("countryCodeInput-select")
      .select(country)
      .should("have.value", country);
    cy.findByRole("textbox", { name: "First Name" })
      .type(firstName)
      .should("have.value", firstName);
    cy.findByRole("textbox", { name: "Last Name" })
      .type(lastName)
      .should("have.value", lastName);
    cy.findByRole("textbox", { name: "Address" })
      .type(streetName)
      .should("have.value", streetName);
    cy.findByRole("textbox", { name: "City" })
      .type(cityName)
      .should("have.value", cityName);
    cy.findByTestId("provinceCodeInput-select")
      .select(state)
      .should("have.value", state);
    cy.findByRole("textbox", { name: "Postal Code" })
      .type(zipCodeByState)
      .should("have.value", zipCodeByState);
    cy.findByRole("textbox", { name: "Phone Number" })
      .type(phoneNumber)
      .should("have.value", phoneNumber);
  }

  enterPaymentDetails(cardType = "visa") {
    const firstName = faker.name.firstName();

    cy.fixture("card_details").then((testCard) => {
      const cardDetails = testCard[cardType];

      cy.findByRole("textbox", { name: "Credit Card Number" })
        .should("be.empty")
        .type(cardDetails.cardNumber);
      cy.findByRole("textbox", { name: "Expiration" }).type(
        cardDetails.expiration
      );
      cy.findByRole("textbox", { name: "Name on Card" })
        .should("be.empty")
        .type(firstName)
        .should("have.value", firstName);
      cy.findByRole("textbox", { name: "CVV" })
        .should("be.empty")
        .type(cardDetails.cvv)
        .should("have.value", cardDetails.cvv);
    });
  }

  clickPlaceOrder() {
    cy.findByRole("button", { name: "Place Order" }).click();
  }

  uncheckSameBillingAddress() {
    cy.get('[id="sameAsBilling"]')
      .uncheck({ force: true })
      .should("not.be.checked");
  }

  assertBillingAddressIsSameAsShippingAddress() {
    let shippingAddress;
    let billingAddress;

    cy.get(".checkout-step--shipping")
      .find(".checkout-address--static")
      .then(($els) => {
        shippingAddress = Array.from($els, (el) =>
          el.innerText.replace(/\n/g, " ")
        );
      })
      .then(() => {
        cy.get(".checkout-step--billing")
          .find(".checkout-address--static")
          .then(($els) => {
            billingAddress = Array.from($els, (el) =>
              el.innerText.replace(/\n/g, " ")
            );
          })
          .then(() => {
            expect(shippingAddress).eql(billingAddress);
          });
      });
  }

  placeOrderWithSameBillingAndShippingDetails() {
    this.typeRandomEmail();
    this.agreeWithPolicy();
    this.clickContinueButton();
    this.enterShippingAddress("India");
    this.clickContinueButton();
    this.assertBillingAddressIsSameAsShippingAddress();
    this.enterPaymentDetails();
    this.clickPlaceOrder();
  }

  placeOrderWithDifferentBillingAndShippingDetails() {
    this.typeRandomEmail();
    this.agreeWithPolicy();
    this.clickContinueButton();
    this.enterShippingAddress("India");
    this.uncheckSameBillingAddress();
    this.clickContinueButton();
    this.enterBillingAddress("India");
    this.clickContinueButton();
    this.enterPaymentDetails();
    this.clickPlaceOrder();
  }
}

export default new CheckoutPage();
