const CYPRESS_URL = Cypress.env('CYPRESS_URL');

describe('CSS properties', () => {
	beforeEach(() => {
		cy.visit(CYPRESS_URL);
		cy.viewport('macbook-15');
	});
	it('Should have default styles if collapsed on mount', () => {
		cy.get('#single_collapse')
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
});

export {};
