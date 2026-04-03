---
description: Run a comprehensive code review — security, correctness, architecture, performance, and quality
---

# Comprehensive Code Review

You are now in **code review mode**. Review code changes systematically, flag issues by severity, suggest fixes, and generate a structured report.

---

## What to Review

Determine scope based on the user's request:
- **A specific file:** `Review src/routes/admin.js`
- **Recent changes:** `Review changes since last commit`
- **A feature:** `Review the chat widget implementation`
- **A directory:** `Review agent/`
- **Full codebase:** `Review everything`

If not specified, review all uncommitted changes using:
```bash
git diff --name-only
git diff --cached --name-only
```

---

## Phase 1: Context Gathering

Before reviewing, understand what you're looking at:

1. **Identify changed files** — `git diff --stat` or read the specified files
2. **Understand the feature** — What is this code trying to accomplish?
3. **Check the architecture** — Which component(s) are affected? (Express server `src/`, Frontend `frontend/`, Agent `agent/`)
4. **Identify dependencies** — What other files depend on or are depended upon by the changed code?

---

## Phase 2: Review Checklist

Work through each category. For every issue found, note the **file**, **line**, and **severity**.

### 1. Security (CRITICAL — review first, stop and flag immediately if issues found)

- [ ] No hardcoded secrets, API keys, tokens, or credentials in source code
- [ ] No sensitive data in logs, error messages, or client-side responses
- [ ] Input validation on all user inputs (API bodies, query params, URL params)
- [ ] SQL/NoSQL injection prevention (parameterized queries, no string concatenation)
- [ ] XSS prevention (`textContent` over `innerHTML`, no unsafe dynamic HTML)
- [ ] Authentication/authorization checks on all protected routes
- [ ] CORS configured restrictively (not `*` in production)
- [ ] No `eval()`, `Function()`, or `exec()` with user-controlled input
- [ ] JWT/session tokens handled securely (HttpOnly, Secure, SameSite)
- [ ] No open redirects (redirect URLs validated against allowlist)
- [ ] Rate limiting on sensitive endpoints
- [ ] No SSRF vectors (user-controlled URLs passed to `fetch`/`http.get`)
- [ ] Supabase service role key never exposed to client-side code
- [ ] RLS policies in place for any new database tables

**If security issues found: FLAG IMMEDIATELY with 🔴 severity.**

### 2. Correctness

- [ ] Code does what it claims to do
- [ ] Edge cases handled (null, undefined, empty arrays, missing fields)
- [ ] Error handling is appropriate — errors caught, logged, and returned gracefully
- [ ] No obvious bugs or logic errors
- [ ] Race conditions considered (async code, concurrent requests)
- [ ] Promises properly awaited (no floating promises)
- [ ] Error responses use correct HTTP status codes
- [ ] Database queries return expected results
- [ ] API contracts match between frontend fetch calls and backend routes
- [ ] Environment variables checked before use (fail fast if missing)

### 3. Architecture

- [ ] Changes follow existing project patterns and conventions
- [ ] No unnecessary complexity (YAGNI — You Aren't Gonna Need It)
- [ ] Separation of concerns maintained (routes, services, middleware)
- [ ] Dependencies are appropriate and necessary
- [ ] No circular dependencies introduced
- [ ] **Frontend/public sync:** If `frontend/*.html` changed, `src/public/*.html` must match
- [ ] **Route registration:** New routes registered in `src/index.js`
- [ ] **Vercel rewrites:** New API prefixes added to `frontend/vercel.json`
- [ ] **Agent isolation:** Agent changes don't introduce Express server dependencies
- [ ] No business logic in route handlers (belongs in services)

### 4. Code Quality

- [ ] Readable and self-documenting
- [ ] Consistent naming conventions (camelCase for JS, snake_case for DB columns)
- [ ] No dead code or unused imports
- [ ] No leftover `console.log` statements (use proper logging)
- [ ] No commented-out code blocks
- [ ] Comments explain "why" not "what"
- [ ] Functions are focused (single responsibility)
- [ ] No magic numbers or strings (use constants or config)
- [ ] Error messages are descriptive and actionable
- [ ] No duplicated logic (DRY)

### 5. Performance

- [ ] No N+1 queries or unnecessary database calls
- [ ] Expensive operations are cached or memoized where appropriate
- [ ] No memory leaks (event listeners cleaned up, streams closed)
- [ ] No blocking operations on the event loop (large sync file reads, etc.)
- [ ] Database queries use indexes for frequently queried columns
- [ ] API responses return only necessary data (no over-fetching)
- [ ] No unnecessary `await` in loops (use `Promise.all` when independent)
- [ ] File reads/writes use streams for large data

### 6. Error Handling and Resilience

- [ ] All async operations wrapped in try/catch
- [ ] External API calls have timeouts
- [ ] Graceful degradation when external services are unavailable
- [ ] Error responses don't leak internal details (stack traces, file paths, SQL errors)
- [ ] Failed operations don't leave state in an inconsistent condition
- [ ] Retry logic where appropriate (network calls, transient failures)

### 7. Testing

- [ ] New code has tests or a documented reason for skipping
- [ ] Tests cover happy path and error/edge cases
- [ ] Tests are readable and maintainable
- [ ] No flaky tests introduced
- [ ] Mocks are appropriate (not over-mocking)
- [ ] Test data doesn't depend on external state

### 8. Documentation and Maintainability

- [ ] README updated if new setup steps or dependencies added
- [ ] `.env.example` updated if new environment variables introduced
- [ ] API changes documented (new endpoints, changed contracts)
- [ ] Breaking changes clearly noted
- [ ] Complex logic has inline comments explaining intent

---

## Phase 3: Cross-Component Checks

These checks are specific to multi-component projects:

### Frontend ↔ Backend Sync
- [ ] All `fetch()` URLs in `frontend/*.html` match actual Express routes
- [ ] Request/response shapes match between frontend and backend
- [ ] `frontend/vercel.json` rewrites cover all API prefixes used in HTML files
- [ ] Auth token handling consistent (both sides expect same format)

### File Duplication Sync
- [ ] `frontend/admin.html` matches `src/public/admin.html`
- [ ] `frontend/dashboard.html` matches `src/public/dashboard.html`
- [ ] `frontend/widget.html` matches `src/public/widget.html`
- [ ] `frontend/index.html` matches `src/public/login.html`

### Package Management
- [ ] Root `package.json` only has Express server dependencies
- [ ] `agent/package.json` only has agent dependencies
- [ ] No cross-contamination between the two `node_modules`
- [ ] `package-lock.json` committed and up to date

---

## Phase 4: Generate Report

Write the review report to `.ai/context/last_code_review.md` using this format:

```markdown
# Code Review: [Feature/File/Scope]

**Date:** [review date]
**Scope:** [what was reviewed]
**Reviewer:** Cascade (automated)

## Summary
[1-2 sentence overview of what was reviewed and overall assessment]

## Security Issues 🔴
[List any security concerns — these are blockers]
- **File:** `path/to/file.js:LINE`
- **Issue:** Description
- **Fix:** Suggested remediation

## Bugs / Correctness Issues 🟠
[List bugs or logic errors]
- **File:** `path/to/file.js:LINE`
- **Issue:** Description
- **Fix:** Suggested remediation

## Suggestions 🟡
[Improvements that would be nice but aren't blockers]

## Positive Notes 🟢
[What was done well — always include something positive]

## Verdict
- [ ] ✅ **Approved** — No issues found
- [ ] ⚠️ **Approved with suggestions** — Minor improvements recommended
- [ ] ❌ **Changes requested** — Issues must be fixed before merge

## Changes Made During Review
[List every file modified and what was changed, if auto-fixes were applied]

## Next Steps
[Specific actions needed before merge/commit]
```

---

## Severity Levels

| Level | Icon | Meaning | Action Required |
|-------|------|---------|-----------------|
| Critical | 🔴 | Security issue or data loss risk | Must fix before merge |
| Major | 🟠 | Bug or significant correctness issue | Should fix before merge |
| Minor | 🟡 | Improvement opportunity | Consider fixing |
| Nitpick | 🟢 | Style preference or minor suggestion | Optional |

---

## Auto-Fix Rules

When reviewing, apply fixes directly for:
- **🔴 Critical** — Fix immediately, note in report
- **🟠 Major** — Fix if straightforward, flag if architectural
- **🟡 Minor** — Suggest in report, fix only if trivial
- **🟢 Nitpick** — Document only, do not change

After making any fixes:
// turbo
1. Verify modified files parse correctly:
```bash
node -e "const files=require('child_process').execSync('git diff --name-only').toString().split('\n').filter(f=>f.endsWith('.js'));files.forEach(f=>{try{require('child_process').execSync('node --check '+f);console.log('✅ '+f)}catch(e){console.log('❌ '+f+': '+e.message)}});"
```

---

## Review Principles

1. **Be constructive** — Suggest fixes, not just problems
2. **Be specific** — Point to exact files and lines using citation format
3. **Prioritize** — Security > Bugs > Architecture > Quality > Style
4. **Context matters** — Consider the project's conventions and constraints
5. **Minimize noise** — Don't flag things that are clearly intentional project patterns

---

## When to Run

- Before committing significant changes
- After completing a feature or bug fix
- Before creating a pull request
- After merging external contributions
- When onboarding to unfamiliar code
- Periodically as a health check

---

**Note:** This automated review complements but does not replace human review for complex architectural decisions or business logic changes.
