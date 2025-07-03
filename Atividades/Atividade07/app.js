const express = require('express');
const mongoose = require('mongoose');
const livrosRoutes = require('./routes/livros');
require('dotenv').config();

const app = express();
app.use(express.json());

// Conexão com MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('🟢 Conectado ao MongoDB'))
  .catch(err => console.error('🔴 Erro ao conectar:', err));

// Rotas
app.use('/livros', livrosRoutes);

// Rota 404
app.use((req, res) => {
  res.status(404).json({ erro: 'Endpoint não encontrado' });
});

// Start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
