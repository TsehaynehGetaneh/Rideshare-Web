import RideRequestList from "@/components/admin/ride-request/RideRequestList";
import { mount } from "cypress/react18";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import rideRequests from "@/pages/admin/ride-requests";

export const status_map: { [key: number]: string } = {
  0: "Waiting",
  1: "OnRoute",
  2: "Completed",
  3: "Canceled",
};

describe("RideRequestList", () => {
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
            res.send({}); // Optional: You can send an empty response or modify it as needed
          });
        }
      }
    ).as("adminLogin");

    cy.intercept(
      "GET",
      "https://rideshare-swdm.onrender.com/api/riderequests/all?pageNumber=1&pageSize=10",
      {
        fixture: "admin/ride-requests/rideRequests.json",
      }
    ).as("getRequests");

    cy.intercept(
      {
        method: "GET",
        url: "https://rideshare-swdm.onrender.com/api/riderequests/filter?name=Eden%20Hailu&pageNumber=1&pageSize=10",
      },
      {
        fixture: "admin/ride-requests/single-request.json",
      }
    ).as("getSingleRequest");

    cy.intercept(
      "GET",
      "https://rideshare-swdm.onrender.com/api/riderequests/filter?status=2&pageNumber=1&pageSize=10",
      {
        fixture: "admin/ride-requests/completed-rideRequests.json",
      }
    ).as("getCompletedRequests");

    cy.intercept(
      "GET",
      "https://rideshare-swdm.onrender.com/api/riderequests/filter?fare=30&pageNumber=1&pageSize=10",
      {
        fixture: "admin/ride-requests/rideRequests-fare.json",
      }
    ).as("getRequestsByFare");

    mount(
      <Provider store={store}>
        <RideRequestList />
      </Provider>
    );
  });

  it("checking above the table", () => {
    cy.get("#default-search").should("be.visible");
    cy.get(".gap-2 > .font-medium").should("be.visible");
    cy.get("#role").should("be.visible");
    cy.get("thead") // Select the thead element
      .find("th") // Select the tr elements within it
      .its("length") // Get the length of the selected elements
      .should("eq", 8); // Assert the expected length
    cy.get(".bg-gray-50 > tr > .px-4").should("be.visible");
    cy.get(".bg-gray-50 > tr > .px-3").should("be.visible");
    cy.get(".bg-gray-50 > tr > :nth-child(3)").should("be.visible");
    cy.get(".bg-gray-50 > tr > :nth-child(4)").should("be.visible");
    cy.get(".bg-gray-50 > tr > :nth-child(5)").should("be.visible");
    cy.get(".bg-gray-50 > tr > :nth-child(6)").should("be.visible");
    cy.get(".bg-gray-50 > tr > :nth-child(7)").should("be.visible");
    cy.get("tbody").find("tr").first().find("td").should("have.length", 8);
    cy.get("tbody").find("tr").should("have.length", 10);
  });

  it("displays the ride Requests filtered by user name", () => {
    cy.get("#default-search").should("be.visible");
    cy.get("#default-search").type("Eden Hailu");
    cy.wait(5000);
    cy.get("thead").find("th").its("length").should("eq", 8);
    cy.get("tbody").find("tr").should("have.length", 1);
    cy.contains("Eden Hailu").should("be.visible");
  });

  it("displays the ride Requests filtered by fare", () => {
    cy.get("#default-search").should("be.visible");
    cy.get("#default-search").type("30");
    cy.wait(5000);
    cy.get("thead").find("th").its("length").should("eq", 8);
    cy.get("tbody").find("tr").should("have.length", 6);
    cy.contains(30).should("be.visible");
  });
  it("displayed ride requests filtered by status", () => {
    cy.get("#role").should("be.visible");
    cy.get("#role").select("Completed");
    cy.wait(5000);
    cy.get("thead").find("th").its("length").should("eq", 8);
    cy.get("tbody").find("tr").should("have.length", 8);
    cy.contains("Completed").should("be.visible");
  });

  it("displays the list of ride requests when data is available", () => {
    cy.fixture("admin/ride-requests/rideRequests.json").then((rideRequests) => {
      const requests = rideRequests.value;
      requests.forEach((rideRequest: any, index: number) => {
        cy.get(`:nth-child(${index + 1}) > .px-3.py-4`).should(
          "contain.text",
          rideRequest.user.fullName
        );
        cy.get(
          `.min-w-full > .bg-white > :nth-child(${index + 1}) > :nth-child(2)`
        ).should("contain.text", rideRequest.originAddress);
        cy.get(`.bg-white > :nth-child(${index + 1}) > :nth-child(3)`).should(
          "contain.text",
          rideRequest.destinationAddress
        );
        cy.get(`:nth-child(${index + 1}) > .px-7`).should(
          "contain.text",
          rideRequest.currentFare
        );
        cy.get(`:nth-child(${index + 1}) > .px-10`).should(
          "contain.text",
          rideRequest.numberOfSeats
        );
        cy.get(`:nth-child(${index + 1}) > .px-0 > .inline-flex`).should(
          "contain.text",
          status_map[rideRequest.status]
        );
        cy.get(`.bg-white > :nth-child(${index + 1}) > :nth-child(7)`).should(
          "contain.text",
          "Jun 26, 2023"
        );
        cy.get(":nth-child(4) > .text-xl > .focus\\:outline-none").should(
          "be.visible"
        );
      });
    });
  });
});

// checking for errors
// describe("first", () => {
//   beforeEach(() => {
//     cy.intercept(
//         "POST",
//         "https://rideshare-swdm.onrender.com/api/users/admin/login",
//         (req) => {
//           if (
//             req.body.username === "Admin" &&
//             req.body.password === "Admin@123RideShare"
//           ) {
//             req.reply((res) => {
//               const authToken = res.body.value.accessToken;
//               Cypress.env("authToken", authToken);
//               res.send({}); // Optional: You can send an empty response or modify it as needed
//             });
//           }
//         }
//       ).as("adminLogin");
//     cy.intercept(
//       {
//         method: "GET",
//         url: "https://rideshare-swdm.onrender.com/api/riderequests/all?pageNumber=1&pageSize=10",
//       },
//       {
//         fixture: "no-requests.json"
//       }
//     ).as("noRequests");
//     mount(
//       <Provider store={store}>
//         <RideRequestList />
//       </Provider>
//     );

//   });

//   it("handles error", () => {
//     cy.fixture('no-requests.json').then((rideRequests) => {
//       const requests = rideRequests.value;
//       console.log(requests);
//       cy.get("#default-search").should("be.visible");
//       cy.get(".text-gray-400").should("be.visible");
//       cy.contains("There are no Ride Requests").should("be.visible");

//     })

//   });
// });
