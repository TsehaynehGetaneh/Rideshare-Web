import React from 'react'
import RideRequestList from './RideRequestList'
import { mount } from 'cypress/react18'


describe('RideRequestList Component', () => {
  beforeEach(() => {
    // Stub the API calls
    cy.intercept('GET', '/api/ride-requests', { fixture: 'rideRequests.json' })
    cy.intercept('GET', '/api/filter-ride-requests', { fixture: 'filteredRideRequests.json' })

    mount(<RideRequestList />)
  })

  it('renders the ride request list correctly', () => {
    cy.get('table').should('be.visible') // Check if the table is visible
  })

  it('handles search correctly', () => {
    cy.get('input[type="text"]').type('John') // Type 'John' into the search input
    cy.get('input[type="text"]').should('have.value', 'John') // Check if the input value is 'John'
  })

  it('handles status selection correctly', () => {
    cy.get('select').select('completed') // Select 'completed' from the dropdown
    cy.get('select').should('have.value', 'completed') // Check if the selected value is 'completed'
  })
})
