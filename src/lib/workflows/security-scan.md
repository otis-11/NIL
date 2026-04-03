---
description: Run a comprehensive security scan, fix vulnerabilities, and generate a detailed report
---

# Security Scan Workflow

You are in **security scan and remediation** mode. Perform a systematic security review of the codebase, **fix all issues you can**, and generate a structured report.

---

## Scope

Determine what to scan based on the user's request:
- **Recent changes:** Scan changes since last commit (default if unspecified)
- **Full codebase:** Scan entire project
- **Target area:** Scan a specific directory or component (e.g., `Scan src/auth/`)

If not specified, scan the entire project.

---

## Phase 1: Discovery

Before scanning, gather context about the project:

1. **Identify the tech stack** — Read `package.json`, `requirements.txt`, `go.mod`, `Cargo.toml`, `Gemfile`, `pom.xml`, or equivalent. Note the language, framework, and runtime.
2. **Identify the architecture** — Check for frontend/backend separation, API routes, database connections, auth providers, deployment config (Vercel, Docker, AWS, etc.).
3. **Identify sensitive files** — Locate `.env`, `.env.*`, config files, secret managers, CI/CD configs (`.github/workflows/`, `vercel.json`, `Dockerfile`, etc.).
4. **Check git history** — Look for `.gitignore` coverage. Verify `.env`, credentials, and secrets are not tracked.

---

## Phase 2: Scan Checklist

Work through each category. For every issue found: **fix it immediately if possible**, or flag it for user action if it requires a decision.

### 1. Secrets and Credentials
- [ ] No hardcoded API keys, tokens, passwords, or signing secrets in source code
- [ ] No credentials in config files committed to the repo
- [ ] Environment variables used for all secrets; `.env.example` documents required vars without real values
- [ ] No secrets in logs, error messages, or client-side code
- [ ] No secrets in git history (check `.gitignore` covers `.env`, `*.pem`, `*.key`, etc.)
- [ ] No secrets passed via URL query parameters

**Fix actions:** Move hardcoded secrets to env vars, update `.gitignore`, add `.env.example` entries, redact secrets from error messages.

### 2. Dependencies
- [ ] Run `npm audit` / `pip audit` / equivalent to find known vulnerabilities
- [ ] No known-vulnerable or abandoned packages in use
- [ ] No unexpectedly permissive or high-risk libraries
- [ ] Production dependencies are actually used (no unused high-risk deps)
- [ ] Lockfile exists and is committed (`package-lock.json`, `yarn.lock`, `poetry.lock`)
- [ ] No typosquatting risk (verify package names are legitimate)

**Fix actions:** Run `npm audit fix` or equivalent, remove unused dependencies, update vulnerable packages.

### 3. Input and Interface Safety
- [ ] All user inputs validated and sanitized (APIs, forms, CLIs, URL params)
- [ ] SQL/NoSQL injection vectors addressed (parameterized queries, ORM usage)
- [ ] XSS prevention (HTML escaping, `textContent` over `innerHTML`, CSP headers, no unsafe `dangerouslySetInnerHTML`)
- [ ] Command injection prevented (no `exec`/`spawn` with unsanitized input)
- [ ] File upload or path handling validated and constrained (no path traversal)
- [ ] Prototype pollution vectors addressed (no unsafe `Object.assign` or deep merge from user input)
- [ ] Mass assignment prevented (explicit allowlists for request body fields)
- [ ] Input length limits enforced on all endpoints
- [ ] No open redirects (validate redirect URLs against allowlist)

**Fix actions:** Add input validation, switch `innerHTML` to `textContent`/`esc()`, add parameterized queries, add input length limits, fix open redirects.

### 4. Authentication and Authorization
- [ ] Auth checks present on all protected routes and operations
- [ ] No debug bypasses, test-only backdoors, or permissive wildcards in production paths
- [ ] Principle of least privilege applied (roles/permissions)
- [ ] Session/token handling secure (HttpOnly, Secure, SameSite, short expiry, revocation)
- [ ] CSRF protection on state-changing operations (state params, CSRF tokens)
- [ ] Password/secret comparison uses timing-safe equality
- [ ] JWT secrets are strong and not hardcoded; tokens have expiration
- [ ] OAuth state parameter validated to prevent CSRF and IDOR
- [ ] No IDOR (Insecure Direct Object Reference) — users can only access their own resources
- [ ] Rate limiting on auth endpoints (login, registration, password reset)
- [ ] Account lockout or throttling after failed login attempts

**Fix actions:** Add auth middleware, fix IDOR by scoping queries to authenticated user, add CSRF tokens, add rate limiting, enforce secure cookie flags.

### 5. Configuration and Environment
- [ ] CORS configured restrictively (not `*` in production)
- [ ] Security headers present: `X-Frame-Options`, `X-Content-Type-Options`, `Strict-Transport-Security`, `Content-Security-Policy`, `Referrer-Policy`, `Permissions-Policy`
- [ ] No production URLs, keys, or credentials in repo or default config
- [ ] Required env vars documented in `.env.example`
- [ ] Debug mode / verbose logging disabled in production config
- [ ] HTTPS enforced (no HTTP fallback in production)
- [ ] No overly permissive file permissions
- [ ] Deployment config reviewed (Vercel, Docker, nginx, etc.)

**Fix actions:** Add security headers, tighten CORS, create/update `.env.example`, disable debug mode.

### 6. Data and Logging
- [ ] No PII or credentials logged in plain text
- [ ] Sensitive data not exposed in API responses beyond what is necessary
- [ ] Error messages are generic to clients (no stack traces, internal paths, or SQL errors)
- [ ] Data in transit uses HTTPS / secure channels
- [ ] API responses don't leak internal implementation details
- [ ] No sensitive data in browser `localStorage` or `sessionStorage` (prefer HttpOnly cookies)

**Fix actions:** Sanitize error responses, remove PII from logs, strip internal details from API responses.

### 7. Data at Rest and Encryption
- [ ] Sensitive data at rest is encrypted using strong algorithms (AES-256 or equivalent)
- [ ] Encryption keys managed separately from data (key vault, env vars, secrets manager — not in repo)
- [ ] No sensitive data or PII stored in plain text when encryption is feasible
- [ ] Passwords hashed with strong algorithm (bcrypt, scrypt, argon2 — not MD5/SHA1)
- [ ] Database connection uses TLS/SSL
- [ ] Backups are encrypted

**Fix actions:** Flag unencrypted sensitive data, recommend encryption strategy, verify password hashing.

### 8. Proprietary and Business-Sensitive Information
- [ ] No trade secrets or proprietary algorithms documented in plain language in comments or commit messages
- [ ] No unreleased product roadmaps, pricing strategy, or confidential details in repo
- [ ] No customer names, deal terms, or confidential business data in code, config, or logs
- [ ] AI-facing context files contain only what is safe to share externally
- [ ] Clear boundary between shareable and internal-only information

**Fix actions:** Flag sensitive comments/docs for review, recommend redaction.

### 9. Server-Side Request Forgery (SSRF)
- [ ] All outbound HTTP requests use validated/allowlisted URLs
- [ ] No user-controlled URLs passed directly to `fetch`, `axios`, `http.get`, etc.
- [ ] Internal/private IP ranges blocked for user-supplied URLs (127.0.0.1, 10.x, 169.254.x, etc.)

**Fix actions:** Add URL validation/allowlisting, block private IP ranges.

### 10. Insecure Deserialization
- [ ] No `eval()`, `Function()`, or `unserialize()` on user-controlled input
- [ ] JSON parsing uses `JSON.parse()` (not `eval`)
- [ ] No YAML/XML deserialization of untrusted input without safe loaders

**Fix actions:** Replace unsafe deserialization with safe alternatives.

### 11. WebSocket Security
- [ ] WebSocket connections require authentication
- [ ] Origin validation on WebSocket upgrade requests
- [ ] Message size limits enforced
- [ ] Input validation on all WebSocket messages

**Fix actions:** Add auth to WS connections, validate origins, add message limits.

### 12. Infrastructure and Deployment
- [ ] Docker images use minimal base images (no unnecessary tools)
- [ ] No secrets baked into Docker images or CI/CD logs
- [ ] CI/CD secrets use platform secret management (not hardcoded in workflow files)
- [ ] Subdomain takeover risks checked (dangling DNS records)
- [ ] Serverless function permissions are least-privilege

**Fix actions:** Flag misconfigurations, recommend fixes.

### 13. Database Access Control
- [ ] Row Level Security (RLS) enabled where applicable (Supabase, Postgres)
- [ ] RLS policies are not overly permissive (`USING (true)` on sensitive tables)
- [ ] Service role keys not exposed to client-side code
- [ ] Database queries scoped to authenticated user where appropriate
- [ ] No raw SQL with string concatenation (use parameterized queries)

**Fix actions:** Add RLS policies, fix overly permissive policies, scope queries.

### 14. Supply Chain Security
- [ ] Lockfile integrity — lockfile matches manifest
- [ ] No post-install scripts from untrusted packages
- [ ] GitHub Actions / CI use pinned versions (not `@latest` or `@main`)
- [ ] No wildcard or overly broad dependency version ranges for security-critical packages

**Fix actions:** Pin dependency versions, audit post-install scripts.

---

## Phase 3: Fix and Remediate

For each issue found:
1. **Critical/High** — Fix immediately. Apply the code change directly.
2. **Medium** — Fix if straightforward. Flag for user if it requires architectural decisions.
3. **Low** — Document in the report with recommended fix.

After making fixes:
- Run syntax checks on all modified files (`node --check`, `python -m py_compile`, etc.)
- Verify HTML structure is intact (balanced tags)
- Verify imports/exports still match
- Run any available test suites

---

## Phase 4: Generate Report

Write the full scan report to `.ai/context/last_security_scan.md` using this format:

```markdown
# Security Scan Report

**Date:** [scan date]
**Scope:** [what was scanned]
**Tech Stack:** [detected stack]

## Summary
[1-2 sentence overview of findings and actions taken]

## Critical
[Issues that must be fixed before merge or release. Note if already fixed.]

## High
[Important issues that should be addressed soon. Note if already fixed.]

## Medium
[Best-practice improvements. Note if already fixed.]

## Low
[Minor or theoretical improvements.]

## Data at Rest / Encryption
[Gaps in encryption or key management; sensitive data stored unencrypted.]

## Proprietary / Business-Sensitive
[Trade secrets, confidential strategy, or IP flagged for leadership review.]

## Clean
[Areas checked with no issues found — list them explicitly.]

## Verdict
- [ ] PASS — No critical or high issues remain
- [ ] FAIL — Critical or high issues still present

## Changes Made
[List every file modified and what was changed during this scan.]

## Next Steps
[Concrete actions: what still needs manual review, what to re-test, etc.]
```

---

## Severity Reference

| Level    | Meaning                  | Action                   |
|----------|--------------------------|--------------------------|
| Critical | Active security risk     | Fix immediately          |
| High     | Significant exposure     | Fix before release       |
| Medium   | Best-practice hardening  | Plan to address          |
| Low      | Minor or theoretical     | Optional improvement     |

---

## Final Steps

1. After writing the report, present a summary in chat
2. List all files that were modified
3. Ask the user if they want to commit the security fixes
4. If there are items requiring user decisions, list them clearly
5. Offer to re-run the scan to verify all fixes
