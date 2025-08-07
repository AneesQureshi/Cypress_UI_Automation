class Util {
  generateUser() {
    return cy.generateRandomUser().then((user) => {
      const name = user.name;
      const email = user.email;
      return { name, email }; 
    });
  }
}
export default Util;
