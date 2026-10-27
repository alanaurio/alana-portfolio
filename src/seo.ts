// SEO e GEO (otimização para buscadores e para respostas de IA), derivados do
// mesmo content.ts que a página renderiza — nenhuma afirmação nova sobre a
// Alana nasce aqui (CLAUDE.md, invariante 2). Lacunas do design, entre
// colchetes, ficam de fora: não podem virar dado estruturado nem citação.
//
// Só a página pública passa por este módulo. Página de vaga é noindex e não
// aparece em nenhum arquivo gerado daqui (ADR 0001).

import * as c from './content'

const nome = 'Alana Urio'
const confirmado = (s: string) => !s.includes('[')
const atual = c.trajetoria.itens.find((t) => t.atual)

export const titulo = `${nome} — Customer Success Operations, Projetos e Psicologia`

export const descricao =
  'Alana Urio — psicóloga e mestre em Arquitetura e Urbanismo. Líder de Customer Success Operations, gestão de projetos end-to-end e riscos psicossociais (NR-01).'

const temas = c.atuacao.frentes.flatMap((f) => [f.titulo, ...f.tags])

const linkedin = c.contato.links.find((l) => l.rotulo === 'LinkedIn')

export const jsonLd = (site?: string, imagem?: string) => {
  const pessoa = {
    '@type': 'Person',
    '@id': site ? `${site}/#alana` : undefined,
    name: nome,
    givenName: 'Alana',
    familyName: 'Urio',
    url: site ? `${site}/` : undefined,
    image: imagem,
    description: descricao,
    jobTitle: atual?.cargo,
    worksFor: atual
      ? { '@type': 'Organization', name: atual.empresa }
      : undefined,
    email: `mailto:${c.contato.email}`,
    sameAs: linkedin ? [linkedin.href] : undefined,
    knowsAbout: temas,
    knowsLanguage: c.ferramentas.idiomas.map((i) => i.nome),
    alumniOf: [
      ...new Set(
        c.formacao.itens
          .filter((f) => f.nivel !== 'Certificação')
          .map((f) => f.instituicao),
      ),
    ].map((name) => ({ '@type': 'EducationalOrganization', name })),
    hasCredential: c.formacao.itens.map((f) => ({
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: f.nivel,
      name: f.curso,
      recognizedBy: { '@type': 'Organization', name: f.instituicao },
    })),
  }
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    url: site ? `${site}/` : undefined,
    name: titulo,
    inLanguage: 'pt-BR',
    mainEntity: pessoa,
  }
}

// https://llmstxt.org — resumo em Markdown para quem lê com modelo de linguagem.
// Os números dos cases ficam só na página: a autoria de cada um ainda está em
// conferência (content/02-dados-a-coletar.md §7), e este arquivo existe para ser
// citado. Datas da trajetória também ficam de fora pelo mesmo motivo (§4).
export const llmsTxt = (site?: string) => {
  const url = site ? `${site}/` : '/'
  const lista = (itens: string[]) => itens.map((i) => `- ${i}`).join('\n')
  return `# ${nome}

> ${descricao}

Portfólio profissional em português do Brasil: ${url}

## Sobre

${c.sobre.blocos.map((b) => b.texto).join('\n\n')}

## Onde atua

${c.atuacao.frentes.map((f) => `- **${f.titulo}**: ${f.tags.join('; ')}`).join('\n')}

## Formação

${lista(c.formacao.itens.map((f) => `${f.nivel} em ${f.curso} — ${f.instituicao}`))}

## Trajetória

${lista(c.trajetoria.itens.map((t) => `${t.cargo} — ${t.empresa}${t.atual ? ' (atual)' : ''}`))}

## Cases e projetos

${lista(c.cases.itens.filter((k) => confirmado(k.contexto)).map((k) => `**${k.titulo}**: ${k.contexto}`))}

## Ferramentas

${lista(c.ferramentas.grupos.map((g) => `${g.categoria}: ${g.itens.join(', ')}`))}

Idiomas: ${c.ferramentas.idiomas.map((i) => `${i.nome} (${i.nivel})`).join(', ')}.

## Contato

${lista(c.contato.links.map((l) => `${l.rotulo}: ${l.href}`))}
`
}

export const robotsTxt = `User-agent: *
Allow: /
`
