import { Steps } from "@/types/steps";
import HowItWorks from "./HowItWorks";

describe("HowItWorks", () => {
  beforeEach(() => {
    cy.mount(<HowItWorks />);
  });

  it("Asserts that the How it Works component is rendered correctly", () => {
    cy.get("h1").should("contain", "How RideShare Works");
    cy.get("p").should(
      "contain",
      "Download and install the Ride Share app. Enter the required fields and create your user account. when approved you may start using or providing a service."
    );
  });

  it("Asserts that the Step componets are rendered correctly", () => {
    cy.fixture("steps.json").then((steps) => {
      steps.forEach((step: Steps, index: number) => {
        if (step.step_number <= 2) {
          cy.get('[data-testid="step_1"]').within(() => {
            cy.get(`:nth-child(${index + 1})`).should("contain", step.title);
            cy.get(`:nth-child(${index + 1})`).should(
              "contain",
              step.description
            );
          });
        } else {
          cy.get('[data-testid="step_2"]').within(() => {
            cy.get(`:nth-child(${index + 1})`).should("contain", step.title);
            cy.get(`:nth-child(${index + 1})`).should(
              "contain",
              step.description
            );
          });
        }
      });
    });
  });

  it("Asserts that the image component is rendered correctly", () => {
    cy.get('[data-testid="mobile_image"]').should("be.visible");
  });
});
