<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Shared continuation rules

- Read PROJECT_STATUS.md first; treat this recovery branch as review work.
- Preserve existing work. Compare with current main before selectively merging changes.
- Keep secrets in local environment files. Do not commit credentials, real user data, databases, caches, dependencies, model weights, or chat histories.
- Install dependencies from the committed lockfile on Linux; document required environment variable names without values.
- Run checks appropriate to the change and report their actual results. Never infer deployment readiness from a successful clone.
