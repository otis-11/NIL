---
description: Deploy the AI Receptionist — Vercel frontend and Express backend
---

# Deploy

## Component Deployment Targets

| Component | Target | Method |
|-----------|--------|--------|
| Frontend | Vercel | Git push (auto-deploy) or `vercel` CLI |
| Express Server | Render / Railway / Fly.io | Git push (auto-deploy) or manual |
| LiveKit Agent | LiveKit Cloud | `cd agent && npm run dev` (or `npm start` for production) |

## Pre-Deploy Checklist

1. Run the blast-radius workflow to verify frontend/public sync
2. Run the e2e-test workflow to verify all endpoints
3. Verify `.env` credentials are set for all three components
4. Verify `frontend/vercel.json` rewrites point to the deployed backend URL (not a placeholder)

## Step 1: Deploy Express Backend

Deploy to a Node.js host with persistent storage (for SQLite):

- **Render**: Connect GitHub repo, set root directory to `.`, start command `npm start`
- **Railway**: Import from GitHub, auto-detects Node.js
- **Fly.io**: `fly launch` then attach a volume for `./data/`

After deployment, note the backend URL (e.g. `https://ai-receptionist.onrender.com`).

Set the following environment variables on the host:
- `LIVEKIT_URL`, `LIVEKIT_API_KEY`, `LIVEKIT_API_SECRET`
- `GOOGLE_API_KEY`
- `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `ADMIN_EMAIL`
- `PORT` (usually auto-set by the host)
- `SERVER_URL` → the deployed backend URL

## Step 2: Update vercel.json Backend URL

Edit `frontend/vercel.json` — replace `BACKEND_URL` with your deployed backend hostname:

```json
{ "source": "/dashboard/api/:path*", "destination": "https://ai-receptionist.onrender.com/dashboard/api/:path*" }
```

Do this for all rewrite rules in the file.

## Step 3: Deploy Frontend to Vercel

Option A — Git push (if Vercel is connected to GitHub):
```bash
git add -A && git commit -m "deploy: update backend URL" && git push
```

Option B — Vercel CLI:
```bash
cd frontend && npx vercel --prod
```

## Step 4: Set Vercel Environment Variables

In Vercel project settings, add:
- `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `ADMIN_EMAIL`

The anon key is embedded in the frontend HTML for client-side auth.

## Step 5: Start LiveKit Agent

```bash
cd agent && npm run dev
```

For production (compiled JS):
```bash
cd agent && npm run build && npm start
```

## Step 6: Verify Live Deployment

1. Visit your Vercel URL → should show login page with email/password form
2. Sign in with Supabase credentials → redirects to dashboard
3. Dashboard loads with stats and call logs
4. Visit `/widget` → chat widget works
5. LiveKit agent logs show `registered worker`

## Environment Variables Summary

### Backend `.env` (Express server on Render/Railway)
- `LIVEKIT_URL`, `LIVEKIT_API_KEY`, `LIVEKIT_API_SECRET`
- `GOOGLE_API_KEY`
- `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `ADMIN_EMAIL`
- `PORT`, `SERVER_URL`

### `agent/.env` (LiveKit agent)
- `LIVEKIT_URL`, `LIVEKIT_API_KEY`, `LIVEKIT_API_SECRET`
- `GOOGLE_API_KEY`

### Vercel (frontend)
- `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `ADMIN_EMAIL`
- API calls proxied via `vercel.json` rewrites
