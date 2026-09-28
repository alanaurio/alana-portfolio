# Página por vaga + skill de geração

- **Status:** planejado, não iniciado
- **Bloqueado por:** banco de evidências (que depende das seções escritas e da
  coleta de números com a Alana)
- **Decisões que governam:** [ADR 0001](../Decisions/0001-paginas-por-vaga-nao-listadas.md) ·
  [ADR 0002](../Decisions/0002-banco-de-evidencias.md)

---

## O que se quer

A Alana cola a descrição de uma vaga. Sai uma página só daquela vaga, num link
não listado, que ela manda ao se candidatar. O link é a candidatura.

## Por que isto vale o trabalho

Ela já faz isto à mão e funciona: montou um portfólio em Notion com métricas e
dashboard em dois dias para um processo seletivo, e citou isso como o que mudou a
conversa. O que a gente está construindo é a versão que custa dois minutos em
vez de dois dias — e que não deixa ela mandar a mesma página genérica que todos
os outros candidatos mandam.

## Fluxo da skill `nova-vaga`

```text
descrição colada
  │
  ├─ 1. extrai   empresa · cargo · modelo · senioridade · requisitos
  │              obrigatórios e desejáveis · vocabulário · ferramentas
  │
  ├─ 2. classifica a trilha (CS Ops · Implementação · Riscos psicossociais)
  │              → define a narrativa base e a ordem das seções
  │
  ├─ 3. casa requisito ↔ id do banco de evidências
  │              → produz o MAPA DE COBERTURA
  │
  ├─ 4. reporta as lacunas. NÃO preenche.
  │              "essa vaga pede liderança de time de 10+; você tem evidência
  │               de squad de 4. vale candidatar assim?"  ← decisão dela
  │
  ├─ 5. escreve content/vagas/<slug>.json
  │              slug · token · empresa · cargo · trilha · ids em ordem ·
  │              abertura específica · mapa de cobertura
  │
  ├─ 6. build → dist/v/<empresa>-<cargo>-<token>/index.html
  │
  └─ 7. imprime  a URL · o mapa de cobertura · o que ela precisa estar pronta
                 para responder, derivado dos ids usados
```

O passo 7 é o que transforma a ferramenta em preparação de entrevista, e custa
quase nada: os ids usados já dizem quais histórias ela vai ter que defender.

### O que a skill pode escrever de novo

Só duas coisas: **a abertura específica** ("por que esta vaga") e **a frase de
ênfase** de cada evidência selecionada. Ambas falam de motivação e de recorte,
não de fato. Qualquer afirmação factual sai do banco, com id — ADR 0002.

## Fases

| #   | Entrega                                                                   | Depende de                           |
| --- | ------------------------------------------------------------------------- | ------------------------------------ |
| 0   | `content/banco-de-evidencias.md` preenchido                               | seções escritas + coleta com a Alana |
| 1   | Geração estática de UMA página de vaga, a partir de um JSON escrito à mão | fase 0                               |
| 2   | Os dois checks em `.devkit/checks/`                                       | fase 1                               |
| 3   | A skill `nova-vaga`                                                       | fases 1 e 2                          |
| 4   | Hospedagem com os cabeçalhos do ADR 0001                                  | fase 1                               |

**A fase 1 antes da fase 3, sempre.** Provar o pipeline com um JSON à mão separa
"o gerador está errado" de "a skill entendeu a vaga errado". Juntas, as duas
falhas se confundem e o debug custa o dobro.

**A fase 2 não é opcional e não pode vir depois da 3.** Os dois checks:

- **`nao-vaza-rota.sh`** — varre `dist/` depois do build procurando
  `sitemap.xml`, `.vite/manifest.json`, `manifest.webmanifest`, qualquer slug de
  vaga dentro de arquivo `.js`, e qualquer link de página pública para `/v/`.
  Existe porque a violação é **silenciosa**: um sitemap aparecendo em `dist/` não
  dá erro, não quebra a página, e o vazamento só se descobre quando já é tarde.
- **`sem-confirmar-publicado.sh`** — falha se alguma evidência marcada
  `[confirmar]` entrou numa página gerada. Mesmo motivo: publicar um número não
  confirmado não quebra nada, só queima a candidata na entrevista.

Estes são os dois primeiros invariantes do projeto, e nascem de decisão
registrada em ADR, não de bug já pago. É exceção consciente à regra do kit
(`devkit/docs/02-autoria-de-regra.md`): a regra existe para evitar ruído
preventivo, e estes dois não são preventivos contra bug hipotético — são a
verificação de um requisito central cuja falha é indetectável a olho.

## Perguntas abertas

1. **Hospedagem.** Precisa suportar cabeçalho por rota (`X-Robots-Tag`) e não
   fazer listagem de diretório. Vercel, Netlify e Cloudflare Pages servem; a
   escolha muda onde os cabeçalhos são declarados. **Não decidido.**
2. **Domínio.** Domínio próprio ou subdomínio da hospedagem? Afeta o item 8 do
   ADR 0001 (nunca subdomínio por vaga — mas o domínio raiz é livre).
3. **A página principal indexa no Google?** Ela está empregada, procurando em
   silêncio, e o fundador da LíderHub está na rede dela. Indexar ajuda a ser
   achada por recrutador e ajuda a ser achada pelo gestor atual. Precisa de
   decisão dela, não nossa. Registrado também em
   `content/02-dados-a-coletar.md` §3.
4. **Backup das páginas de vaga.** O ADR 0001 tira `content/vagas/` do git, o
   que deixa as páginas sem histórico. Vale um backup fora do repositório?
5. **Validade do link.** Faz sentido uma vaga expirar depois de N meses? Link
   antigo de processo perdido continuando no ar não ajuda ninguém.

## Related

- `content/01-estrutura-secoes.md` — as seções que a página de vaga reordena
- `.agent/System/project_architecture.md` — onde isto se encaixa no build
