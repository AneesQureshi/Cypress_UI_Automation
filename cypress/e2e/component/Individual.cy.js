describe('Download invoice', () => {
  beforeEach(() => {
    const blockedDomains = [
      '**/ad.doubleclick.net/**',
      '**/google-analytics.com/**',
      '**/googletagmanager.com/**',
      '**/ads.pubmatic.com/**',
      '**/https://securepubads.g.doubleclick.net/**',
    ];

    blockedDomains.forEach(domain => {
      cy.intercept('GET', domain, { statusCode: 404 });
    });
  });

  it('Download invoice', () => {
    cy.visit('https://automationexercise.com/payment_done/6200');

    cy.intercept('GET', '/download_invoice/6200').as('downloadInvoice');
    cy.get('a[href="/download_invoice/6200"]').click();
    cy.wait('@downloadInvoice')
      .its('response.statusCode')
      .should('eq', 200);
  });

  it('Accordion expand/collapse test', () => {
    cy.visit('https://demoqa.com/accordian');

    cy.get('#section1Content').should('be.visible');
    cy.get('#section1Heading').click();
    cy.get('#section1Content').should('not.be.visible');
    cy.get('#section1Heading').click();
    cy.get('#section1Content').should('be.visible');

    cy.get('#section2Content').should('not.be.visible');
    cy.get('#section2Heading').click();
    cy.get('#section2Content').should('be.visible');
    cy.get('#section2Heading').click();
    cy.get('#section2Content').should('not.be.visible');

    cy.get('#section3Content').should('not.be.visible');
    cy.get('#section3Heading').click();
    cy.get('#section3Content').should('be.visible');
  });

  it('Autocomplete-Multiple', () => {
    cy.visit('https://demoqa.com/auto-complete');

    const colors = ['Red', 'Blue', 'Green'];

    colors.forEach(color => {
      cy.get('.css-2b097c-container').eq(0).type(color.substring(0, 2));
      cy.get('.auto-complete__menu-list').contains(color).click();
      cy.get('#autoCompleteMultipleInput').should('have.value', '');
    });

    colors.forEach(color => {
      cy.get('.auto-complete__multi-value__label')
        .contains(color)
        .should('be.visible');
    });
  });

  it('Autocomplete-single', () => {
    cy.visit('https://demoqa.com/auto-complete');

    const color = 'Red';

    cy.get('.auto-complete__value-container').eq(1).type(color.substring(0, 1));
    cy.get('.auto-complete__menu-list').contains(color).click();

    cy.get('.auto-complete__value-container').should('have.value', '');
    cy.get('.auto-complete__value-container').contains(color).should('be.visible');

    cy.get('.auto-complete__single-value')
      .should('exist')
      .and('be.visible')
      .and('contain.text', color)
      .and('have.text', color);
  });

  it('DatePickerDropdown', () => {
    cy.visit('https://demoqa.com/date-picker');
    cy.get('#datePickerMonthYearInput').click()
    cy.get('.react-datepicker__year-select').select('1987')
    cy.get('.react-datepicker__month-select').select('December')
     cy.get('.react-datepicker__day').contains(/^13$/) // exact match to avoid matching e.g. 130 or 213
    .click();
     cy.get('#datePickerMonthYearInput').should('have.value','12/13/1987')
 });

 it.only('Selects date and time from the second date picker', () => {
  const targetYear = '1987';
  const targetMonth = 'December';
  const targetDay = '13';
  const targetTime = '10:30';
  cy.visit('https://demoqa.com/date-picker');
  cy.get('#dateAndTimePickerInput').click();
  cy.get('.react-datepicker__year-read-view--down-arrow').click();
//  cy.get('.react-datepicker__year-option').each(($el, index, $list) => {
//   if ($el.text().trim() === targetYear) {
//     cy.wrap($el).click();
//   } else {
//     cy.get('.react-datepicker__navigation.react-datepicker__navigation--years.react-datepicker__navigation--years-previous').click();
//   }
// });

//using recursion
function selectYear(targetYear) {
  cy.get('.react-datepicker__year-read-view--down-arrow').click({force: true});

  function checkYear() {
  cy.get('.react-datepicker__year-option').then($els => {
    // Find the element whose text equals targetYear
    const yearEl = [...$els].find(el => el.innerText.trim() === targetYear);

    if (yearEl) {
      // Found the exact year, click it
      cy.wrap(yearEl).click();
    } else {
      // Find min and max years visible to decide which arrow to click
      const years = [...$els].map(el => parseInt(el.innerText.trim())).filter(n => !isNaN(n));
      const minYear = Math.min(...years);
      const maxYear = Math.max(...years);
      const targetYearNum = parseInt(targetYear);

      if (targetYearNum < minYear) {
        // targetYear is before visible years, click previous to scroll down years
        cy.get('.react-datepicker__navigation--years-previous').click();
       // cy.wait(200);
        checkYear();
      } else if (targetYearNum > maxYear) {
        // targetYear is after visible years, click upcoming to scroll up years
        cy.get('.react-datepicker__navigation--years-upcoming').click();
       //cy.wait(200);
        checkYear();
      } else {
        // The targetYear is not found but lies within visible range (rare)
        // Just click the closest year or handle as fallback
        cy.wrap($els[0]).click();
      }
    }
  });
}

checkYear();
}


selectYear(targetYear);


  cy.get('.react-datepicker__month-read-view--down-arrow').click();
  cy.get('.react-datepicker__month-option').contains(targetMonth).click();
  cy.contains('.react-datepicker__day', new RegExp(`^${targetDay}$`)).click();
  cy.get('.react-datepicker__time-list').contains(targetTime).click();
  cy.get('#dateAndTimePickerInput').should('contain.value', `${targetMonth} ${targetDay}, ${targetYear}`);
});

});

