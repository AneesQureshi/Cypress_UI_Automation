describe('Browser Windows Page', () => {

  beforeEach(() => {
    // Block ads/tracking requests
    const blockedDomains = [
      '**/securepubads.g.doubleclick.net/**',
      '**/pagead2.googlesyndication.com/**',
      '**/google-analytics.com/**',
      '**/googletagmanager.com/**',
      '**/ads.pubmatic.com/**',
      '**/id5-sync.com/**',
      '**/oajs.openx.net/**',
      '**/bcp.crwdcntrl.net/**',
      '**/ep1.adtrafficquality.google/**',
      '**/gumi.criteo.com/**',
      '**/serving.stat-rock.com/**',
      '**/securepubads.g.doubleclick.net/gampad/ads**',
      '**/oajs.openx.net/esp**'
    ];
    blockedDomains.forEach(domain => {
      cy.intercept(domain, { statusCode: 404 });
    });

    cy.visit('https://demoqa.com/browser-windows');
  });

  it('Test New Tab', () => {
    let newTabUrl = '';

    cy.window().then((win) => {
      cy.stub(win, 'open').callsFake((url) => {
        newTabUrl = url;
      });
    });

    cy.get('#tabButton').click();

    cy.then(() => {
      const finalUrl = newTabUrl.startsWith('http')
        ? newTabUrl
        : `https://demoqa.com${newTabUrl}`;

      cy.visit(finalUrl);
      cy.contains('This is a sample page').should('be.visible');
    });
  });

  it('Test New Window', () => {
    let newWindowUrl = '';

    cy.window().then((win) => {
      cy.stub(win, 'open').callsFake((url) => {
        newWindowUrl = url;
      });
    });

    cy.get('#windowButton').click();

    cy.then(() => {
      const finalUrl = newWindowUrl.startsWith('http')
        ? newWindowUrl
        : `https://demoqa.com${newWindowUrl}`;

      cy.visit(finalUrl);
      cy.contains('This is a sample page').should('be.visible');
    });
  });

  it('Test New Window Message', () => {
  let writtenContent = '';

  cy.window().then((win) => {
    const fakeWindow = {
      document: {
        write: (html) => { writtenContent = html; }
      }
    };
    cy.stub(win, 'open').callsFake(() => fakeWindow).as('openWindow');
  });

  cy.get('#messageWindowButton').click();

  cy.get('@openWindow').should('have.been.calledOnce');
  cy.then(() => {
    expect(writtenContent).to.include('Knowledge increases by sharing');
  });
});

});
