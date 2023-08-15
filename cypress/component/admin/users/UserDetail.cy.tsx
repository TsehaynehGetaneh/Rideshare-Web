import { Provider } from "react-redux";
import { store } from "@/store/store";
import UserDetail from "@/components/admin/users/UserDetail";

describe("UserDetail Component", () => {
  beforeEach(() => {
    // Intercept the GET request and respond with the fixture data
    cy.intercept('GET', 'https://rideshare-swdm.onrender.com/api/users/withAGiven/*', {
      fixture: 'admin/users/userDetail.json',
    }).as('getUser');

    // Mount the component
    cy.mount(
      <Provider store={store}>
        <UserDetail id='12b3c4d5-67e8-490f-1a2b-123456789008' />
      </Provider>
    );

    // cy.wait('@getUser');
  });

  it('should display user details correctly', () => {
    // Get the user role data
    cy.get('[data-cy="role"]').should('contain', 'Commuter');
    // Should contain 'Account Detail' text
    cy.get('[data-cy="account-detail"]').should('contain', 'Account Detail');
    // Get the fullName data
    cy.get('[data-cy="username"]').should('contain', 'Tsehayneh Getaneh');
    // Get the phoneNumber data
    cy.get('[data-cy="phone-number"]').should('contain', '+251911111108');
    // Get the user statusByLogin data
    cy.get('[data-cy="status"]').should('contain', 'Inactive');
  });
});