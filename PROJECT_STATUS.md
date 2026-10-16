# Project status — NIL

Updated 2026-10-15. Shared continuation context for Claude Code and Codex.

- Repository: https://github.com/otis-11/NIL
- Handoff branch: `gx10/handoff-2026-10-15`; application baseline: `main` @ `74d95b37f488`.
- Read this file, AGENTS.md and existing project conventions. No old chat history is required.

## Purpose

LocalNIL: local-business sponsorship/deal platform concept for overlooked student-athletes, with athlete/business/parent experiences.

## Current progress

- One committed platform build includes outcome packages, matching, athlete/business dashboards, onboarding and parent/legal pages.
- BLUEPRINT.md defines proposed marketplace, contracts, payments and approval systems.
- src/lib/data.ts contains inline athlete/business/campaign demo records; live database wiring is not established by this evidence.

## Important decisions

- Match on local/community fit; parent approval and jurisdiction-specific restrictions are central design requirements.
- Blueprint describes intended product; it does not establish live compliance, escrow or payments.

## Unresolved problems

- README is framework boilerplate; actual backend/persistence/payment completion is not documented or verified.
- Legal rules in prototype must not be treated as current authoritative law.

## Next steps

- Inspect prototype data/state and separate implemented features from blueprint roadmap.
- Choose and validate the first real backend/auth/deal lifecycle slice before launch.

## GX10 setup

- npm install; npm run dev; npm run build; consult BLUEPRINT.md.

## Verification

- Consolidation checked Git history, source diffs and instruction links. New commits were screened for credentials and excluded content; original checkouts were preserved.
- GX10 application runtime, external accounts, production deployments and model serving have not been verified. Recorded earlier test results are dated evidence.
