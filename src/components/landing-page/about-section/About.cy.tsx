import About from "./About";

describe("About component", () => {
  beforeEach(() => {
    cy.mount(<About />);
  });

  it("should render the title", () => {
    cy.get('[data-cy="title"]').contains("Who are we?").should("exist");
  });

  it("should render the image", () => {
    cy.get('[data-cy="about-image"]').should("be.visible");
  });

  it("should render the about text", () => {
    cy.get('[data-cy="about-text"]')
      .contains(
        "RideShare is a ridesharing app that aims to provide an affordable, eco-friendly, and efficient mode of transportation in Ethiopia while creating opportunities for drivers and promoting carpooling."
      )
      .should("exist");
  });

  it("should render the vision text", () => {
    cy.get('[data-cy="vision-text"]').contains("Vision").should("exist");
    cy.get('[data-cy="vision-description"]')
      .contains(
        "RideShare envisions affordable and sustainable mobility solutions connecting individuals and communities in Africa, fostering shared responsibility and mutual benefit for economic growth and social cohesion."
      )
      .should("exist");
  });

  it("should render the mission text", () => {
    cy.get('[data-cy="mission-text"]').contains("Mission").should("exist");
    cy.get('[data-cy="mission-description"]')
      .contains(
        "RideShare's mission is to provide an affordable, reliable, and eco-friendly carpooling service that connects people with shared travel needs, creates economic opportunities, reduces traffic congestion, and promotes a cleaner environment in Africa."
      )
      .should("exist");
  });
});
