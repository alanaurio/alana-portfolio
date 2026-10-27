// Pós-build (ADR 0003): injeta o HTML pré-renderizado em dist/index.html e
// escreve robots.txt e llms.txt. O endereço absoluto vem de SITE_URL; sem ele,
// canonical, og:url e og:image ficam de fora em vez de apontarem para lugar errado.

import { readFile, rm, writeFile } from 'node:fs/promises'

const { prerender } = await import('../.ssr/prerender.js')

const siteUrl = process.env.SITE_URL
if (!siteUrl) {
  console.warn(
    'prerender: SITE_URL não definido — build sem canonical, og:url e og:image.',
  )
}

const entrada = new URL('../dist/index.html', import.meta.url)
const { html, arquivos } = prerender(await readFile(entrada, 'utf8'), siteUrl)

await writeFile(entrada, html)
for (const [nome, texto] of Object.entries(arquivos)) {
  await writeFile(new URL(`../dist/${nome}`, import.meta.url), texto)
}
await rm(new URL('../.ssr', import.meta.url), { recursive: true, force: true })

console.log(`prerender: index.html, ${Object.keys(arquivos).join(', ')}`)
