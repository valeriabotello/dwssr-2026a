import express from 'express';

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('author', { 
    Name: 'Valeria',
    lastname: 'Botello',
    matricula: 211130408
  });
});

export default router;