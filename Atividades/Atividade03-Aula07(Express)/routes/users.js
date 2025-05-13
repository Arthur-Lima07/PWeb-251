const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('<h1>/users</h1>');
});

router.get('/signup', (req, res) => {
  res.send('<h1>/users/signup</h1>');
});

router.get('/signin', (req, res) => {
  const userid = req.query.userid;
  if (userid) {
    res.redirect(`/users/${userid}`);
  } else {
    res.redirect('/users/signup');
  }
});

router.get('/:userid', (req, res) => {
  const userid = req.params.userid;
  res.send(`<h1>Bem-vindo, usuário ${userid}!</h1>`);
});

module.exports = router;