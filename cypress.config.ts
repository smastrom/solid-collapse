import { defineConfig } from 'cypress';

export default defineConfig({
	e2e: {
		supportFile: false,
		setupNodeEvents() {},
	},
	env: {
		CYPRESS_URL: 'http://localhost:4173',
	},
});
