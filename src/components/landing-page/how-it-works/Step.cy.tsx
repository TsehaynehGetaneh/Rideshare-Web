import React from "react";
import Step from "./Step";
describe("<Step />", () => {
  beforeEach(() => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <Step
        step_number={1}
        title="POST A RIDE"
        description="Going somewhere but hate to travel alone  or want to make some extra cash just post your ride details and publish it"
      />
    );
  });

  it("Asserts that the step number is rendered correctly", () => {
    cy.get(".w-12").should("be.visible").and("contain", 1);
  });
  it("Asserts that the title is rendered correctly", () => {
    cy.get(".text-xl").should("be.visible").and("contain", "POST A RIDE"); //
  });
  it("Asserts that the description is rendered correctly", () => {
    cy.get(".text-base")
      .should("be.visible")
      .and(
        "contain",
        "Going somewhere but hate to travel alone  or want to make some extra cash just post your ride details and publish it"
      ); // replace 'Your Description' with the actual description you expect
  });
});
