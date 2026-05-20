import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  root: 'src',

  plugins: [tailwindcss()],

  build: {
    outDir: '../dist',
    emptyOutDir: true,
    manifest: true,

    rollupOptions: {
      input: 'main.js'
    }
  }
});