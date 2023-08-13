import React from 'react'
import TotalCommuters from './TotalSummary'
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

  it("renders", () => {
    
  })

})