import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    host: true,        // 🔥 necesario en remoto
    port: 5173,
    strictPort: true
  }
});