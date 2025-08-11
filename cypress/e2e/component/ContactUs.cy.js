describe('Form file upload', function () {

    it("Login with valid credentials", function () {

        cy.LoginFunc()
        cy.get("a[href='/contact_us']").click()
        cy.get("input[data-qa='name']").type("Anish")
        cy.get("input[data-qa='email']").type("muhammad@123")
        cy.get("input[data-qa='subject']").type("Subject")
        cy.get('[data-qa="message"]').type("message")
        const fileName = 'Anish.pdf';
        cy.get('input[name="upload_file"]').attachFile(fileName);
        cy.get('[data-qa="submit-button"]').click()
        cy.get('.status').should('have.text', 'Success! Your details have been submitted successfully.');

    })

    it.only("Verify all products have all details and product detail page", function () {
        cy.LoginFunc()
        cy.get("a[href='/products']").click()
var CountProduct=0;
cy.get('.col-sm-4').its('length').should('be.gt', 0).then((count)=>{
    cy.log(`Total number of products :${count-1}`);
})

    cy.get('.col-sm-4').each(($el, index) => {
CountProduct=CountProduct+1;
  // Get price
  const price = $el.find('h2').text().trim();
//cy.log(price);
  // Get title
  const title = $el.find('p').first().text().trim();
//cy.log(title);
  // Get Add to Cart button text
  const addToCartText = $el.find('a.add-to-cart').text().trim();
//cy.log(addToCartText);
  // Get View Product link text and URL
  const viewProductText = $el.find('a[href*="product_details"]').text().trim();
  const viewProductUrl = $el.find('a[href*="product_details"]').attr('href');

//   cy.log(`Product ${index + 1}: ${title} - ${price}`);
//   cy.log(`Add to Cart: ${addToCartText}`);
//   cy.log(`View Product: ${viewProductText} (${viewProductUrl})`);

  // Assertions (optional)
  if(index>0){
  expect(price).to.not.be.empty;
  expect(title).to.not.be.empty;
  expect(viewProductText.trim()).to.equal("View Product");
  expect(viewProductUrl).to.include('/product_details/');
  }

}).then(()=>{
cy.log(`Total number of products  :${CountProduct-1}`)
})




    })

})