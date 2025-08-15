describe('GET Products - Network Failure', () => {
  it('should handle network failure', () => {
    // Intercept and force network error
    // cy.intercept('GET', 'https://dummyjson.com/products', {
    //   forceNetworkError: true
    // }).as('failedRequest');

    // Load the HTML fixture dynamically
    cy.visit('cypress/support/pages/network.html'); // relative path served by Cypress


    // Trigger the request by clicking the button
    cy.get('#loadProductsBtn').click();

    // Assert that Cypress saw the network failure
    cy.wait('@failedRequest').its('error').should('exist');

    // Assert that UI shows failure message
    cy.get('#productsList').should('contain.text', 'Failed to load products');
  });
});
