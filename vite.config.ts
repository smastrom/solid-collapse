import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

import Package from './package.json';

export default defineConfig({
	plugins: [solidPlugin()],
	server: {
		port: 3000,
	},
	build: {
		lib: {
			name: Package.name,
			entry: 'src/index.ts',
			fileName: 'index',
			formats: ['es'],
		},
		rollupOptions: {
			external: ['solid-js', 'solid-js/web'],
		},
	},
});
