import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// 👇 This tells Vite to look inside the /client folder for index.html
export default defineConfig({
  root: 'client',
  build: {
    outDir: '../dist', // build output goes one level up
    emptyOutDir: true,
  },
  plugins: [react()],
});
