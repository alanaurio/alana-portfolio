# Checklist de revisão — alana-portfolio

O **motor** da revisão é o `/code-review`. Este arquivo é o que ele não pode
saber sozinho: as regras **deste** projeto. **As seções vêm; os itens não.**

Cada item tem que apontar para um bug que já aconteceu **neste** projeto. Regra
emprestada não tem cicatriz: ninguém sabe por que ela existe, ninguém confia
nela, e ela dilui as que foram pagas com bug.

O que a máquina verifica, a máquina verifica: item mecanicamente checável mora
em `.devkit/checks/`, não aqui. Como um item nasce:
`devkit/docs/02-autoria-de-regra.md`.

Formato de item:

```markdown
- [ ] <a regra, no imperativo e verificável>

> Sintoma de violação: <o que se vê>. <O caso concreto, com commit/PR/incidente.>
```

---

## 1. Conteúdo e veracidade

<!-- A seção mais importante deste projeto. O que a máquina não consegue julgar
     sobre uma afirmação a respeito da Alana. -->

- [ ] Toda afirmação factual nova sobre a trajetória dela aponta para um id do
      banco de evidências, e o id está `confirmado`.

> Sintoma de violação: um número, um nome de cliente ou um resultado que soa
> ótimo e não se consegue rastrear até uma origem. Nasce da decisão em
> [ADR 0002](../Decisions/0002-banco-de-evidencias.md), não de bug já pago —
> exceção consciente à regra do kit, porque o custo aqui não recai sobre o
> código: recai sobre a Alana, na entrevista, quando o entrevistador puxa o fio.
> A parte mecânica (o id existe? está confirmado?) é check de máquina; o que
> sobra para a revisão é julgamento: _a evidência sustenta o que a frase
> promete?_

## 2. Rotas não listadas

<!-- Ver ADR 0001. O que falha em silêncio aqui vira check em .devkit/checks/;
     o que exige julgamento fica nesta seção. -->

## 3. Interface e acessibilidade

<!-- Contraste medido, navegação por teclado, foco visível, os dois temas,
     largura de celular. -->

## 4. Peso e dependências

<!-- Dependência nova pede justificativa. Alvo abaixo de 100 kB sem foto. -->

## 5. Dívida que não pode entrar

<!-- O que este projeto decidiu nunca mais aceitar num diff. -->
