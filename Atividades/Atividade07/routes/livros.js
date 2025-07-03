const express = require('express');
const router = express.Router();
const Livro = require('../models/Livro');

router.post('/', async (req, res) => {
  try {
    const livro = new Livro(req.body);
    const novo = await livro.save();
    res.status(201).json(novo);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
});

router.get('/', async (req, res) => {
  const livros = await Livro.find();
  res.json(livros);
});

router.get('/:id', async (req, res) => {
  try {
    const livro = await Livro.findById(req.params.id);
    if (!livro) return res.status(404).json({ erro: 'Livro não encontrado' });
    res.json(livro);
  } catch {
    res.status(400).json({ erro: 'ID inválido' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const atualizado = await Livro.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!atualizado) return res.status(404).json({ erro: 'Livro não encontrado' });
    res.json(atualizado);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletado = await Livro.findByIdAndDelete(req.params.id);
    if (!deletado) return res.status(404).json({ erro: 'Livro não encontrado' });
    res.json({ mensagem: 'Livro deletado com sucesso' });
  } catch {
    res.status(400).json({ erro: 'ID inválido' });
  }
});

router.get('/editora/:nome', async (req, res) => {
  const livros = await Livro.find({ editora: req.params.nome });
  res.json(livros);
});

router.get('/titulo/pesquisa/:palavra', async (req, res) => {
  const regex = new RegExp(req.params.palavra, 'i');
  const livros = await Livro.find({ titulo: { $regex: regex } });
  res.json(livros);
});

router.get('/preco/acima/:valor', async (req, res) => {
  const livros = await Livro.find({ preco: { $gt: parseFloat(req.params.valor) } });
  res.json(livros);
});

router.get('/preco/abaixo/:valor', async (req, res) => {
  const livros = await Livro.find({ preco: { $lt: parseFloat(req.params.valor) } });
  res.json(livros);
});

router.get('/recentes', async (req, res) => {
  const livros = await Livro.find().sort({ ano: -1 });
  res.json(livros);
});

router.get('/antigos', async (req, res) => {
  const livros = await Livro.find().sort({ ano: 1 });
  res.json(livros);
});

router.get('/sem-estoque', async (req, res) => {
  const livros = await Livro.find({ quant: { $lte: 0 } });
  res.json(livros);
});

module.exports = router;
