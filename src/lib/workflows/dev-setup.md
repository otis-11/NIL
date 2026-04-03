---
description: Set up the local development environment from scratch
---

# Dev Setup

## Prerequisites
- Node.js v22+ installed and in PATH
- Git configured with access to the repository

## How Credentials Work

**NEVER commit `.env` to git.** It's already in `.gitignore`.

The team shares ONE set of credentials. Get them from your team lead via secure DM (Slack DM, 1Password, etc.).

| Credential | Where to get it | Required? |
|---|---|---|
| `LIVEKIT_URL`, `LIVEKIT_API_KEY`, `LIVEKIT_API_SECRET` | [LiveKit Cloud](https://cloud.livekit.io) → Project → Settings → Keys | **Yes** — phone calls |
| `GOOGLE_API_KEY` | [Google AI Studio](https://aistudio.google.com/apikey) | **Yes** — AI voice + chat |
| `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` | [Supabase Dashboard](https://supabase.com/dashboard) → Project → Settings → API | **Yes** — database |
| `SUPABASE_ANON_KEY` | Same Supabase project → Settings → API | **Yes** — client-side auth |
| `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` | [Google Cloud Console](https://console.cloud.google.com) → APIs → Credentials → OAuth 2.0 | Optional — calendar booking |

The Supabase URL is already in `.env.example` since all devs share the same project.

## Steps

1. Clone the repo:
```bash
git clone https://github.com/JoshPearre/AI-Receptionist.git
cd AI-Receptionist
```

2. Create your `.env` from the template:
```bash
cp .env.example .env
```
Then paste in the real credential values from your team lead.

3. Create the agent `.env.local` file:
```bash
cp .env agent/.env.local
```
The agent only needs: `LIVEKIT_URL`, `LIVEKIT_API_KEY`, `LIVEKIT_API_SECRET`, `GOOGLE_API_KEY`.

// turbo
4. Install root dependencies:
```bash
npm install
```

// turbo
5. Install agent dependencies:
```bash
cd agent && npm install && cd ..
```

6. Start the Express server (Terminal 1):
```bash
npm start
```
Server runs at `http://localhost:3000`.

7. Start the LiveKit agent (Terminal 2):
```bash
cd agent && npm run dev
```
Agent connects to LiveKit Cloud and registers as worker `receptionist`.

## Verification
- `http://localhost:3000` → redirects to login page
- `http://localhost:3000/widget` → chat widget loads (public, no auth needed)
- Agent logs: `[Agent] Worker registered` with LiveKit Cloud server info
- Test call: dial your LiveKit SIP phone number → agent should answer and greet caller

## Troubleshooting
- **"SUPABASE_URL not set"** → Your `.env` is missing or not loaded. Check `cp .env.example .env` was done.
- **Agent won't connect** → Verify `LIVEKIT_URL`, `LIVEKIT_API_KEY`, `LIVEKIT_API_SECRET` are correct.
- **"Analysis failed"** → `GOOGLE_API_KEY` is missing or invalid. Get from AI Studio.
- **401 on dashboard** → Sign up at `/login` first, then sign in. Check `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are set.
