# FleetFlow Logistics OS

Monorepo pessoal para os projetos de frontend e backend.

## Requisitos

- Node.js `24.21.0` (versão registrada em `.nvmrc` e validada pelo npm).
- npm incluído com essa versão do Node.js.

## Estrutura

- `apps/api/`: API Node.js com Express e TypeScript.
- `apps/web/`: frontend React com Vite e TypeScript.
- `packages/`: pacotes compartilhados entre aplicações.
- `tsconfig.base.json`: opções comuns do TypeScript; cada projeto terá seu próprio `tsconfig.json` estendendo este arquivo.

## Comandos da raiz

Todos os comandos abaixo devem ser executados na raiz:

```bash
npm run dev:api
npm run dev:web
npm run typecheck
npm run lint
npm test
npm run build
npm run audit
npm run check:pre-push
npm run check
```

`check:pre-push` executa typecheck, lint e testes; o hook do Husky roda esse comando antes de cada push. `check` também inclui build e audit. Typecheck, lint, testes e build estão configurados nos workspaces da API e do frontend.

Instale as dependências a partir da raiz:

```bash
npm install
```

Os comandos específicos de cada workspace também podem ser chamados diretamente com a opção `--workspace` do npm.

## Gerenciador de pacotes

Este repositório usa npm workspaces. Quando houver workspaces, execute os comandos npm a partir da raiz para manter um único lockfile (`package-lock.json`).
