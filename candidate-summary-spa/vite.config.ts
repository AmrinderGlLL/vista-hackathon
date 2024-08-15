import path from 'path';
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
	define: {
		'process.env': process.env
	},
	plugins: [
		tsconfigPaths(),
		react()
	],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src')
		}
	},
	server: {
		port: 4000,
		open: true
	},
	test: {
		// This is needed to ignore unhandled errors in tests
		// when testing API error handling because queries throw errors
		// that Vitest thinks are unhandled
		dangerouslyIgnoreUnhandledErrors: true,
		testTimeout: 60000,
		pool: 'forks',
		restoreMocks: true,
		mockReset: true,
		unstubGlobals: true,
		globals: true,
		environment: 'jsdom',
		setupFiles: ['./src/setupTests.ts'],
		reporters: [
			'default',
			['vitest-sonar-reporter', { outputFile: 'test-report.xml' }]
		],
		coverage: {
			provider: 'v8',
			reporter: ['lcov', 'cobertura', 'text'],
			reportsDirectory: './coverage',
			include: [
				'src/**/*.{js,jsx,ts,tsx}',
			],
			exclude: [
				'src/{main,App}.{jsx,tsx}',
				'src/config/**/*',
				'src/**/*.test.{js,jsx,ts,tsx}',
				'src/setupTests.{js,ts,tsx}',
				'src/test-utils/**/*',
				'src/**/*.d.ts',
				'src/types/**/*',
				'__mocks__/**/*',
				'public/**/*'
			]
		}
	},
	build: {
		commonjsOptions: {
			transformMixedEsModules: true
		},
		sourcemap: true,
		outDir: 'build',
		assetsDir: 'static',
		rollupOptions: {
			output: {
				entryFileNames: 'static/js/main.js'
			}
		}
	}
})
