describe("RideRequestList", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/admin/ride-requests"); // Replace "/ride-requests" with the actual URL of the page where RideRequestList is rendered
  });

  it("displays the list of ride requests", () => {
    // Mock the API response
    cy.intercept("GET", "https://rideshare-swdm.onrender.com/api/riderequests/all?pageNumber=1&pageSize=10", {
      fixture: "rideRequests.json", // Replace "rideRequests.json" with the actual fixture file containing the mock data
    }).as("getRideRequests");
    

    // Wait for the API request to complete and the data to be rendered
    cy.wait("@getRideRequests");

    // Assert that the table is displayed
    cy.contains("Commuter").should("be.visible");
    cy.get("table").should("be.visible");

    // Assert that the table rows are rendered correctly
    cy.fixture("rideRequests.json").then((rideRequests) => {
      rideRequests.forEach((rideRequest:any) => {
        cy.get("tbody").contains(rideRequest.user.fullName).should("be.visible");
        cy.get("tbody").contains(rideRequest.originAddress).should("be.visible");
        cy.get("tbody").contains(rideRequest.destinationAddress).should("be.visible");
        cy.get("tbody").contains(rideRequest.currentFare).should("be.visible");
        cy.get("tbody").contains(rideRequest.status).should("be.visible");
        cy.get("tbody").contains(rideRequest.numberOfSeats).should("be.visible");

      });
    });
  });

  it("displays a loading spinner while loading data", () => {
    // Mock the API request to delay the response
    cy.intercept("GET", "https://rideshare-swdm.onrender.com/api/riderequests/all?pageNumber=1&pageSize=10", {
      delay: 1000, // Replace 1000 with the desired delay in milliseconds
      fixture: "rideRequests.json",
    }).as("getRideRequests");

    // Assert that the loading spinner is initially displayed
    cy.get(".react-spinners-ClipLoader").should("be.visible");

    // Wait for the API request to complete and the data to be rendered
    cy.wait("@getRideRequests");

    // Assert that the loading spinner is no longer displayed
    cy.get(".react-spinners-ClipLoader").should("not.exist");
  });

  it("displays an error message when there is an API error", () => {
    // Mock the API response with an error
    cy.intercept("GET", "https://rideshare-swdm.onrender.com/api/riderequests/all?pageNumber=1&pageSize=10", {
      statusCode: 500, // Replace 500 with the desired error status code
      body: "Internal Server Error", // Replace "Internal Server Error" with the desired error message
    }).as("getRideRequests");

    // Wait for the API request to complete and the error message to be rendered
    cy.wait("@getRideRequests");

    // Assert that the error message is displayed
    cy.contains("UnknownError").should("be.visible");

    // Add assertions for the error message content if necessary
  });

  // Add more test cases as needed
});
