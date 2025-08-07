import Register from "../../support/pages/Register";
import SignupAddressPage from "../../support/pages/SignupAddressPage";
import SignupDetailsPage from "../../support/pages/SignupDetailsPage";
import homePage from "../../support/pages/HomePage";
import Util from "../../support/pages/util";





describe("Registration", function () {

    const register = new Register();
    const signupdetails = new SignupDetailsPage()
    const signupAddress = new SignupAddressPage()
    const homePagedetails = new homePage()
 

    let sharedUser;
    let name
    let email
    let addressDetails; 


    beforeEach(() => {
        const util = new Util();

        cy.fixture("addressDetails").then((data) => {
      addressDetails = data;
    });
        return util.generateUser().then((user) => {
            sharedUser = user;
            name = sharedUser.name
            email = sharedUser.email
            cy.appendUserToFixture(user);
        });
    });


    it.only('Signup with valid credentials', function () {

        //first page
        register.visit();
        register.enterUsername(name)
        register.enterEmail(email)
        register.clickSignUp();
        //second page
        signupdetails.verifyHeader('Enter Account Information');//assertion

        signupdetails.selectTitle('Mr')
        signupdetails.enterPassword("12345678")
        signupdetails.selectDOB('13', 'December', '1987')
        signupdetails.checkNewsletter()
        signupdetails.checkOffers()
        
        signupAddress.fillAddressDetails(addressDetails)
        signupAddress.clickCreateAccount()

        signupdetails.verifyUrl('/account_created')
        signupdetails.verifyHeader('Account Created!')


    })

    it('Signup with invalid credentials', function () {
        const invalidEmail = `${name}email.com`; 
        register.visit();
        register.enterUsername(name)
        register.enterEmail(invalidEmail)
        register.clickSignUp();

        cy.get('[data-qa="signup-email"]').then(($input) => {
            expect($input[0].checkValidity()).to.be.false;
        });
        cy.get('[data-qa="signup-email"]').then(($input) => {
            cy.log($input[0].validationMessage); 
        });

    })
    it('Duplicate email registration', function () {



        // first registration
        register.visit();
        register.enterUsername(name)
        register.enterEmail(email)
        register.clickSignUp();

        signupdetails.verifyHeader('Enter Account Information');//assertion

        signupdetails.selectTitle('Mr')
        signupdetails.enterPassword("12345678")
        signupdetails.selectDOB('13', 'December', '1987')
        signupdetails.checkNewsletter()
        signupdetails.checkOffers()

        signupAddress.fillAddressDetails(addressDetails)
        signupAddress.clickCreateAccount()
        signupdetails.verifyUrl('/account_created')
        signupdetails.verifyHeader('Account Created!')

        homePagedetails.clickContinue()
        homePagedetails.clickLogout()


        //second registration
        register.enterUsername(name)
        register.enterEmail(email)
        register.clickSignUp();
        cy.contains('Email Address already exist!').should('be.visible');

    })
})
