require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
var logger = require('morgan');
const session = require('express-session');

var app = express();  

app.use(session({
  secret: 'segredo_super_secreto',
  resave: false,
  saveUninitialized: false,
}));

mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log("🟢 Conectado ao MongoDB com sucesso!"))
.catch((err) => console.error("🔴 Erro ao conectar no MongoDB:", err));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
  res.locals.usuarioNome = req.session.usuarioNome || null;
  next();
});

var indexRouter = require('./routes/index');
var personagensRouter = require('./routes/personagens');
var historiaRouter = require('./routes/historia');
var fichasRouter = require('./routes/fichas');
var loginRouter = require('./routes/login');
var signupRouter = require('./routes/signup');

const verificaAutenticacao = require('./middlewares/auth');

app.use('/', indexRouter);
app.use('/personagens', personagensRouter);
app.use('/historia', historiaRouter);
app.use('/fichas', verificaAutenticacao, fichasRouter);;
app.use('/login', loginRouter);
app.use('/signup', signupRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app; 
