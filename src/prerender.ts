// Entry do build SSR (ADR 0003): roda em Node depois do build do cliente e
// devolve o HTML da página já montado, mais os arquivos de texto da raiz.
// Quem lê sem executar JS — buscador e crawler de IA — passa a ver a página.

import fotoAlana from './assets/foto-alana.jpg'
import { renderPage } from './render'
import * as seo from './seo'

const attr = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;')

export const prerender = (html: string, siteUrl?: string) => {
  const site = siteUrl?.replace(/\/+$/, '')
  const imagem = site ? `${site}${fotoAlana}` : undefined

  const absolutos = site
    ? `
    <link rel="canonical" href="${site}/" />
    <meta property="og:url" content="${site}/" />
    <meta property="og:image" content="${imagem}" />
    <meta property="og:image:width" content="617" />
    <meta property="og:image:height" content="1080" />
    <meta property="og:image:alt" content="Retrato de Alana Urio" />`
    : ''

  // `<` escapado para que nenhum texto do conteúdo feche o <script> antes da hora.
  const ld = JSON.stringify(seo.jsonLd(site, imagem)).replace(/</g, '\\u003c')

  const head = `
    <meta name="robots" content="index, follow, max-image-preview:large" />
    <meta name="author" content="Alana Urio" />
    <meta property="og:type" content="profile" />
    <meta property="og:locale" content="pt_BR" />
    <meta property="og:site_name" content="Alana Urio" />
    <meta property="og:title" content="${attr(seo.titulo)}" />
    <meta property="og:description" content="${attr(seo.descricao)}" />
    <meta property="profile:first_name" content="Alana" />
    <meta property="profile:last_name" content="Urio" />
    <meta name="twitter:card" content="summary" />${absolutos}
    <script type="application/ld+json">${ld}</script>
  </head>`

  const app = '<div id="app"></div>'
  if (!html.includes(app) || !html.includes('</head>')) {
    throw new Error('prerender: index.html sem <div id="app"></div> ou </head>')
  }

  return {
    html: html
      .replace(/<title>[^<]*<\/title>/, `<title>${seo.titulo}</title>`)
      .replace(
        /(<meta\s+name="description"\s+content=")[^"]*(")/,
        `$1${attr(seo.descricao)}$2`,
      )
      .replace('</head>', head)
      .replace(app, `<div id="app">${renderPage()}</div>`),
    arquivos: {
      'robots.txt': seo.robotsTxt,
      'llms.txt': seo.llmsTxt(site),
    },
  }
}
