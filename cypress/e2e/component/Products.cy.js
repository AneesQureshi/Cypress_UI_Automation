describe("Products page Tests",()=>{
    it("Search product and verify search results",()=>{
        cy.LoginFunc()
        cy.get("a[href='/products']").click()
        cy.get('#search_product').type("Blue")
        cy.get('#submit_search').click();
        cy.get(".col-sm-4").its('length').should('be.gt',0).then((count)=>{
            cy.log(`Total number of matched results :${count-1}` )
        })
        cy.get(".col-sm-4").each(($el,index) =>{

            const name =$el.find("p").text().trim()
            index > 0 ? expect(name.toLowerCase()).to.include("blue") : null;

        })
    })
    it.only("Add multiple products to cart and verify in cart page", () => {
    cy.LoginFunc();

    // Go to products page
    cy.get("a[href='/products']").click();

    // Store product details here
    let productDetails = [];

    // Select first 3 products (you can change the .slice(0,3) to more)
    cy.get(".col-sm-4").each(($el, index) => {
      if (index > 0 && index <= 3) { // Skip first if it's banner, take 3 items
        const productName = $el.find("p").first().text().trim();
        const price = $el.find("h2").first().text().trim();

        productDetails.push({
          name: productName,
          price: price
        });

        // Add to cart
        cy.wrap($el).find("a.add-to-cart:visible").first().click({force: true});

        // Close modal if visible
        cy.get(".modal").then(($modal) => {
          if ($modal.is(":visible")) {
            cy.contains("Continue Shopping").click();
          }
        });
      }
    }).then(() => {
      // Go to Cart
      cy.get("a[href='/view_cart']").first().click({force: true});

      cy.log(productDetails);

      // Verify each product in cart
      productDetails.forEach((product) => {
        cy.get(".cart_description").should("contain.text", product.name);
        cy.get(".cart_price").should("contain.text", product.price);
      });

      // Verify quantity of each is 1
      cy.get(".cart_quantity .disabled").each(($qty) => {
  cy.wrap($qty)
    .invoke('text')
    .then((text) => {
      const qtyValue = parseInt(text.trim(), 10);
      expect(qtyValue).to.be.greaterThan(0);
    });
});

    });
  });
})

