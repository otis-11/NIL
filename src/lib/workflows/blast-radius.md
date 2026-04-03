---
description: Assess blast radius before making changes — identify what files, routes, and components are affected
---

# Blast Radius Assessment

Use this workflow before making any non-trivial change to understand what will be affected.

## Architecture Overview

The project has **three independent components**:

| Component | Directory | Runtime | Deployment |
|-----------|-----------|---------|------------|
| Express Server | `src/` | Node.js (CommonJS) | Render / Railway / Fly.io |
| Vercel Frontend | `frontend/` | Static HTML | Vercel |
| LiveKit Agent | `agent/` | Node.js (ESM/TypeScript) | LiveKit Cloud worker |

## Dependency Map

### Express Server (`src/`)
```
src/index.js
├── src/config.js          ← reads .env (dotenv)
├── src/middleware/auth.js  ← Supabase Auth (JWT verification)
├── src/routes/
│   ├── admin.js           ← requires: auth middleware, callLogger, database
│   ├── auth.js            ← requires: googleapis, auth middleware, database
│   ├── dashboard.js       ← requires: auth middleware, callLogger, database
│   └── widget.js          ← requires: @google/genai, systemPrompt, toolDefinitions
└── src/services/
    ├── database.js        ← better-sqlite3 (core data layer)
    ├── callLogger.js      ← depends on database.js
    ├── calendarService.js ← depends on database.js, googleapis
    ├── systemPrompt.js    ← depends on config.js
    ├── toolDefinitions.js ← standalone
    ├── postCallAnalysis.js← depends on @google/genai
    ├── pdfReportGenerator.js ← depends on pdfkit
    └── notificationService.js ← standalone (fetch-based)
```

### Frontend (`frontend/`)
```
frontend/
├── index.html        ← Login page (links to /login)
├── dashboard.html    ← Fetches /dashboard/api/* endpoints
├── admin.html        ← Fetches /admin/api/* endpoints
├── widget.html       ← Fetches /widget/api/chat
└── vercel.json       ← Proxies API calls to Express backend via rewrites
```

**Important**: `frontend/*.html` files are **duplicated** in `src/public/`. They must stay in sync.

### Agent (`agent/`)
```
agent/
├── src/main.ts       ← LiveKit agent entry point
├── package.json      ← Separate dependencies (@livekit/agents, @livekit/agents-plugin-google)
├── tsconfig.json
└── dispatch-rule.json ← SIP routing config for LiveKit
```

## Blast Radius Rules

### If you change a **backend route** (`src/routes/*.js`):
- Check the corresponding `frontend/*.html` file for matching `fetch()` calls
- Check `src/public/*.html` (same file, must stay in sync)
- Check `vercel.json` rewrites if adding/removing route prefixes

### If you change **database.js**:
- Affects: admin.js, auth.js, dashboard.js, callLogger.js, calendarService.js
- Run the full e2e-test workflow after changes

### If you change **config.js** or **.env**:
- Affects: Every backend file and the agent
- The agent has its own `.env` in `agent/.env`

### If you change **frontend HTML** files:
- Must update the matching file in `src/public/`
- `frontend/index.html` = `src/public/login.html`

### If you change the **agent** (`agent/src/main.ts`):
- Isolated from Express server — no shared code
- Only shares LiveKit credentials via environment variables
- Verify with `cd agent && npx tsc --noEmit`

### If you add a **new npm dependency**:
- Root `package.json` → for Express server
- `agent/package.json` → for LiveKit agent (separate node_modules)
- Never mix them

## Quick Checks

// turbo
1. Verify backend imports resolve:
```bash
node -e "require('./src/index.js')" 
```

// turbo  
2. Verify agent compiles:
```bash
cd agent && npx tsc --noEmit
```

// turbo
3. Verify frontend/public sync:
```bash
node -e "const fs=require('fs');const f=['admin.html','dashboard.html','widget.html'];f.forEach(x=>{const a=fs.readFileSync('frontend/'+x);const b=fs.readFileSync('src/public/'+x);console.log(x+': '+(a.equals(b)?'✅ in sync':'❌ OUT OF SYNC'));});const c=fs.readFileSync('frontend/index.html');const d=fs.readFileSync('src/public/login.html');console.log('index.html↔login.html: '+(c.equals(d)?'✅ in sync':'❌ OUT OF SYNC'));"
```
