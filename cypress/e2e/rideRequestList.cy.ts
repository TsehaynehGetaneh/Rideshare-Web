// Import necessary Cypress commands
import {
    createRideRequestListFixture,
    createEmptyRideRequestListFixture,
    createErrorRideRequestListFixture,
  } from "../fixtures/rideRequests";
  
  // Describe the test suite for the RideRequestList component
  describe("RideRequestList", () => {
    // Set up the fixture data before each test
    beforeEach(() => {
      cy.intercept("GET", "/api/ride-requests", (req) => {
        req.reply(createRideRequestListFixture());
      });
    });
  
    // Test the initial rendering of the RideRequestList component
    it("renders the RideRequestList component", () => {
      cy.visit("http://localhost:3000/admin/ride-requests");
  
      // Assert that the component is rendered
      cy.get(".ride-request-list").should("exist");
  
      // Assert that the loading spinner is not displayed
      cy.get(".clip-loader").should("not.exist");
  
      // Assert that the ride requests are displayed
      cy.get(".ride-request-item").should("have.length", 2);
    });
  
    // Test filtering ride requests by status
    it("filters ride requests by status", () => {
      cy.visit("http://localhost:3000/admin/ride-requests");
  
      // Select the "Completed" status option
      cy.get(".react-select__input").click();
      cy.contains("Completed").click();
  
      // Assert that the filtered ride requests are displayed
      cy.get(".ride-request-item").should("have.length", 1);
    });
  
    // Test searching for ride requests
    it("searches for ride requests", () => {
      cy.visit("http://localhost:3000/admin/ride-requests");
  
      // Enter a search query
      cy.get("input[type='search']").type("John");
  
      // Assert that the searched ride request is displayed
      cy.get(".ride-request-item").should("have.length", 1);
    });
  
    // Test handling empty ride requests
    it("handles empty ride requests", () => {
      cy.intercept("GET", "/api/ride-requests", (req) => {
        req.reply(createEmptyRideRequestListFixture());
      });
  
      cy.visit("http://localhost:3000/admin/ride-requests");
  
      // Assert that the empty state message is displayed
      cy.contains("There are no Ride Requests").should("exist");
    });
  
    // Test handling error in fetching ride requests
    it("handles error in fetching ride requests", () => {
      cy.intercept("GET", "/api/ride-requests", (req) => {
        req.reply(createErrorRideRequestListFixture());
      });
  
      cy.visit("http://localhost:3000/admin/ride-requests");
  
      // Assert that the error message is displayed
      cy.contains("Unknown Error").should("exist");
    });
  });
  