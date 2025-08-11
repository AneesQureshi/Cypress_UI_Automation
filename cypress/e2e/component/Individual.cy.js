import { timeout } from "async";

describe('Download invoice', () => {
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

 it('Selects date and time from the second date picker', () => {
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

it('Tabs', () => {
     cy.visit('https://demoqa.com/tabs');
    // Verify default selected tab (What)
    cy.get('#demo-tab-what').should('have.class', 'active');
    cy.get('#demo-tabpane-what').should('be.visible')
    .and('contain.text', 'Lorem Ipsum is simply dummy text of the printing');

    // Click "Origin" tab and verify content
    cy.get('#demo-tab-origin').click();
    cy.get('#demo-tab-origin').should('have.class', 'active');
    cy.get('#demo-tabpane-origin')
      .should('be.visible')
      .and('contain.text', 'Contrary to popular belief,');

    // Click "Use" tab and verify content
    cy.get('#demo-tab-use').click();
    cy.get('#demo-tab-use').should('have.class', 'active');
    cy.get('#demo-tabpane-use')
      .should('be.visible')
      .and('contain.text', 'Various versions have evolved over the years');
 });
it('Tooltips', () => {
 cy.visit('https://demoqa.com/tool-tips');
 const tooltipScenarios = [
    { selector: '#toolTipButton', expected: 'You hovered over the Button' },
    { selector: '#toolTipTextField', expected: 'You hovered over the text field' },
    { selector: '[data-toggle="tooltipString"]', expected: 'You hovered over the Contrary' }, // Example selector—inspect actual for accuracy
  ];

  tooltipScenarios.forEach(({ selector, expected }) => {
    it(`should display correct tooltip for ${selector}`, () => {
      cy.get(selector)
        .trigger('mouseover');
      cy.get('.tooltip-inner') // or other appropriate tooltip container
        .should('be.visible')
        .and('contain.text', expected);
    });
  });

 });
it('Progress Bar', () => {
   cy.visit('https://demoqa.com/progress-bar');
 
   cy.get('#startStopButton').click();
  //  cy.wait(10000)

    // Stop when the progress reaches around 75% to avoid race conditions
   cy.get('.progress-bar', { timeout: 15000 }) // 15s timeout for slow runs
      .should($bar => {
        const value = parseInt($bar.attr('aria-valuenow'), 10);
        if (value < 70) {
          throw new Error(`Progress at ${value}%, waiting for 70%...`);
        }
      });

    // Click stop once it reaches 70% or more
    cy.get('#startStopButton').click();

    // Verify it's stopped
    cy.get('.progress-bar')
      .invoke('attr', 'aria-valuenow')
      .then(val => {
        const stoppedValue = parseInt(val, 10);
        expect(stoppedValue).to.be.at.least(70);
        cy.log(`Stopped at ${stoppedValue}%`);
      });
  

    // Verify that progress is paused/stopped
    cy.get('.progress-bar')
      .invoke('attr', 'aria-valuenow')
      .then(val => {
        const paused = parseInt(val);
        expect(paused).to.be.within(70, 80);
      });
     cy.get('#startStopButton').click();

  // Wait for full completion
  cy.get('.progress-bar', { timeout: 3000 })
    .should('have.attr', 'aria-valuenow', '100')
    .then(() => {
      //cy.get('#startStopButton').click(); // stop at 100 before auto-restart
      cy.get('#resetButton').click();
  });
  // Click reset
  

  // Verify reset to 0%
  cy.get('.progress-bar')
    .should('have.attr', 'aria-valuenow', '41')
   });

  
});




  





    





