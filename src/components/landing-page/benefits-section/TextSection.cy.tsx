import React from "react";
import TextSection from "./TextSection";

describe("<TextSection />", () => {
  beforeEach(() => {
    cy.mount(
      <TextSection
        count="01"
        heading="Earnings"
        paragraph="Drivers can earn more money by driving for a ride-sharing app"
      />
    );
  });

  it("renders the TextSection component", () => {
    cy.get(".max-w-3xl").should("exist");

    cy.contains("Earnings").should("exist");
    cy.contains(
      "Drivers can earn more money by driving for a ride-sharing app"
    ).should("exist");
  });

  it("displays the correct count and heading", () => {
    cy.contains("01Earnings").should("exist");
  });

  it("displays the correct paragraph", () => {
    cy.contains(
      "Drivers can earn more money by driving for a ride-sharing app"
    ).should("exist");
  });
});
