# StellarCrop Shared

Shared packages and cross-repo contracts used across StellarCrop services.

## Purpose

This repo centralizes foundational artifacts so other repos can stay decoupled while sharing consistent definitions.

Current shared scope:
- TypeScript domain types
- Config primitives
- Schema references and shared contracts

## Local Development

```bash
npm install
npm run build
```

## What Belongs Here

- Types used by both `stellarcrop-web` and `stellarcrop-api`
- Shared DTOs/event payload shapes used by `stellarcrop-indexer`
- Constants for Stellar network and contract IDs
- Validation schemas and serialization helpers

## What Should Not Belong Here

- Repo-specific business logic
- UI components tied to web rendering
- API route handlers
- Indexer polling runtime code

## Contribution Tracks

- Formalize receipt lifecycle event types
- Add runtime validators for cross-service payloads
- Publish versioned package workflow
- Add compatibility matrix docs for consuming repos

## Related Repositories

- `stellarcrop-web`
- `stellarcrop-api`
- `stellarcrop-indexer`
- `stellarcrop-contracts`
