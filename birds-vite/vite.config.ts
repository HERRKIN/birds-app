import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';


export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), '');

	return {
		plugins: [react(), tailwindcss()],
		server: {
			proxy: {
				'/api/graphql': env.GRAPHQL_ENDPOINT,
			},
			hmr: {
				overlay: false
			},
			watch: {
				usePolling: false,
				ignored: ['**/node_modules/**', '**/dist/**']
			},
			fs: {
				strict: false
			}
		},
		build: {
			minify: 'terser',
			rollupOptions: {
				output: {
					manualChunks: {
						vendor: ['react', 'react-dom'],
						apollo: ['@apollo/client', 'graphql']
					}
				}
			}
		},
		optimizeDeps: {
			include: ['react', 'react-dom', '@apollo/client', 'graphql'],
		},
		esbuild: {
			target: 'esnext',
			supported: {
				'top-level-await': true
			}
		}
	};
});
