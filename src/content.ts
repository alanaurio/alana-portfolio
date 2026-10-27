// Todo o texto da página mora aqui, transcrito do frame "Portfólio Alana Urio —
// Terracota" em portfolio.pen. As seções em render.ts só desenham. Marcadores
// entre colchetes são lacunas do próprio design — não preencher sem fonte
// (CLAUDE.md, invariante 2).

export const hero = {
  meta: ['Alana Urio', '2026'],
  nome: 'alana urio',
  frase:
    'Minha trajetória é marcada pela integração de diferentes áreas, saberes e contextos, sempre orientada à',
  destaque: 'transformação do conhecimento',
  fecho: 'em resultado.',
}

export const navegacao = [
  { num: '02', label: 'Sobre mim', href: '#sobre' },
  { num: '03', label: 'Onde eu atuo', href: '#atuacao' },
  { num: '04', label: 'Formação', href: '#formacao' },
  { num: '05', label: 'Ferramentas', href: '#ferramentas' },
  { num: '06', label: 'Trajetória', href: '#trajetoria' },
  { num: '07', label: 'Cases e projetos', href: '#cases' },
  { num: '08', label: 'Contato', href: '#contato' },
]

export const faixa = ['pessoas', 'ambientes', 'processos']

export const sobre = {
  indice: '02.',
  titulo: ['sobre', 'mim'],
  blocos: [
    {
      num: '01',
      rotulo: 'quem eu sou',
      texto:
        'Nascida e criada no Rio Grande do Sul, apaixonada por viagens e história da arte. Meu passatempo preferido é quebra-cabeça.',
    },
    {
      num: '02',
      rotulo: 'minha jornada',
      texto:
        'Comecei minha trajetória no comercial (B2B/B2C), mas foi na gestão de processos e projetos, especialmente em contas enterprise e em modelos consultivos, que construí e consolidei minha carreira.',
    },
    {
      num: '03',
      rotulo: 'na pesquisa',
      texto:
        'Articulo Psicologia e Arquitetura e Urbanismo para entender as relações entre pessoas e ambientes. Gosto muito do movimento Bauhaus.',
    },
    {
      num: '04',
      rotulo: 'o que eu faço',
      texto:
        'Hoje, atuo como líder de Customer Success Operations (CS Ops), com foco em estruturar e otimizar a operação, conectando processos, dados, tecnologia e experiência do cliente para tornar a operação sustentável e orientada a dados.',
    },
  ],
}

export const atuacao = {
  indice: '03.',
  titulo: ['onde eu', 'atuo'],
  frentes: [
    {
      num: '1.',
      titulo: 'Customer Success Operations (CSOps)',
      tags: [
        'Liderança de equipe',
        'Estruturação de processos',
        'Acompanhamento de indicadores',
      ],
    },
    {
      num: '2.',
      titulo: 'Gestão de projetos end-to-end',
      tags: [
        'Do diagnóstico ao pós-implantação',
        'Stakeholders, escopo, RFI/RFP',
        'Integração via API',
      ],
    },
    {
      num: '3.',
      titulo: 'Riscos psicossociais e NR-01',
      tags: [
        'Diagnóstico',
        'Projeto de gestão de risco',
        'Aderência normativa',
      ],
    },
  ],
}

export interface Formacao {
  nivel: string
  curso: string
  instituicao: string
  periodo?: string
  contexto?: string
}

export const formacao = {
  indice: '04.',
  titulo: ['formação', 'acadêmica'],
  dica: 'Passe o mouse para abrir cada formação',
  itens: [
    {
      nivel: 'Bacharelado',
      curso: 'Psicologia',
      instituicao: 'IMED (atual Atitus Educação)',
    },
    {
      nivel: 'Mestrado',
      curso: 'Arquitetura e Urbanismo',
      instituicao: 'Atitus Educação',
      periodo: 'jul/2022 – fev/2026',
      contexto: 'Intercâmbio na FEUP — Universidade do Porto.',
    },
    {
      nivel: 'Pós-graduação',
      curso: 'Direitos Humanos, Responsabilidade Social e Cidadania Global',
      instituicao: 'PUCRS',
    },
    {
      nivel: 'Certificação',
      curso:
        'Instrumentos de avaliação: personalidade, psicossocial e socioemocional',
      instituicao: 'Mapa HDS',
    },
    {
      nivel: 'Pós-graduação',
      curso: 'Avaliação Psicológica',
      instituicao: 'Faculdade Líbano',
    },
    {
      nivel: 'Certificação',
      curso: 'ISO 45001 — Gestão de Saúde e Segurança do Trabalho',
      instituicao: 'Bureau Veritas',
    },
    {
      nivel: 'Pós-graduação',
      curso: 'Gestão de Projetos, Jornada do Cliente e Metodologias Ágeis',
      instituicao: 'PUCPR',
    },
  ] satisfies Formacao[],
  aberta: 1,
}

export const ferramentas = {
  indice: '05.',
  titulo: ['ferramentas', '& métodos'],
  nota: 'Nível das ferramentas: [50]% — marcador a definir.',
  // `nivel` numérico é o marcador [50] do design, não uma medida.
  grupos: [
    {
      categoria: 'Análise de dados e pesquisa',
      itens: ['SPSS', 'JASP', 'MaxQDA', 'QGIS'],
    },
    {
      categoria: 'Gestão de projetos e tarefas',
      itens: ['Trello', 'Jira', 'Miro', 'Tableau'],
    },
    {
      categoria: 'Comunicação e colaboração',
      itens: ['Slack', 'Microsoft Teams', 'Zoom'],
    },
    {
      categoria: 'Produtividade',
      itens: [
        'Microsoft Word',
        'PowerPoint',
        'Excel',
        'Google Sheets',
        'Notion',
        'Claude (IA)',
      ],
    },
    {
      categoria: 'CRM e relacionamento',
      itens: ['HubSpot', 'Salesforce', 'Zendesk'],
    },
  ],
  nivelMarcador: 50,
  idiomas: [
    { nome: 'Inglês', nivel: 'B2 · intermediário' },
    { nome: 'Italiano', nivel: 'básico' },
  ],
}

export interface Experiencia {
  empresa: string
  cargo: string
  atual?: boolean
  datas: string
  duracao: string
  // Posição da barra na régua 2021–2026, em fração da régua.
  inicio: number
  fim: number
  detalhes?: {
    fazia: string[]
    resultados: string[]
    projetos: { num: string; titulo: string; caso: number }[]
  }
}

const regua = (px: number) => px / 720

export const trajetoria = {
  indice: '06.',
  titulo: ['trajetória', 'profissional'],
  anos: ['2021', '2022', '2023', '2024', '2025', '2026'],
  itens: [
    {
      empresa: 'LíderHub',
      cargo: 'Líder CSOps',
      atual: true,
      datas: 'abr/2026 – hoje',
      duracao: 'Atual',
      inicio: regua(630),
      fim: regua(700),
    },
    {
      empresa: 'Instituto Felipe Hurtado',
      cargo: 'Líder de Produto e CS',
      datas: 'jan/2026 – jun/2026',
      duracao: '6 meses',
      inicio: regua(600),
      fim: regua(660),
    },
    {
      empresa: 'Mapa HDS',
      cargo: 'Project Manager Sênior',
      datas: 'jul/2021 – nov/2025',
      duracao: '4 anos e 5 meses',
      inicio: regua(60),
      fim: regua(590),
      detalhes: {
        fazia: [
          'Planejamento, coordenação e monitoramento end-to-end de projetos de diagnóstico organizacional, saúde mental e fatores psicossociais.',
          'Análise de dados institucionais e indicadores de pessoas, riscos e desempenho, transformados em diagnósticos, relatórios executivos e recomendações.',
          'Formulação e acompanhamento de planos de ação e programas estruturantes.',
          'Facilitação de reuniões estratégicas, workshops e oficinas técnicas.',
          'Produção de materiais técnicos, guias metodológicos e apresentações institucionais.',
        ],
        resultados: [
          '[resultado 1 — número, prazo ou mudança verificável]',
          '[resultado 2]',
        ],
        projetos: [
          { num: '01', titulo: 'Monitoramento de suporte', caso: 0 },
          {
            num: '02',
            titulo: 'Estruturação técnico-consultiva enterprise',
            caso: 1,
          },
          { num: '03', titulo: 'Workflow de pré-vendas', caso: 2 },
          {
            num: '06',
            titulo: 'Riscos psicossociais em contact center',
            caso: 5,
          },
        ],
      },
    },
    {
      empresa: 'SBsistemas',
      cargo: 'Consultora de Vendas e Líder de Squad',
      datas: 'dez/2021 – jul/2022',
      duracao: '8 meses',
      inicio: regua(110),
      fim: regua(190),
    },
    {
      empresa: 'Capacittar',
      cargo: 'Recrutadora',
      datas: 'jun/2021 – jul/2022',
      duracao: '1 ano e 1 mês',
      inicio: regua(50),
      fim: regua(190),
    },
  ] satisfies Experiencia[],
  aberta: 2,
}

export interface Case {
  tag: string
  titulo: string
  contexto: string
  problema: string
  passos: string[]
  valor: string
  descricao: string
}

export const cases = {
  indice: '07.',
  titulo: ['cases &', 'projetos'],
  subtitulo:
    'Cada case segue o mesmo formato: contexto, problema, o que eu fiz e o resultado.',
  dica: 'Passe o mouse para abrir cada case',
  legenda: 'Rolagem infinita ↔',
  itens: [
    {
      tag: 'Case 01 · Mapa HDS · 2024–2025',
      titulo: 'Monitoramento de suporte',
      contexto:
        'Na estruturação das contas enterprise, o suporte recebia um volume alto de demandas — muitas que o próprio cliente poderia resolver.',
      problema:
        'Sem autonomia do cliente nem documentação dos casos, o suporte sobrecarregava o time técnico e gerava conflito de relacionamento.',
      passos: [
        'Reestruturei o fluxo desde o envio do contrato, antecipando dúvidas antes do onboarding',
        'Criei o passo a passo de cadastro para o cliente agir sozinho',
        'Consolidei o suporte em um canal único e especializado',
      ],
      valor: '−72%',
      descricao: 'no volume de chamados em 6 meses',
    },
    {
      tag: 'Case 02 · Mapa HDS · 2024–2025',
      titulo: 'Estruturação técnico-consultiva enterprise',
      contexto:
        'A empresa crescia por vendas transacionais, sem previsibilidade de receita nem acompanhamento depois da entrega.',
      problema:
        'Sem estrutura para contas de grande porte, o churn chegou a cerca de 60% nos projetos mais complexos.',
      passos: [
        'Estruturei indicadores para medir impacto e retorno das soluções',
        'Redesenhei o portfólio integrando diagnóstico, intervenção e acompanhamento',
        'Implantei acompanhamento contínuo e consultivo das contas',
      ],
      valor: '+93%',
      descricao: 'em contratos no semestre (58 → 112)',
    },
    {
      tag: 'Case 03 · Mapa HDS · desde 2021',
      titulo: 'Workflow de pré-vendas',
      contexto:
        'Não havia pré-vendas: dois closers prospectavam por conta própria, via networking e LinkedIn.',
      problema:
        'Sem pipeline, sem ICP e sem métricas, os leads chegavam de forma imprevisível e com pouca informação.',
      passos: [
        'Defini o papel de cada área no processo comercial',
        'Estruturei critérios de qualificação, etapas de funil e o fluxo de inbound',
        'Desenhei e testei o outbound, com ICP definido junto à direção',
      ],
      valor: '2',
      descricao: 'fechamentos outbound já no primeiro mês',
    },
    {
      tag: 'Case 04 · Projeto acadêmico · 2025',
      titulo: 'Método PRISMA com low-code',
      contexto:
        'Conduzindo formações em pesquisa, vi as mesmas dificuldades se repetirem na revisão sistemática com o método PRISMA.',
      problema:
        'O processo era manual, com controle de versões frágil e nenhuma ferramenta prática para organizar as etapas.',
      passos: [
        'Prototipei um sistema no Base44 (low-code)',
        'Testei em aula com usuários reais e ajustei a cada rodada',
        'Planejei uma camada de IA para triagem e classificação de estudos',
      ],
      valor: '8 de 12',
      descricao:
        'pessoas que testaram pediram acesso para usar nas próprias pesquisas',
    },
    {
      tag: 'Case 05 · Projeto pessoal · 2026 · em andamento',
      titulo: 'Avaliação de vendedores com IA',
      contexto:
        'Uma planilha de avaliação de gaps de desempenho em vendas, compartilhada no LinkedIn, serviu de ponto de partida.',
      problema:
        'Modelos complexos em planilha geram sobrecarga cognitiva, versões paralelas e dependência de quem criou o arquivo.',
      passos: [
        'Redesenhei o raciocínio do modelo como sistema',
        'Prototipei visualizações que apoiam decisão',
        'Incluí camadas de IA para sugerir padrões e alertar inconsistências',
      ],
      valor: 'em curso',
      descricao: '[resultado — confirmar]',
    },
    {
      tag: 'Case 06 · Mapa HDS · [confirmar período]',
      titulo: 'Riscos psicossociais em contact center',
      contexto:
        'Empresa de contact center com mais de 10 mil colaboradores e equipe multiprofissional de saúde e segurança.',
      problema:
        'Havia conhecimento da atualização da NR-01, mas pouco das etapas de gerenciamento e de como aplicar os dados em cada área.',
      passos: [
        'Construí o projeto em cocriação com engenheiros, ergonomistas, médicos e psicólogos',
        '[etapa 2 — confirmar]',
        '[etapa 3 — confirmar]',
      ],
      valor: '[nº]',
      descricao: '[resultado — confirmar]',
    },
  ] satisfies Case[],
}

export const contato = {
  indice: '08.',
  titulo: ['vamos', 'conversar?'],
  email: 'urio.alana@gmail.com',
  links: [
    {
      rotulo: 'WhatsApp',
      valor: 'wa.me/5554999898197',
      href: 'https://wa.me/5554999898197',
    },
    {
      rotulo: 'E-mail',
      valor: 'urio.alana@gmail.com',
      href: 'mailto:urio.alana@gmail.com',
    },
    {
      rotulo: 'LinkedIn',
      valor: 'linkedin.com/in/alanaurio',
      href: 'https://linkedin.com/in/alanaurio',
    },
  ],
  campos: [
    {
      nome: 'nome',
      rotulo: 'Nome completo *',
      placeholder: 'Seu nome',
      tipo: 'text',
    },
    {
      nome: 'email',
      rotulo: 'E-mail *',
      placeholder: 'voce@empresa.com',
      tipo: 'email',
    },
    {
      nome: 'empresa',
      rotulo: 'Empresa *',
      placeholder: 'Onde você trabalha',
      tipo: 'text',
    },
    {
      nome: 'assunto',
      rotulo: 'Assunto *',
      placeholder: 'Vaga, projeto ou conversa',
      tipo: 'text',
    },
    {
      nome: 'mensagem',
      rotulo: 'Mensagem *',
      placeholder: 'Conte um pouco sobre o contexto...',
      tipo: 'textarea',
    },
  ],
  enviar: 'Enviar mensagem',
}

export const rodape = {
  logo: 'Portfólio rev. 2026',
  topo: 'Voltar ao topo ↑',
}
