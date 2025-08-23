// cypress/e2e/taggedLoginCheckout.cy.js

describe("Login flow", { tags: ["auth", "smoke"] }, () => {
  it("valid login works", { tags: ["smoke"] }, () => {
    cy.log("✔ Valid login executed")
    expect(2 + 2).to.eq(4)
  })

  it("invalid login shows error", { tags: ["regression"] }, () => {
    cy.log("✖ Invalid login tested")
    expect("error").to.contain("error")
  })
})

describe("Checkout flow", { tags: ["checkout"] }, () => {
  it("add item to cart", { tags: ["smoke", "cart"] }, () => {
    cy.log("🛒 Added item to cart")
    expect([1, 2, 3]).to.include(2)
  })

  it("apply coupon", { tags: ["regression", "coupon"] }, () => {
    cy.log("🏷 Applied coupon")
    expect("DISCOUNT10").to.match(/DISCOUNT/)
  })

  it("place order", () => {
    cy.log("📦 Placed order (no tags)")
    expect(true).to.be.true
  })
})
