import fs from 'node:fs';
import path from 'node:path';

export function viteAssets() {
    // FORZAMOS MODO PRODUCCIÓN TEMPORALMENTE para ver si cargan los archivos de dist
    const manifestPath = path.join(process.cwd(), 'dist', '.vite', 'manifest.json');
    
    if (fs.existsSync(manifestPath)) {
        const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
        const mainEntry = manifest['main.js'] || manifest['src/main.js'];

        if (mainEntry) {
            let tags = '';
            if (mainEntry.css) {
                mainEntry.css.forEach(cssFile => {
                    // Agregamos un timestamp para saltar el caché del navegador
                    tags += `<link rel="stylesheet" href="/${cssFile}?v=${Date.now()}">`;
                });
            }
            tags += `<script type="module" src="/${mainEntry.file}"></script>`;
            return tags;
        }
    }

    // Si no hay manifest, intenta conectar al servidor dev
    return `
        <script type="module" src="http://localhost:5173/@vite/client"></script>
        <script type="module" src="http://localhost:5173/main.js"></script>
    `;
}

export function registerViteHelper(hbs) {
    hbs.registerHelper('vite', () => new hbs.SafeString(viteAssets()));
}