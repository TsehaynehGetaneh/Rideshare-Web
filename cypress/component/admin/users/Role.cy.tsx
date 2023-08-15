import Role from "@/components/admin/users/Role";

describe('Role component', () => {
  it('renders Commuter role with default textSize', () => {
    cy.mount(<Role role="Commuter" />);
    cy.get('p').should('have.class', 'text-xs');
    cy.get('p').should('have.class', 'text-cyan-500');
    cy.contains('Commuter').should('exist');
  });

  it('renders Driver role with textSize set to "text-base"', () => {
    cy.mount(<Role role="Driver" textSize="text-base" />);
    cy.get('p').should('have.class', 'text-base');
    cy.get('p').should('have.class', 'text-fuchsia-500');
    cy.contains('Driver').should('exist');
  });

  it('renders Admin role with textSize set to "text-lg"', () => {
    cy.mount(<Role role="Admin" textSize="text-lg" />);
    cy.get('p').should('have.class', 'text-lg');
    cy.get('p').should('have.class', 'text-orange-500');
    cy.contains('Admin').should('exist');
  });

  it('renders all roles when role is All', () => {
    cy.mount(<Role role="All" />);
    cy.get('div').should('exist');
  });
});