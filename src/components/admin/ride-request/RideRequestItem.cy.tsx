import React from 'react'
import RideRequestItem from './RideRequestItem'
import { getRequestStatus } from './Status'
import { mount } from 'cypress/react18'
import {status_map} from './Status';



describe('RideRequestItem Component', () => {
  
  const rideRequest = {
    id: 1,
    name: 'John Doe',
    origin: 'Origin',
    destination: 'Destination',
    currentFare: 10,
    status: 1,
    numberOfSeats: 2
  }

  beforeEach(() => {
    mount(<RideRequestItem {...rideRequest} />)
  })

  it('renders the ride request item correctly', () => {
    cy.get('td').contains(rideRequest.name).should('be.visible')
    cy.get('td').contains(rideRequest.origin).should('be.visible')
    cy.get('td').contains(rideRequest.destination).should('be.visible')
    cy.get('td').contains(rideRequest.currentFare).should('be.visible')
    cy.get('td').contains(rideRequest.numberOfSeats).should('be.visible')

    const statusText = status_map[rideRequest.status as keyof typeof status_map];

    cy.get('td').find('h2').contains(statusText).should('be.visible')
  })
})
