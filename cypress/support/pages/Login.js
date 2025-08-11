class Login{

    visit(){
        cy.visit('https://automationexercise.com/login')    
    }

    enterEmail(email){
        cy.get('[data-qa="login-email"]').type(email)
    }

    enterPassword(password){
        cy.get('[data-qa="login-password"]').type(password)
    }

    clickLogin(){
        cy.get('[data-qa="login-button"]').click()
    }

    verifyHeader(header) {
    cy.contains(header).should('be.visible');
  }
  verifyLogoutLink(text){
    cy.get('a[href="/logout"]').should('be.visible');
    cy.contains(text).should('be.visible');
  }
verifyInvalidCredentials(header,text){
    cy.contains(header).should('not.exist');
    cy.get('a[href="/logout"]').should('not.exist');
    cy.contains(text).should('not.exist');
    cy.contains('Your email or password is incorrect!').should('be.visible');
}

}
export default Login;