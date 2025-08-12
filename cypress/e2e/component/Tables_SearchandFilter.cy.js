describe('DemoQA Web Tables - Search & Filter', () => {
  beforeEach(() => {
    const blockedDomains = [
      '**/securepubads.g.doubleclick.net/**',
      '**/pagead2.googlesyndication.com/**',
      '**/google-analytics.com/**',
      '**/googletagmanager.com/**',
      '**/ads.pubmatic.com/**',
      '**/id5-sync.com/**',
      '**/oajs.openx.net/**',
      '**/bcp.crwdcntrl.net/**',
      '**/ep1.adtrafficquality.google/**'
    ];

    blockedDomains.forEach(domain => {
      cy.intercept(domain, { statusCode: 404 });
    });   
    cy.visit('https://demoqa.com/webtables');
  });

  it('filters records by first name', () => {
    cy.get('#searchBox').clear().type('Cierra');

    // Verify only rows containing 'Cierra' are shown
    cy.get('.rt-tbody .rt-tr-group').each(($row) => {
      cy.wrap($row).should('contain.text', 'Cierra');
    });

    // Row count should be at least 1
    cy.get('.rt-tbody .rt-tr-group').should('have.length.at.least', 1);
  });

  it('filters records by email', () => {
    cy.get('#searchBox').clear().type('kierra@example.com');

    cy.get('.rt-tbody .rt-tr-group').should('have.length', 1)
      .and('contain.text', 'Kierra');
  });

  it('returns no results for invalid search', () => {
    cy.get('#searchBox').clear().type('NotAUser123');

    // Check "No rows found" placeholder
    cy.get('.rt-noData').should('contain.text', 'No rows found');
  });

  it('resets filter when search is cleared', () => {
    // First search
    cy.get('#searchBox').clear().type('Alden');
    cy.get('.rt-tbody .rt-tr-group').should('have.length.at.least', 1);

    // Clear search
    cy.get('#searchBox').clear();
    cy.get('.rt-tbody .rt-tr-group').should('have.length.greaterThan', 1);
  });
});
