describe('cy.intercept() Playground', () => {

  beforeEach(() => {
    // Load our HTML page from fixtures
    cy.visit('cypress/fixtures/testpage.html');
  });

  it('1️⃣ Simple Success Response', () => {
    cy.intercept('GET', '/api/products?page=1', { fixture: 'products.json' }).as('getProducts');
    cy.reload();
    cy.wait('@getProducts');
    cy.get('.product-item').should('have.length', 3);
  });

  it('2️⃣ Fake an Error', () => {
    cy.intercept('GET', '/api/products?page=1', {
      statusCode: 500,
      body: { message: 'Server error' }
    }).as('getProductsError');
    cy.reload();
    cy.wait('@getProductsError');
    cy.get('.error-message').should('contain', 'Server error');
  });

  it('3️⃣ Delay the Response', () => {
    cy.intercept('GET', '/api/products?page=1', {
      delay: 1000,
      fixture: 'products.json'
    }).as('getProducts');
    cy.reload();
    cy.get('.loading-spinner').should('be.visible');
    cy.wait('@getProducts');
    cy.get('.product-item').should('exist');
  });

  it('4️⃣ Check Request Body (POST)', () => {
    cy.intercept('POST', '/api/users', (req) => {
      expect(req.body.name).to.eq('John Doe');
      req.reply({ id: 101, name: 'John Doe' });
    }).as('createUser');

    cy.get('#name-input').type('John Doe');
    cy.get('#submit-btn').click();
    cy.wait('@createUser');
    cy.get('.user-item').should('contain', 'John Doe');
  });

  it('5️⃣ Pagination with Different Responses', () => {
    cy.intercept('GET', '/api/products?page=1', { fixture: 'page1.json' }).as('page1');
    cy.intercept('GET', '/api/products?page=2', { fixture: 'page2.json' }).as('page2');

    cy.reload();
    cy.wait('@page1');
    cy.get('.next-page-btn').click();
    cy.wait('@page2');
    cy.get('.product-item').should('have.length', 2);
  });

});
