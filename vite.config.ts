// import path from 'path';
// import { defineConfig } from 'vite';
// import MillionLint from '@million/lint'

// // https://vitejs.dev/config/
// export default defineConfig({
// 	plugins: [MillionLint.vite()],
// 	resolve: {
// 		alias: {
// 			'@': path.resolve(__dirname, './src'),
// 		},
// 	},
// });

import path from 'path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
});

