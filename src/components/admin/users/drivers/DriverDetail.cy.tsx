import { Provider } from "react-redux";
import DriverDetail from "./DriverDetail";
import { store } from "@/store/store";

describe("DriverDetail Component", () => {
    beforeEach(() => {
      // Intercept the GET request to the server and mock the response with fixture data
      // This ensures the component behaves as if it received real data from the server
      cy.intercept('GET', 'https://rideshare-swdm.onrender.com/api/drivers/of-user/*', {
        fixture: 'admin/users/driverDetail.json',
      }).as('getDriver');
  
      // Mount the component with a mock store for testing
      cy.mount(
        <Provider store={store}>
          <DriverDetail driverID='12b3c4d5-67e8-490f-1a2b-123456789008' />
        </Provider>
      );
  
      // Wait for the intercepted GET request to resolve before each test
      // Ensures that mock data is ready when the tests run
      // cy.wait('@getDriver');
    });
  
    it('should display driver details correctly', () => {
        // Verify that the component displays the correct heading
        cy.get('[data-cy="driver-details"]').should('contain', 'Driver Details');
    
        // Verify that the component displays the 'License' label and renders the correct image
        cy.get('[data-cy="license-text"]').should('contain', 'License');
        cy.get('[data-cy="license-img"]').should('have.attr', 'src').and('include', '/_next/image?url=%2Fimages%2Fadmin%2Fadmin-profile.jpg');
    
        // Verify that the component displays the 'License No.' label and renders the correct license number
        cy.get('[data-cy="licenseNumber-text"]').should('contain', 'License No.');
        cy.get('[data-cy="licenseNumber-value"]').should('contain', 'MNO123456');
    
        // Verify that the component displays the 'Experience' label and renders the correct experience value
        cy.get('[data-cy="experience-text"]').should('contain', 'Experience');
        cy.get('[data-cy="experience-value"]').should('contain', '5');
    
        // Verify that the component displays the 'Address' label and renders the correct address
        cy.get('[data-cy="address-text"]').should('contain', 'Address');
        cy.get('[data-cy="address-value"]').should('contain', 'Arat Kilo, Addis Ababa');
    
        // Verify that the component displays the 'Rate Number' label and renders the correct rate number
        cy.get('[data-cy="rateNumber-text"]').should('contain', 'Rate Number');
        cy.get('[data-cy="rateNumber-value"]').should('contain', '0');
      
    });
  });
  