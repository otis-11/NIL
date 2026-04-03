---
description: Show the complete development workflow — all phases, commands, and their relationships
---

# Development Workflow

This document outlines the recommended workflow for implementing features.

---

## Complete Feature Development Workflow

### Phase 1: Planning & Design

1. **Capture the Issue** (`/capture-issue`)
   - Document the problem, current behavior, desired behavior
   - Assign issue ID and priority
   
   **Next:** Run `/explore` to analyze requirements

2. **Explore Requirements** (`/explore`)
   - Analyze the problem in detail
   - Define success criteria
   - Identify constraints and risks
   - List open questions
   
   **Next:** Run `/create-plan` to create execution plan

3. **Create Execution Plan** (`/create-plan`)
   - Generate detailed implementation plan
   - Include field mappings (if data transformations)
   - Include format conversions (if needed)
   - Include backend parity checks (if API endpoints)
   
   **Next:** Run `/design-decisions` to document design choices

4. **Document Design Decisions** (`/design-decisions`)
   - Answer all open questions from planning
   - Define field update strategies
   - Specify rendering approaches (if formatted content)
   - Document integration points
   
   **Next:** Run `/pre-implementation-checklist` to verify readiness

5. **Pre-Implementation Checklist** (`/pre-implementation-checklist`)
   - Verify design decisions exist
   - Verify field mappings are documented
   - Verify format conversions are specified
   - Verify backend parity plan (if needed)
   - Verify rendering strategy (if needed)
   
   **Next:** Run `/execute-plan` to begin implementation

---

### Phase 2: Implementation

6. **Execute Plan** (`/execute-plan`)
   - Follow the execution plan step-by-step
   - Reference design decisions for guidance
   - Update all backend entry points for new endpoints
   - Implement format conversions as documented
   
   **Optional:** Run `/tdd` for complex logic (test-driven development)
   
   **Next:** Run `/code-review` for automated review, then `/qa-checklist` for manual testing

---

### Phase 3: Quality Assurance

7. **Code Review** (`/code-review`) — *standard*
   - Automated security check, correctness, architecture, code quality, performance
   - Review specified scope (file, recent changes, or feature)
   
   **Next:** Fix any issues found, then run `/security-scan` (optional) or `/qa-checklist`

8. **Security Scan** (`/security-scan`) — *optional*
   - Dedicated pass: secrets, dependencies, input safety, auth, data at rest, encryption, proprietary/IP
   - Use when handling sensitive data, before release, or for compliance; complements code-review
   
   **Next:** Fix critical/high findings, then run `/qa-checklist`

9. **QA Checklist** (`/qa-checklist`) — *standard*
   - Manual testing checklist: happy path, edge cases, error handling, visual/UX
   - Human validation only (no automated tests)
   
   **Next:** Fix any issues found, then run `/peer-review` (optional)

10. **Peer Review** (`/peer-review`) — *optional*
    - Human code review for complex or high-impact changes
    - Evaluate suggestions critically; accept or reject with rationale
    
    **Next:** Address review feedback, then proceed to deployment

---

### Phase 4: Deployment & Reflection

11. **Deploy**
    - Test in staging (if available)
    - Deploy to production
    - Monitor for issues
    
    **Next:** Run `/postmortem` to reflect on the process

12. **Postmortem** (`/postmortem`) — *standard*
    - Analyze friction points, rework, missing docs
    - Document lessons learned; propose workflow/doc updates
    
    **Next:** Run `/project-wrap-up` (optional) or start next feature

13. **Project Wrap-up** (`/project-wrap-up`) — *optional*
    - Final handover: security audit, context synthesis, onboarding docs, next-op briefing
    - Use when handing off, releasing, or preparing for the next contributor or AI agent
    
    **Next:** Start next feature or hand off

---

## Quick Start Workflow

For smaller changes or bug fixes:

1. `/capture-issue` - Document the issue
2. `/execute-plan` - Implement the fix
3. `/code-review` - Automated review
4. `/security-scan` - Optional, if the change touches auth, secrets, or sensitive data
5. `/peer-review` - Review changes (optional for trivial fixes)
6. Deploy

---

## Standard vs Optional Steps

| Step | Type | What it does |
|------|------|----------------|
| `/capture-issue` | Standard | Log the problem, current/desired behavior, priority; get issue ID |
| `/explore` | Standard | Deep-dive requirements, constraints, risks; persist exploration snapshot |
| `/create-plan` | Standard | Turn exploration into atomic implementation steps |
| `/design-decisions` | Standard | Lock design choices, field mappings, integration points before coding |
| `/pre-implementation-checklist` | Standard | Confirm plan and design are complete; gate before coding |
| `/execute-plan` | Standard | Implement step-by-step using plan and design decisions |
| `/tdd` | Optional | Red-green-refactor for complex logic during implementation |
| `/code-review` | Standard | Automated review: security, correctness, architecture, quality, performance |
| `/security-scan` | Optional | Dedicated security pass: secrets, deps, auth, data at rest, encryption, proprietary/IP |
| `/qa-checklist` | Standard | Human manual-test checklist (happy path, edge cases, UX) |
| `/peer-review` | Optional | Human review of changes; accept/reject feedback with rationale |
| `/postmortem` | Standard | Reflect on friction and rework; improve process and docs |
| `/project-wrap-up` | Optional | Handover: security audit, onboarding docs, next-op briefing |
| `/learning-opportunity` | Optional | Capture insights anytime |
| `/show-context` | Utility | Show current context files |
| `/workflow` | Utility | Show this workflow |
| `/review` | Utility | Quick senior-level review |
| `/blast-radius` | Utility | Assess change impact across components |
| `/deploy` | Utility | Deploy all components |
| `/dev-setup` | Utility | Set up local development environment |
| `/e2e-test` | Utility | Run end-to-end tests |

**Standard** = recommended for every feature or bugfix. **Optional** = use when scope, risk, or handover justifies it.

---

## Common Mistakes to Avoid

1. **Skipping Design Decisions** - Always run `/design-decisions` before implementation
2. **Forgetting Backend Parity** - Always update all backend entry points
3. **Missing Format Conversions** - Document and implement all format conversions
4. **Skipping Pre-Implementation Checklist** - Verify all requirements before coding

---

**Last Updated:** 2026-03-06
