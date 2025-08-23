import Register from "../../support/pages/Register";
import SignupAddressPage from "../../support/pages/SignupAddressPage";
import SignupDetailsPage from "../../support/pages/SignupDetailsPage";
import Login from "../../support/pages/Login";
const onFlyTag = Cypress.env("grepTags");   

describe("Login", function () {
  const register = new Register();
  const login = new Login();

  it("Login with valid credentials", function () {
    login.visit();
    login.enterEmail("muhammadanish201111@gmail.com");
    login.enterPassword("12345678");
    login.clickLogin();

    login.verifyHeader("AutomationExercise");
    login.verifyLogoutLink("Logout");
  });

  it("Login with invalid credentials",  function () {
    login.visit();
    login.enterEmail("Invalidmuhammadanish201111@gmail.com");
    login.enterPassword("Invalid12345asdf678");
    login.clickLogin();

    login.verifyInvalidCredentials("Your email or password is incorrect!");
  });
});
