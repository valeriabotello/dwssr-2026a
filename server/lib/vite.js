import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
   
// Obtener la ruta del directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//helper para handlebars que genera etiquetas de vite 
//en desarrollo: conecta al servidor de vite
//en producción: usa los archivos compilados del manifest
export function viteAssets() {
    const isDev = process.env.VITE_DEV_SERVER !== 'production';
    const viteDevServer = process.env.VITE_DEV_SERVER || 'http://localhost:5173';

    if (isDev) {
        //En desarrollo, cargamos el codigo para el front-end desde el servidor de Vite
        // /@vite/client da acceso a un servidor HMR (Hot Module Replacement) que actualiza el navegador automáticamente cuando se hacen cambios en el código fuente
        // main.js es el punto de entrada de la aplicación front-end, que se encuentra en el directorio raíz del proyecto
        return `
            <script type="module" src="${viteDevServer}/@vite/client"></script>
            <script type="module" src="${viteDevServer}/main.js"></script>  
        `;
    }
    // EN MODO PRODUCCIÓN, CARGAMOS LOS ARCHIVOS COMPILADOS DESDE EL MANIFEST
const manifestPath = path.join(__dirname, '..','..', 'dist','vite', 'manifest.json');
//verificamos que el manifest exista
if (!fs.existsSync(manifestPath)) {     
    console.warn('Vite manifest not found. "Run npm run build" first ');
    return '';
}
  // parseando el manifest
  const manifest = JSON.parse(
    fs.readFileSync(manifestPath, 'utf-8')
);
// obtenemos el nombre del archivo compilado a partir del manifest
const mainJs = manifest['main.js'];
// verificamos la correcta carga de mainENTRY
if (!mainJs) {
    console.warn('main.js not found in Vite manifest.');
    return '';
}
//CREANDO LA VARIABLE QUE CONTENDRA LA ETIQUETA DE LOS SCRIPTS DEL FRONT END
let tags = "";

//css files
if (mainEntry.css) {
    mainEntry.css.forEach(cssFile => {
        tags += `<script type="stylesheet" src="/${cssFile}"></script>`;

    });
}
//JS files
tags += `<script type="stylesheet" src="/${mainEntry.file}"></script>`;
return tags;
}

// REGISTAR EL HELPER 
export function registerViteHelper(hbs) {
    hbs.registerHelper( 
        'viteAssets',
         () => new hbs.SafeString(viteAssets())
    )
    
}

