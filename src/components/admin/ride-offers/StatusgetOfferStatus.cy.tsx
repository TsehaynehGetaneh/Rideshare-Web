import { mount } from "cypress/react18";
import { getOfferStatus } from "./Status";

describe("<getOfferStatus />", () => {
  it("renders ONROUTE status with correct Tailwind class", () => {
    mount(getOfferStatus("ONROUTE"));

    cy.get(".bg-indigo-200").should("exist");
    cy.get(".text-indigo-500").should("exist");
    cy.contains("onroute").should("exist");
  });

  it("renders WAITING status with correct Tailwind class", () => {
    mount(getOfferStatus("WAITING"));

    cy.get(".bg-orange-100").should("exist");
    cy.get(".text-orange-500").should("exist");
    cy.contains("waiting").should("exist");
  });

  it("renders CANCELLED status with correct Tailwind class", () => {
    mount(getOfferStatus("CANCELLED"));

    cy.get(".bg-red-100").should("exist");
    cy.get(".text-red-500").should("exist");
    cy.contains("cancelled").should("exist");
  });

  it("renders COMPLETED status with correct Tailwind class", () => {
    mount(getOfferStatus("COMPLETED"));

    cy.get("div").should("have.class", "bg-emerald-100/60");
    cy.get(".text-emerald-500").should("exist");
    cy.contains("completed").should("exist");
  });

  it("renders default status with correct Tailwind class", () => {
    mount(getOfferStatus("UNKNOWN_STATUS"));

    cy.get(".bg-gray-100").should("exist");
    cy.get(".text-gray-600").should("exist");
    cy.contains("unknown status").should("exist");
  });
});
