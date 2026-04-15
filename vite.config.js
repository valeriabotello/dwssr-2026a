// importamos la funcion de configuración de Vite
import { defineConfig } from 'vite'; 

// importamos un resolvedor de rutas para poder usar alias en las rutas de importación
import { resolve } from 'node:path';

// exportamos la instancia de configuración de Vite
export default defineConfig({
    // Directorio raiz de los archivos fuente 
    root: 'src',

    // configuracion del servidor de desarrollo de front-end
    server: {
        // puerto en el que se ejecutará el servidor de desarrollo
        port: 5173,
        strictPort: true, // Si el puerto está en uso, no intenta usar otro puerto
    },

    // configuracion del build
    build: {
        // directorio de salida de los archivos compilados
        outDir: '../dist',
        // limpia el directorio de salida antes de cada compilación
        emptyOutDir: true,
        // generar un manifiesto de los archivos compilados
        manifest: true,
        // configuracion de rollup para la compilación
        rollupOptions: {
            // punto de entrada de la aplicación
            input: {
                main: resolve(__dirname, 'src/main.js'),
            }
        }
    },

    // configuracion para desarrollo 
    publicDir: false, // No se sirve ningún archivo estático
});