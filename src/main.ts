// Shell mínimo. A página real só começa a ser construída depois que a
// estrutura de conteúdo em `content/` estiver fechada — ver CLAUDE.md.
const app = document.querySelector<HTMLElement>('#app')

if (app) {
  app.innerHTML = `
    <h1>Alana Urio</h1>
    <p>Portfólio em construção. A estrutura de conteúdo está sendo definida antes do layout.</p>
    <hr />
    <p>Próximos passos:</p>
    <ol>
      <li>Fechar posicionamento — <code>content/00-posicionamento.md</code></li>
      <li>Validar as seções — <code>content/01-estrutura-secoes.md</code></li>
      <li>Coletar métricas dos cases — <code>content/02-dados-a-coletar.md</code></li>
    </ol>
  `
}
