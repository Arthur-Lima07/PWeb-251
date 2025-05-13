var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  var characters =[
    {
      name: 'Olivier',
      role: 'Meio-ent'
    },
    {
      name: 'Ark',
      role: 'Alienigena'
    },
    {
      name: 'Blaze',
      role: 'Humano'
    },
    {
      name: 'Clemenci',
      role: 'Humana'
    }
  ];
  var subheading = "Party list";
  
  res.render('users', {characters: characters, subheading: subheading});
});

module.exports = router;