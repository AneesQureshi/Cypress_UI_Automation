// cypress/e2e/api-ui-hybrid-books.cy.js
describe('API-UI Hybrid Login on ToolsQA Bookstore', () => {
  it('logs in via API and validates book list in UI', () => {
    // Step 1: Login via API
    cy.request({
      method: 'POST',
      url: 'https://bookstore.toolsqa.com/Account/v1/Login',
      body: {
        userName: 'TOOLSQA-Test',
        password: 'Test@123'
      }
    }).then((response) => {
      expect(response.status).to.eq(200)
      const token = response.body.token
      const userId = response.body.userId

      // Step 2: Save token in localStorage (Bookstore app checks localStorage)
      window.localStorage.setItem('token', token)
      window.localStorage.setItem('userID', userId)
      window.localStorage.setItem('userName', 'TOOLSQA-Test')
    })

    // Step 3: Visit Books UI
    cy.visit('https://demoqa.com/books')

    // Step 4: Validate book list loads
    cy.get('.rt-tbody .rt-tr-group').should('have.length.greaterThan', 0)

    // Extra: Validate a specific book title from the UI
    cy.contains('Git Pocket Guide').should('be.visible')
  })
})
