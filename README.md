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
npm run format
npm run format:check
npm run audit
npm run check:pre-push
npm run check
```

`check:pre-push` verifica formatação, typecheck, lint e testes; o hook do Husky roda esse comando antes de cada push. `check` inclui essas validações, build e audit. Typecheck, lint, testes e build estão configurados nos workspaces da API e do frontend.

O Prettier aplica a formatação comum do monorepo. `npm run format` formata os arquivos; `npm run format:check` apenas verifica. O hook `pre-commit` formata os arquivos adicionados ao commit usando lint-staged.

Instale as dependências a partir da raiz:

```bash
npm install
```

Os comandos específicos de cada workspace também podem ser chamados diretamente com a opção `--workspace` do npm.

## Documentação da API

Com a API em execução (`npm run dev:api`), a documentação interativa do Swagger UI fica disponível em `http://localhost:3000/api-docs`, e a especificação OpenAPI em JSON em `http://localhost:3000/api-docs.json`. A especificação é mantida em `apps/api/src/docs/openapi.ts` junto com os endpoints descritos.

## Supabase

Para conectar a API ao seu projeto Supabase, copie `apps/api/.env.example` para `apps/api/.env` e preencha `SUPABASE_URL` e `SUPABASE_PUBLISHABLE_KEY` com os valores do painel do Supabase. O cliente é criado sob demanda por `getSupabaseClient` em `apps/api/src/config/supabase.ts`, então a API e os testes que não acessam o banco podem iniciar sem essas variáveis. Ative Row Level Security (RLS) nas tabelas e crie políticas de acesso antes de expor operações de dados.

Use a chave publishable neste primeiro setup. Chaves secret/service-role ignoram RLS e devem ficar reservadas para operações administrativas no backend, depois que a API tiver autorização própria. Nunca coloque uma chave secreta no frontend ou no Git.

## Gerenciador de pacotes

Este repositório usa npm workspaces. Quando houver workspaces, execute os comandos npm a partir da raiz para manter um único lockfile (`package-lock.json`).
