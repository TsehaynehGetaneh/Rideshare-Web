import React from "react";
import Footer from "./Footer";

describe("<Footer />", () => {
  beforeEach(() => {
    cy.mount(<Footer />);
  });
  it("should render the logo", () => {
    cy.get("img").should("have.attr", "src", "/images/logo.svg");
  });

  it("should have two download buttons", () => {
    cy.get("button").should("have.length", 2);
  });

  it("should render the address", () => {
    cy.get("div").contains("3, Season Park, Jakarta").should("be.visible");
  });
  it("should render the copyright text", () => {
    cy.contains(
      "div",
      /Copyright © 2023 RideShare\s*-?\s*All Rights Reserved/
    ).should("be.visible");
  });

  it("should render the social media images", () => {
    cy.get('img[src="/images/landing-page/footer/facebook.svg"]').should(
      "be.visible"
    );
    cy.get('img[src="/images/landing-page/footer/twitter.svg"]').should(
      "be.visible"
    );
    cy.get('img[src="/images/landing-page/footer/linkedin.svg"]').should(
      "be.visible"
    );
    cy.get('img[src="/images/landing-page/footer/instagram.svg"]').should(
      "be.visible"
    );
  });

  it("should render the email address", () => {
    cy.get("div").contains("support@foodyar.co,id").should("be.visible");
  });

  it("should render the phone number", () => {
    cy.get("div").contains("021 - 1111 - 2222").should("be.visible");
  });
});
