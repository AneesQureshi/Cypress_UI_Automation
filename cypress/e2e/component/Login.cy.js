import { data } from "ospath";
import Register from "../../support/pages/Register"
import SignupAddressPage from "../../support/pages/SignupAddressPage";
import SignupDetailsPage from "../../support/pages/SignupDetailsPage";
import { date } from "assert-plus";
import { timestamp } from "rxjs";
import Login from "../../support/pages/Login";

describe("Login", function () {

    const register = new Register();
    const login = new Login()


    it('Login with valid credentials', function () {

        //first page
        login.visit();
        login.enterEmail('muhammadanish201111@gmail.com')
        login.enterPassword('12345678')

        login.clickLogin();
        //second page
        // signupdetails.verifyHeader('Enter Account Information');//assertion
        login.verifyHeader('AutomationExercise')
        login.verifyLogoutLink('Logout')

    })
    it.only('Login with invalid credentials', function () {

        //first page
        login.visit();
        login.enterEmail('Invalidmuhammadanish201111@gmail.com')
        login.enterPassword('Invalid12345asdf678')

        login.clickLogin();
        //second page
        // signupdetails.verifyHeader('Enter Account Information');//assertion
        login.verifyInvalidCredentials('AutomationExercise','Logout')

    })
})