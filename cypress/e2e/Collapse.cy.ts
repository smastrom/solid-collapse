const CYPRESS_URL = Cypress.env('CYPRESS_URL');

const TOGGLE = '#single_btn';
const COLLAPSE = '#single_collapse';

describe('CSS properties', () => {
	beforeEach(() => {
		cy.visit(CYPRESS_URL);
		cy.viewport('macbook-15');
	});

	it('Should have correct styles when collapsed', () => {
		cy.get(COLLAPSE)
			.should('have.css', 'display', 'none')
			.and('have.css', 'padding', '0px')
			.and('not.have.css', 'transition', '')
			.and('not.have.css', 'overflow', 'hidden')
			.should((element) => {
				/**
				 * https://github.com/cypress-io/cypress/issues/6309
				 */
				expect(getComputedStyle(element[0]).height).to.eq('auto');
			});
	});

	it('Should have correct styles when expanded', () => {
		cy.get(TOGGLE).click();
		cy.get(COLLAPSE)
			.should('have.css', 'padding', '0px')
			.and('not.have.css', 'transition', '')
			.and('not.have.css', 'display', 'none')
			.and('not.have.css', 'overflow', 'hidden');
	});

	it('Should change height if resizing on expanded', () => {
		cy.get(TOGGLE).click();
		cy.wait(300);

		for (let i = 0; i < 20; i++) {
			cy.get(COLLAPSE)
				.invoke('height')
				.then((desktopHeight) => {
					cy.viewport('iphone-x');
					cy.wait(300);
					cy.get('#single_collapse').invoke('height').should('be.greaterThan', desktopHeight);
				})
				.then((mobileHeight) => {
					cy.viewport('macbook-13');
					cy.wait(300);
					cy.get('#single_collapse').invoke('height').should('be.lessThan', mobileHeight);
				});
		}
	});
});

export {};
