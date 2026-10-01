# FleetFlow Logistics OS

Monorepo pessoal para os projetos de frontend e backend.

## Estrutura

- `apps/api/`: API Node.js com Express e TypeScript.
- `apps/`: futuras aplicações executáveis, como o frontend.
- `packages/`: pacotes compartilhados entre aplicações.
- `tsconfig.base.json`: opções comuns do TypeScript; cada projeto terá seu próprio `tsconfig.json` estendendo este arquivo.

## API

Instale as dependências a partir da raiz do repositório:

```bash
npm install
```

Inicie a API em modo de desenvolvimento:

```bash
npm run dev --workspace @fleetflow/api
```

Os comandos `build`, `start` e `typecheck` também estão disponíveis no workspace `@fleetflow/api`.

## Gerenciador de pacotes

Este repositório usa npm workspaces. Quando houver workspaces, execute os comandos npm a partir da raiz para manter um único lockfile (`package-lock.json`).
