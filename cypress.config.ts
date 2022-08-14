import { defineConfig } from 'cypress';

export default defineConfig({
	e2e: {
		setupNodeEvents() {},
	},
	env: {
		CYPRESS_URL:
			process.env.NODE_ENV === 'DEV' ? 'http://localhost:3000' : 'http://localhost:4173',
	},
});
