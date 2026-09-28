# Arquitetura do projeto

> Escrito no `/devkit-init` a partir do repositório. O estado de hoje é
> deliberadamente pequeno: por decisão do usuário, a estrutura de conteúdo é
> fechada em texto antes de a interface existir. O que está marcado
> **(planejado)** não existe no disco.

## O que é

Portfólio de página única da **Alana Urio**, com páginas adicionais geradas uma
por vaga, em URL não listada. O objetivo é operacional, não institucional: ela
está empregada na LíderHub, insatisfeita, e procurando outra posição em silêncio.

## Stack

| Camada     | Tecnologia               | Papel                                                 |
| ---------- | ------------------------ | ----------------------------------------------------- |
| Build      | Vite 8                   | dev server e bundle; sem framework                    |
| Linguagem  | TypeScript 7 (`strict`)  | só nos módulos de conteúdo e no gerador; zero runtime |
| Estilo     | CSS puro                 | tokens em `:root`, `prefers-color-scheme`             |
| Formatação | Prettier                 | hook `PostToolUse`                                    |
| Processo   | devkit (perfil adaptado) | gates, ADRs, `.agent/`                                |
| Hospedagem | **não decidida**         | ver `.agent/Tasks/pagina-por-vaga.md` §1              |

Não há framework, roteador, biblioteca de ícone, de animação ou de componente.
A página é conteúdo com pouca interação; o pedido foi peso mínimo, alvo abaixo de
100 kB sem foto. Hoje o build sai em 1.2 kB de JS e 0.8 kB de CSS.

## Estrutura

```text
content/                     # FONTE DA VERDADE do conteúdo, em Markdown
  00-posicionamento.md       #   para quem a página fala; as 3 trilhas de vaga
  01-estrutura-secoes.md     #   as 11 seções, em ordem de prioridade
  02-dados-a-coletar.md      #   o que falta perguntar para a Alana
  fontes/                    #   material bruto, literal e datado; a origem citada pelo banco
    linkedin-2026-09-28.md   #     perfil completo do LinkedIn
    notion-galeria/          #     os 7 projetos da galeria dela no Notion (texto; imagens pendentes)
  banco-de-evidencias.md     #   (planejado) cases e números com id — ADR 0002
  vagas/                     #   (planejado) uma vaga por arquivo — FORA DO GIT
src/
  main.ts                    # hoje: placeholder. Não é código de produção.
  styles.css
  content/                   # (planejado) o texto como dado, em .ts
index.html                   # shell da página pública
devkit/                      # o kit de processo, versionado junto
.agent/                      # decisões, arquitetura, SOP, tasks
.devkit/                     # profile.sh (como se prova algo) + checks/
```

## Fluxo de dados

Não há servidor nem persistência. O caminho de ponta a ponta é de **build**, e o
que interessa é o caminho da página de vaga (planejado):

```text
descrição da vaga colada no chat
  → skill `nova-vaga` extrai requisitos e classifica a trilha
  → casa requisito ↔ id do banco de evidências        (nunca inventa: ADR 0002)
  → escreve content/vagas/<slug>.json                 (fora do git: ADR 0001)
  → gerador renderiza HTML COMPLETO em build
  → dist/v/<empresa>-<cargo>-<token>/index.html
  → Alana manda o link na candidatura
```

O ponto que define o desenho: o conteúdo é resolvido **em build**, não no
cliente. A página de vaga chega ao navegador como HTML pronto. Não existe bundle
que conheça mais de uma vaga, porque não existe bundle com conteúdo de vaga.

## Fronteiras

O que cada parte **não** pode fazer:

- **Nenhum bundle de cliente conhece mais de uma vaga.** Sem tabela de rotas,
  sem `import` cruzado entre vagas, sem roteador. Um slug dentro de um `.js` é
  violação, não detalhe.
- **Nenhum artefato lista as páginas existentes.** Sem `sitemap.xml`, sem
  manifest do Vite (`build.manifest` fica `false`), sem página índice, sem link
  da página pública para `/v/`.
- **Página de vaga não carrega script de terceiro.** Analytics enviaria a URL
  secreta para fora e anularia o desenho inteiro.
- **O gerador não inventa afirmação factual.** Só compõe ids do banco.
- **`src/` não conhece `content/vagas/`.** A página pública e as páginas de vaga
  compartilham estilo e componente, nunca dados.

As três primeiras são do [ADR 0001](../Decisions/0001-paginas-por-vaga-nao-listadas.md),
a quarta do [ADR 0002](../Decisions/0002-banco-de-evidencias.md). As duas que
falham em silêncio viram check de máquina na fase 2 da task.

## Contrato compartilhado

Não há frente e fundo, então não há contrato entre processos. O análogo aqui é o
**banco de evidências**: a fonte única de toda afirmação sobre a Alana, que a
página pública e cada página de vaga consomem. Regra de negócio duplicada aqui
não vira bug de dinheiro — vira duas versões da mesma história, e ela descobre
qual leu qual na frente do entrevistador.

Reconstruir depois de mudar: `npm run build`. Não há build incremental nem
artefato intermediário a invalidar.

## Ambientes e variáveis

Nenhuma variável de ambiente, nenhum segredo, nenhuma chave de API. O único
"segredo" do sistema é o token na URL de cada página de vaga, que mora em
`content/vagas/` e está fora do git por decisão do ADR 0001.

## Related

- `.agent/Decisions/README.md` — por que cada uma dessas escolhas
- `.agent/Tasks/pagina-por-vaga.md` — o plano da feature central
- `.devkit/profile.sh` — como se prova algo aqui
