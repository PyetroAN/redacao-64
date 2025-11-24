import type { NewsItem, Letter } from '../types/game';

// ============================================================================
// 1. MANCHETES (HEADLINES)
// Notícias principais que definem o rumo do jogo e a pontuação final.
// ============================================================================
export const HEADLINES: NewsItem[] = [
  {
    id: 'h-01',
    type: 'HEADLINE',
    tag: 'Crise Política',
    title: 'Baderna é a nova tática da oposição: Guerra de rua para “Impeachment” de Jango',
    body: 'Setores da oposição passaram a utilizar a desordem nas ruas como instrumento político, estimulando tumultos e confrontos para acelerar a queda do presidente João Goulart. Segundo a reportagem, a “baderna” virou estratégia deliberada para pressionar instituições e criar ambiente favorável ao afastamento de Jango.',
    context: 'A manchete refere-se ao período de intensa mobilização política no final de março de 1964. Diversos grupos participavam de atos públicos, gerando confrontos e tensões nas ruas. O cenário contribuiu para ampliar a percepção de instabilidade institucional nos dias que antecederam a saída de João Goulart. Ver mais em: Jornal Última Hora, Edição 04318, Rio de Janeiro, 31 de março de 1964.',
    
    alignment: 'PRO_GOVERNMENT', // Publicar = Ponto pro Povo. Censurar = Ponto pro Governo.
    canAlter: false, // Manchetes principais não podem ser alteradas, apenas aceitas ou censuradas.

    publishImpact: { 
      money: +35,       
      censor: -10,      
      public: -15      
    },

    censorImpact: { 
      money: -100,      
      censor: +20,      
      public: +20       
    }
  },
  {
    id: 'h-02',
    type: 'HEADLINE',
    tag: 'Violência',
    title: 'TODA A FROTA DE REPORTAGEM DESTRUÍDA A BALA E A FOGO',
    body: 'A redação da Última Hora sofreu um violento ataque, com depredação das instalações e incêndio de parte do prédio. Veículos do jornal foram alvejados e queimados, destruindo completamente a frota de reportagem. A ação ocorreu em meio ao clima de perseguição a veículos considerados simpáticos ao governo deposto.',
    context: 'O episódio ocorreu logo após o golpe de 1964, quando diferentes setores sociais reagiram à mudança de governo. A redação da Última Hora foi alvo de ataques que danificaram suas instalações e veículos. O fato integra o clima de conflitos envolvendo meios de comunicação naquele momento. Ver mais em: Jornal Última Hora, Edição 04318, Rio de Janeiro, 2 de abril de 1964.',
    
    alignment: 'PRO_PEOPLE',
    canAlter: false,

    publishImpact: { 
      money: +35, 
      censor: +10, 
      public: +10 
    },

    censorImpact: { 
      money: -80, 
      censor: -12, 
      public: -15 
    }
  },
  {
    id: 'h-03',
    type: 'HEADLINE',
    tag: 'Repressão',
    title: 'JUSTIÇA MILITAR CONDENA A 187 ANOS DE PRISÃO 27 SUBVERSIVOS: RECIFE',
    body: 'RECIFE, 23 (M) - Depois de 23 horas de trabalhos, foi concluído às 12 horas de hoje o julgamento do líder comunista Gregório Bezerra e outros, acusados do crime de subversão.',
    context: 'A notícia aparece em um momento em que o discurso anticomunista guiava a atuação dos tribunais militares. Civis acusados de “subversão”, como Gregório Bezerra e outros, eram julgados em processos longos e amplamente divulgados. Esses julgamentos reforçavam a ideia de um “inimigo interno”. Ver mais em: Jornal Correio Braziliense, N° 2.062, Distrito Federal, 24 de fevereiro de 1967.',
    sourceUrl: 'https://memoria.bn.gov.br/DocReader/DocReader.aspx?bib=028274_01&hf=memoria.bn.gov.br&pagfis=26999',
    alignment: 'PRO_PEOPLE',
    canAlter: false,

    publishImpact: { 
      money: +35, 
      censor: +10, 
      public: +10 
    },

    censorImpact: { 
      money: -80, 
      censor: -10, 
      public: -10 
    }
  },
    {
    id: 'h-04',
    type: 'HEADLINE',
    tag: 'Repressão',
    title: 'CANHÕES E TANQUES PROTEGERAM AGRESSÃO POLICIAL CONTRA O POVO',
    body: 'Os atos religiosos oficiados nas principais capitais do País, pela morte do estudante Édson Lima Souto, provocaram nova onda de violência policial-militar, com inúmeras prisões, espancamento de estudantes, populares e jornalistas, sob proteção direta de tropas federais.',
    context: 'A manchete está ligada às manifestações após a morte do estudante Édson Souto, em 1968. Diversos atos públicos foram realizados em capitais do país, resultando em confrontos entre participantes e forças de segurança. O episódio compõe o quadro de tensões sociais que marcou aquele ano. Ver mais em: Jornal Correio da Manhã, N° 23.005, Rio de Janeiro, 5 de abril de 1968.',
    sourceUrl: 'https://memoria.bn.gov.br/DocReader/DocReader.aspx?bib=089842_07&pesq=correio%20da%20manh%C3%A3&pasta=ano%20196&hf=memoria.bn.gov.br&pagfis=90918',
    alignment: 'PRO_PEOPLE',
    canAlter: false,

    publishImpact: { 
      money: +35, 
      censor: +10, 
      public: +15 
    },

    censorImpact: { 
      money: -65, 
      censor: +15, 
      public: -15 
    }
  },
    {
    id: 'h-05',
    type: 'HEADLINE',
    tag: 'Crise Institucional',
    title: 'EDITADO NOVO ATO INSTITUCIONAL DECRETADO RECESSO DO CONGRESSO',
    body: 'O presidente Costa e Silva, após reunião de três horas com o Conselho de Segurança Nacional, realizada no Palácio Laranjeiras, editou um novo Ato Institucional (o de número cinco) e, no Ato Complementar n° 38, que baixou a seguir, decretou o recesso do Congresso Nacional.',
    context: 'O anúncio refere-se à edição do AI-5, em dezembro de 1968. Naquele período, autoridades decidiram implementar medidas que alteravam o funcionamento de instituições políticas. A decretação de recesso do Congresso integrou esse conjunto de decisões. Ver mais em: Jornal Correio da Manhã, N° 23.217, Rio de Janeiro, 14 de dezembro de 1968.',
    sourceUrl: 'https://memoria.bn.gov.br/DocReader/DocReader.aspx?bib=089842_07&pesq=diretas%20j%C3%A1&hf=memoria.bn.gov.br&pagfis=98194',
    alignment: 'PRO_GOVERNMENT',
    canAlter: false,

    publishImpact: { 
      money: +35, 
      censor: +25, 
      public: -10 
    },

    censorImpact: { 
      money: -100, 
      censor: -25, 
      public: +15 
    }
  },
  {
    id: 'h-06',
    type: 'HEADLINE',
    tag: 'Segurança Nacional',
    title: 'JORNAL CORREIO BRAZILIENSE (DF) - EDITORIAL - EM DEFESA DA JUVENTUDE',
    body: 'O Governo Federal anuncia o propósito de adotar medidas radicais contra o uso de tóxicos e entorpecentes. o Presidente da República, expedindo recomendações severas nesse sentido, considera o problema do tráfico de drogas como de segurança nacional e, em consequência, mandara ampliar a campanha contra traficantes e viciados.',
    context: 'A manchete surge em um momento em que o governo ampliava o uso do discurso de segurança nacional para diferentes temas do cotidiano. O combate às drogas passou a ser tratado como prioridade estratégica, justificando medidas mais rígidas. Esse enquadramento reforçava a ideia de vigilância e controle presente no período. Ver mais em: Jornal Correio Braziliense, N° 3.351, Distrito Federal, 13 de novembro de 1970.',
    sourceUrl: 'https://memoria.bn.gov.br/DocReader/DocReader.aspx?bib=028274_02&hf=memoria.bn.gov.br&pagfis=6511',
    alignment: 'PRO_GOVERNMENT',
    canAlter: false,

    publishImpact: { 
      money: 0, 
      censor: +12, 
      public: -12 
    },

    censorImpact: { 
      money: -45, 
      censor: -12, 
      public: +15 
    }
  },
  {
    id: 'h-07',
    type: 'HEADLINE',
    tag: 'Repressão',
    title: 'JUSTIÇA MILITAR CONDENA TRÊS À MORTE EM S. PAULO',
    body: 'São Paulo (Sucursal) - O Conselho Especial de Justiça da II Auditoria Militar condenou ontem à pena de morte os terroristas Ariston de Oliveira Lucena, Diógenes Sobrosa de Sousa (presos) e Gilberto Faria Lima (foragido), após considerá-los co-autores do assassinato do tenente da Polícia Militar Alberto Mender Jr., durante a guerrilha do vale da Ribeira, em maio de 1970.',
    context: 'A notícia se insere no contexto das ações repressivas do Estado durante o combate aos grupos armados no início da década de 1970. A sentença, dada pela Justiça Militar, fazia parte de um conjunto de julgamentos alinhados à doutrina de segurança nacional. Ver mais em: Jornal do Brasil, N° 202, Rio de Janeiro, 30 de novembro de 1971.',
    sourceUrl: 'https://memoria.bn.gov.br/DocReader/DocReader.aspx?bib=030015_09&Pesq=Diretas%20j%C3%A1&id=3510401088635&pagfis=223470',
    alignment: 'PRO_GOVERNMENT',
    canAlter: false,

    publishImpact: { 
      money: 0, 
      censor: -10, 
      public: +15 
    },

    censorImpact: { 
      money: -65, 
      censor: +15, 
      public: -15 
    }
  },
  {
    id: 'h-08',
    type: 'HEADLINE',
    tag: 'Censura',
    title: 'CRIAÇÃO E CENSURA',
    body: 'Até onde a censura esteriliza a criação artística? Subjugados a um controle que se torna cada vez mais rígido - às vezes prévio, às vezes não - os artistas brasileiros apontam seus principais problemas: sufocamento de manifestações que poderiam ser positivas à cultura, desgaste em termos de renovação cultural, desajuste do processo brasileiro e o desemprego que atinge centenas de pessoas dedicadas unicamente à arte.',
    context: 'A manchete insere-se no momento em que diferentes setores artísticos relatavam dificuldades decorrentes das normas de controle cultural vigentes nos anos 1970. Debates públicos passaram a destacar como restrições, revisões prévias e vetos afetavam processos de criação e circulação de obras. Ver mais em: Jornal do Brasil, N° 260, Rio de Janeiro, 7 de janeiro de 1973.',
    sourceUrl: 'https://memoria.bn.gov.br/DocReader/DocReader.aspx?bib=030015_09&Pesq=Diretas%20j%c3%a1&id=3510401088635&pagfis=285',
    alignment: 'PRO_GOVERNMENT',
    canAlter: false,

    publishImpact: { 
      money: +50, 
      censor: +22, 
      public: -14 
    },

    censorImpact: { 
      money: -100, 
      censor: +16, 
      public: +12 
    }
  },
  {
    id: 'h-09',
    type: 'HEADLINE',
    tag: 'Desaparecimentos',
    title: 'Editores somem em Brasília',
    body: 'Brasília - Em nome da liderança do MDB, o Deputado Getúlio Dias (RS) fez ontem um apelo à presidência da Camara no sentido de interferir junto ao Governo para fornecer notícias sobre o paradeiro do editor Vitor José Melo Allegria Lobo e seu colega José Manuel dos Anjos Soares Guedes, presos pela Polícia Federal em Goiás, nos dias 13 e 14 de maio.',
    context: 'Durante a ditadura, não era raro que jornalistas simplesmente “sumissem” após ações da Polícia Federal. O caso desses dois editores presos em Goiás revela como a busca por informações virava um jogo de esconde-esconde sombrio. Ver mais em: Jornal do Brasil, N° 84, Rio de Janeiro, 1 de julho de 1975.',
    sourceUrl: 'https://memoria.bn.gov.br/DocReader/DocReader.aspx?bib=030015_09&Pesq=carta&id=3510401088635&pagfis=58104',
    alignment: 'PRO_PEOPLE',
    canAlter: false,

    publishImpact: { 
      money: +35, 
      censor: -10, 
      public: +15 
    },

    censorImpact: { 
      money: -65, 
      censor: +15, 
      public: -15 
    }
  },
  {
    id: 'h-10',
    type: 'HEADLINE',
    tag: 'Censura',
    title: 'Jornal do Brasil (RJ) - Cartas - Censura (I), 10 de fevereiro de 1977',
    body: 'Venho juntar meu nome ao listão encaminhado ao Ministério da Justiça pedindo o fim da Censura. Sou estudante de Direito e acho que todos nós, universitários, devemos reclamar o fim da Censura à imprensa e às artes, pois este é o caminho próprio para a redemocratização do país.',
    context: 'O texto foi publicado em 1977, período em que cartas de leitores passaram a expressar posições sobre temas políticos nas páginas de jornais. Nessa época, setores estudantis e profissionais enviavam mensagens pedindo revisão de práticas estatais. A carta integra as discussões públicas sobre o processo de abertura política. Ver mais em: Jornal do Brasil, N° 305, Rio de Janeiro, 10 de fevereiro de 1977.',
    sourceUrl: 'https://memoria.bn.gov.br/DocReader/DocReader.aspx?bib=030015_09&hf=memoria.bn.gov.br&pagfis=90455',
    alignment: 'PRO_PEOPLE',
    canAlter: false,

    publishImpact: { 
      money: +50, 
      censor: -10, 
      public: +15 
    },

    censorImpact: { 
      money: -100, 
      censor: +22, 
      public: -18 
    }
  },
  {
    id: 'h-11',
    type: 'HEADLINE',
    tag: 'Abertura Política',
    title: 'Governo reafirma que mantém a abertura',
    body: 'A intervenção nos sindicatos do ABC não representou qualquer mudança de orientação nos objetivos do Governo de manter e ampliar as reformas políticas, declarou o Presidente João Baptista de Figueiredo, segundo informou ontem o porta-voz do Palácio do Planalto, Sr Marco Antônio Kraemer.',
    context: 'A manchete aparece num momento em que o país acompanhava, com cautela, os sinais de abertura política anunciados pelo governo. Mesmo após intervenções em sindicatos e outras tensões, autoridades buscavam reforçar que o processo continuaria. Ver mais em: Jornal do Brasil, N° 347, Rio de Janeiro, 25 de março de 1979.',
    sourceUrl: 'https://memoria.bn.gov.br/DocReader/DocReader.aspx?bib=030015_09&Pesq=Diretas%20j%C3%A1&id=3510401088635&pagfis=136782',
    alignment: 'PRO_GOVERNMENT',
    canAlter: false,

    publishImpact: { 
      money: 0, 
      censor: -15, 
      public: +9 
    },

    censorImpact: { 
      money: -100, 
      censor: +15, 
      public: -12 
    }
  },
{
    id: 'h-12',
    type: 'HEADLINE',
    tag: 'Eleições',
    title: 'Governo prepara emenda que fixa diretas para 88',
    body: 'O Governo Federal decidiu enviar ao Congresso, no fim de março, emenda constitucional que propõe o restabelecimento de eleições diretas para Presidente da República em 1988 - com a consequente redução do mandato presidencial para quatro anos - e para prefeitos das Capitais em 1986. A emenda já está redigida e a intenção é dar-lhe tramitação rápida.',
    context: 'A manchete integra o período da abertura política no início dos anos 1980. O governo anunciou uma proposta de emenda que estabelecia novas regras eleitorais para cargos executivos, incluindo a previsão de eleições diretas em 1988. A medida dialogava com as discussões e pressões públicas por mudanças institucionais naquele momento. Ver mais em: Jornal do Brasil, N° 324, Rio de Janeiro, 28 de fevereiro de 1984.',
    sourceUrl: 'https://memoria.bn.gov.br/DocReader/DocReader.aspx?bib=030015_10&hf=memoria.bn.gov.br&pagfis=115482',
    alignment: 'PRO_PEOPLE',
    canAlter: false,

    publishImpact: { 
      money: +35, 
      censor: -10, 
      public: +15 
    },

    censorImpact: { 
      money: -65, 
      censor: +15, 
      public: -15 
    }
  },

  
];

// ============================================================================
// 2. NOTÍCIAS COMUNS (FILLERS)
// Aparecem entre as manchetes para dar ritmo e permitir ajustes finos.
// ============================================================================
export const FILLERS: NewsItem[] = [
  {
    id: 'f-01',
    type: 'FILLER',
    editionTitle: 'Edição Diária',
    tag: 'Economia',
    title: 'INFLAÇÃO DO FEIJÃO ASSUSTA DONAS DE CASA',
    body: 'O preço da cesta básica subiu novamente esta semana. Filas se formam nos armazéns e o desabastecimento já atinge os bairros operários.',
    context: 'A instabilidade econômica era usada tanto para atacar o governo anterior quanto para justificar medidas duras do novo regime.',
    images: ['/images/market.jpg'],
    
    canAlter: true, // Pode ser alterada

    publishImpact: { money: +10, censor: +5, public: +5 }, // Notícia ruim, governo não gosta muito
    censorImpact: { money: -50, censor: 0, public: -5 },

    alterOptions: [
      {
        id: 'alt-f-01-culpa',
        text: 'Especialistas afirmam que a alta dos preços é herança maldita da gestão João Goulart.',
        title: 'HERANÇA DE GOULART CAUSA INFLAÇÃO',
        impactModifier: { money: +10, censor: -10, public: -5 } // Agrada governo
      },
      {
        id: 'alt-f-01-suave',
        text: 'Mercados operam com ligeira oscilação de preços típica da estação.',
        title: 'OSCILAÇÃO NATURAL NOS PREÇOS',
        impactModifier: { money: +5, censor: -5, public: -10 } // Alienação
      }
    ]
  },
  {
    id: 'f-02-futebol',
    type: 'FILLER',
    editionTitle: 'Caderno de Esportes',
    tag: 'Esporte',
    title: 'PELÉ MARCA O MILÉSIMO GOL EM SONHO',
    body: 'O craque santista continua brilhando nos gramados, trazendo alegria para o povo brasileiro em tempos difíceis. O Santos venceu mais uma partida decisiva.',
    context: 'O futebol servia como uma importante "válvula de escape" e distração política.',
    images: ['/images/pele.jpg'],

    canAlter: true,

    publishImpact: { money: +30, censor: -5, public: +15 }, // Todo mundo gosta
    censorImpact: { money: -20, censor: 0, public: -10 },   // Censurar futebol irrita o povo

    alterOptions: [
      {
        id: 'alt-f-02-ufanismo',
        text: 'O sucesso do nosso futebol reflete a pujança do novo Brasil que surge.',
        title: 'BRASIL GIGANTE NOS GRAMADOS',
        impactModifier: { money: +30, censor: -15, public: +5 } // Propaganda sutil
      }
    ]
  },
  
];

// ============================================================================
// 3. CARTAS (LETTERS)
// Eventos especiais que chegam pelo correio e geram Notícias Extras.
// ============================================================================
export const LETTERS: Letter[] = [
  {
    id: 'l-01-militar',
    sender: 'Gabinete do Cel. Sampaio',
    subject: 'Proposta de Cooperação',
    body: 'Sr. Editor,\n\nNotamos que seu jornal tem dado espaço para baderneiros. O Exército Brasileiro oferece uma oportunidade de corrigir essa postura.\n\nPublique este material educativo sobre a "Ameaça Vermelha" e garantiremos um generoso subsídio para suas máquinas.',
    
    acceptImpact: { money: +300, censor: -20, public: -20 }, // Ganha grana, perde moral
    refuseImpact: { money: 0, censor: +15, public: +5 },    // Arriscado

    // Se aceitar, esta notícia entra no jogo imediatamente:
    newsReward: {
      id: 'ex-01-comunismo',
      type: 'EXTRA_EDITION',
      tag: 'Informe Oficial',
      title: 'PLANO COMUNISTA PARA ESCRAVIZAR O BRASIL É DESCOBERTO',
      body: 'O Serviço de Inteligência interceptou documentos que provam que o governo deposto planejava entregar o Brasil a potências estrangeiras e acabar com a família cristã.',
      context: 'Fake news e propaganda anticomunista eram disseminadas amplamente.',
      images: ['/images/propaganda.jpg'],
      
      canAlter: false, // Propaganda paga não se edita
      publishImpact: { money: 0, censor: -10, public: -15 }, // Povo odeia, governo ama
      censorImpact: { money: 0, censor: +10, public: +5 }    // Se trair o acordo (censurar)
    }
  },
  {
    id: 'l-02-mae',
    sender: 'Sra. Maria da Silva',
    subject: 'Onde está meu filho?',
    body: 'Pelo amor de Deus, me ajudem. Meu filho Pedro, estudante de Direito, saiu para a faculdade e não voltou. A polícia diz que não sabe de nada, mas vizinhos viram ele sendo levado num camburão.\n\nVocês são minha última esperança. Publiquem a foto dele.',
    
    acceptImpact: { money: 0, censor: +5, public: +5 }, 
    refuseImpact: { money: 0, censor: -5, public: -10 },

    // Se aceitar, esta notícia entra no jogo:
    newsReward: {
      id: 'ex-02-desaparecido',
      type: 'EXTRA_EDITION',
      tag: 'Apelo',
      title: 'MÃE PROCURA FILHO DESAPARECIDO APÓS BLITZ',
      body: 'Pedro da Silva, 22 anos, está desaparecido há 3 dias. Família acusa agentes do Estado de sequestro. O caso se soma a dezenas de outros relatos similares nesta semana.',
      context: 'O início do fenômeno dos "desaparecidos políticos".',
      images: ['/images/student.jpg'],
      
      canAlter: false,
      publishImpact: { money: 0, censor: +40, public: +30 }, // Risco altíssimo de censura
      censorImpact: { money: -50, censor: -5, public: -20 }  // Omissão custa caro moralmente
    }
  }
];