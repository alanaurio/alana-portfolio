#!/usr/bin/env bash
# Perfil: pacote único, Vite + TypeScript vanilla, site estático.
#
# Derivado de `ts-node-web`, mas SEM monorepo, SEM API e SEM banco: aqui é um
# `package.json` só, npm, e o artefato final é HTML/CSS/JS estático. Os slots de
# contrato compartilhado e de migração foram removidos em vez de deixados vazios
# — slot vazio parece esquecimento; slot ausente é decisão.
#
# Todos os comandos abaixo foram executados uma vez antes de serem gravados.

DEVKIT_STACK="vite-vanilla-ts"

DEVKIT_CMD_TYPECHECK="npm run typecheck"
DEVKIT_CMD_LINT=""                       # não há linter. Ver nota 1.
DEVKIT_CMD_TEST=""                       # não há suíte. Ver nota 2.
DEVKIT_CMD_BUILD="npm run build"

DEVKIT_CMD_FORMAT_FILE="npx --no-install prettier --write"
DEVKIT_FORMAT_EXT="ts|js|mjs|json|css|md|html"

DEVKIT_CODE_EXT="ts|js|mjs|json|css|html"
DEVKIT_READY_MARKER="node_modules"

DEVKIT_INDEX_FILES=".agent/README.md .agent/Decisions/README.md .agent/System/project_architecture.md content/01-estrutura-secoes.md"

# --- Nota 3: o build ENTRA no gate, ao contrário do padrão do kit ------------
#
# O `verify.sh` deixa o build fora por default, e a razão dele é boa: build de
# minutos estoura o timeout do hook e a sessão fecha "verde" sem ter verificado
# nada. Aqui os dois motivos se invertem:
#
#   - custa menos de 1s medido (`tsc --noEmit && vite build`);
#   - é a ÚNICA coisa que prova que a página monta. Sem teste e sem lint, o
#     typecheck sozinho não pega import quebrado de CSS, asset que não existe,
#     nem entry de página que não resolve — e é exatamente isso que vai quebrar
#     num site que gera uma página por vaga.
#
# Sobrescreve o default do hook; variável de ambiente ainda ganha.
DEVKIT_RUN_BUILD="${DEVKIT_RUN_BUILD:-1}"

# --- Notas 1 e 2 ------------------------------------------------------------
#
# 1. Sem linter de propósito. `tsc --strict` + prettier cobrem o que um ESLint
#    pegaria num projeto sem framework e sem regra de hook. Se entrar
#    complexidade que justifique, isto vira ADR, não um `npm i` silencioso.
#
# 2. Sem teste porque ainda não há lógica que mereça um. A prova hoje é o build
#    passar e a página abrir. Quando existir a geração de página por vaga, o
#    primeiro teste nasce ali: é código que produz arquivo, dá para verificar
#    sem navegador, e o erro dele é silencioso.
#
# Nenhum `devkit_scope_args`: pacote único, não há escopo para recortar. O hook
# checa com `declare -f` e simplesmente não usa.
