import React from 'react'
import { getRequestStatus } from './Status'
import { mount } from 'cypress/react18';



describe('getRequestStatus Function', () => {
  const status_map = {
    0: "Waiting",
    1: "OnRoute",
    2: "Completed",
    3: "Canceled",
    4: "None",
  };

  Object.entries(status_map).forEach(([status, statusText]) => {
    it(`returns the correct status component for status value ${status}`, () => {
      mount(getRequestStatus(Number(status)));

      cy.get('div,h2,span').should('exist');
      cy.get('h2,span').invoke('text').should('match', new RegExp(statusText, 'i'));

      switch (Number(status)) {
        case 0:
          cy.get('div').should('have.class', 'bg-orange-100');
          cy.get('h2').should('have.class', 'text-orange-500');
          break;
        case 1:
          cy.get('div').should('have.class', 'bg-indigo-200');
          cy.get('h2').should('have.class', 'text-indigo-500');
          break;
        case 2:
          cy.get('div').should('have.class', 'bg-emerald-100/60');
          cy.get('h2').should('have.class', 'text-emerald-500');
          break;
        case 3:
          cy.get('div').should('have.class', 'bg-red-100');
          cy.get('h2').should('have.class', 'text-red-500');
          break;
        default:
          cy.get('span').should('have.class', 'bg-gray-100');
          cy.get('span').invoke('text').should('match', new RegExp(statusText.toLowerCase(), 'i'));
          break;
      }
    });
  });
});
