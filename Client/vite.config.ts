import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'), // Apunta a la carpeta `src`
    }
  },
  server: {
    proxy: {
      '/api/hotels': {
        target: 'https://api.test.hotelbeds.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/hotels/, '/hotel-content-api/1.0/hotels'),
      },
    },
  },
});
