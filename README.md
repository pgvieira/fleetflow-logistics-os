# FleetFlow Logistics OS

Monorepo pessoal para os futuros projetos de frontend e backend.

## Estrutura

- `apps/`: aplicações executáveis, como frontend e API.
- `packages/`: pacotes compartilhados entre aplicações.
- `tsconfig.base.json`: opções comuns do TypeScript; cada projeto terá seu próprio `tsconfig.json` estendendo este arquivo.

Os diretórios de aplicação e pacote ainda não foram criados. O workspace está preparado para recebê-los quando os projetos começarem.

## Gerenciador de pacotes

Este repositório usa npm workspaces. Quando houver workspaces, execute os comandos npm a partir da raiz para manter um único lockfile (`package-lock.json`).
