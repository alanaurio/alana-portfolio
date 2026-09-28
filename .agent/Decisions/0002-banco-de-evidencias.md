# ADR 0002 — Banco de evidências como fonte única; a skill seleciona, não escreve

- **Status:** Accepted
- **Data:** 2026-09-28
- **Área:** conteúdo, geração de página por vaga

---

## Contexto

O plano é uma skill que recebe a descrição de uma vaga colada pela Alana,
entende o que aquela vaga pede, e monta a página daquela candidatura.

O modo de falha disso é óbvio e grave: um modelo de linguagem gerando
"experiência" que casa com a vaga. Uma métrica inventada num portfólio não é
problema de copy — é a candidata sendo desmontada na entrevista, no momento em
que o entrevistador puxa o fio de um número que ela não sabe defender. O perfil
de origem dela já é escasso de número (ver `content/02-dados-a-coletar.md` §2),
o que aumenta exatamente a tentação de preencher a lacuna.

Há um segundo problema, menos visível e igualmente caro: personalizar por vaga
multiplica versões. Dez páginas com dez variações da mesma história, e ela entra
na entrevista sem saber qual versão aquele recrutador leu.

## Decisão

**`content/banco-de-evidencias.md` é a fonte única.** Todo case, número,
ferramenta e afirmação mora nele, cada um com um **id estável** e um **estado**:
`confirmado` ou `[confirmar]`.

Quatro regras:

1. A skill **seleciona e reordena** entradas do banco. Ela pode reescrever a
   frase de ênfase e a abertura específica da vaga. Não pode introduzir
   afirmação que não tenha id no banco.
2. Entrada em `[confirmar]` **não publica**. O build falha. Confirmar é ato da
   Alana, não inferência do modelo.
3. Cada página de vaga registra **quais ids usou**. Antes da entrevista ela abre
   a página e sabe exatamente o que aquele recrutador leu. É esta regra que faz
   a ideia inteira ser segura em vez de arriscada.
4. Número no banco vem com a origem ao lado (de onde saiu, quem confirmou,
   quando). Número sem origem é `[confirmar]` por definição.

As regras 2 e 3 são verificáveis por máquina e falham em silêncio — publicar com
um `[confirmar]` não dá erro nenhum. Viram check em `.devkit/checks/`, escrito
junto com a feature.

## Alternativas descartadas

- **Skill gera a copy livremente a partir do LinkedIn** — é o caminho natural e
  é o risco mais sério do projeto inteiro. Descartado sem ressalva.
- **Uma página artesanal por vaga, sem banco** — sem fonte única, as versões
  divergem, e não há registro do que cada recrutador viu. Também joga todo o
  custo em quem escreve, o que na prática significa que a personalização para de
  acontecer depois da terceira vaga.
- **Uma página genérica só, para todas as vagas** — perde o ponto do pedido. Mas
  continua sendo o fallback legítimo quando não houver tempo: uma página
  genérica boa vence uma personalizada mal feita.
- **Banco em JSON em vez de Markdown** — mais fácil de validar por máquina, mais
  difícil de a Alana revisar sozinha. Como ela é a dona do conteúdo e vai
  revisar muito mais vezes do que a máquina vai validar, o Markdown ganha. O id
  e o estado ficam em frontmatter por entrada, que é validável do mesmo jeito.

## Consequências

### Positivas

- Ela não pode ser pega por uma afirmação que não sabe defender.
- O banco vira, de graça, o **roteiro de entrevista** dela. É o mesmo conteúdo.
- Vaga nova fica barata: selecionar do banco, não escrever de novo.
- A regra de "não invente dado" deixa de ser conselho no CLAUDE.md e passa a ser
  estrutura: não há de onde a skill tirar um número novo.

### Negativas / trade-offs

- **O banco precisa existir antes de qualquer página de vaga.** Isso bloqueia a
  skill até as seções estarem escritas e os números coletados. É uma dependência
  real de sequência, e é o motivo de a skill não ter sido implementada junto
  desta decisão.
- A skill vai, às vezes, recusar-se a dizer algo que seria persuasivo, porque não
  tem lastro no banco. Esse atrito é a feature, mas vai incomodar.
- Manter id estável dá trabalho manual quando o banco for reorganizado.

## Código / evidência

| Artefato           | Caminho                           |
| ------------------ | --------------------------------- |
| Banco (a escrever) | `content/banco-de-evidencias.md`  |
| Coleta que o enche | `content/02-dados-a-coletar.md`   |
| Plano da skill     | `.agent/Tasks/pagina-por-vaga.md` |

## Related

- [0001 — Páginas por vaga não listadas](./0001-paginas-por-vaga-nao-listadas.md)
- `.agent/SOP/review-checklist.md` §1 — o item de julgamento que sobra para a revisão
