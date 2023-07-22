import React from "react";
import HeroSection from "./HeroSection";

describe("<HeroSection />", () => {
  beforeEach(() => {
    cy.mount(<HeroSection />);
  });
  it("should render the text content correctly", () => {
    cy.contains("Ride").should("exist");
    cy.contains("Share").should("exist");
    cy.contains("A platform to make your life easier").should("exist");
    cy.contains("Google Play").should("exist");
    cy.contains("Apple Store").should("exist");
  });
  it("should render the image", () => {
    cy.get('img[src="/images/landing-page/hero-section-image.svg"]').should(
      "exist"
    );
  });

  it("should have two download buttons", () => {
    cy.get("button").should("have.length", 2);
  });
});
