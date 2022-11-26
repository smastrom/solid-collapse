import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

import Package from './package.json';

export default defineConfig(({ mode }) => {
	if (mode === 'app') {
		return {
			plugins: [solidPlugin()],
		};
	}
	return {
		server: {
			port: 3000,
		},
		build: {
			lib: {
				name: Package.name,
				entry: 'src/Collapse.tsx',
				fileName: 'index',
				formats: ['es', 'cjs'],
			},
			rollupOptions: {
				external: ['solid-js', 'solid-js/web'],
			},
		},
		plugins: [solidPlugin()],
	};
});
