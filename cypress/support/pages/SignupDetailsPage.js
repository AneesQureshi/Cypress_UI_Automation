class SignupDetailsPage {
  selectTitle(title = 'Mr') {
    if (title === 'Mr') {
      cy.get('#id_gender1').check();
    } else {
      cy.get('#id_gender2').check();
    }
  }

  enterPassword(password) {
    cy.get('[data-qa="password"]').type(password);
  }

  selectDOB(day, month, year) {
    cy.get('[data-qa="days"]').select(day);
    cy.get('[data-qa="months"]').select(month);
    cy.get('[data-qa="years"]') .select(year);
  }

  checkNewsletter() {
    cy.get('#newsletter').check();
  }

  checkOffers() {
    cy.get('#optin').check();
  }

  clickCreateAccount() {
    cy.get('button[data-qa="create-account"]').click();
  }

  verifyHeader(header) {
    cy.contains(header).should('be.visible');
  }

  
   verifyUrl(url) {
      cy.url().should('include', url);
  }

}

export default SignupDetailsPage;
