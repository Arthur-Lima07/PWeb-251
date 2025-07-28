var express = require('express');
var router = express.Router();

const allCharacters = [
  {
    name: 'DarkBlaze',
    power: "Roubo de Habilidades",
    passive: "Não possui",
    description: 'Criado em um laboratório, passou por muitos experimentos e por causa dele desenvolveu alguns poderes, porém seu poder principal se baseia em roubar o poder de alvos eliminados, sua cabeça virou uma tocha após certos experimentos.',
    skills: ['Modo Sigilo', 'Pilar de Fogo', 'Modo Sabão', 'Modo Berserker', 'Abalo Sismico'],
    alias: 'Blaze',
  },
  {
    name: 'Ark',
    power: "Fogo Imaginativo",
    passive: "Não possui",
    description: 'Ark é uma alien que veio do planeta Ark, onde todos os habitantes nascem com um elemento e uma mascára que amplifica seus poderes, possui o poder do Fogo e sua irmã Neko que atualmente está desaparecida possui o poder da criação, vieram para a Terra após enfrentarem um inimigo com poderes de teletransporte .',
    skills: ['Troca de Forma', 'Arsenal Flamejante', 'Saque', 'Criar tocha'],
    alias: 'Gato'
  },
  {
    name: 'Olivier',
    power: "Dreno de Vida",
    passive: "Não possui",
    description: 'Olivier é um meio-ent criado a partir de uma autoclonagem realizada pelo doutor Greenwood, seu (meio) pai, certo dia sua floresta e todo o laboratório foram queimados, o que resultou em sua solidão, após anos ele foi encontrado pelos agentes da O.E.S.T.E, seu poder é Roubar Vida que o permite drenar a energia vital de qualquer ser que ele toque com a mão direita e redirecione para outro ser tocado pela sua mão esquerda, adquiriu a arma demoníaca Beretta, e busca informações sobre o incidente de 2 anos atrás .',
    skills: ['Drenar Vida', 'Troca demoníaca', 'Bomba de Vida', 'Criar videiras', 'Compartilhar Vida', 'Zona de vida' ],
    alias: 'Menino árvore'
  },
  {
    name: 'Clemenci',
    power: "Inverdade Verdadeira",
    passive: "Não possui",
    description: 'Vivia uma vida normal até o dia em que sua tia realizou um pacto e a ofereceu como sacrifício, o demônio porém, matou sua tia e desde então habita o corpo de Clemenci, que usa dois braceletes para conter a criatura, devido ao pacto ela possui dois poderes, Controle de Sangue e a Inverdade Verdadeira, fazendo com que sempre que ela convença alguém de algo, esse algo irá se tornar verdade até que a pessoa deixe de acreditar, as más linguas afirmam que ela tem um relacionamento com o Marechal Kran, mas nada veio ao público ainda.',
    skills: ['Lança de Sangue', 'Troca de Forma', 'Transfusão', 'Absorver Sangue', 'Voo(Inverdade)', 'Ler Mentes(Inverdade)'],
    alias: 'Única normal da equipe'
  },
  {
    name: 'Sombra',
    power: "Manipulação de Sombras",
    passive:"Tácticas de Líder",
    description: 'Participante da segunda leva de heróis no chamado ano 0, era só um novato comum da O.E.S.T.E, foi promovido automáticamente a capitão com o nome de "Cain", pois a equipe em que iria entrar ficou "desaparecida" durante uma missão, formou uma equipe com seus amigos, mas, durante uma missão que deveria ser rotineira, a equipe foi traída por 2 de seus membros, um deles que roubou o nome Cain de seu (supostamente morto) melhor amigo e a atual heroína conhecida como Rainha das Chamas depois de vagar por dias num ninho de vampiros matando as criaturas e recolhendo os restos de seus falecidos companheiros, teve um encontro com a Mestra do Templo das Sombras e com a Fera Ancestral das Sombras, que lhe treinaram e o tornaram Herdeiro das Sombras, após um mês treinando sob a tutela deles, foi dispensado e lançado (literalmente) de volta pra Fortaleza, sua cidade natal, em frente a um estabelecimento gerenciado por uma das Soberanas do Submundo, a rainha "Azmodeus", que o tratou como filho, o treinou no combate físico e até lhe concedeu seu sobrenome, depois de todo o treinamento, voltou a O.E.S.T.E para acertar as contas com o seu antigo melhor amigo, e, para isso, reuniu uma equipe de pessoas bem estranhas com as quais viveu uma série de aventuras, atualemnte possui o cargo de Marechal do Brasil, é capaz de controlar sombras, ao roubar a sombra de um oponente ele rouba o poder dele, especialista no uso de diversas armas, se tem conhecimento de 36 servos de sombra.',
    skills: ['Limbo', 'Passo das Sombra', 'Roubo de Sombra', 'Fusão Pactual', 'Reino Distorcido'],
    alias: 'Chefinho'
  },
  {
    name: 'Abel',
    power: "Não possui",
    passive: "Não possui",
    description: 'Ex-Militar, melhor amigo e braço direito do Sombra não possui poderes, mas , já superou o limite da força humana, possui uma perna de metal devido a um incidente durante uma das missões, substituiu o olho direito por um olho criado pelo Demônio da Fraqueza o que o permite ver o ponto fraco de seus alvos, os boatos dizem que ele nunca erra um tiro',
    skills: ['Tiro', 'Troca de arma', 'Analisar Fraqueza', 'Chute de Pistão' ],
    alias: 'O Sobrevivente'
  },
  {
    name: 'King',
    power: "Metamorfose Evolutiva",
    passive: "Estômago de Ferro(Pode digerir qualquer materia, seja ela orgânica ou inorgânica)",
    description: 'Tritão do tipo Tubarão, desde sempre possuia uma fome insaciavel, foi preso em Atlantis como prisioneiro de altíssima periculosidade devido a um incidente onde ele devorou várias pessoas, incluindo sua mãe em um acesso de fome, foi recrutado pelo Sombra para derrotar um Megalodon revivido pelo Vírus, depois de sua colaboração surpreendente na luta, o seu novo chefe, Sombra, "mexeu uns pauzinhos" para que ele fosse solto e integrasse a equipe, um fato que poucas pessoas sabem é que ele é responsável pelo atual apelido do Sombra, pois segundo King, seu chefe tem uma "Estatura bem pequena',
    skills: ['Artes Marciais de Tubarão: Palmada', 'Arte Espadachim de Tubarão: Corte triplo de barbatanas', 'Troca de forma', 'Devorar', 'Nado de Tubarão' ],
    alias: 'O Grande Rei das Feras'
  },
    {
    name: 'Spectre',
    power: "Regeneração Celular/Manipulação de Cálcio",
    passive: "Desprezo Fortalecedor(Quanto mais o usuário é insultado durante um combate mais fortes os golpes se tornam)",
    description: 'Oswald foi amaldiçoado a não morrer desde a infância, viveu nas ruas da Inglaterra Medieval roubando comida e dinheiro, em um de seus roubos encontrou uma espada supostamente amaldiçoada chamada Beretta, mas por algum motivo, depois de soltar a espada nunca conseguia se lembrar das coisas que aconteceram enquanto ele segurava a espada, até que um dia, um cavaleiro da Ordem de São Jorge o pegou furtando algumas frutas, depois de perder um duelo para o cavaleiro em praça pública ele foi recrutado como "Escudeiro da Ordem de São Jorge" onde conheceu seus novos companheiros e a filha mais nova do rei, a princesa Dorote, desde sempre era conhecido pelas suas terríveis habilidades de esgrima, pelo seu pavio curto e por quebrar todas as espadas que caiam em suas mãos, exceto sua fiel espada amaldiçoada, após anos de treinamento foi promovido a cavaleiro oficial da Ordem sob o nome de Sir Oswald, mas, durante sua cerimonia de promoção um dragão negro atacou o castelo, o recente nomeado Sir Oswald foi encarregado de escoltar a princesa Dorote até uma cidade vizinha, onde era seguro, mas , durante a fuga o dragão encurrala a dupla, após perceber que seus companheiros e provavelmente todos no castelo haviam perecido, o cavaleiro decide enfrentar o dragão com sua espada amaldiçoada, mas, em seu primeiro golpe a espada quebra, e sem arma alguma para lutar, o dragão furiosamente ataca e mata o jovem cavaleiro e sequestra a princesa, porém, o que poucos sabem é que Oswald não morreu naquele dia, depois de aproximadamente 600 anos, foi encontrado sem nenhuma memória e com apenas os fragmentos de sua espada pelo Monarca Vampiro, Frank Stein, e ficou sob sua tutela com o nome provisório ,Chris Stein, como aprendiz de Frank Stein, Chris foi encarregado de enfrentar o Monarca do Caos, Sombra, que na época era inimigo de Frank, durante a luta, Sombra percebeu algo que ninguém nunca tinha percebido antes, Chris não quebrava as espadas por falta de habilidade, mas sim por possuir uma força completamente desumana, após a resolução de diversos mal-entendidos, Chris entra para o Conselho do Caos sob o codinome de Spectre ',
    skills: ['Soco desprezível', 'Espeto de Ossos', 'Renegeração', 'Spooky Scary Skeletons', 'Reforço de Cálcio' ],
    alias: 'O Zumbi'
  },
   {
    name: 'Kran',
    power: "Transformação",
    passive: "Liberdade do Escritor (Kran tem a capacidade de alterar o ambiente usando sua tinta)",
    description: 'Kran é apenas um codinome, o jovem marechal russo abandonou seu nome após um incidente na sua infância, onde a fera mitológica Krampus entrou no seu lar durante uma noite de Natal e matou sua família, o jovem jurou que iria enfrentar a fera e ano após ano, na noite de Natal, eles sempre travam uma batalha, onde nenhum dos dois caiu durante 10 anos, sua rixa é contada no livro "O Garoto e a Fera", de autor desconhecido, porém no dia 25 de Dezembro de 2026, Kran e os novos recrutas do Conselho do Caos coseguiram finalmente derrotar o Krampus, que se transformou em uma nova criatura, um pequeno bode feito de alma, e o corpo da fera escondia um segredo, a irmã do Kran ainda estava viva, inconsciente dentro da criatura.',
    skills: ['Lâmina de Tinta', 'Metamorfose', 'Maré de Tinta', 'Transformação Crítica'],
    alias: 'O Contador de Histórias'
  },
  {
    name: 'Indra',
    power: "Controle de Eletricidade",
    passive: "Diferença de potencial(Indra causa mais dano em oponentes que não tem poderes voltados para 'Elemento')",
    description: '',
    skills: ['Transformação do Deus dos Raios', 'Tempestade Carmesin', 'Fúria dos Céus'],
    alias: 'O Novo Deus dos Raios'
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
  characters.sort((a, b) => a.name.localeCompare(b.name));

  res.render('Personagens', {
    characters: characters,
    subheading: "Personagens",
    searchQuery: searchQuery
  });
});


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
