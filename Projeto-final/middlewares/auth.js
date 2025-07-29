function verificaAutenticacao(req, res, next) {
  if (req.session && req.session.usuarioId) {
    next();
  } else {
    res.redirect('/login');
  }
}

module.exports = verificaAutenticacao;
