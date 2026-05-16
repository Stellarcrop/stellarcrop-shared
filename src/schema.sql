create table if not exists issuers (
  id bigserial primary key,
  wallet_address text not null unique,
  name text not null,
  location text,
  status text not null default 'pending',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists warehouses (
  id bigserial primary key,
  issuer_id bigint not null references issuers(id),
  name text not null,
  location text not null,
  created_at timestamptz not null default now()
);

create table if not exists receipts (
  id bigserial primary key,
  receipt_id bigint not null,
  contract_id text not null,
  issuer text not null,
  owner text not null,
  commodity text not null,
  quantity_kg numeric not null,
  grade text not null,
  warehouse_name text not null,
  location text not null,
  metadata_hash text not null,
  status text not null,
  issued_at timestamptz,
  expires_at timestamptz,
  updated_at timestamptz not null default now(),
  unique (contract_id, receipt_id)
);

create table if not exists receipt_events (
  id bigserial primary key,
  contract_id text not null,
  receipt_id bigint,
  event_type text not null,
  tx_hash text,
  ledger bigint,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists indexer_checkpoints (
  name text primary key,
  last_ledger bigint not null,
  updated_at timestamptz not null default now()
);
