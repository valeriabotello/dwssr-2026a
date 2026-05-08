import express from 'express';
import path from 'node:path';
import hbs from 'hbs';
import indexRouter from './routes/index.js';
import authorRouter from './routes/author.js'; // Importar
import { registerViteHelper } from './lib/vite.js';
import morgan from morgan;



const app = express();

app.set('view engine', 'hbs');
app.set('views', path.join(process.cwd(), 'server', 'views'));

registerViteHelper(hbs);

// Archivos estáticos (Para que se vea la foto en public/images)
app.use(express.static(path.join(process.cwd(), 'public')));
app.use(express.static(path.join(process.cwd(), 'dist')));

// Rutas
app.use('/', indexRouter);
app.use('/author', authorRouter); // Conectar ruta /author

export default app;