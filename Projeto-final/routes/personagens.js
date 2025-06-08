var express = require('express');
var router = express.Router();

const allCharacters = [
  {
    name: 'Blaze',
    description: 'Criado em um laboratório, passou por muitos experimentos e por causa dele desenvolveu alguns poderes, porém seu poder principal se baseia em roubar o poder de alvos eliminados, sua cabeça virou uma tocha após certos experimentos.',
    skills: ['Modo Sigilo', 'Pilar de Fogo', 'Modo Sabão', 'Modo Berserker', 'Abalo Sismico']
  },
  {
    name: 'Ark',
    description: 'Ark é uma alien que veio do planeta Ark, onde todos os habitantes nascem com um elemento e uma mascára que amplifica seus poderes, possui o poder do Fogo e sua irmã Neko que atualmente está desaparecida possui o poder da criação, vieram para a Terra após enfrentarem um inimigo com poderes de teletransporte .',
    skills: ['Troca de Forma', 'Arsenal Flamejante', 'Saque']
  },
  {
    name: 'Olivier',
    description: 'Olivier é um meio-ent criado a partir de uma autoclonagem realizada pelo doutor Greenwood, seu (meio) pai, certo dia sua floresta e todo o laboratório foram queimados, o que resultou em sua solidão, após anos ele foi encontrado pelos agentes da O.E.S.T.E, seu poder é Roubar Vida que o permite drenar a energia vital de qualquer ser que ele toque com a mão direita e redirecione para outro ser tocado pela sua mão esquerda, adquiriu a arma demoníaca Beretta, e busca informações sobre o incidente de 2 anos atrás .',
    skills: ['Drenar Vida', 'Troca demoníaca', 'Bomba de Vida', 'Criar videiras', 'Compartilhar Vida' ]
  },
  {
    name: 'Clemenci',
    description: 'Vivia uma vida normal até o dia em que sua tia realizou um pacto e a ofereceu como sacrifício, o demônio porém, matou sua tia e desde então habita o corpo de Clemenci, que usa dois braceletes para conter a criatura, devido ao pacto ela possui dois poderes, Controle de Sangue e a Inverdade Verdadeira, fazendo com que sempre que ela convença alguém de algo, esse algo irá se tornar verdade até que a pessoa deixe de acreditar, as más linguas afirmam que ela tem um relacionamento com o Marechal Kran, mas nada veio ao público ainda.',
    skills: ['Lança de Sangue', 'Inverdade Verdadeira', 'Troca de Forma', 'Transfusão', 'Absorver Sangue', 'Voo(Inverdade)', 'Ler Mentes(Inverdade)']
  },
  {
    name: 'Sombra',
    description: 'Marechal do Brasil, capaz de controlar sombras, ao roubar a sombra de um oponente ele rouba o poder dele, especialista no uso de diversas armas, se tem conhecimento de 36 servos de sombra.',
    skills: ['Limbo', 'Passo das Sombra', 'Roubo de Sombra']
  },
  {
    name: 'Abel',
    description: 'Ex-Militar, melhor amigo e braço direito do Sombra não possui poderes, mas , já superou o limite da força humana, possui uma perna de metal devido a um incidente durante uma das missões, substituiu o olho direito por um olho criado pelo Demônio da Fraqueza o que o permite ver o ponto fraco de seus alvos, os boatos dizem que ele nunca erra um tiro',
    skills: ['Tiro', 'Troca de arma', 'Analisar Fraqueza', 'Chute de Pistão' ]
  }
];

router.get('/', function(req, res, next) {
  const searchQuery = req.query.search;
  let characters = allCharacters;

  if (searchQuery) {
    const lowerSearch = searchQuery.toLowerCase();
    characters = allCharacters.filter(character =>
      character.name.toLowerCase().includes(lowerSearch)
    );
  }
  
//Rota principal
  res.render('Personagens', {
    characters: characters,
    subheading: "Personagens",
    searchQuery: searchQuery
  });
});

// Rota de detalhe para cada personagem
router.get('/:name', function(req, res, next) {
  const characterName = req.params.name.toLowerCase();
  const character = allCharacters.find(c => c.name.toLowerCase() === characterName);

  if (!character) {
    return res.status(404).send('Personagem não encontrado');
  }

  res.render('PersonagemDetalhe', {
    character: character,
    title: `Detalhes de ${character.name}`
  });
});

module.exports = router;
