const express = require('express');
const path = require('path');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] Acesso em: ${req.method} ${req.url}`);
  next();
});

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/users', usersRouter);

app.get('/data', (req, res) => {
  res.send('<h1>/data</h1>');
});

app.post('/data', (req, res) => {
  res.send('<h1>/data</h1>');
});

app.use((req, res) => {
  res.status(404).send(`
    <h1>404 - Página não encontrada</h1>
    <a href="/">Voltar para a página inicial</a>
  `);
});

module.exports = app;