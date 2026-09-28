# Estrutura das seções

> Página única, navegação por âncora, leitura em 3 minutos no desktop e 90
> segundos no celular. A ordem abaixo é a ordem de leitura e também a ordem de
> prioridade: se cortar, corta de baixo para cima.
>
> Cada seção declara **objetivo** (o que ela faz pelo leitor),
> **conteúdo** e **evidência** (o dado sem o qual ela não funciona).

## Quem lê isto

1. **Recrutador de tech/RH, 20 segundos, no celular.** Decide se chama. Só lê
   hero, cards de atuação e números.
2. **Gestor da vaga, 3 minutos, no desktop.** Decide se contrata. Lê os cases.
3. **A própria Alana, em entrevista.** Usa como roteiro para não travar.

A estrutura serve os três — não o mesmo texto para os três.

---

## Bloco 1 — Convencer em 20 segundos

### 1. Hero
- **Objetivo:** dizer o que ela faz e para quem, sem metáfora, na primeira tela.
- **Conteúdo:** nome · headline de posicionamento (uma frase) · subtítulo com o
  fio condutor (duas linhas) · 3 a 4 *chips* de prova · CTA primário (falar) e
  secundário (LinkedIn, CV em PDF).
- **Evidência:** os chips precisam ser números, não adjetivos. Ex.: `4 anos em
  contas enterprise`, `+X clientes implantados`, `Mestre em Arq&Urb`,
  `NR-01 / riscos psicossociais`.
- **Regra:** sem foto de banco de imagem. Foto real ou nenhuma.

### 2. Números
- **Objetivo:** dar escala. "Enterprise" sem número é palavra vazia.
- **Conteúdo:** 3 a 5 métricas grandes, cada uma com uma linha de contexto.
- **Evidência:** ver `02-dados-a-coletar.md` §2. **Se não houver número real,
  esta seção não existe** — número inventado destrói o resto da página.
- **Alternativa sem número:** virar uma barra dentro do hero com escopo em vez de
  resultado (`contas enterprise`, `RH · DHO · SST`, `remoto desde 2021`).

### 3. Áreas de atuação
- **Objetivo:** traduzir a trajetória dela em vocabulário de vaga. É aqui que o
  recrutador reconhece o cargo que ele está tentando preencher.
- **Conteúdo:** 4 cards, título em linguagem de mercado + 3 bullets concretos:
  1. **Jornada do cliente e CS Ops** — desenho de jornada, playbook, onboarding,
     adoção, indicador, retenção e expansão.
  2. **Gestão de projetos end-to-end** — diagnóstico a pós-implantação, escopo,
     stakeholder, RFI/RFP, integração via API.
  3. **Riscos psicossociais e NR-01** — diagnóstico, projeto de gestão de risco,
     aderência normativa, saúde mental organizacional.
  4. **Dados e pesquisa aplicada** — instrumento, psicometria, estatística,
     dashboard, geoprocessamento.
- **Evidência:** cada bullet precisa aparecer em algum case ou na trajetória.
  Card sem lastro abaixo vira promessa.

---

## Bloco 2 — Convencer em 3 minutos

### 4. Cases  ← o coração da página
- **Objetivo:** provar. Todo o resto é contexto para esta seção.
- **Conteúdo:** 3 a 5 cases, formato fixo para permitir comparação:
  ```
  Contexto     — que empresa, que cliente, que tamanho
  Problema     — o que estava quebrado, em uma frase
  O que eu fiz — 3 a 4 ações, verbo no passado, primeira pessoa
  Resultado    — número, prazo, ou mudança de estado verificável
  Aprendizado  — uma linha; é o que mostra senioridade
  ```
- **Candidatos a case** (a validar, ver `02-dados-a-coletar.md` §1):
  - Estruturação da operação de CS na LíderHub durante escala agressiva de
    contratação — o mais recente e o mais vendável para Trilha A.
  - Projeto de gestão de riscos psicossociais / NR-01 na Mapa — o diferencial.
  - Implantação enterprise com integração via API na Mapa — Trilha B.
  - Liderança de squad multidisciplinar na SBsistemas — evidência de liderança
    técnica, que é o que falta na Trilha A.
  - Dissertação de mestrado — evidência de método, se contada como projeto (uma
    pergunta, um recorte, um método, um achado), não como resumo acadêmico.
- **Evidência:** número em pelo menos 3 dos 5. Sem isso, a seção é narrativa.

### 5. Como eu trabalho
- **Objetivo:** diferenciar de quem tem o mesmo currículo. É a seção que responde
  "como é trabalhar com ela".
- **Conteúdo:** 3 a 4 principios, cada um com uma evidência de comportamento real
  em vez de autoelogio.
  - A matéria-prima do post dela sobre processo seletivo — *"não espero ser
    contratada para começar; chego na entrevista já em movimento"* — é forte, e é
    verdade documentada (ela montou portfólio em Notion e dashboard em dois dias).
  - O trecho sobre escuta em projeto psicossocial — *"se há queixa, há
    informação"* — é posicionamento de quem entende o ofício.
- **Evidência:** cada princípio precisa de um fato, não de um adjetivo.

### 6. Trajetória
- **Objetivo:** dar coerência temporal e neutralizar a leitura de "pulou muito".
- **Conteúdo:** timeline enxuta. Empresa, cargo, período, uma linha de escopo,
  um resultado. **Não repetir os bullets do LinkedIn** — o portfólio não é CV.
- **Evidência:** as datas precisam ser conferidas. Há sobreposição de vínculos em
  tempo integral no perfil atual (ver `02-dados-a-coletar.md` §4) e sobreposição
  não explicada levanta dúvida em quem lê.

---

## Bloco 3 — Fechar

### 7. Formação e produção
- **Objetivo:** sustentar a autoridade técnica que os cards 3 e 4 prometem.
- **Conteúdo:** duas colunas — **formação** (graduação, mestrado, especializações,
  certificações) e **produção** (dissertação, apresentações nacionais e
  internacionais, artigos, lives, materiais técnicos).
- **Evidência:** link sempre que existir. Dissertação em repositório, matéria do
  estágio, publicação. Produção sem link é currículo; com link é portfólio.

### 8. Ferramentas e métodos
- **Objetivo:** passar filtro de palavra-chave de recrutador e de ATS.
- **Conteúdo:** lista agrupada — plataformas de CS/CRM, BI e dados, métodos
  ágeis, análise estatística, geoprocessamento, IA aplicada ao trabalho.
- **Evidência:** só entra o que ela usaria numa prova prática amanhã. Ferramenta
  inflada aqui é a forma mais comum de queimar entrevista técnica.

### 9. Recomendações
- **Objetivo:** prova social. Terceiro dizendo o que ela não pode dizer de si.
- **Conteúdo:** 2 a 3 depoimentos curtos, com nome, cargo e empresa.
- **Evidência:** precisa pedir. Ver `02-dados-a-coletar.md` §5. Se não vier
  nenhum, a seção sai — depoimento anônimo não vale nada.

### 10. O que eu busco agora
- **Objetivo:** reduzir atrito. Recrutador não gosta de adivinhar.
- **Conteúdo:** cargo-alvo (2 ou 3 nomes de vaga, não uma área), modelo de
  trabalho, tipo de empresa e de problema que ela quer, e o que ela entrega nos
  primeiros 90 dias.
- **Evidência:** depende da §6 do `00-posicionamento.md`. Esta seção é a que mais
  depende de decisão, e não de dado.

### 11. Contato
- **Objetivo:** converter.
- **Conteúdo:** e-mail direto, LinkedIn, WhatsApp `[confirmar se ela quer]`,
  botão de CV em PDF. Um CTA, repetido, sem formulário.

---

## Decisões de implementação (para depois de fechar o conteúdo)

- **Uma página, âncoras.** Nada de rota. O leitor decide a profundidade pelo
  scroll.
- **Versão imprimível.** `@media print` que gera um PDF apresentável a partir da
  mesma fonte. Evita manter CV e portfólio em paralelo.
- **Conteúdo separado do layout.** Todo texto em um módulo de dados
  (`src/content/*.ts`), renderizado por seção. Assim a Alana revisa texto sem
  tocar em marcação, e a gente troca o layout sem reescrever conteúdo.
- **Peso alvo:** abaixo de 100 kB sem a foto. Sem framework, sem biblioteca de
  ícone, fonte do sistema ou uma família única via `font-display: swap`.
- **Acessibilidade:** contraste AA, navegação por teclado, `prefers-color-scheme`.
