const { title } = require("process");

describe('Environment Switching Example', () => {
  it('should visit home page', () => {
    const envName = Cypress.env('environment') || 'dev';

    
 // Assert page content
    const expected = {
      dev:  { id: 1, title: 'Essence Mascara Lash Princess' },
      stage:{ id: 2, title: 'Eyeshadow Palette with Mirror' },
      prod: { id: 3, title: 'Powder Canister' },
    };
    const url = Cypress.config('baseUrl');

    // Visit the baseUrl defined in cypress.config.js
   cy.request(url).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.headers['content-type']).to.include('application/json');
      expect(res.body).to.have.property('id', expected[envName].id);
      expect(res.body).to.have.property('title', expected[envName].title);
      expect(url).to.include(`/products/${expected[envName].id}`);
    });



   
   // run from below command 
   // npx cypress run --env environment=stage --spec "cypress/e2e/integration/Environment.cy.js"
  });
});
