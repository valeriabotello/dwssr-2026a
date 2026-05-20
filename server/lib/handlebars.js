import path from "node:path";
import { fileURLToPath } from "node:url";

// 🔥 Importando el motor de plantillas Handlebars
import { create as createHbsEngine } from "express-handlebars";

// 🔥 Importar configuración de Vite
import { registerViteHelper } from "./vite.js";

// 🔥 Creando constantes de rutas
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 🔥 Exportamos la función de configuración
export function configureHandlebars(app) {

  // 🔥 Crear instancia del motor Handlebars
  const exphbs = createHbsEngine({
    extname: ".hbs",
    defaultLayout: "main",
  });

  // 🔥 Registrar helper de Vite
  registerViteHelper(exphbs.handlebars);

  // 🔥 Integrar Handlebars al servidor

  // 1️⃣ Registrar motor
  app.engine("hbs", exphbs.engine);

  // 2️⃣ Establecer extensión de vistas
  app.set("view engine", "hbs");

  // 3️⃣ Establecer carpeta de vistas
  app.set(
    "views",
    path.join(__dirname, "..", "views")
  );
}