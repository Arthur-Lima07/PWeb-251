var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  var characters =[
    {
      name: 'Blaze',
      role: 'Recruta'
    },
    {
      name: 'Ark',
      role: 'Recruta'
    },
    {
      name: 'Olivier',
      role: 'Recruta'
    },
    {
      name: 'Clemenci',
      role: 'Recruta'
    }
  ];
  var subheading = "Personagens";
  
  res.render('Personagens', {characters: characters, subheading: subheading});
});

module.exports = router;