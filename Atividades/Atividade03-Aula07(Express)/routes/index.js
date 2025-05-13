const express = require('express');
const router = express.Router();

const routeMiddleware = (routeName) => (req, res) => {
  res.send(`<h1>${routeName}</h1>`);
};

router.get('/', routeMiddleware('/'));

router.get('/about', routeMiddleware('/about'));

module.exports = router;