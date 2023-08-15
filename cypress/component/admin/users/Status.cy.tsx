import Status from "./Status";

describe("Status component", () => {
  it("renders with active status", () => {
    cy.mount(<Status status="active" />);
    cy.get(".bg-emerald-500").should("exist");
    cy.get(".text-emerald-500").should("have.text", "Active");
  });

  it("renders with idle status", () => {
    cy.mount(<Status status="idle" />);
    cy.get(".bg-red-500").should("exist");
    cy.get(".text-red-500").should("have.text", "Idle");
  });

  it("renders all status when status is All", () => {
    cy.mount(<Status status="All" />);
    cy.get("div").should("exist");
  });
});