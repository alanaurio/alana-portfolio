# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## O que é este projeto

Portfólio da **Alana Urio** — psicóloga, mestre em Arquitetura e Urbanismo,
atualmente Líder CSOps na LíderHub. Uma página pública, mais **uma página gerada
por vaga** em URL não listada, que ela manda ao se candidatar.

O contexto é operacional e vale para quase toda decisão aqui: a empresa atual
está desorganizada, ela foi realocada de posição sem aviso prévio, está infeliz e
procura outra vaga **em silêncio** — o fundador e o gestor dela estão na rede de
contatos dela no LinkedIn.

O idioma do produto e da documentação é **português do Brasil**.

## Comandos

```bash
npm run dev        # servidor de desenvolvimento
npm run build      # tsc --noEmit && vite build  (a prova principal deste projeto)
npm run preview    # serve o dist/ para conferir o build
npm run typecheck  # só a checagem de tipos
```

Não há linter nem suíte de testes, por decisão registrada — ver
`.devkit/profile.sh`, notas 1 e 2. A prova hoje é o build passar. Por isso, e ao
contrário do default do devkit, **o build entra no gate**: custa menos de 1s e é
a única coisa que pega import de CSS quebrado, asset ausente ou entry de página
que não resolve.

## Processo de desenvolvimento

O fluxo, os gates e o que cada comando faz estão em
[`.agent/System/ai-development-workflow.md`](.agent/System/ai-development-workflow.md).
O resumo que vale em todo turno:

```text
/brainstorm → /research → /spec → plan → build → verify → /code-review → finish-branch
   Gate -1     Gate 0     Gate 1  Gate 2         Gate 3     Gate 4         Gate 5
```

**Dimensione à incerteza.** Bugfix, copy e UI isolada pulam os Gates −1 e 0, às
vezes o 1. **Ninguém pula o Gate 3** — a skill `verify`, cobrada pelo hook `Stop`.

**Afirmação sem saída de comando é previsão, não relatório.** Não escreva
"funciona", "pronto" ou "corrigido" sem colar o que provou. "Não verificado" é
resposta legítima; "presumo que funcione" não é.

### Onde cada coisa mora

| Pergunta                   | Onde                                    |
| -------------------------- | --------------------------------------- |
| Por que decidimos assim?   | `.agent/Decisions/` (ADRs)              |
| Como o sistema funciona?   | `.agent/System/project_architecture.md` |
| O que a revisão cobra?     | `.agent/SOP/review-checklist.md`        |
| O que estamos construindo? | `.agent/Tasks/pagina-por-vaga.md`       |
| Como se prova algo aqui?   | `.devkit/profile.sh`                    |
| O que a página vai dizer?  | `content/`                              |

### Decisões arquiteturais exigem ADR

Dependência estrutural nova, mudança de fluxo de dados, trade-off de
segurança/performance, ou padrão novo que outras features vão seguir → `/adr`,
**no mesmo PR**. Mudar uma decisão passada é um ADR novo que supersede a antiga;
não se reescreve um `Accepted`. Antes de propor mudança estrutural, leia
`.agent/Decisions/README.md` — inclusive o backlog, que registra o que já foi
adiado e por quê.

## As duas invariantes que governam este repositório

### 1. Nenhum artefato pode revelar que páginas de vaga existem

Decisão completa, com modelo de ameaça e alternativas descartadas, em
[ADR 0001](.agent/Decisions/0001-paginas-por-vaga-nao-listadas.md). O que precisa
estar na cabeça em todo turno:

- **Sem `sitemap.xml`, sem manifest, sem página índice, sem link de `/` para
  `/v/`.** `build.manifest` do Vite fica `false` — ligado, ele escreve
  `dist/.vite/manifest.json`, que é exatamente o arquivo que não pode existir.
- **Conteúdo de vaga é resolvido em build, nunca no cliente.** Se um slug
  aparecer dentro de um `.js`, uma página entrega todas as outras.
- **Nunca subdomínio por vaga.** Certificado de subdomínio vai para os logs
  públicos de Certificate Transparency e publicaria a lista de empresas para
  sempre. URL por caminho, sempre.
- **Sem analytics e sem script de terceiro em página de vaga**, e
  `referrer: no-referrer` — senão a URL secreta vaza no cabeçalho `Referer` no
  primeiro clique para fora.
- `content/vagas/` está fora do git de propósito.

**Não listada não é privada.** Quem tem o link, abre. Não descreva esse desenho
como se ele garantisse que a LíderHub não vai ver.

### 2. Nunca invente dado sobre a Alana

Métrica, número de clientes, resultado de projeto, nome de ferramenta, nível de
inglês: se não está no perfil do LinkedIn transcrito em
`content/fontes/linkedin-2026-09-28.md` nem no resto de `content/`, **não
existe**. Marque `[confirmar]` e siga. Estar na transcrição também não é estar
confirmado — o perfil tem erros, listados em `content/02-dados-a-coletar.md` §4.

Isso não é zelo de copy. Número inventado queima a candidata na entrevista,
quando o entrevistador puxa o fio — é o risco mais sério do projeto, e a razão de
o conteúdo ter uma fonte única com id e estado por afirmação
([ADR 0002](.agent/Decisions/0002-banco-de-evidencias.md)).

Há inconsistências reais no perfil de origem (vínculos em tempo integral
sobrepostos entre Mapa, SBsistemas e Capacittar) listadas em
`content/02-dados-a-coletar.md` §4. Não as replique como fato conferido.

## Conteúdo primeiro, layout depois

Decisão do usuário: fechar a estrutura de seções em texto antes de construir
interface. Enquanto os documentos em `content/` não estiverem validados com a
Alana, `src/` fica sendo um shell mínimo. **Não construa seções da página a
partir dos documentos de estrutura por iniciativa própria.**

| Arquivo                          | O que decide                                                     |
| -------------------------------- | ---------------------------------------------------------------- |
| `content/00-posicionamento.md`   | Para quem a página fala, as três trilhas de vaga, a recomendação |
| `content/01-estrutura-secoes.md` | As 11 seções, em ordem de prioridade, com objetivo e evidência   |
| `content/02-dados-a-coletar.md`  | O que ainda falta perguntar para a Alana                         |
| `content/fontes/`                | Material bruto, literal e datado (LinkedIn, galeria do Notion)   |

Leia `00` antes de escrever qualquer copy.

## Arquitetura pretendida

Detalhe em
[`.agent/System/project_architecture.md`](.agent/System/project_architecture.md).
O texto mora em módulos de dados e as seções apenas renderizam — a Alana precisa
revisar texto sem tocar em marcação, e o layout precisa poder mudar sem
reescrever conteúdo. Página única com âncoras, sem rota. Versão imprimível via
`@media print`, a partir da mesma fonte, para não manter CV e portfólio em
paralelo.

## devkit/

`devkit/` é o kit de processo, **instalado** (perfil derivado de `ts-node-web` e
adaptado para pacote único: sem monorepo, sem API, sem migração). Ele é
versionado junto de propósito — `devkit/README.md` avisa que a pasta já foi
perdida uma vez por estar untracked.

`.devkit/checks/` está vazio. Os dois primeiros invariantes de máquina estão
especificados na fase 2 de `.agent/Tasks/pagina-por-vaga.md` e nascem junto com a
feature, não antes.

## Estado atual

`src/main.ts` é um placeholder que lista os próximos passos; não o trate como
código de produção nem preserve seu conteúdo. Nada da página real foi construído
ainda.
