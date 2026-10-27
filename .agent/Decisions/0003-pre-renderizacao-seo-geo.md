# ADR 0003 — Pré-renderização no build para SEO e GEO

- **Status:** Accepted
- **Data:** 2026-10-27
- **Área:** build, conteúdo

---

## Contexto

A página pública era montada inteira no cliente: `index.html` trazia um
`<div id="app"></div>` vazio e `main.ts` preenchia com `innerHTML`. O Google
executa JS, mas com atraso e sem garantia; os crawlers de IA (GPTBot, ClaudeBot,
PerplexityBot) em geral não executam. Para eles a página não tinha texto nenhum,
o que zera tanto SEO quanto GEO (ser lido e citado por respostas de IA).

Pediu-se SEO e GEO da página pública. A pergunta em aberto de
`content/02-dados-a-coletar.md` §3 ("vale decidir se a página vai indexar no
Google") fica respondida por esse pedido: a página pública indexa. Hospedagem e
domínio ainda não estavam decididos.

## Decisão

1. **O HTML da página pública é gerado no build.** Depois do build do cliente,
   um build SSR de `src/prerender.ts` roda em Node e `scripts/prerender.mjs`
   injeta `renderPage()` em `dist/index.html`. `main.ts` só monta o HTML quando
   `#app` está vazio, ou seja, no dev.
2. **Metadados saem de `content.ts`**, via `src/seo.ts`: title, description,
   Open Graph, JSON-LD (`ProfilePage` + `Person`), `robots.txt` e `llms.txt`.
   Lacunas entre colchetes nunca entram neles. Os números dos cases e as datas
   da trajetória ficam fora do `llms.txt`, porque a autoria e as sobreposições
   ainda estão em conferência (§4 e §7 de `02-dados-a-coletar.md`) e esse
   arquivo existe justamente para ser citado.
3. **Endereço absoluto só via `SITE_URL`.** Sem a variável, canonical, `og:url`
   e `og:image` são omitidos, com aviso no build, em vez de apontarem para um
   domínio errado.
4. **Continua sem `sitemap.xml`** (ADR 0001, regra 2). Numa página só, ele não
   acrescenta nada que o canonical não diga. O `robots.txt` não menciona `/v/`
   (ADR 0001, alternativas). O `llms.txt` descreve apenas `/`.

## Alternativas descartadas

- **Deixar só no cliente e confiar no render do Google:** os crawlers de IA
  continuariam vendo a página vazia, e o GEO era metade do pedido.
- **Copiar o texto à mão para dentro do `index.html`:** seriam duas fontes de
  conteúdo, contra a arquitetura (texto mora em `content.ts`) e o ADR 0002.
- **Framework de SSG (Astro, vite-ssg):** seria uma dependência estrutural nova
  para resolver uma página. O build SSR do próprio Vite já cobre.
- **`sitemap.xml` com uma URL só:** ganho nulo, e abriria o tipo de arquivo que
  o ADR 0001 proíbe.

## Consequências

### Positivas

- O texto é visível sem JS: buscadores, crawlers de IA, leitores de tela no
  primeiro paint e prévias de link.
- O mesmo passo serve de base para as páginas de vaga, que o ADR 0001 já exige
  como HTML estático gerado em build.

### Negativas / trade-offs

- **A página passa a ser achável por nome.** Quem buscar "Alana Urio", inclusive
  na LíderHub, encontra o portfólio. Ele não diz que ela procura vaga, mas existe
  e é recente.
- O build ficou com dois passos a mais (build SSR + script Node), e o HTML
  renderizado é baixado duas vezes: no documento e no bundle, que continua tendo
  `renderPage` para o dev e para emitir os assets.
- `og:image` usa o retrato (617×1080, vertical): algumas redes cortam. Uma
  imagem 1200×630 dedicada fica para quando houver domínio.
- O que estiver entre colchetes na página continua sendo indexado como texto
  visível ("[resultado — confirmar]"). Só sai preenchendo `content.ts`.

## Código / evidência

| Artefato                        | Caminho                 |
| ------------------------------- | ----------------------- |
| Metadados derivados do conteúdo | `src/seo.ts`            |
| Entry SSR                       | `src/prerender.ts`      |
| Pós-build                       | `scripts/prerender.mjs` |
| Montagem condicional no cliente | `src/main.ts`           |

## Related

- [0001 — Páginas por vaga não listadas](./0001-paginas-por-vaga-nao-listadas.md)
- [0002 — Banco de evidências como fonte única](./0002-banco-de-evidencias.md)
