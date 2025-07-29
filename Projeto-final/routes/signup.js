const express = require('express');
const router = express.Router();
const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');

const saltRounds = 10;

router.get('/', (req, res) => {
  res.render('signup');
});

router.post('/', async (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).send('Todos os campos são obrigatórios.');
  }

  try {
    const existe = await Usuario.findOne({ email });
    if (existe) {
      return res.status(409).send('Email já cadastrado.');
    }

    const senhaHash = await bcrypt.hash(senha, saltRounds);

    const novoUsuario = new Usuario({
      nome,
      email,
      senha: senhaHash,
      fichas: []
    });

    await novoUsuario.save();
    res.redirect('/login');
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).send('Email já cadastrado.');
    }
    console.error(err);
    res.status(500).send('Erro ao registrar usuário.');
  }
});

module.exports = router;
