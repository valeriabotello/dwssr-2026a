// importo la función de configuración de Vite
import { defineConfig } from 'vite';

// impporto un resolvedor de rutas
import { resolve } from 'node:path';

// exporto una instancia de configuración de Vite
export default defineConfig({
  // directorio raíz de los archivos fuente
    root: 'src',
  // Configuración del servidor
  // de desarrollo de front-end
  server: {
    port: 5173,
    strictPort: true //Git no busca otros puerto

  },

  // Configuración del build
  build: {   
    // directorio de salida para los archivos construidos
    outDir: '../dist',
    emptyOutDir: true,
    // generando manifiesto
    manifest: true,
    rollupOptions: {
      input: {
      main: resolve(__dirname, 'src/main.js')
    }
    },
  },

})