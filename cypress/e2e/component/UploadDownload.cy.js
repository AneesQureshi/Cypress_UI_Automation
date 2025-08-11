describe('DemoQA Upload & Download', () => {
  const testFile = 'sample.txt';

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


    // Prepare a test file fixture in cypress/fixtures named 'sample.txt'
    cy.writeFile(`cypress/fixtures/${testFile}`, 'Hello, DemoQA!');
    
  });

  beforeEach(() => {
    cy.visit('https://demoqa.com/upload-download');
  });

  it('uploads a file successfully', () => {
    // Upload the file
    cy.get('input#uploadFile').attachFile(testFile);

    // Verify the displayed uploaded path includes filename
    cy.get('#uploadedFilePath')
      .should('be.visible')
      .and('contain.text', testFile);
  });

  it('downloads the file successfully', () => {
    // Intercept the download request
    cy.intercept('GET', '**/download?*').as('fileDownload');

    // Click download
    cy.get('#downloadButton').click();

    // Wait for the request
   // cy.wait('@fileDownload').its('response.statusCode').should('eq', 200);

    // Confirm the file is downloaded locally
    const downloadsFolder = Cypress.config('downloadsFolder');
   
const testFile = 'sampleFile.jpeg';
 cy.readFile(`${downloadsFolder}/${testFile}`, null, { timeout: 15000 })
  .should(buffer => {
    expect(buffer.length).to.be.gt(0);
  });

  });
  });

