var express = require('express');
var router = express.Router();

/* GET home page. */
// En esta ruta se renderiza la vista author.hbs y se le pasan los datos del autor
router.get('/', function(req, res, next) {
  res.render('author', { 
    Name: 'Valeria',
    lastname: 'Botello',
    matricula: 211130408
 });
  
});

module.exports = router;