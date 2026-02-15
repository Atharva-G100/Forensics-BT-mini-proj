# Immutable Evidence Registry (Frontend)

This is a React + Vite frontend for a blockchain-backed digital evidence registry.

Core flow:
1) Upload evidence file
2) Compute SHA-256 locally (browser Crypto API)
3) Commit hash + metadata to `EvidenceRegistry.sol` on Sepolia
4) Re-upload later to verify integrity via `getEvidence()`

## Setup

1) Install deps

```bash
npm install
```

2) Configure environment

Copy the example file and set your deployed Sepolia address:

```bash
cp .env.example .env
```

Edit `.env`:

```bash
VITE_EVIDENCE_REGISTRY_ADDRESS=0xYourSepoliaContractAddress
VITE_EXPECTED_CHAIN_ID=0xaa36a7
```

3) Run

```bash
npm run dev
```

## Notes

- The evidence file itself is never uploaded to the blockchain; only its SHA-256 hash is stored.
- `evidenceType` and `notes` are UI-only in the current contract version (kept off-chain).
