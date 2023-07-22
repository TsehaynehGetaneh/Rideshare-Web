import React from "react";
import Header from "./Header";
import { Provider } from "react-redux";
import { store } from "@/store/store";

describe("<Header />", () => {
  beforeEach(() => {
    cy.mount(
      <Provider store={store}>
        <Header />
      </Provider>
    );
  });

  it("should render the logo", () => {
    cy.get("img").should("have.attr", "src", "/images/logo.svg");
  });

  it("should highlight the active route for large screens", () => {
    cy.get('div[test-id="navbar"] a')
      .contains("Home")
      .should("have.class", "text-primary");
  });

  it("should highlight the active route for small screens", () => {
    cy.get('div[test-id="mobile-navbar"] button').click();
    cy.get('div[test-id="mobile-navbar"] a').contains("Home").should("exist");
  });

  it("should navigate to the selected route for large screens", () => {
    cy.get('div[test-id="navbar"] a').contains("Benefits").click();
    cy.url().should("include", "#benefits");
    cy.get('div[test-id="navbar"] a').contains("About").click();
    cy.url().should("include", "#about");
  });

  it("should navigate to the selected route for small screens", () => {
    cy.get('button[test-id="open-menu"]').click();
    cy.get('div[test-id="mobile-navbar"] a').contains("Benefits").click();
    cy.url().should("include", "#benefits");
  });
});
