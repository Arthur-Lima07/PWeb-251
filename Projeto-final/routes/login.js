const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('login'); 
});

router.post('/', (req, res) => {
  const { username, password } = req.body;

  if (username === 'admin' && password === '1234') {
    return res.redirect('/'); 
  } else {
    return res.render('login', { error: 'Credenciais inválidas!' });
  }
});

module.exports = router;