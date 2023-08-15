import React from "react";
import BenefitsImage from "./BenefitsImage";

describe("<BenefitsImage />", () => {
  beforeEach(() => {
    cy.mount(<BenefitsImage image="flexible-time.png" />);
  });
  it("Assert that the Image is rendered", () => {
    cy.get(".relative.inline-block").should("exist");
    cy.get('img[alt="image"]').should("exist").and("have.attr", "src");

    cy.get('img[alt="image"]')
      .should("have.attr", "width", "352")
      .and("have.attr", "height", "362");
  });
});
