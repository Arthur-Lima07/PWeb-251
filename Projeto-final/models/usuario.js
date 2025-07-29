const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  nome: String,
  email: { type: String, unique: true, required: true }, 
  senha: String
}, { collection: 'usuarios' });

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;
