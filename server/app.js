import createError from 'http-errors';
import express from 'express';
import path from 'node:path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { fileURLToPath } from 'url';
import hbs from 'hbs';
import { createProxyMiddleware } from 'http-proxy-middleware';

import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';
import authorRouter from './routes/author.js';
import { registerViteHelper } from './lib/vite.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

/* vistas */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

hbs.registerPartials(path.join(__dirname, 'views'));
registerViteHelper(hbs);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

/* archivos estáticos */
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../dist/vite')));

/* rutas */
app.use(['/', '/index'], indexRouter);
app.use('/users', usersRouter);
app.use('/author', authorRouter);

/* 🔥 PROXY SOLO PARA VITE */
if (process.env.NODE_ENV !== 'production') {
  app.use(
    ['/src', '/@vite', '/node_modules'],
    createProxyMiddleware({
      target: 'http://localhost:5173', // 🔥 NO localhost en HTML, solo aquí
      changeOrigin: true,
      ws: true
    })
  );
}

/* errores */
app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

export default app;