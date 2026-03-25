//var express = require('express');
//var router = express.Router();
import express from 'express'; // Importamos express usando ES Modules
const router = express.Router(); // Creamos el enrutador usando express.Router()  

/* GET home page. */
router.get('/', function(req, res, next) {
   res.render('index', { title: 'Proyecto magico 🌟🌟' });
  //  res.render('index', { title: 'Proyecto Asombroso 🌟🌟', author: 'Valeria Botello ' });
});

export default router;
