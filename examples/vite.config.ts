import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import prismjs from 'vite-plugin-prismjs';

export default defineConfig({
	plugins: [
		solidPlugin(),
		prismjs({
			languages: ['jsx'],
		}),
	],
	esbuild: {
		drop: ['debugger'],
	},
	server: {
		port: 3000,
	},
	build: {
		target: 'esnext',
	},
});
