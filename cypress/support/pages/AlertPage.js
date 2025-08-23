class AlertPage {
  visit() {
    cy.visit('https://demoqa.com/alerts');
  }

  get timerAlertButton() {
    return cy.get('#timerAlertButton');
  }

  get alertButton() {
    return cy.get('#alertButton');
  }

  stubAlert() {
    cy.window().then(win => {
      cy.stub(win, 'alert').as('alertStub');
    });
  }
}

export default new AlertPage();