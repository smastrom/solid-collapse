describe('Attributes', () => {
	it('should have hidden styles applied on mount', () => {
		cy.visit('http://localhost:3000');
		const collapse = cy.get('[data-testid="test-basic"]');

		collapse
			.should('have.class', 'transition')
			.and('have.css', 'overflow', 'hidden')
			.and('have.css', 'height', '0px')
			.and('have.css', 'display', 'none');
	});

	it('should never have different styles on mount', () => {
		cy.visit('http://localhost:3000');
		const collapse = cy.get('[data-testid="test-basic"]');

		collapse
			.should('not.have.css', 'overflow', '')
			.and('not.have.css', 'height', '')
			.and('not.have.css', 'display', 'block');
	});
});
