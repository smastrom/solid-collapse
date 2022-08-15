/** Following tests are done with a transition of 300ms as
 * CSS class in vite/index.css */

const trigger = '#button';
const collapse = '#collapse';
const transition = 300;
const repeatTimes = 10;
const repeat = new Array(repeatTimes).fill(undefined);
const CYPRESS_URL = Cypress.env('CYPRESS_URL');

describe('CSS properties', () => {
	beforeEach(() => {
		cy.visit(CYPRESS_URL);
		cy.viewport('macbook-15');
	});

	it('Should have hidden styles applied on mount/idle', () => {
		cy.get(collapse)
			.should('have.class', 'transition')
			.and('have.css', 'overflow', 'hidden')
			.and('have.css', 'height', '0px')
			.and('have.css', 'display', 'none');

		cy.get(collapse)
			.should('not.have.css', 'overflow', 'visible')
			.and('not.have.css', 'height', '')
			.and('not.have.css', 'display', 'block');
	});

	it('Should change styles as soon as open is triggered (next frame)', () => {
		cy.get(trigger).click();

		cy.get(collapse)
			.should('have.css', 'overflow', 'visible')
			.and('have.css', 'display', 'block');
	});

	it('Should never have display none if clickspamming', () => {
		repeat.forEach(() => {
			cy.get(trigger).click();
			cy.get(collapse)
				.should('have.css', 'display', 'block')
				.and('not.have.css', 'display', 'none');

			cy.wait(transition / 2)
				.get(trigger)
				.click();

			cy.get(collapse)
				.should('have.css', 'display', 'block')
				.and('not.have.css', 'display', 'none');
		});
	});

	it(`Should never have height 0 if clickspamming`, () => {
		repeat.forEach(() => {
			cy.get(trigger).click();
			cy.get(collapse).should('not.have.css', 'height', '0px');

			cy.wait(transition / 2)
				.get(trigger)
				.click();

			cy.get(collapse).should('not.have.css', 'height', '0px');
		});
	});

	it('Should have height 0 only after transition is ended', () => {
		repeat.forEach(() => {
			cy.get(trigger).click();
			cy.get(collapse).should('not.have.css', 'height', '0px');

			cy.wait(transition + 50);
			cy.get(trigger).click();

			cy.wait(transition + 50);
			cy.get(collapse).should('have.css', 'height', '0px');
		});
	});
});

describe('Height in-depth', () => {
	beforeEach(() => {
		cy.visit(CYPRESS_URL);
		cy.viewport('macbook-15');
	});

	it(`After complete transition height value should match scrollHeight if opened,
	and equal to zero if closed`, () => {
		repeat.forEach((_, index) => {
			let scrollHeight;

			cy.get(trigger).click();
			cy.wait(transition);

			cy.document().then((doc) => {
				// @ts-ignore
				scrollHeight = doc.getElementById('collapse').scrollHeight;
				cy.get(collapse).invoke('height').should('eq', scrollHeight);
			});

			cy.get(trigger).click();
			cy.wait(transition);
			cy.document().then((doc) => {
				cy.get(collapse).invoke('height').should('eq', 0);
			});
		});
	});

	it('Height should always be lower than scrollHeight if clickspamming ', () => {
		repeat.forEach(() => {
			cy.get(trigger).click();
			cy.document().then((doc) => {
				// @ts-ignore
				const scrollHeight = doc.getElementById('collapse').scrollHeight;
				cy.wait(100);
				cy.get(collapse).invoke('height').should('be.below', scrollHeight);
			});
		});
	});
});

describe('Resize', () => {
	beforeEach(() => {
		cy.visit(CYPRESS_URL);
		cy.viewport('macbook-15');
	});

	describe("Collapse behavior/transition doesn't interfere with height when container width changes", () => {
		it('Should be different if resizing with collapse opened', () => {
			let scrollHeight: number;

			repeat.forEach((_, index) => {
				if (index === 0) {
					cy.get(trigger).click();
					cy.wait(transition);
				}
				cy.document().then((doc) => {
					if (index === 0) {
						// @ts-ignore
						scrollHeight = doc.getElementById('collapse').scrollHeight;
					}

					cy.get(collapse).invoke('height').should('eq', scrollHeight);

					repeat.forEach(() => {
						cy.viewport('iphone-x');
						cy.get(collapse).invoke('height').should('not.eq', scrollHeight);
						cy.get(collapse).invoke('height').should('be.greaterThan', scrollHeight);

						cy.viewport('macbook-15');
						cy.get(collapse).invoke('height').should('eq', scrollHeight);
					});
				});
			});
		});

		it('Should be different everytime collapse is opened at different container widths', () => {
			let scrollHeight: number;

			repeat.forEach((_, index) => {
				cy.get(trigger).click(); // Open
				cy.wait(transition);

				cy.document().then((doc) => {
					if (index === 0) {
						// @ts-ignore
						scrollHeight = doc.getElementById('collapse').scrollHeight;
					}
					cy.get(trigger).click(); // Close
					cy.wait(transition);

					cy.viewport('iphone-x');
					cy.get(trigger).click(); // Open
					cy.wait(transition);
					cy.get(collapse).invoke('height').should('be.greaterThan', scrollHeight);
					cy.get(trigger).click(); // Close
					cy.wait(transition);

					cy.viewport('macbook-15');
					cy.get(trigger).click(); // Open
					cy.wait(transition);
					cy.get(collapse).invoke('height').should('eq', scrollHeight);
					cy.get(trigger).click(); // Close
					cy.wait(transition);
				});
			});
		});
	});
});

export {};
