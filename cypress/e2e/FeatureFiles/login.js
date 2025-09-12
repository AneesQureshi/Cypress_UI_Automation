// cypress/e2e/login/login.js
import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'
import Login from '../../support/pages/Login';

const login = new Login();

Given('the user is on the login page', () => {
  login.visit();
  
})

When('the user enters valid credentials', () => {
   login.enterEmail("muhammadanish201111@gmail.com");
    login.enterPassword("12345678");
})

When('clicks Login', () => {
 login.clickLogin();
})

Then('the user lands on the dashboard', () => {
  login.verifyHeader("AutomationExercise");
    login.verifyLogoutLink("Logout");
})
