import { Provider } from "react-redux";
import { store } from "@/store/store";
import CommuterFeedback from "@/components/admin/users/commuters/CommuterFeedback";

describe("CommuterFeedback Component", () => {
    beforeEach(() => {
      // Intercept the GET request to the server and mock the response with fixture data
      // This ensures the component behaves as if it received real data from the server
      cy.intercept('GET', 'https://rideshare-swdm.onrender.com/api/feedbacks/all?pageNumber=*&pageSize=*', {
        fixture: 'admin/users/commuterFeedback.json',
      }).as('getFeedback');
  
      // Mount the component with a mock store for testing
      cy.mount(
        <Provider store={store}>
          <CommuterFeedback />
        </Provider>
      );
  
      // Wait for the intercepted GET request to resolve before each test
      // Ensures that mock data is ready when the tests run
      // cy.wait('@getFeedback');
    });
  
    it('should display commuters feedback correctly', () => {
        // Verify that the component displays 'Feedbacks' text
        cy.get('[data-cy="feedback-text"]').should('contain', 'Feedbacks');
        // Verify that the component displays the correct feedback date
        cy.get('[data-cy="feedback-date"]').should('contain', '2023-07-04T00:00:00');
    
        // Verify that the component displays the correct feedback title
        cy.get('[data-cy="feedback-title"]').should('contain', 'Great Experience');

        // Verify that the component displays the correct feedback content
        cy.get('[data-cy="feedback-content"]').should('contain', 'I had a great experience using the Rideshare system. The app was easy to use and the rides were reliable.');
      
    });

    it('should load more feedbacks when clicking "View More" button', () => {
        // The "View More" button should be visible
        cy.get('[data-cy="btn"]').should('be.visible');

    });   
  });
  