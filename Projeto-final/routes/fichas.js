const express = require('express');
const router = express.Router();
const User = require('../models/usuario'); 
function estaLogado(req, res, next) {
  if (req.session.usuarioId) {
    next();
  } else {
    res.redirect('/login');
  }
}

router.get('/', estaLogado, async (req, res) => {
  try {
    const usuario = await User.findById(req.session.usuarioId).lean();
    if (!usuario) {
      return res.redirect('/login');
    }

    const fichas = usuario.fichas || [];

    res.render('fichas', {
      usuarioNome: usuario.nome,
      fichas: fichas
    });

  } catch (error) {
    console.error(error);
    res.status(500).send('Erro interno no servidor');
  }
});

module.exports = router;
