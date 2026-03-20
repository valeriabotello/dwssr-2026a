//var express = require('express');
//var router = express.Router();
import express from 'express'; // Importamos express usando ES Modules
const router = express.Router(); // Creamos el enrutador usando express.Router()
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

export default router;
