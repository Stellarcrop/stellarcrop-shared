# Future Standalone Repository Split

The current repo is a monorepo for speed, but each major subsystem is already shaped so it can become a standalone repo.

## Target repos

| Future repo | Current path | Responsibility |
| --- | --- | --- |
| `stellarcrop-web` | `apps/web` | Landing page and dApp dashboard |
| `stellarcrop-api` | `apps/api` | REST API for receipts, issuers, warehouses, metadata |
| `stellarcrop-indexer` | `apps/indexer` | Stellar RPC event sync and database upserts |
| `stellarcrop-contracts` | `contracts/receipt-registry` | Soroban receipt registry contract |
| `stellarcrop-shared` | `packages/stellar` | Shared config, types, schema, generated clients |

## Split process

1. Copy the current path into the new repository.
2. Move any required shared code from `packages/stellar` into that repo or publish `@stellarcrop/stellar`.
3. Keep the same `README.md`, `.env.example`, and `package.json` scripts.
4. Configure CI for that repo using the relevant checks only.
5. Replace workspace references with published packages or relative local modules.

## Current boundaries

- Frontend does not import API or indexer internals.
- API does not import frontend code.
- Indexer does not import frontend or API code.
- Contract is Rust-only and independent of Node workspaces.
- Shared schema and Stellar helper types live under `packages/stellar`.
