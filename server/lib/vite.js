import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(__filename);

/** * Helper para handlebars que genera las etiquetas
 * de vite
 * en desarrollo: conecta al seviro de vite
 * en producción: Usa los archivos compilados
 * del manifest 
 */

export function viteAssets() {
    const isDev = process.env.NODE_ENV !== 'production';
    const viteDevServer = process.env.VITE_DEV_SERVER || 'http://localhost:5173';

    if (isDev) {
        // En desarrollo, cargamos el codigo para el front-end
        // directamente del servidor de vite
        // /@vite/client es necesario para que funcione el HMR (Hot Module Replacement)
        // /main.js front-end entry point
        return `
        <script type="module" src="${viteDevServer}/@vite/client"></script>
        <script type="module" src="${viteDevServer}/main.js"></script>
        `;
    }

    // En producción, obtetiendo la ruta de el manifest 
    const manifestPath = path.join(__dirname,'..','..','dist','.vite','manifest.json');

    // Verificamos que el manifest exista
    if (!fs.existsSync(manifestPath)) {
        console.warn('Vite manifest not found. Run "npm run build" first');
        return '';
    }

    // Parseando el manifest 
    const manifest = JSON.parse(
        fs.readFileSync(manifestPath, 'utf-8')
    );

    // obtener el punto de entrada de los scripts del front-end
    const mainEntry = manifest['src/main.js'];

    // Verificando la correcta carga del mainEntry
    if(!mainEntry) {
        console.warn('main.js entry not found in Vite manifest');
        return '';
    }

    // Creando la vaariable que contendra la 
    // etiqueta de los scripts del front-end
    let tags= '';

    // CSS files
    if (mainEntry.css) {
        mainEntry.css.forEach(cssFile => {
            tags += `<link rel="stylesheet" href="/${cssFile}">`;
        });
    }
    tags += `<script type="module" src="/${mainEntry.file}"></script>`;

    return tags;
} 

// Registrar el HELPER
export function registerViteHelper(hbs) {
    hbs.registerHelper(
        'viteAssets',
        () => new hbs.SafeString(viteAssets()) 
    )
}