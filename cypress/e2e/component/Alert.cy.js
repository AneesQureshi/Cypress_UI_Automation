describe('DemoQA Alerts handling', () => {
  
  beforeEach(() => {
    cy.visit('https://demoqa.com/alerts');
  });

  it('waits for alert and asserts its text', () => {
    // Listen for window:alert
    cy.window().then((win) => {
      cy.stub(win, 'alert').as('alertStub');
    });

    // Click button to trigger alert after 5 seconds
    cy.get('#timerAlertButton').click();

    // Wait for 6 seconds to ensure alert is triggered
    cy.wait(6000);

    // Assert alert was called with expected text
    cy.get('@alertStub').should('have.been.calledOnceWith', 'This alert appeared after 5 seconds');
  });

  it('handles immediate alert', () => {
    cy.window().then((win) => {
      cy.stub(win, 'alert').as('alertStub');
    });

    cy.get('#alertButton').click();

    cy.get('@alertStub').should('have.been.calledOnceWith', 'You clicked a button');
  });

});
