const express = require('express');
const router = express.Router();

// Para armazenar usuários (exemplo simples, sem banco de dados)
let users = [];

// Rota GET para renderizar a página de signup
router.get('/', (req, res) => {
  res.render('signup', { error: null });
});

// Rota POST para processar o cadastro
router.post('/', (req, res) => {
  const { username, password, confirmPassword } = req.body;

  // Verifica se as senhas coincidem
  if (password !== confirmPassword) {
    return res.render('signup', { error: 'As senhas não coincidem!' });
  }

  // Verifica se o nome de usuário já existe (simulação)
  const userExists = users.some(user => user.username === username);
  if (userExists) {
    return res.render('signup', { error: 'Usuário já existe!' });
  }

  // Salva o novo usuário (exemplo simples, sem hash de senha)
  users.push({ username, password });

  // Após o cadastro, redireciona para a página de login
  res.redirect('/login');
});

module.exports = router;