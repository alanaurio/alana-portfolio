# Architecture Decision Records

O registro imutável do **porquê**. O _como_ mora em `../System/` e é reescrito
sempre que o código muda; um ADR, não — decisão que mudou vira ADR novo que
supersede o antigo.

## Regras

1. **Numeração sequencial**, sem reuso. Antes de escrever, confira colisão com
   as outras frentes:
   ```bash
   ls *.md | sed 's/-.*//' | sort | uniq -d
   ```
   Dois ADRs com o mesmo número não dão conflito de merge — dão duas linhas
   iguais neste índice que ninguém percebe.
2. **ADR aceito não se reescreve.** Mudou de ideia? ADR novo, e o antigo ganha
   `Superseded by NNNN`.
3. **Um ADR por decisão**, no mesmo PR que a introduz.
4. **Só há ADR se houver trade-off estrutural**: dependência nova, mudança de
   fluxo de dados, escolha de segurança ou performance com custo do outro lado,
   padrão novo obrigatório. Bugfix e UI isolada não geram ADR — registro demais
   dilui, e um diretório de trivialidades não é consultado.

Use `/adr <título>`. Template: [`0000-template.md`](./0000-template.md).

---

## Índice — Accepted

| #                                               | Título                                             | Área              | Data       |
| ----------------------------------------------- | -------------------------------------------------- | ----------------- | ---------- |
| [0001](./0001-paginas-por-vaga-nao-listadas.md) | Páginas por vaga não listadas, e o que não protege | roteamento, build | 2026-09-28 |
| [0002](./0002-banco-de-evidencias.md)           | Banco de evidências como fonte única               | conteúdo, geração | 2026-09-28 |

## Índice — Proposed

| #   | Título | Área | Data |
| --- | ------ | ---- | ---- |
|     |        |      |      |

## Backlog — discutido, sem código

Itens em que houve conversa mas nada foi construído. Ficam aqui para não serem
re-discutidos do zero.

| Assunto                                     | O que se decidiu adiar                                                                | Por quê                                                                                                                                                                                                                                  |
| ------------------------------------------- | ------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Controle de acesso real nas páginas de vaga | Portão no servidor (edge function validando token assinado) em vez de URL não listada | Exige runtime, dependência e decisão de hospedagem. O pedido era peso mínimo. Reabrir se a discrição virar requisito duro, e não preferência — ver [0001](./0001-paginas-por-vaga-nao-listadas.md)                                       |
| Saber se o recrutador abriu a página        | Qualquer medição de abertura                                                          | Analytics de terceiro envia a URL secreta e anula o desenho do [0001](./0001-paginas-por-vaga-nao-listadas.md). Endpoint próprio custa servidor. O sinal é valioso: reabrir junto com o item acima, porque a mesma infra resolve os dois |
| Linter                                      | ESLint                                                                                | `tsc --strict` + prettier cobrem o que ele pegaria num projeto sem framework. Reabrir se entrar complexidade — ver `.devkit/profile.sh` nota 1                                                                                           |
