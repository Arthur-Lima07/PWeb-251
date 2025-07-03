var express = require('express');
var router = express.Router();

const allCharacters = [
  {
    name: 'DarkBlaze',
    power: "Roubo de Habilidades",
    description: 'Criado em um laboratório, passou por muitos experimentos e por causa dele desenvolveu alguns poderes, porém seu poder principal se baseia em roubar o poder de alvos eliminados, sua cabeça virou uma tocha após certos experimentos.',
    skills: ['Modo Sigilo', 'Pilar de Fogo', 'Modo Sabão', 'Modo Berserker', 'Abalo Sismico'],
    alias: 'Blaze',
  },
  {
    name: 'Ark',
    power: "Fogo Imaginativo",
    description: 'Ark é uma alien que veio do planeta Ark, onde todos os habitantes nascem com um elemento e uma mascára que amplifica seus poderes, possui o poder do Fogo e sua irmã Neko que atualmente está desaparecida possui o poder da criação, vieram para a Terra após enfrentarem um inimigo com poderes de teletransporte .',
    skills: ['Troca de Forma', 'Arsenal Flamejante', 'Saque', 'Criar tocha'],
    alias: 'Gato'
  },
  {
    name: 'Olivier',
    power: "Dreno de Vida",
    description: 'Olivier é um meio-ent criado a partir de uma autoclonagem realizada pelo doutor Greenwood, seu (meio) pai, certo dia sua floresta e todo o laboratório foram queimados, o que resultou em sua solidão, após anos ele foi encontrado pelos agentes da O.E.S.T.E, seu poder é Roubar Vida que o permite drenar a energia vital de qualquer ser que ele toque com a mão direita e redirecione para outro ser tocado pela sua mão esquerda, adquiriu a arma demoníaca Beretta, e busca informações sobre o incidente de 2 anos atrás .',
    skills: ['Drenar Vida', 'Troca demoníaca', 'Bomba de Vida', 'Criar videiras', 'Compartilhar Vida', 'Zona de vida' ],
    alias: 'Menino árvore'
  },
  {
    name: 'Clemenci',
    power: "Inverdade Verdadeira",
    description: 'Vivia uma vida normal até o dia em que sua tia realizou um pacto e a ofereceu como sacrifício, o demônio porém, matou sua tia e desde então habita o corpo de Clemenci, que usa dois braceletes para conter a criatura, devido ao pacto ela possui dois poderes, Controle de Sangue e a Inverdade Verdadeira, fazendo com que sempre que ela convença alguém de algo, esse algo irá se tornar verdade até que a pessoa deixe de acreditar, as más linguas afirmam que ela tem um relacionamento com o Marechal Kran, mas nada veio ao público ainda.',
    skills: ['Lança de Sangue', 'Troca de Forma', 'Transfusão', 'Absorver Sangue', 'Voo(Inverdade)', 'Ler Mentes(Inverdade)'],
    alias: 'Única normal da equipe'
  },
  {
    name: 'Sombra',
    power: "Manipulação de Sombras",
    description: 'Antigamente era só um novato comum da O.E.S.T.E, foi promovido automáticamente a capitão com o nome de "Cain", pois a equipe em que iria entrar ficou "desaparecida" durante uma missão, formou uma equipe com seus amigos, mas, durante uma missão que deveria ser rotineira, a equipe foi traída por 2 de seus membros, um deles que roubou o nome Cain de seu (supostamente morto) melhor amigo e a atual heroína conhecida como Rainha das Chamas depois de vagar por dias num ninho de vampiros matando as criaturas e recolhendo os restos de seus falecidos companheiros, teve um encontro com a Mestra do Templo das Sombras e com a Fera Ancestral das Sombras, que lhe treinaram e o tornaram Herdeiro das Sombras, após um mês treinando sob a tutela deles, foi dispensado e lançado (literalmente) de volta pra Fortaleza, sua cidade natal, em frente a um estabelecimento gerenciado por uma das Soberanas do Submundo, a rainha "Azmodeus", que o tratou como filho, o treinou no combate físico e até lhe concedeu seu sobrenome, depois de todo o treinamento, voltou a O.E.S.T.E para acertar as contas com o seu antigo melhor amigo, e, para isso, reuniu uma equipe de pessoas bem estranhas com as quais viveu uma série de aventuras, atualemnte possui o cargo de Marechal do Brasil, é capaz de controlar sombras, ao roubar a sombra de um oponente ele rouba o poder dele, especialista no uso de diversas armas, se tem conhecimento de 36 servos de sombra.',
    skills: ['Limbo', 'Passo das Sombra', 'Roubo de Sombra'],
    alias: 'Chefinho'
  },
  {
    name: 'Abel',
    power: "Não possui",
    description: 'Ex-Militar, melhor amigo e braço direito do Sombra não possui poderes, mas , já superou o limite da força humana, possui uma perna de metal devido a um incidente durante uma das missões, substituiu o olho direito por um olho criado pelo Demônio da Fraqueza o que o permite ver o ponto fraco de seus alvos, os boatos dizem que ele nunca erra um tiro',
    skills: ['Tiro', 'Troca de arma', 'Analisar Fraqueza', 'Chute de Pistão' ],
    alias: 'O Sobrevivente'
  },
  {
    name: 'King',
    power: "Metamorfose Evolutiva",
    description: 'Tritão do tipo Tubarão, desde sempre possuia uma fome insaciavel, foi preso em Atlantis como prisioneiro de altíssima periculosidade devido a um incidente onde ele devorou várias pessoas, incluindo sua mãe em um acesso de fome, foi recrutado pelo Sombra para derrotar um Megalodon revivido pelo Vírus, depois de sua colaboração surpreendente na luta, o seu novo chefe, Sombra, "mexeu uns pauzinhos" para que ele fosse solto e integrasse a equipe, um fato que poucas pessoas sabem é que ele é responsável pelo atual apelido do Sombra, pois segundo King, seu chefe tem uma "Estatura bem pequena',
    skills: ['Artes Marciais de Tubarão: Palmada', 'Arte Espadachim de Tubarão: Corte triplo de barbatanas', 'Troca de forma', 'Devorar', 'Nado de Tubarão' ],
    alias: 'O Grande Rei das Feras'
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
