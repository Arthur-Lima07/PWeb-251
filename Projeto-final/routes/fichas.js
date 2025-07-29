const express = require('express');
const router = express.Router();
const Usuario = require('../models/usuario');

// Middleware para verificar se o usuário está logado
function estaLogado(req, res, next) {
  if (req.session.usuarioId) {
    next();
  } else {
    res.redirect('/login');
  }
}

// Listar fichas
router.get('/', estaLogado, async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.session.usuarioId).lean();
    if (!usuario) return res.redirect('/login');

    res.render('fichas', {
      usuarioNome: usuario.nome,
      fichas: usuario.fichas || []
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro interno no servidor');
  }
});

// Criar nova ficha
router.post('/nova', estaLogado, async (req, res) => {
  try {
    const novaFicha = {
      nome: req.body.nome,
      especie: req.body.especie,
      nivel: parseInt(req.body.nivel),
      descricao: req.body.descricao,
      atributos: {
        fisico: parseInt(req.body.fisico),
        tecnica: parseInt(req.body.tecnica),
        agilidade: parseInt(req.body.agilidade),
        mental: parseInt(req.body.mental),
        elemento: parseInt(req.body.elemento),
        carisma: parseInt(req.body.carisma),
        poder: parseInt(req.body.poder)
      }
    };

    await Usuario.findByIdAndUpdate(req.session.usuarioId, {
      $push: { fichas: novaFicha }
    });

    res.redirect('/fichas');
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao criar ficha');
  }
});

// Ver detalhes da ficha
router.get('/:id', estaLogado, async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.session.usuarioId).lean();
    const ficha = usuario.fichas.find(f => f._id.toString() === req.params.id);

    if (!ficha) return res.status(404).send("Ficha não encontrada.");

    res.render('fichasDetalhes', { ficha });
  } catch (err) {
    console.error("Erro ao exibir ficha:", err);
    res.status(500).send("Erro ao exibir ficha.");
  }
});

// Formulário de edição
router.get('/:id/editar', estaLogado, async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.session.usuarioId).lean();
    if (!usuario) return res.redirect('/login');

    const ficha = usuario.fichas.id(req.params.id);
    if (!ficha) return res.status(404).send('Ficha não encontrada');

    res.render('editarFicha', {
      usuarioNome: usuario.nome,
      ficha
    });
  } catch (err) {
    console.error('Erro ao carregar ficha para edição:', err);
    res.status(500).send('Erro ao carregar ficha');
  }
});

// Submeter edição
router.post('/:id/editar', estaLogado, async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.session.usuarioId);
    if (!usuario) return res.redirect('/login');

    const ficha = usuario.fichas.id(req.params.id);
    if (!ficha) return res.status(404).send('Ficha não encontrada');

    ficha.nome = req.body.nome;
    ficha.especie = req.body.especie;
    ficha.nivel = parseInt(req.body.nivel);
    ficha.descricao = req.body.descricao;
    ficha.atributos = {
      fisico: parseInt(req.body.fisico),
      tecnica: parseInt(req.body.tecnica),
      agilidade: parseInt(req.body.agilidade),
      mental: parseInt(req.body.mental),
      elemento: parseInt(req.body.elemento),
      carisma: parseInt(req.body.carisma),
      poder: parseInt(req.body.poder)
    };

    await usuario.save();
    res.redirect('/fichas');
  } catch (err) {
    console.error('Erro ao editar ficha:', err);
    res.status(500).send('Erro ao editar ficha');
  }
});

// Excluir ficha
router.post('/:id/excluir', estaLogado, async (req, res) => {
  try {
    await Usuario.findByIdAndUpdate(req.session.usuarioId, {
      $pull: { fichas: { _id: req.params.id } }
    });
    res.redirect('/fichas');
  } catch (err) {
    console.error("Erro ao excluir ficha:", err);
    res.status(500).send("Erro ao excluir ficha.");
  }
});

module.exports = router;
