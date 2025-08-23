import AlertPage from '../../support/pages/AlertPage';

describe('DemoQA Alerts handling', () => {
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
      '**/ep1.adtrafficquality.google/**',
      '**/gumi.criteo.com/**',
      '**/serving.stat-rock.com/**',
      '**/securepubads.g.doubleclick.net/gampad/ads**',
      '**/oajs.openx.net/esp**'
    ];

    blockedDomains.forEach(domain => {
      cy.intercept(domain, { statusCode: 404 });
    });
    AlertPage.visit();
  });

  it('waits for alert and asserts its text', () => {
    AlertPage.stubAlert();
    AlertPage.timerAlertButton.click();
    cy.wait(6000);
    cy.get('@alertStub').should('have.been.calledOnceWith', 'This alert appeared after 5 seconds');
  });

  it('handles immediate alert',  () => {
    AlertPage.stubAlert();
    AlertPage.alertButton.click();
    cy.get('@alertStub').should('have.been.calledOnceWith', 'You clicked a button');
  });
});
