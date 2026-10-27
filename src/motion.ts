const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v))

const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches

// Fade de entrada: cada [data-reveal] ganha .is-in ao cruzar a tela e perde
// quando sai dela por completo, para animar de novo a cada passagem. Entrada e
// saída usam observadores separados: assim nada some enquanto ainda está à vista.
let enter: IntersectionObserver | null = null
let leave: IntersectionObserver | null = null

const reveal = (els: Iterable<Element>) => {
  if (reduced || !('IntersectionObserver' in window)) {
    for (const el of els) el.classList.add('is-in')
    return
  }
  enter ??= new IntersectionObserver(
    (entries) => {
      for (const e of entries)
        if (e.isIntersecting) e.target.classList.add('is-in')
    },
    { rootMargin: '0px 0px -12% 0px', threshold: 0.08 },
  )
  leave ??= new IntersectionObserver((entries) => {
    for (const e of entries)
      if (!e.isIntersecting) e.target.classList.remove('is-in')
  })
  for (const el of els) {
    enter.observe(el)
    leave.observe(el)
  }
}

// Palcos presos: a seção fica parada na tela enquanto a rolagem revela seus
// passos um a um. Só liga quando o conteúdo cabe inteiro na altura da janela;
// senão a seção rola normal e os passos entram por fade, como o resto.
interface Stage {
  el: HTMLElement
  sticky: HTMLElement
  steps: HTMLElement[]
  pinned: boolean
  top: number
}

const stages: Stage[] = []

// O palco prende na altura do próprio conteúdo, centralizado na janela, para
// não deixar vão quando solta.
const measureStages = () => {
  const wide = innerWidth >= 1024
  for (const s of stages) {
    s.el.classList.remove('is-pinned')
    const h = s.sticky.offsetHeight
    s.top = Math.max(0, (innerHeight - h) / 2)
    s.pinned = !reduced && wide && h <= innerHeight - 48
    s.el.style.setProperty('--h', `${h}px`)
    s.el.style.setProperty('--top', `${s.top}px`)
    s.el.style.setProperty('--steps', String(s.steps.length))
    s.el.classList.toggle('is-pinned', s.pinned)
    if (s.pinned)
      for (const st of s.steps) {
        enter?.unobserve(st)
        leave?.unobserve(st)
      }
    else reveal(s.steps)
  }
}

const updateStages = () => {
  for (const s of stages) {
    if (!s.pinned) continue
    const r = s.el.getBoundingClientRect()
    const run = r.height - s.sticky.offsetHeight
    const p = run > 0 ? clamp((s.top - r.top) / run) : 1
    const n = s.steps.length
    s.steps.forEach((st, i) =>
      st.classList.toggle('is-in', p >= (i / n) * 0.75 + 0.04),
    )
  }
}

const setupStages = () => {
  document.querySelectorAll<HTMLElement>('[data-stage]').forEach((el) => {
    const sticky = el.querySelector<HTMLElement>('.stage-sticky')
    if (!sticky) return
    stages.push({
      el,
      sticky,
      steps: [...el.querySelectorAll<HTMLElement>('[data-step]')],
      pinned: false,
      top: 0,
    })
  })
  measureStages()
}

// Cortina do hero: ele fica preso enquanto a página sobe por cima dele.
const updateHero = (hero: HTMLElement) => {
  const h = hero.offsetHeight
  const p = clamp(scrollY / h)
  hero.style.setProperty('--hp', p.toFixed(4))
}

const onScroll = (hero: HTMLElement | null) => {
  let ticking = false
  const frame = () => {
    ticking = false
    if (hero && !reduced) updateHero(hero)
    updateStages()
  }
  const request = () => {
    if (ticking) return
    ticking = true
    requestAnimationFrame(frame)
  }
  addEventListener('scroll', request, { passive: true })
  addEventListener('resize', () => {
    measureStages()
    request()
  })
  frame()
}

// Acordeão de grupo: um aberto por vez. Em ponteiro fino abre no hover, como
// pede a dica do design; no toque, abre no clique.
const accordion = (items: HTMLElement[], trigger: string, hover: boolean) => {
  const open = (target: HTMLElement | null) => {
    for (const it of items) {
      const on = it === target
      it.classList.toggle('is-open', on)
      it.querySelector(trigger)?.setAttribute('aria-expanded', String(on))
    }
  }
  for (const it of items) {
    const btn = it.querySelector<HTMLElement>(trigger)
    btn?.addEventListener('click', () =>
      open(it.classList.contains('is-open') && !hover ? null : it),
    )
    if (hover) it.addEventListener('mouseenter', () => open(it))
  }
}

// Carrossel de cases: rolagem nativa com snap; setas dão a volta no fim.
const carousel = () => {
  const vp = document.querySelector<HTMLElement>('.cases-viewport')
  if (!vp) return
  const cards = [...vp.querySelectorAll<HTMLElement>('.case')]
  const count = document.querySelector<HTMLElement>('.cases-count b')
  const fill = document.querySelector<HTMLElement>('.cp-fill')
  // `left` é o card encostado na borda esquerda; no fim da trilha o contador
  // mostra o último, mesmo que ele nunca encoste.
  const position = () => {
    let left = 0
    let dist = Infinity
    cards.forEach((card, i) => {
      const d = Math.abs(card.offsetLeft - vp.scrollLeft)
      if (d < dist) {
        dist = d
        left = i
      }
    })
    const max = vp.scrollWidth - vp.clientWidth
    const atEnd = max > 0 && vp.scrollLeft >= max - 4
    return { left, atEnd, shown: atEnd ? cards.length - 1 : left }
  }

  const sync = () => {
    const { shown } = position()
    if (count) count.textContent = String(shown + 1).padStart(2, '0')
    const max = vp.scrollWidth - vp.clientWidth
    const p = max > 0 ? vp.scrollLeft / max : 1
    fill?.style.setProperty('--v', String(Math.max(p, 1 / cards.length)))
  }

  // Durante a rolagem suave a posição ainda não chegou; cliques seguidos
  // partem do destino pedido, não de onde a trilha está agora.
  let target: number | null = null
  let settle = 0
  const go = (i: number) => {
    const n = (i + cards.length) % cards.length
    target = n
    clearTimeout(settle)
    settle = setTimeout(() => (target = null), 800)
    vp.scrollTo({
      left: cards[n]?.offsetLeft ?? 0,
      behavior: reduced ? 'auto' : 'smooth',
    })
  }

  const step = (dir: number) => {
    if (target !== null) return go(target + dir)
    const { left, atEnd } = position()
    go(dir > 0 && atEnd ? 0 : left + dir)
  }

  document
    .querySelectorAll<HTMLButtonElement>('.cases-ctrl [data-dir]')
    .forEach((b) =>
      b.addEventListener('click', () => step(Number(b.dataset.dir))),
    )
  vp.addEventListener('scroll', () => requestAnimationFrame(sync), {
    passive: true,
  })
  vp.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') step(1)
    if (e.key === 'ArrowLeft') step(-1)
  })

  // Arrastar com o mouse, sem atrapalhar o toque nativo.
  let drag: { x: number; left: number } | null = null
  vp.addEventListener('pointerdown', (e) => {
    if (e.pointerType !== 'mouse') return
    drag = { x: e.clientX, left: vp.scrollLeft }
    vp.classList.add('is-dragging')
  })
  addEventListener('pointermove', (e) => {
    if (!drag) return
    const dx = e.clientX - drag.x
    vp.scrollLeft = drag.left - dx
  })
  addEventListener('pointerup', () => {
    if (!drag) return
    drag = null
    vp.classList.remove('is-dragging')
    go(position().left)
  })

  // Links "projetos na Mapa HDS" levam ao case certo.
  document
    .querySelectorAll<HTMLAnchorElement>('a[data-case]')
    .forEach((a) =>
      a.addEventListener('click', () =>
        setTimeout(() => go(Number(a.dataset.case)), reduced ? 0 : 500),
      ),
    )

  sync()
}

// Sem backend: o formulário monta um e-mail no cliente de e-mail da pessoa.
const contactForm = () => {
  const form = document.querySelector<HTMLFormElement>('.contato-form')
  if (!form) return
  const status = form.querySelector<HTMLElement>('.form-status')
  form.addEventListener('submit', (e) => {
    e.preventDefault()
    if (!form.checkValidity()) {
      form.classList.add('was-validated')
      if (status)
        status.textContent = 'Preencha todos os campos marcados com *.'
      form.querySelector<HTMLElement>(':invalid')?.focus()
      return
    }
    const d = new FormData(form)
    const v = (k: string) => String(d.get(k) ?? '').trim()
    const body = `${v('mensagem')}\n\n— ${v('nome')}\n${v('empresa')}\n${v('email')}`
    location.href = `mailto:${form.dataset.email}?subject=${encodeURIComponent(v('assunto'))}&body=${encodeURIComponent(body)}`
    if (status) status.textContent = 'Abrindo seu cliente de e-mail…'
  })
}

export const startMotion = () => {
  const root = document.documentElement
  root.classList.add('js')
  if (reduced) root.classList.add('reduced')

  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches
  accordion(
    [...document.querySelectorAll<HTMLElement>('.edu')],
    '.edu-row',
    fine,
  )
  accordion(
    [...document.querySelectorAll<HTMLElement>('.job')],
    '.job-toggle',
    false,
  )
  carousel()
  contactForm()
  setupStages()
  reveal(document.querySelectorAll('[data-reveal]'))
  onScroll(document.querySelector<HTMLElement>('.hero'))
}
