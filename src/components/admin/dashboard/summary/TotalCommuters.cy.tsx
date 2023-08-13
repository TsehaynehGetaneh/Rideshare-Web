import React from 'react'
import TotalCommuters from './TotalCommuters'
import { Provider } from 'react-redux';
import { store } from '@/store/store';

describe('<TotalCommuters />', () => {
  beforeEach("hello", () => {
    cy.mount(
      <Provider store={store}>
        <TotalCommuters />
      </Provider>
    
    );
  })
  it('renders', () => {
    cy.get('.text-primary').should("be.visible");
    cy.get('.text-xs').should("be.visible");
    cy.get('.text-xs').contains("Total");
    cy.get('.flex > svg').should("be.visible");
    cy.get('.text-sm').should("be.visible");

  })
})