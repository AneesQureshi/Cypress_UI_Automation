// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import 'cypress-file-upload';

import Login from "./pages/Login";  

Cypress.Commands.add('generateRandomUser', () => {
  const randomStr = Math.random().toString(36).substring(2, 10);
  const name = `User${randomStr}`;
  const email = `${randomStr}@mail.com`;
  return { name, email };
});
Cypress.Commands.add('LoginFunc',()=>{
  const login =new Login()
        login.visit();
        login.enterEmail('muhammadanish201111@gmail.com')
        login.enterPassword('12345678')
        login.clickLogin();

})
Cypress.Commands.add('appendUserToFixture', (newUser) => {
  const filePath = 'cypress/fixtures/generatedUser.json';
  let newArray;

  cy.readFile(filePath, { log: false, timeout: 1000 })
    .then((data) => {
            cy.log('📄 Before append:', JSON.stringify(data, null, 2));
      let usersArray = [];

      if (Array.isArray(data)) {
        usersArray = data;
      } else if (typeof data === 'object' && data !== null) {
      
        usersArray = [data];
      }

      usersArray.push(newUser);
 newArray=[...usersArray]
       cy.log('✅ After append:', JSON.stringify(usersArray, null, 2));
     cy.log('✅ After append:', JSON.stringify(newArray, null, 2));

     
      cy.writeFile(filePath, newArray, { log: false });
    })
    .then(null, () => {
      
      cy.writeFile(filePath, newArray, { log: false });
    });
});
