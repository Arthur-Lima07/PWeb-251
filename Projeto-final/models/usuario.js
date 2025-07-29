const mongoose = require('mongoose');

const fichaSchema = new mongoose.Schema({
  nome: String,
  classe: String,
  especie: String,
  nivel: Number,
  descricao: String,
  atributos: {
    forca: Number,
    tecnica: Number,
    agilidade: Number,
    mental: Number,
    elemento: Number,
    carisma: Number,
    poder: Number
  }
});

const usuarioSchema = new mongoose.Schema({
  nome: String,
  email: { type: String, unique: true, required: true },
  senha: String,
  fichas: [fichaSchema]
}, { collection: 'usuarios' });

const Usuario = mongoose.model('Usuario', usuarioSchema);
module.exports = Usuario;

