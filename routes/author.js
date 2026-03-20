//var express = require('express');
//var router = express.Router();
import express from 'express'; // Importamos express usando ES Modules
const router = express.Router(); // Creamos el enrutador usando express.Router()

/* GET home page. */
// En esta ruta se renderiza la vista author.hbs y se le pasan los datos del autor
router.get('/', function(req, res, next) {
  res.render('author', { 
    Name: 'Valeria',
    lastname: 'Botello',
    matricula: 211130408
 });
  
});

export default router;