export const status_map: { [key: number]: string } = {
  0: "Waiting",
  1: "OnRoute",
  2: "Completed",
  3: "Canceled",
};
export const reverse_map: { [key: string]: number } = {
  "Waiting" : 0,
  "OnRoute" : 1,
  "Completed" : 2,
  "Canceled" : 3,
};
describe('Functionalities inside the ride Request list work', () => {
  beforeEach(() => {
    // Login before each test case
    cy.log('Visiting the login page');
    cy.intercept('POST', 'https://rideshare-swdm.onrender.com/api/users/admin/login', (req) => {
      req.reply((res) => {
        expect(res.statusCode).to.equal(200);
        
      });
    });
    cy.visit("http://localhost:3000/admin/auth/login/");
    cy.get('.md\\:w-\\[70\\%\\] > :nth-child(1) > .w-full').type("Admin");
    cy.get('.md\\:w-\\[70\\%\\] > :nth-child(2) > .w-full').type("Admin@123RideShare")
    cy.get('.px-8').click();
    cy.wait(15000);
    cy.url().should('include', 'http://localhost:3000/admin/dashboard');
    cy.get('#__next');
    cy.get('.bg-primary > .hidden')
  });
  
  describe('RideRequests table', () => {
    it('renders the RideRequests table', () => {

      cy.intercept('GET', 'https://rideshare-swdm.onrender.com/api/riderequests/all?pageNumber=1&pageSize=10').as('rideRequests');

      cy.visit('http://localhost:3000/admin/ride-requests').then(() => {
        cy.wait('@rideRequests', { timeout: 10000 }).then((interception) => {
          expect(interception.response?.statusCode).to.equal(200);
          
          const rideRequests = interception.response?.body.value;
          console.log('rideRequests:', rideRequests);
          rideRequests.forEach((rideRequest:any, index: number) => {
            cy.get(`:nth-child(${index + 1}) > .px-3.py-4`).should('contain.text', rideRequest.user.fullName);
            cy.get(`.min-w-full > .bg-white > :nth-child(${index + 1}) > :nth-child(2)`).should('contain.text', rideRequest.originAddress);
            cy.get(`.bg-white > :nth-child(${index + 1}) > :nth-child(3)`).should('contain.text', rideRequest.destinationAddress);
            cy.get(`:nth-child(${index + 1}) > .px-7`).should('contain.text', rideRequest.currentFare);
            cy.get(`:nth-child(${index + 1}) > .px-10`).should('contain.text', rideRequest.numberOfSeats);
            
            cy.get(`:nth-child(${index + 1}) > .px-0 > .inline-flex`).should('contain.text', status_map[rideRequest.status]);
            cy.get(`.bg-white > :nth-child(${index + 1}) > :nth-child(7)`).should('contain.text', "Jun 26, 2023");
            // cy.get(':nth-child(8) > .text-xl');
            
          });
        });
      });
    });
  });

  describe('Search bar testing', () => {
    it('tests the search bar', () => {
      
      cy.intercept('GET', 'https://rideshare-swdm.onrender.com/api/riderequests/all?pageNumber=1&pageSize=10').as('rideRequests');
      cy.visit('http://localhost:3000/admin/ride-requests').then(() => {
        cy.wait('@rideRequests', { timeout: 10000 }).then((interception) => {
          expect(interception.response?.statusCode).to.equal(200);

          const rideRequest = interception.response?.body.value;
          console.log('rideRequests:', rideRequest);

          
          cy.get('#default-search').type("Eden Hailu")

       
          cy.intercept(
            'GET',
            `
            https://rideshare-swdm.onrender.com/api/riderequests/filter?name=Eden%20Hai&pageNumber=1&pageSize=10`
          ).as('filteredRideRequests');

         
          cy.wait('@filteredRideRequests').then((interception) => {
            expect(interception.response?.statusCode).to.equal(200);

            const filteredRideRequests = interception.response?.body.value[0];
            console.log('filteredRideRequests:', filteredRideRequests);

           
            cy.get(`:nth-child(1) > .px-3.py-4`).should('contain.text', filteredRideRequests.user.fullName);
            cy.get(`.min-w-full > .bg-white > :nth-child(1) > :nth-child(2)`).should('contain.text', filteredRideRequests.originAddress);
            cy.get(`.bg-white > :nth-child(1) > :nth-child(3)`).should('contain.text', filteredRideRequests.destinationAddress);
            cy.get(`:nth-child(1) > .px-7`).should('contain.text', filteredRideRequests.currentFare);
            cy.get(`:nth-child(1) > .px-10`).should('contain.text', filteredRideRequests.numberOfSeats);
            cy.get(`.bg-white > :nth-child(1) > :nth-child(7)`).should('contain.text', "Jun 26, 2023");
            // cy.get(':nth-child(8) > .text-xl');
          });
        });
      });
    });
  });

  describe('DropDown Testing', () => {
    it('tests the dropdown', () => {
     
      cy.intercept('GET', 'https://rideshare-swdm.onrender.com/api/riderequests/all?pageNumber=1&pageSize=10').as('rideRequests');
      cy.visit('http://localhost:3000/admin/ride-requests').then(() => {
        cy.wait('@rideRequests', { timeout: 10000 }).then((interception) => {
          expect(interception.response?.statusCode).to.equal(200);

          const rideRequest = interception.response?.body.value;
          console.log('rideRequests:', rideRequest);

          // Test dropdown interaction
          cy.get('#role').select("Completed")// Replace 'Completed' with the desired option text

          // Intercept API based on selected option
          cy.intercept(
            'GET',
            `
            https://rideshare-swdm.onrender.com/api/riderequests/filter?status=2&pageNumber=1&pageSize=10`
          ).as('rideRequestsByStatus');

          // Wait for the filtered ride requests API call
          cy.wait('@rideRequestsByStatus').then((interception) => {
            expect(interception.response?.statusCode).to.equal(200);

            const rideRequestbyStat = interception.response?.body.value;
            console.log('rideRequestbyStat:', rideRequestbyStat);

            // Assertions for the filtered ride requests
            rideRequestbyStat.forEach((rideRequest:any, index: number) => {
              cy.get(`:nth-child(${index + 1}) > .px-3.py-4`).should('contain.text', rideRequest.user.fullName);
              cy.get(`.min-w-full > .bg-white > :nth-child(${index + 1}) > :nth-child(2)`).should('contain.text', rideRequest.originAddress);
              cy.get(`.bg-white > :nth-child(${index + 1}) > :nth-child(3)`).should('contain.text', rideRequest.destinationAddress);
              cy.get(`:nth-child(${index + 1}) > .px-7`).should('contain.text', rideRequest.currentFare);
              cy.get(`:nth-child(${index + 1}) > .px-10`).should('contain.text', rideRequest.numberOfSeats);
              
              cy.get(`:nth-child(${index + 1}) > .px-0 > .inline-flex`).should('contain.text', status_map[rideRequest.status]);
              cy.get(`.bg-white > :nth-child(${index + 1}) > :nth-child(7)`).should('contain.text', "Jun 26, 2023");
              // cy.get(':nth-child(8) > .text-xl');
  
              // Add more assertions for other properties as needed
            });
          });
        });
      });
    });
  });
});