import '@4tw/cypress-drag-drop';

describe('Drag and drop', () => {
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
  });
  
  it('drags the box manually with mouse events', () => {
    cy.visit('https://demoqa.com/dragabble');

    cy.get('#dragBox')
      .should('be.visible')
      .then($el => {
        const el = $el[0];
        const rect = el.getBoundingClientRect();

        // Starting position
        cy.wrap($el)
          .trigger('mousedown', {
            button: 0,
            clientX: rect.x + rect.width / 2,
            clientY: rect.y + rect.height / 2,
            force: true
          });

        // Move to new position
        cy.get('body').trigger('mousemove', {
          button: 0,
          clientX: rect.x + rect.width / 2 + 150,
          clientY: rect.y + rect.height / 2 + 100,
          force: true
        });

        // Release mouse
        cy.get('body').trigger('mouseup', { force: true });
      });

    // Verify the transform changed
    cy.get('#dragBox').should($el => {
      const transform = $el.css('transform');
      expect(transform).not.to.equal('none');
    });
  });
});
