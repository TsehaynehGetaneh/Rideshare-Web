import { mount } from "cypress/react18";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import RideOffersList from "@/components/admin/ride-offers/RideOffersList";

describe("RideOffersList", () => {
  beforeEach(() => {
    cy.intercept(
      "POST",
      "https://rideshare-swdm.onrender.com/api/users/admin/login",
      (req) => {
        if (
          req.body.username === "Admin" &&
          req.body.password === "Admin@123RideShare"
        ) {
          req.reply((res) => {
            const authToken = res.body.value.accessToken;
            Cypress.env("authToken", authToken);
            res.send({}); 
          });
        }
      }
    ).as("adminLogin");

    cy.intercept(
      "GET",
      "https://rideshare-swdm.onrender.com/api/rideoffers/all?pageNumber=1&pageSize=10",
      {
        fixture: "admin/ride-offers/ride-offers.json",
      }
    ).as("getOffers");

    mount(
      <Provider store={store}>
        <RideOffersList />
      </Provider>
    );
  });

  it("checking above the table", () => {
    cy.get("#default-search").should("be.visible");
    cy.get(".gap-2 > .font-medium").should("be.visible");
    cy.get("#role").should("be.visible");
  });

  it("displays the list of ride requests when data is available", () => {
    cy.fixture("admin/ride-offers/ride-offers.json").then((rideOffers) => {
      const offers = rideOffers.value;
      offers.forEach((rideOffers: any, index: number) => {
        cy.get(`:nth-child(${index + 1}) > .px-3.py-4`).should(
          "contain.text",
          rideOffers.driver.user.fullName
        );
        cy.get(
          `.min-w-full > .bg-white > :nth-child(${index + 1}) > :nth-child(2)`
        ).should("contain.text", rideOffers.originAddress);
        cy.get(`.bg-white > :nth-child(${index + 1}) > :nth-child(3)`).should(
          "contain.text",
          rideOffers.destinationAddress
        );
        cy.get(`:nth-child(${index + 1}) > .px-10`).should(
          "contain.text",
          rideOffers.availableSeats
        );
        cy.get(`:nth-child(${index + 1}) > .px-0 > `).should(
          "contain.text",
          rideOffers.status.toLowerCase()
        );
      });
    });
  });
});
