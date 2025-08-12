import { number } from "assert-plus";
import { map } from "bluebird";

describe("Pagination Test", () => {
    beforeEach(() => {
        cy.visit('https://datatables.net/examples/basic_init/alt_pagination.html')

    })
    it("First page is visible", () => {

        // Verify page 1 is active
        cy.get('.current').should('contain.text', '1')

        // Check first row on page 1
        cy.get('#example tbody tr').first().should('contain.text', 'Airi Satou');

        // Click page 2
        cy.get('.dt-paging-button').contains(2).click()

        // Verify page 2 is active
        cy.get('.current').should('contain.text', '2')
        // Check first row on page 2 has expected content
        cy.get('#example tbody tr').first().should('contain.text', 'Charde Marshall');
        // Click "Next" button
        cy.get('.next').click()
        // Verify page 3 is active
        cy.get('.current').should('contain.text', '3')
        // Click last page button
        cy.get('.dt-paging-button').last().click()
        // Verify last page is active
        cy.get('.current').should('have.class', 'dt-paging-button')
        // Assert at least one row is visible on last page
        cy.get('#example tbody tr').last().should('have.length.greaterThan', 0)


    })

    it('sorts by salary in ascending order', () => {

        cy.get('.dt-column-title').contains('Salary').click()
        //cy.wait(5000)
        cy.get('#example tbody tr td:nth-child(6)').then($cells => {
            const salaries = [...$cells].map(el =>
                Number(el.innerText.replace(/[^0-9.-]+/g, '')) // remove $ and commas
            );

            const sorted = [...salaries].sort((a, b) => a - b);
            cy.log(sorted)
            cy.log(salaries)
            cy.log('Actual:', salaries.join(', '));
        cy.log('Expected:', sorted.join(', '));
            expect(salaries).to.deep.equal(sorted);
            console.log('Sorted:', sorted);
console.log('Salaries:', salaries);
            
        });
    });

it.only('filters records by name', () => {
    cy.get('input[type="search"]').type('Tokyo');
    cy.get('#example tbody tr').each($row => {
      cy.wrap($row).should('contain.text', 'Tokyo');
    });
  });

  it.only('changes page length to 25', () => {
    cy.get('#dt-length-0').select('25');
    cy.get('#example tbody tr').should('have.length', 25);
  });
});
