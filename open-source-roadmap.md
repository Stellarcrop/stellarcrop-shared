# Open-Source Contribution Roadmap

This roadmap turns StellarCrop into a contribution-ready project. Each item is intentionally scoped so it can become one or more GitHub issues.

## Contract Track

- Replace deprecated event publishing with `#[contractevent]` structs.
- Add `cancel_receipt` for bad issuance and warehouse disputes.
- Decide and enforce expiry behavior for transfer/redeem.
- Replace linear owner lookup with an owner index or documented pagination strategy.
- Add negative auth tests for non-admin issuer management.
- Add tests for invalid expiry, cancelled receipts, removed issuers, missing receipts, and listing.

## Frontend Track

- Replace local staged actions with real Soroban transaction invocation.
- Add generated or hand-written typed contract client helpers.
- Add pending, submitted, confirmed, and failed states for every action.
- Add receipt detail and verifier views.
- Add issuer/admin views for certified store management.
- Add responsive QA pass with mobile screenshots.

## Backend / Indexer Track

- Extend the API scaffold with receipt filtering, pagination, and issuer profile endpoints.
- Turn the shared Postgres schema into migrations with a migration runner.
- Build Stellar RPC event sync worker for contract events beyond the current checkpoint scaffold.
- Expose read APIs for dashboard receipt queries.
- Add metadata document model for receipt PDFs/photos and content hashes.

## Documentation Track

- Add testnet demo script from clean checkout to running app.
- Add architecture diagram for contract, indexer, API, and frontend.
- Add issue labels and PR checklist.
- Add deployment notes for testnet contract IDs and issuer wallets.
