describe("DIY Tagging (using cy-grep style)", () => {
  it( "runs as smoke", { tags: ["smoke"] }, () => {
    expect(true).to.equal(true);
  });

  it("runs as regression", { tags: ["regression"] }, () => {
    expect(true).to.equal(true);
  });

  it("runs as both smoke and regression", { tags: ["smoke", "regression"] }, () => {
    expect(true).to.equal(true);
  });

  it("runs always (no tags)", () => {
    expect(true).to.equal(true);
  });
});



// npx cypress run --env grepTags="smoke"
// The above command will execute only tests tagged with "smoke".
// Cypress will still load all spec files, but only the tests with the "smoke" tag will run.
// All other tests will be marked as pending (skipped).
// To run multiple tags, use a comma-separated list, e.g., --env grepTags="smoke,regression"
// To run tests without a specific tag, use the ~ operator, e.g., --env grepTags="~smoke"
// This will run all tests except those tagged with "smoke".
// To run tests with either of multiple tags, use the | operator, e.g., --env grepTags="smoke|regression"
// This will run tests tagged with either "smoke" or "regression".
// To run tests with all specified tags, use the & operator, e.g., --env grepTags="smoke&regression"
// This will run only tests tagged with both "smoke" and "regression".
// To run tests without any tags, use --env grepTags="none"
// This will execute only tests that do not have any tags assigned.
// You can combine these operators for complex filtering, e.g., --env grepTags="(smoke|regression)&~checkout"
// This will run tests that are tagged with either "smoke" or "regression" but not tagged with "checkout".
// Note: Ensure that the cypress-tags plugin is properly configured in your Cypress setup to use these features.
// See cypress.config.js for configuration details. 
// See taggedLoginCheckout.cy.js for more examples of tagging.
