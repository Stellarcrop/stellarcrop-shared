import * as StellarSdk from "@stellar/stellar-sdk";

export type StellarNetwork = "testnet" | "mainnet";

type EnvValue = string | boolean | undefined;

type RuntimeEnv = {
  NEXT_PUBLIC_STELLAR_NETWORK?: EnvValue;
  NEXT_PUBLIC_STELLAR_MAINNET_RPC_URL?: EnvValue;
};

const runtimeEnv = (() => {
  const viteEnv = (import.meta as ImportMeta & { env?: RuntimeEnv }).env;
  if (viteEnv) {
    return viteEnv;
  }

  if (typeof process !== "undefined") {
    return process.env as RuntimeEnv;
  }

  return {};
})();

const envString = (value: EnvValue): string | undefined =>
  typeof value === "string" && value.length > 0 ? value : undefined;

const network = (envString(runtimeEnv.NEXT_PUBLIC_STELLAR_NETWORK) ?? "testnet") as StellarNetwork;

const testnetRpc = "https://soroban-testnet.stellar.org";
const testnetHorizon = "https://horizon-testnet.stellar.org";
const mainnetHorizon = "https://horizon.stellar.org";

const mainnetRpc = envString(runtimeEnv.NEXT_PUBLIC_STELLAR_MAINNET_RPC_URL) ?? "";

if (network === "mainnet" && !mainnetRpc) {
  throw new Error("Missing NEXT_PUBLIC_STELLAR_MAINNET_RPC_URL for mainnet");
}

export const stellarConfig = {
  network,
  rpcUrl: network === "testnet" ? testnetRpc : mainnetRpc,
  horizonUrl: network === "testnet" ? testnetHorizon : mainnetHorizon,
  networkPassphrase:
    network === "testnet" ? StellarSdk.Networks.TESTNET : StellarSdk.Networks.PUBLIC,
};

export const rpc = new StellarSdk.rpc.Server(stellarConfig.rpcUrl);
export const horizon = new StellarSdk.Horizon.Server(stellarConfig.horizonUrl);

export type ReceiptStatus = "Active" | "Redeemed" | "Cancelled";

export interface Receipt {
  receipt_id: number;
  issuer: string;
  owner: string;
  commodity: string;
  quantity_kg: string;
  grade: string;
  warehouse_name: string;
  location: string;
  metadata_hash: string;
  issued_at: number;
  expires_at: number;
  status: ReceiptStatus;
}

export interface ReceiptInput {
  owner: string;
  commodity: string;
  quantity_kg: string;
  grade: string;
  warehouse_name: string;
  location: string;
  metadata_hash: string;
  expires_at: number;
}

export interface BuildContractTxParams {
  source: string;
  contractId: string;
  operation: StellarSdk.xdr.Operation;
  fee?: string;
}

export async function buildContractTx({
  source,
  operation,
  fee = StellarSdk.BASE_FEE,
}: BuildContractTxParams): Promise<StellarSdk.Transaction> {
  const sourceAccount = await horizon.loadAccount(source);
  return new StellarSdk.TransactionBuilder(sourceAccount, {
    fee,
    networkPassphrase: stellarConfig.networkPassphrase,
  })
    .addOperation(operation)
    .setTimeout(180)
    .build();
}

export function toDateTime(ts: number): string {
  return new Date(ts * 1000).toLocaleString();
}
