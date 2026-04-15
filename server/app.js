// var createError = require('http-errors');
import createError from 'http-errors'; // Importamos createError usando ES Modules
// var express = require('express');
import express from 'express'; // Importamos express usando ES Modules
// var path = require('path');
import path from 'node:path'; // Importamos path usando ES Modules
// var cookieParser = require('cookie-parser');
import cookieParser from 'cookie-parser'; // Importamos cookieParser usando ES Modules
// var logger = require('morgan');
import logger from 'morgan'; // Importamos logger usando ES Modules
import {fileURLToPath} from 'url'; // Importamos fileURLToPath para recrear __filename y __dirname
import hbs from 'hbs'; // Importamos hbs para usar Handlebars como motor de plantillas

// se cambio require por import y se agrego la extensión .js a los archivos de rutas para que funcione con ES Modules
import indexRouter from '#routes/index.js';// Importamos el enrutador de index
import usersRouter from '#routes/users.js';// Importamos el enrutador de users
import authorRouter from '#routes/author.js'; // Importamos el enrutador de author
// importando el registro del helper de Vite para Handlebars
import { registerViteHelper } from './lib/vite.js'; // Importamos la función para registrar el helper de Vite

// Recreando variables de path para ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); 

var app = express();
// registro de las rutas a los enrutadores
// require se utiliza para importar módulos en CommonJS, pero en ES Modules se utiliza import, 
// por lo que se cambió la sintaxis de importación de las rutas. 
// Además, se agregó la extensión .js a los archivos de rutas para que funcione correctamente con ES Modules.
// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
// var authorRouter = require('./routes/author'); // Importamos el enrutador de author
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
// Registramos el helper de Vite para ENGINE
registerViteHelper(hbs); // Registramos el helper de Vite para Handlebars

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));// variable que el sistema provee para acceder a la carpeta public, 
// donde se encuentran los archivos estáticos como css, js e imágenes
console.log('Ruta de archivos estáticos:', path.join(__dirname, '../public'));

//ARCHIVOS ESTATICOS DE VITE
if (process.env.VITE_DEV_SERVER === 'production') {
app.use(express.static(path.join(__dirname, '..','dist'))); // Servimos los archivos estáticos de Vite desde la carpeta dist/vite
}


// uso de las rutas y modificacion de la ruta para el index,
//  agregando la ruta /index para que también renderice la vista index.hbs
app.use(['/', '/index'], indexRouter);
app.use('/users', usersRouter);
app.use('/author', authorRouter); // Usamos el enrutador de author para la ruta /author 

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// module.exports = app
export default app; // Exportamos la aplicación usando ES Modules