describe('DemoQA Web Tables - CRUD & DOM Traversal', () => {
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

  // Utility to open the registration modal
  const openModal = () => {
    cy.get('#addNewRecordButton').click();
    cy.get('#firstName').should('be.visible');
  };

  // Fill and submit form
  const fillForm = (user) => {
    cy.get('#firstName').clear().type(user.firstName);
    cy.get('#lastName').clear().type(user.lastName);
    cy.get('#userEmail').clear().type(user.email);
    cy.get('#age').clear().type(`${user.age}`);
    cy.get('#salary').clear().type(`${user.salary}`);
    cy.get('#department').clear().type(user.department);
    cy.get('#submit').click();
  }

    it('adds a new record', () => {
    const newUser = {
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'janedoe@gmail.com',
      age: 28,
      salary: 50000,
      department: 'Engineering'
    };
    openModal();
    fillForm(newUser);

    // Verify new row is present via email
    cy.contains('div.rt-tr-group', newUser.email)
      .should('exist')
      .find('.rt-td')
      .then(cells => {
        expect(cells[0]).to.contain.text(newUser.firstName);
        expect(cells[1]).to.contain.text(newUser.lastName);
        expect(cells[2]).to.contain.text(newUser.age);
        expect(cells[3]).to.contain.text(newUser.email);
        expect(cells[4]).to.contain.text(newUser.salary);
        expect(cells[5]).to.contain.text(newUser.department);
      });
  });

    it('searches and edits a record', () => {
    cy.get('#searchBox').type('Alden');
    cy.contains('div.rt-tr-group', 'Alden')
      .find('[title="Edit"]').click();

    cy.get('#firstName').should('have.value', 'Alden')
      .clear().type('Alex');
    cy.get('#submit').click();

    // Assert updated name in table
    cy.contains('div.rt-tr-group', 'Alex').should('exist');
  });

    it('searches and edits a record', () => {
    cy.get('#searchBox').type('Alden');
    cy.contains('div.rt-tr-group', 'Alden')
      .find('[title="Edit"]').click();

    cy.get('#firstName').should('have.value', 'Alden')
      .clear().type('Alex');
    cy.get('#submit').click();

    // Assert updated name in table
    cy.contains('div.rt-tr-group', 'Alex').should('exist');
  });


    it('edits a record and verifies changes', () => {
    cy.contains('.rt-td', 'Cantrell')
      .parent()           // tr
      .parent()           // rt-tr-group
      .within(() => {
        cy.get('[title="Edit"]').click();
      });

    cy.get('#department').clear().type('Research');
    cy.get('#submit').click();

    cy.contains('div.rt-tr-group', 'Cantrell')
      .find('.rt-td').eq(5).should('contain.text', 'Research');
  });
    it('deletes a record', () => {
    const emailToDelete = 'cierra@example.com';
    cy.contains('div.rt-tr-group', emailToDelete)
      .within(() => {
        cy.get('[title="Delete"]').click();
      });

    cy.contains('div.rt-tr-group', emailToDelete).should('not.exist');
  });

  it.only('adds then deletes and confirms absence', () => {
    const user = {
      firstName: 'Test',
      lastName: 'User',
      email: 'testuser@gmail.com',
      age: 30,
      salary: 40000,
      department: 'QA'
    };
    openModal();
    fillForm(user);

    cy.contains('div.rt-tr-group', user.email)
      .within(() => cy.get('[title="Delete"]').click());
    cy.contains('div.rt-tr-group', user.email).should('not.exist');
  });
});



