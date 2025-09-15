import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import path from 'path';


export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit(),
		{
			apply: 'build',
			name: 'vite-plugin-ignore-sourcemap-warnings',
			configResolved(config) {
				const originalOnWarn = config.build.rollupOptions.onwarn;
				config.build.rollupOptions.onwarn = (warning, warn) => {
					if (
						warning.code === 'SOURCEMAP_BROKEN' &&
						warning.plugin === '@tailwindcss/vite:generate:build'
					) {
						return;
					}

					if (originalOnWarn) {
						originalOnWarn(warning, warn);
					} else {
						warn(warning);
					}
				};
			}
		},
	],
	resolve: {
		alias: [
			{
				find: '$lib',
				replacement: path.resolve('./src/lib')
			},
			{
				find: '@',
				replacement: path.resolve('./src')
			}
		]
	},
	define: {
		global: 'globalThis'
	},
	build: {
		chunkSizeWarningLimit: 1500, // in kB
		sourcemap: process.env.NODE_ENV !== 'production'
	},
});
