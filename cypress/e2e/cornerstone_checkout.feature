Feature: As a customer I want see the order confirmation when I purchange an item on cornerstone website


  Background: Visit cornerstone Website
    Given I visit cornerstone website

  Scenario Outline: User should see order confirmation number on successful payment with same or different billing and shipping address
    Given I search for a product <Product_Name>
    And I view the product details page for the product <Product_Name>
    And I add an item to the cart
    When I navigate to checkout page
    Then I should see item <Product_Name> in summary component on the checkout page
    When I place an order with <same_different> shipping and billing details on the checkout page
    Then I am presented with a purchase confirmation number for that order
    And I should see item <Product_Name> in summary component on the order confirmation page
    And I should see thank you message on the order confirmation page
    Examples:
      | Product_Name          | same_different |
      | "Able Brewing System" | same           |
      | "Tiered Wire Basket"  | different      |