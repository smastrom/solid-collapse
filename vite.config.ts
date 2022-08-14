import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import dts from 'vite-plugin-dts';

import Package from './package.json';

export default defineConfig(({ mode }) => {
	if (mode === 'ci') {
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
				entry: 'src/index.ts',
				fileName: 'index',
				formats: ['es', 'cjs'],
			},
			rollupOptions: {
				external: ['solid-js', 'solid-js/web'],
			},
		},
		plugins: [
			solidPlugin(),
			dts({
				include: ['src/Collapse.tsx'],
			}),
		],
	};
});
