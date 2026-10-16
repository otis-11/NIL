# Project status

Updated: 2026-10-15

## Purpose
LocalNIL athlete/business marketplace prototype with outcome packages, matching, deals, athlete and parent dashboards.

## Current progress
Preserved 10 selected local source/planning paths on `recovery/2026-10-15-local-nil`; this branch is for review, not automatic deployment.
Source checkout base: `74d95b37f488`.

## Important decisions
- Keep Next.js-specific AGENTS.md instructions and CLAUDE.md import.
- Contract prototype uses a 10% platform fee and parent-consent checks; these are product assumptions requiring confirmation before real transactions.

## Unresolved problems
- New messaging, parent approvals, contracts, and escrow flows rely on mock data/client state; real messaging, payments, persistence, and authorization are not verified.
- Legal/state compliance data and contract clauses are prototype assumptions, not legal verification.
- Contract activation logic does not enforce stateCompliant; do not treat UI compliance labels as a production safeguard.

## Verification
PASS: node node_modules/typescript/bin/tsc --noEmit --incremental false (exit 0). No build, browser, persistence or provider verification.
New staged files passed Gitleaks with full redaction before commit. Originals were not changed.

## Next steps
1. Complete durable backend/auth and parent-to-athlete ownership checks.
2. Integrate a real payment provider and validate state rules/contracts before production.
3. Run build and browser flows after restoring dependencies on Linux.

## Linux setup
Use npm ci, then npm run dev. Run the package build/lint scripts before merging; external payments, messaging and production authentication remain unfinished.
