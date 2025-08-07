class homePage{

    clickLogout(){
       cy.get(' a[href="/logout"]').click()
    }

    clickContinue(){
        cy.get('[data-qa="continue-button"]').click()
    }
}

export default homePage;