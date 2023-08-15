import React from "react";
import BenefitsSection from "./BenefitsSection";

describe("<BenefitsSection />", () => {
  beforeEach(() => {
    cy.mount(<BenefitsSection />);
  });
  it("renders the BenefitsSection component", () => {
    cy.contains("RideShare Benefits").should("exist");

    cy.get(".flex.flex-col").should("have.length", 4);

    cy.get(".text-3xl.font-bold").should("exist");
    cy.get(".text-lg").should("exist");

    cy.get("[data-testid='image']").should("exist");
  });
});
