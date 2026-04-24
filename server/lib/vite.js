import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Corrección de __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Helper para handlebars que genera las etiquetas de vite
 * en desarrollo: conecta al servidor de vite
 * en producción: usa los archivos compilados del manifest
 */

export function viteAssets() {
    const isDev = process.env.NODE_ENV !== 'production';
    const viteDevServer = process.env.VITE_DEV_SERVER || 'http://localhost:5173';

    if (isDev) {
        return `
        <script type="module" src="${viteDevServer}/@vite/client"></script>
        <script type="module" src="${viteDevServer}/main.js"></script>
        `;
    }

    // Ruta correcta del manifest
    const manifestPath = path.join(__dirname, '..', '..', 'dist', '.vite', 'manifest.json');

    if (!fs.existsSync(manifestPath)) {
        console.warn('Vite manifest not found. Run "npm run build" first');
        return '';
    }

    const manifest = JSON.parse(
        fs.readFileSync(manifestPath, 'utf-8')
    );

    const mainEntry = manifest['src/main.js'];

    if (!mainEntry) {
        console.warn('main.js entry not found in Vite manifest');
        return '';
    }

    let tags = '';

    // CSS files
    if (mainEntry.css) {
        mainEntry.css.forEach(cssFile => {
            tags += `<link rel="stylesheet" href="/${cssFile}">`;
        });
    }

    tags += `<script type="module" src="/${mainEntry.file}"></script>`;

    return tags;
}

// Registrar el helper
export function registerViteHelper(hbs) {
    hbs.registerHelper(
        'viteAssets',
        () => new hbs.SafeString(viteAssets())
    );
}