# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## O que é este projeto

Portfólio profissional de página única para **Alana Urio** — psicóloga, mestre em
Arquitetura e Urbanismo, atualmente Líder CSOps. O objetivo do site é concreto:
ela quer trocar de emprego e ainda não fechou qual função, então a página precisa
funcionar para mais de uma trilha de vaga sem parecer indecisa.

O idioma do produto e da documentação é **português do Brasil**.

## Comandos

```bash
npm run dev        # servidor de desenvolvimento
npm run build      # tsc --noEmit && vite build
npm run preview    # serve o dist/ para conferir o build
npm run typecheck  # só a checagem de tipos
```

Não há suíte de testes. Para um site estático de conteúdo, a prova é
`npm run build` passando e a página aberta no navegador — se algum dia houver
lógica que mereça teste, o teste vem junto com ela, não antes.

## Stack e o porquê dela

Vite + TypeScript **vanilla**, sem framework. O pedido explícito foi "bem leve":
a página é conteúdo com pouca interação, e um framework aqui só adicionaria peso
e build sem resolver problema nenhum. Alvo de peso: abaixo de 100 kB sem foto.

Antes de adicionar qualquer dependência, confirme que o problema não se resolve
com CSS moderno ou 20 linhas de TS. Biblioteca de ícone, de animação e de
componente estão fora por padrão.

## A restrição que governa este repositório

**Conteúdo primeiro, layout depois.** Foi decisão do usuário: fechar a estrutura
de seções em texto antes de construir a interface. Enquanto os documentos em
`content/` não estiverem validados com a Alana, `src/` fica sendo só um shell
mínimo. Não construa seções da página a partir dos documentos de estrutura por
iniciativa própria.

### `content/` é a fonte da verdade

| Arquivo | O que decide |
| --- | --- |
| `content/00-posicionamento.md` | Para quem a página fala, as três trilhas de vaga e a recomendação |
| `content/01-estrutura-secoes.md` | As 11 seções, em ordem de prioridade, com objetivo e evidência de cada |
| `content/02-dados-a-coletar.md` | O que ainda falta perguntar para a Alana |

Leia `00` antes de escrever qualquer copy. A seção §6 dele registra a pergunta
que ainda está aberta (por que ela quer sair da LíderHub) e que muda o
posicionamento inteiro.

### Nunca invente dado sobre a Alana

Métrica, número de clientes, resultado de projeto, nome de ferramenta, nível de
inglês: se não está no perfil do LinkedIn transcrito na conversa original nem em
`content/`, **não existe**. Marque como `[confirmar]` e siga.

Número inventado num portfólio não é detalhe de copy — é o tipo de coisa que
queima a candidata numa entrevista, quando o entrevistador puxa o fio. Este é o
risco mais sério do projeto.

Há inconsistências reais no perfil de origem (vínculos em tempo integral
sobrepostos entre Mapa, SBsistemas e Capacittar) listadas em `02` §4. Não as
replique como se fossem fato conferido.

## Arquitetura pretendida

Quando a construção começar, o conteúdo textual mora em módulos de dados
(`src/content/*.ts`) e as seções apenas renderizam esses dados. O motivo é
prático: a Alana precisa revisar texto sem tocar em marcação, e o layout precisa
poder mudar sem reescrever conteúdo.

Página única com navegação por âncora — sem rota. Uma versão imprimível via
`@media print` a partir da mesma fonte, para não manter CV e portfólio em
paralelo.

## devkit/

A pasta `devkit/` é um kit de processo de desenvolvimento copiado para dentro do
projeto, **ainda não instalado**. Instalar roda `./devkit/install.sh . <perfil>`
e cria `.claude/`, `.devkit/` e `.agent/`; o perfil compatível com esta stack é
`ts-node-web`. Não instale sem o usuário pedir — os hooks alteram o
comportamento da sessão. Ela deve ser commitada quando o repositório for
inicializado (`devkit/README.md` avisa que já foi perdida uma vez por estar
untracked).

## Estado atual

Não é um repositório git ainda. `src/main.ts` é um placeholder que lista os
próximos passos; não o trate como código de produção nem preserve seu conteúdo.
