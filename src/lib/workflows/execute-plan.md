---
description: Execute the approved plan step-by-step — implement with guardrails and validation
---

You are now executing the approved plan.

## Pre-Flight Check

**Before starting implementation, verify:**
- [ ] `/pre-implementation-checklist` has been run (or manually verified)
- [ ] Design decisions document exists: `.ai/context/design_decisions.md`
- [ ] Field mapping matrix is documented (if data transformations are involved)
- [ ] Data format specifications are clear (if API/formats are involved)

**If any items above are missing, stop and inform the user to complete them first.**

---

**Context Integration:**
First, check for and read context files:
- Read the plan file
- `.ai/context/design_decisions.md` (if exists) - use for design guidance
- `.ai/context/last_explore.md` (if exists) - use for validation and scope boundaries

At the start of execution:
- Restate "What we're building" in 3 bullets (derive from plan TLDR or `last_explore.md` Success Criteria)
- List explicit non-goals (derive from `last_explore.md` Constraints and what's explicitly out of scope)
- Reference design decisions document if it exists

Rules:
- Follow the plan exactly
- Follow design decisions from `.ai/context/design_decisions.md`
- Do not introduce new scope
- Do not refactor unrelated code
- If you discover missing information, pause and ask

Process:
- Implement one step at a time
- Mark completed steps clearly
- Explain briefly what was changed after each step
- **For data format conversions: Verify conversion logic matches documented formats**
- During execution, when making a tradeoff:
  - Check `last_explore.md` Constraints and Risks to avoid scope drift
  - Check `design_decisions.md` for documented decisions
  - Avoid decisions that contradict stated constraints

**Special Checks:**
- **API Endpoints:** When adding new endpoints, verify all backend entry points are updated
- **Data Formats:** When transforming data, verify format conversions match documented specs
- **Content Rendering:** If adding formatted content, implement rendering strategy from design decisions

Validation (at the end):
- Validate implemented behavior against `last_explore.md` Success Criteria (if exists)
- Validate against Acceptance Criteria from plan or `last_explore.md` (if exists)
- Verify field mappings were implemented correctly (if applicable)
- Verify format conversions work as documented (if applicable)
- Ensure no constraints were violated

If a step feels unsafe or unclear, stop and ask before proceeding.

---

**During implementation (optional):**
- Run `/tdd` for complex logic requiring test-driven development

**After completion:**
- Review implementation against design decisions
- Document any deviations from the plan
- **Next step:** Run `/code-review` for automated security and quality review, then `/qa-checklist` for manual testing
