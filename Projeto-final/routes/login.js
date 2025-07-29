const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Usuario = require('../models/usuario');

router.get('/', (req, res) => {
  res.render('login', { error: null });
});

router.post('/', async (req, res) => {
  const { email, senha } = req.body;
  console.log('POST /login recebendo:', { email, senha });

  if (!email || !senha) {
    return res.render('login', { error: 'Preencha todos os campos.' });
  }

  const usuario = await Usuario.findOne({ email });
  if (!usuario) {
    return res.render('login', { error: 'Usuário ou senha inválidos.' });
  }

  req.session.usuarioId = usuario._id;
  req.session.usuarioNome = usuario.nome;

  console.log('Login bem-sucedido:', usuario.nome);
  return res.redirect('/historia');
});

router.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error('Erro ao destruir sessão:', err);
      return res.redirect('/historia'); 
    }
    res.redirect('/login');
  });
});

module.exports = router;
