# ADR 0001 — Páginas por vaga não listadas, e o que isso não protege

- **Status:** Accepted
- **Data:** 2026-09-28
- **Área:** roteamento, build, hospedagem

---

## Contexto

A Alana está empregada na LíderHub e procurando outra vaga. A empresa está
desorganizada e ela foi realocada de posição sem aviso prévio — ou seja, a busca
é real e é **discreta**: o gestor dela e o fundador estão na rede de contatos
dela no LinkedIn.

O plano do portfólio é gerar **uma página por vaga**: ela cola a descrição da
vaga, uma skill monta a página específica e ela manda aquele link ao se
candidatar. Disso vem o requisito: ninguém pode conseguir listar as páginas
existentes. Nem por sitemap, nem por manifest, nem por curiosidade a partir da
página principal.

O que era verdade neste momento e restringe a decisão: o site é estático, sem
servidor, e o pedido explícito foi peso mínimo. Não havia hospedagem escolhida
ainda.

## Decisão

**URL não listada, não privada.** A distinção é a parte mais importante deste
documento — ver "Consequências / negativas".

Concretamente, nove regras:

1. Cada vaga mora em `/v/<empresa>-<cargo>-<token>/`, com `token` de 12
   caracteres base62 (≈ 71 bits). O nome legível serve para o destinatário
   confiar no link; a entropia toda está no token.
2. **Nenhum índice de vagas em lugar nenhum.** Sem `sitemap.xml`, sem
   `manifest.webmanifest`, sem RSS, sem página que liste as vagas, sem link da
   página principal para qualquer página de vaga.
3. `build.manifest` do Vite fica **false** (é o default — a regra é não ligar).
   Ligado, ele escreve `dist/.vite/manifest.json`, que é literalmente o arquivo
   que o usuário pediu para não existir.
4. Cada página de vaga é **HTML estático completo**, gerada em build. O conteúdo
   não passa por JS de cliente. Consequência que é o ponto inteiro: nenhum
   bundle contém a lista de slugs, porque nenhum bundle contém slug algum.
5. `<meta name="robots" content="noindex, nofollow">` em toda página de vaga,
   mais `X-Robots-Tag: noindex` no cabeçalho da hospedagem.
6. `<meta name="referrer" content="no-referrer">`. Sem isto, qualquer clique da
   página para fora (LinkedIn, e-mail, repositório da dissertação) manda a URL
   secreta no cabeçalho `Referer` para um terceiro. É o vazamento menos óbvio da
   lista e o mais fácil de introduzir sem perceber.
7. **Zero analytics em página de vaga.** Todo script de medição envia a URL
   completa para um terceiro, o que anula os itens 2 a 6 de uma vez.
8. **URL por caminho, nunca subdomínio por vaga.** Certificado de subdomínio vai
   para os logs públicos de Certificate Transparency, pesquisáveis em crt.sh.
   `ifood.alanaurio.com` publicaria a lista completa de empresas em que ela se
   candidatou, para sempre, e nada no nosso código apareceria errado.
9. `content/vagas/` fora do git (ver `.gitignore`). O repositório guardaria o
   slug e o nome de cada empresa; se ele virar público um dia, ou for
   compartilhado, vaza tudo de uma vez.

## Alternativas descartadas

- **`robots.txt` com `Disallow` como mecanismo principal** — não impede
  indexação: o Google pode indexar uma URL que ele não rastreou, se ela aparecer
  linkada em outro lugar. Pior, o arquivo é público e anuncia justamente os
  caminhos que se quer esconder. Fica como sinal secundário e genérico, nunca
  como a proteção.
- **SPA com rotas no cliente e conteúdo no bundle** — o bundle passaria a conter
  todas as vagas e todos os slugs. Abrir uma página entregaria todas as outras.
  É o mesmo vazamento do manifest, só mudando de arquivo.
- **Subdomínio por vaga** — ver regra 8. Descartado por causa dos logs de CT.
- **Senha verificada no cliente** — a senha viaja no JS que pede a senha. É
  teatro, e teatro é pior que nada porque produz confiança sem proteção.
- **Portão real no servidor** (edge function validando token assinado) — é a
  única coisa que de fato restringe acesso. Descartado **agora**, não por
  mérito: exige runtime, dependência e decisão de hospedagem, e o pedido era
  peso mínimo. Está no backlog do índice de ADRs.

## Consequências

### Positivas

- Não existe superfície de enumeração: não há arquivo, rota ou bundle que
  conheça mais de uma vaga.
- Cada página é independente. Uma vaga vazada não arrasta as outras.
- Conteúdo sem JS: mais leve, mais acessível, e nada a inspecionar no cliente.
- Hospedagem continua sendo um balde estático, de graça.

### Negativas / trade-offs

- **Não listada não é privada. Quem tem o link, abre.** Se o recrutador
  encaminhar internamente, cinco pessoas passam a ter. Se o link cair na mão de
  alguém da LíderHub, a página abre normalmente. Este desenho **não** entrega a
  garantia de que a LíderHub nunca veja — e é importante que a Alana saiba disso
  antes de mandar o primeiro link, não depois.
- **Sem histórico nem backup das páginas de vaga**, por causa da regra 9. Se a
  máquina do Gabriel morrer, as páginas se perdem. Regenerar depende de ainda
  existir a descrição da vaga, que costuma sair do ar.
- **Ela não vai saber se o recrutador abriu a página.** Esse sinal seria
  valioso — saber que abriram três vezes antes da entrevista muda a preparação.
  Custaria um endpoint próprio, ou seja, um servidor. Está no backlog.
- Cada vaga nova exige rebuild e redeploy do site inteiro.
- A regra 2 é silenciosa quando quebra: um `sitemap.xml` aparecendo em `dist/`
  não dá erro nenhum. Por isso a verificação vira check de máquina em
  `.devkit/checks/`, escrito junto com a feature — ver
  `.agent/Tasks/pagina-por-vaga.md`.

## Código / evidência

| Artefato                       | Caminho                               |
| ------------------------------ | ------------------------------------- |
| Exclusão do conteúdo das vagas | `.gitignore`                          |
| Plano da feature               | `.agent/Tasks/pagina-por-vaga.md`     |
| Config do build                | `vite.config.ts`                      |
| Fonte única do conteúdo        | [0002](./0002-banco-de-evidencias.md) |

## Related

- [0002 — Banco de evidências como fonte única](./0002-banco-de-evidencias.md)
- `content/00-posicionamento.md` §6 — por que ela está saindo da LíderHub
