class Login{

    visit(){
        cy.visit('https://automationexercise.com/login')
    }

    enterUsername(username){
        cy.get('[data-qa="signup-name"]').type(username)
    }

    enterEmail(email){
        cy.get('[data-qa="signup-email"]').type(email)
    }

    clickSignUp(){
        cy.get('[data-qa="signup-button"]').click()
    }

}
export default Login;