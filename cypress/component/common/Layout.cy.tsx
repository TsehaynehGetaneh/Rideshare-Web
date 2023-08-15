import React from "react";
import Layout from "./Layout";
import { Provider } from "react-redux";
import { store } from "@/store/store";

describe("<Layout />", () => {
  beforeEach(() => {
    cy.mount(
      <Provider store={store}>
        <Layout>
          <div>Test</div>
        </Layout>
      </Provider>
    );
  });
  it("checks", () => {
    // Assert NavBar is rendered
    cy.get('div[test-id="navbar"]').should("be.visible");

    // Assert children content is rendered
    cy.contains("Test").should("be.visible");

    // Assert Footer is rendered
    cy.get('div[test-id="footer"]').should("be.visible");
  });
});
