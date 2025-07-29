const express = require('express');
const router = express.Router();
const Personagem = require('../models/personagem');

// Página com lista de personagens ordenável
router.get('/', async (req, res) => {
  try {
    const ordenacao = req.query.ordenar || 'az';
    let sortOptions = {};

    if (ordenacao === 'az') {
      sortOptions = { name: 1 };
    } else if (ordenacao === 'za') {
      sortOptions = { name: -1 };
    } else if (ordenacao === 'recentes') {
      sortOptions = { _id: -1 };
    }

    const personagens = await Personagem.find({}).sort(sortOptions).lean();

    res.render('personagens', { characters: personagens, ordenacao });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao carregar personagens.");
  }
});

// Página de detalhes de personagem
router.get('/:name', async (req, res) => {
  try {
    const personagem = await Personagem.findOne({
      name: new RegExp(`^${req.params.name}$`, 'i')
    });

    if (!personagem) return res.status(404).send("Personagem não encontrado.");

    res.render('personagemDetalhe', {
      title: personagem.name,
      character: personagem
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao buscar personagem.");
  }
});

module.exports = router;
