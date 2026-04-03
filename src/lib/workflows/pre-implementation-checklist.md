---
description: Verify all planning and design work is complete before starting implementation
---

# Pre-Implementation Checklist

Run this checklist BEFORE starting implementation (`/execute-plan`).

This checklist ensures all critical decisions, data mappings, and integration points are defined before coding begins.

## Prerequisites

- [ ] `/capture-issue` has been run (issue is captured)
- [ ] `/explore` has been run (requirements are explored)
- [ ] `/create-plan` has been run (execution plan exists)
- [ ] Execution plan has been reviewed and approved

---

## Pre-Implementation Requirements

### 1. Design Decisions Document

- [ ] Design decisions document exists: `.ai/context/design_decisions.md`
- [ ] All open questions from planning are answered
- [ ] Field update strategies are documented (replace/merge/append)
- [ ] Integration points with existing code are identified
- [ ] Rendering strategy specified for any formatted content (markdown, HTML)

**Action:** If missing, run `/design-decisions` first

**Next Step:** Once design decisions are complete, continue to step 2.

---

### 2. Field Mapping Matrix

For features that generate data or transform data between systems:

- [ ] Field mapping matrix exists in execution plan or design decisions
- [ ] For each generated/transformed field, specify:
  - Source field (where data comes from)
  - Target field (where it goes)
  - Update strategy (replace/merge/append)
  - Format conversion required (if any)

**Example:**
```
Generated Item -> Form Field -> Update Strategy -> Format Conversion
title -> idea -> replace -> none
tags -> tags -> merge -> tag names -> tag IDs
```

**Action:** If missing, add to execution plan or design decisions doc

**Next Step:** Continue to step 3.

---

### 3. Data Format Specifications

- [ ] API response formats are documented (if adding API endpoints)
- [ ] Form/data model formats are documented
- [ ] Format conversions required are explicitly listed
- [ ] Format conversion functions are identified or planned

**Next Step:** Continue to step 4.

---

### 4. Backend Parity

If adding new API endpoints or backend logic:

- [ ] Plan includes updates to ALL backend entry points
- [ ] Helper functions that need to be duplicated are identified
- [ ] Local dev testing strategy is defined

**Action:** Add checklist items to execution plan for all backend files

**Next Step:** Continue to step 5.

---

### 5. Content Rendering Strategy

If adding formatted content (markdown, HTML, rich text):

- [ ] Rendering approach is specified:
  - Where does it render? (view mode, edit mode, both)
  - What library/component handles rendering?
  - How does editing work? (WYSIWYG vs raw text/textarea)
- [ ] Rendering dependencies are identified

**Action:** Add to design decisions document

**Next Step:** Ready to implement! Proceed to `/execute-plan`

---

## Workflow

1. **Run this checklist** -> Complete all items above
2. **Run `/execute-plan`** -> Start implementation
3. **During implementation** -> Reference design decisions and field mappings
4. **After implementation** -> Validate against acceptance criteria

---

## Notes

- If any item cannot be checked off, stop and complete it before proceeding
- Missing specifications at this stage will cause rework during implementation
- It's better to spend time planning than debugging later

---

**Ready to implement?** Run `/execute-plan` to begin implementation.
