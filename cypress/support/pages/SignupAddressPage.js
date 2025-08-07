import locators from '../locators/signupAddressLocators';

class SignupAddressPage {
  typeInField(selector, value) {
    cy.get(selector).clear().type(value);
  }

  selectDropdown(selector, value) {
    cy.get(selector).select(value);
  }

  enterFirstName(firstName) {
    this.typeInField(locators.firstName, firstName);
  }

  enterLastName(lastName) {
    this.typeInField(locators.lastName, lastName);
  }

  enterCompany(company) {
    this.typeInField(locators.company, company);
  }

  enterAddress1(address1) {
    this.typeInField(locators.address1, address1);
  }

  enterAddress2(address2) {
    this.typeInField(locators.address2, address2);
  }

  selectCountry(country) {
    this.selectDropdown(locators.country, country);
  }

  enterState(state) {
    this.typeInField(locators.state, state);
  }

  enterCity(city) {
    this.typeInField(locators.city, city);
  }

  enterZipcode(zip) {
    this.typeInField(locators.zipcode, zip);
  }

  enterMobileNumber(mobile) {
    this.typeInField(locators.mobileNumber, mobile);
  }

  clickCreateAccount() {
    cy.get(locators.createAccountButton).click();
  }

  fillAddressDetails(details) {
    this.enterFirstName(details.firstName);
    this.enterLastName(details.lastName);
    this.enterCompany(details.company);
    this.enterAddress1(details.address1);
    this.enterAddress2(details.address2);
    this.selectCountry(details.country);
    this.enterState(details.state);
    this.enterCity(details.city);
    this.enterZipcode(details.zipcode);
    this.enterMobileNumber(details.mobile);
  }
}

export default SignupAddressPage;
