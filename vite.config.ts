import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
dotenv.config();

export default defineConfig({
  plugins: [react(), tsconfigPaths()],

  resolve: {
    preserveSymlinks: true,
    alias: {
      '@components': resolve(__dirname, 'components'), // Assuming your components are in a 'components' folder
      // Add other aliases as needed
      '@assets': resolve(__dirname, 'assets'),
      '@hooks': resolve(__dirname, 'hooks'),
      '@utils': resolve(__dirname, 'utils'),
      '@views': resolve(__dirname, 'views'),
      '@providers': resolve(__dirname, 'providers'),
      '@constants': resolve(__dirname, 'constants'),
      '@type': resolve(__dirname, 'type'),
      '@services': resolve(__dirname, 'services'),
      '@context': resolve(__dirname, 'context'),

      // Add more aliases as per your project structure
    },
  },
  // define: {
  //   'process.env': process.env,
  // },

  preview: {
    port: 3000,
    strictPort: true,
    host: true,
  },
  server: {
    port: 3000,
  },
});
