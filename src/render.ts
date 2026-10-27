import * as c from './content'
import { icon } from './icons'
import fotoAlana from './assets/foto-alana.jpg'
import fundoPessoas from './assets/fundo-pessoas.jpg'

const esc = (s: string) =>
  s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

const pad = (n: number) => String(n).padStart(2, '0')

// Título grande de seção: cada linha sobe por trás de uma máscara ao entrar na tela.
const titulo = (indice: string, linhas: string[], extra = '') => `
  <div class="sec-title" data-reveal>
    <span class="sec-index">${indice}</span>
    <h2 class="display"><span class="lines">${linhas
      .map(
        (l, i) =>
          `<span class="line"><span style="--d:${i * 90}ms">${esc(l)}</span></span>`,
      )
      .join('')}</span>${extra}</h2>
  </div>`

const foto = (src: string, alt: string, cls: string) =>
  `<figure class="photo ${cls}"><img src="${src}" alt="${esc(alt)}" loading="lazy" decoding="async" /></figure>`

const hero = () => `
  <header class="hero" id="top">
    <div class="hero-pin">
      <div class="hero-grid">
        <div class="hero-left">
          <div class="hero-top">
            <p class="meta">${c.hero.meta.map(esc).join('<br />')}</p>
            ${foto(fundoPessoas, '', 'photo-small')}
          </div>
          <nav class="quicknav" aria-label="Seções">
            ${c.navegacao
              .map(
                (n) =>
                  `<a href="${n.href}"><span class="qn-num">${n.num}</span><span>${esc(n.label)}</span></a>`,
              )
              .join('')}
          </nav>
          <div class="hero-frase">
            <p>${esc(c.hero.frase)}</p>
            <p class="destaque">${esc(c.hero.destaque)}</p>
            <p>${esc(c.hero.fecho)}</p>
          </div>
        </div>
        <div class="hero-photo">
          <figure class="photo photo-portrait"><img src="${fotoAlana}" alt="Retrato de Alana Urio" fetchpriority="high" /></figure>
          <span class="dot dot-hero" aria-hidden="true"></span>
        </div>
        <div class="hero-name"><h1>${esc(c.hero.nome)}</h1></div>
      </div>
    </div>
  </header>`

const faixa = (cls = '') => {
  const grupo = Array.from({ length: 4 }, () =>
    c.faixa
      .map((p) => `<span class="fx">✕</span><span class="fw">${p}</span>`)
      .join(''),
  ).join('')
  return `<div class="faixa ${cls}" aria-hidden="true"><div class="faixa-track"><div>${grupo}</div><div>${grupo}</div></div></div>`
}

const sobre = () => `
  <section class="sec sobre" id="sobre">
    <div class="stage" data-stage>
      <div class="stage-sticky">
        <div class="wrap sobre-top">
          ${titulo(c.sobre.indice, c.sobre.titulo)}
          <div class="sobre-textos">
            ${c.sobre.blocos
              .map(
                (b) => `
              <div class="rule-block" data-step>
                <div class="rb-head"><span class="rb-num">${b.num}</span><h3>${esc(b.rotulo)}</h3></div>
                <p>${esc(b.texto)}</p>
              </div>`,
              )
              .join('')}
          </div>
        </div>
      </div>
    </div>
    <div class="wrap sobre-img" data-reveal>
      <div class="sobre-figure">
        ${foto(fundoPessoas, 'Pessoas caminhando em um espaço urbano', 'photo-wide')}
        <span class="dot dot-sobre" aria-hidden="true"></span>
      </div>
    </div>
  </section>`

const atuacao = () => `
  <section class="sec atuacao" id="atuacao">
    <div class="stage" data-stage>
      <div class="stage-sticky">
        <div class="wrap">
          ${titulo(c.atuacao.indice, c.atuacao.titulo)}
          <div class="frentes">
            ${c.atuacao.frentes
              .map(
                (f) => `
              <div class="frente" data-step>
                <span class="frente-num">${f.num}</span>
                <h3>${esc(f.titulo)}</h3>
                <ul>${f.tags.map((t) => `<li>— ${esc(t)}</li>`).join('')}</ul>
              </div>`,
              )
              .join('')}
          </div>
        </div>
      </div>
    </div>
  </section>`

const confirmar = '[confirmar]'

const formacao = () => `
  <section class="sec formacao" id="formacao">
    <div class="wrap">
      <div class="sec-head">
        ${titulo(c.formacao.indice, c.formacao.titulo)}
        <p class="hint" data-reveal><span class="hint-dot"></span>${esc(c.formacao.dica)}</p>
      </div>
      <div class="edu-list" data-reveal>
        ${c.formacao.itens
          .map(
            (f, i) => `
          <div class="edu${i === c.formacao.aberta ? ' is-open' : ''}" style="--d:${i * 60}ms">
            <button class="edu-row" type="button" aria-expanded="${i === c.formacao.aberta}" aria-controls="edu-${i}">
              <span class="edu-num">${pad(i + 1)}</span>
              <span class="edu-nivel">${esc(f.nivel)}</span>
              <span class="edu-curso">${esc(f.curso)}</span>
              <span class="edu-inst">${esc(f.instituicao)}</span>
              <span class="pill">Saber mais <span class="pill-icon">${icon('plus')}${icon('minus')}</span></span>
            </button>
            <div class="collapse" id="edu-${i}">
              <div class="collapse-inner">
                <div class="edu-panel">
                  <div class="edu-periodo"><span class="label">Período</span><strong>${esc(f.periodo ?? confirmar)}</strong></div>
                  <div class="edu-contexto"><span class="label">Contexto</span><strong>${esc(f.contexto ?? confirmar)}</strong></div>
                </div>
              </div>
            </div>
          </div>`,
          )
          .join('')}
      </div>
    </div>
  </section>`

const barra = (v: number) =>
  `<div class="bar"><div class="bar-fill" style="--v:${v / 100}"></div></div>`

const ferramentas = () => {
  const f = c.ferramentas
  const grupos = f.grupos.map(
    (g, gi) => `
    <div class="tool-group" data-reveal style="--d:${(gi % 3) * 90}ms">
      <h3 class="label">${esc(g.categoria)}</h3>
      ${g.itens
        .map(
          (t) => `
        <div class="tool">
          <div class="tool-head"><span class="tool-name">${esc(t)}</span><span class="tool-lvl">[${f.nivelMarcador}]%</span></div>
          ${barra(f.nivelMarcador)}
        </div>`,
        )
        .join('')}
    </div>`,
  )
  const idiomas = `
    <div class="tool-group" data-reveal style="--d:180ms">
      <h3 class="label">Idiomas</h3>
      ${f.idiomas
        .map(
          (l) =>
            `<div class="tool"><div class="tool-head"><span class="tool-name">${esc(l.nome)}</span><span class="tool-lang">${esc(l.nivel)}</span></div></div>`,
        )
        .join('')}
    </div>`
  return `
  <section class="sec ferramentas ruled" id="ferramentas">
    <div class="wrap">
      <div class="sec-head">
        ${titulo(f.indice, f.titulo)}
        <p class="note" data-reveal>${esc(f.nota)}</p>
      </div>
      <div class="tools-grid">${grupos.join('')}${idiomas}</div>
    </div>
  </section>`
}

const trajetoria = () => {
  const t = c.trajetoria
  const job = (j: c.Experiencia, i: number) => {
    const aberto = i === t.aberta
    const d = j.detalhes
    const painel = d
      ? `
        <div class="job-panel">
          <div class="jp-fazia">
            <span class="label">O que eu fazia</span>
            <ul>${d.fazia.map((x) => `<li><span>—</span>${esc(x)}</li>`).join('')}</ul>
          </div>
          <div class="jp-result">
            <span class="label">Resultados</span>
            ${d.resultados.map((r) => `<p>${esc(r)}</p>`).join('')}
          </div>
          <div class="jp-proj">
            <span class="label">Projetos na ${esc(j.empresa)}</span>
            ${d.projetos
              .map(
                (p) =>
                  `<a href="#cases" data-case="${p.caso}"><span class="jp-num">${p.num}</span><span class="jp-tit">${esc(p.titulo)}</span>${icon('arrow-up-right', 14)}</a>`,
              )
              .join('')}
          </div>
        </div>`
      : `<div class="job-panel job-panel-empty"><span class="label">Detalhes</span><p>${confirmar}</p></div>`
    return `
      <article class="job${aberto ? ' is-open' : ''}" data-reveal style="--d:${i * 70}ms">
        <div class="job-row">
          <div class="job-co">
            <h3>${esc(j.empresa)}${j.atual ? '<span class="badge">hoje</span>' : ''}</h3>
            <p>${esc(j.cargo)}</p>
          </div>
          <div class="job-track" aria-hidden="true">
            <span class="job-bar${j.atual || d ? ' is-terra' : ''}" style="--a:${j.inicio};--b:${j.fim}"></span>
          </div>
          <div class="job-when">
            <strong>${esc(j.datas)}</strong>
            <span class="job-dur${j.atual ? ' is-terra' : ''}">${esc(j.duracao)}</span>
            <button type="button" class="job-toggle" aria-expanded="${aberto}" aria-controls="job-${i}">ver detalhes ${icon('chevron-down')}</button>
          </div>
        </div>
        <div class="collapse" id="job-${i}"><div class="collapse-inner">${painel}</div></div>
      </article>`
  }
  return `
  <section class="sec trajetoria ruled" id="trajetoria">
    <div class="wrap">
      ${titulo(t.indice, t.titulo)}
      <div class="timeline">
        <div class="tl-head" data-reveal>
          <span>Empresa</span>
          <div class="tl-years">${t.anos.map((a) => `<span>${a}</span>`).join('')}</div>
          <span class="tl-when">Período</span>
        </div>
        ${t.itens.map(job).join('')}
      </div>
    </div>
  </section>`
}

const caseCard = (k: c.Case, i: number) => `
  <article class="case" data-index="${i}" style="--d:${i * 80}ms">
    <div class="case-body">
      <header class="case-head">
        <div class="case-numline"><span class="case-num">${i + 1}.</span><span class="case-dot"></span></div>
        <span class="case-tag">${esc(k.tag)}</span>
        <h3>${esc(k.titulo)}</h3>
      </header>
      <div class="case-block"><span class="label">Contexto</span><p>${esc(k.contexto)}</p></div>
      <div class="case-block"><span class="label">Problema</span><p>${esc(k.problema)}</p></div>
      <div class="case-block">
        <span class="label">O que eu fiz</span>
        <ol>${k.passos.map((p, n) => `<li><span>${n + 1}.</span>${esc(p)}</li>`).join('')}</ol>
      </div>
    </div>
    <footer class="case-result">
      <span class="label">Resultado</span>
      <strong class="case-value">${esc(k.valor)}</strong>
      <p>${esc(k.descricao)}</p>
      <span class="case-more">Ver case completo ${icon('arrow-up-right')}</span>
    </footer>
  </article>`

const cases = () => {
  const k = c.cases
  return `
  <section class="sec cases ruled" id="cases">
    <div class="cases-head">
      <div>
        ${titulo(k.indice, k.titulo)}
        <p class="sub" data-reveal>${esc(k.subtitulo)}</p>
      </div>
      <div class="cases-ctrl" data-reveal>
        <div class="cases-ctrl-row">
          <span class="cases-count" aria-live="polite"><b>01</b> / ${pad(k.itens.length)}</span>
          <button type="button" class="round" data-dir="-1" aria-label="Case anterior">${icon('arrow-left', 18)}</button>
          <button type="button" class="round round-fill" data-dir="1" aria-label="Próximo case">${icon('arrow-right', 18)}</button>
        </div>
        <span class="hint">${esc(k.dica)}</span>
      </div>
    </div>
    <div class="cases-viewport" tabindex="0" aria-label="Cases e projetos">
      <div class="cases-track" data-reveal>${k.itens.map(caseCard).join('')}</div>
    </div>
    <div class="cases-progress">
      <div class="cp-rail"><span class="cp-fill"></span></div>
      <span class="hint">${esc(k.legenda)}</span>
    </div>
  </section>`
}

const contato = () => {
  const k = c.contato
  const campo = (f: (typeof k.campos)[number]) => {
    const input =
      f.tipo === 'textarea'
        ? `<textarea name="${f.nome}" rows="4" required placeholder="${esc(f.placeholder)}"></textarea>`
        : `<input name="${f.nome}" type="${f.tipo}" required placeholder="${esc(f.placeholder)}" />`
    return `<label class="field field-${f.nome}"><span class="label">${esc(f.rotulo)}</span>${input}</label>`
  }
  const [nome, email, empresa, assunto, mensagem] = k.campos
  return `
  <section class="sec contato ruled" id="contato">
    <div class="wrap contato-grid">
      <div class="contato-left">
        ${titulo(k.indice, k.titulo, '<span class="dot dot-contato" aria-hidden="true"></span>')}
        <div class="contato-links" data-reveal>
          ${foto(fotoAlana, 'Alana Urio', 'photo-contato')}
          <ul>
            ${k.links
              .map(
                (l) =>
                  `<li><a href="${l.href}"${l.href.startsWith('http') ? ' target="_blank" rel="noopener noreferrer"' : ''}><span class="label">${esc(l.rotulo)}</span><span class="cl-val">${esc(l.valor)}</span>${icon('arrow-up-right', 16)}</a></li>`,
              )
              .join('')}
          </ul>
        </div>
      </div>
      <form class="contato-form" data-reveal data-email="${k.email}" novalidate>
        ${
          nome && email && empresa && assunto && mensagem
            ? `${campo(nome)}${campo(email)}<div class="field-pair">${campo(empresa)}${campo(assunto)}</div>${campo(mensagem)}`
            : ''
        }
        <button type="submit" class="send">${esc(k.enviar)} ${icon('arrow-right', 18)}</button>
        <p class="form-status" role="status"></p>
      </form>
    </div>
  </section>`
}

const rodape = () => `
  <footer class="rodape">
    <span class="rd-logo">${esc(c.rodape.logo)}</span>
    <a href="#top">${esc(c.rodape.topo)}</a>
  </footer>`

export const renderPage = () =>
  `${hero()}<main class="page">${faixa()}${sobre()}${atuacao()}${formacao()}${ferramentas()}${trajetoria()}${cases()}${contato()}${rodape()}${faixa('faixa-rev')}</main>`
