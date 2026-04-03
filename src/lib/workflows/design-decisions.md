---
description: Document v1 design decisions before implementation — user flows, data mappings, integration points
---

We are defining version 1 design decisions.

Do NOT write code yet.

**This document should be created BEFORE implementation begins** (`/execute-plan`).

Based on our discussion so far:

Produce:
- Proposed user flow (step-by-step)
- Resource/data implications (if any)
- External integrations or dependencies (if any)
- Explicit non-goals for v1
- Edge cases worth considering

## Required Sections

### 1. User Flow
Detailed step-by-step user journey through the feature.

### 2. Field Mapping & Update Strategy
If this feature involves data generation or transformation, specify:
```
Generated Item -> Form Field -> Update Strategy (replace/merge/append)
title -> idea -> replace
tags -> tags -> merge with existing
```

### 3. Data Format Conversions
If formats differ between systems, document:
- Source format (e.g., API response)
- Target format (e.g., form data)
- Conversion required (e.g., {task} -> {text, link})

### 4. Content Rendering Strategy
If adding formatted content (markdown, HTML, rich text), specify:
- Where does it render? (view mode, edit mode, both)
- What library/component handles rendering?
- How does editing work? (WYSIWYG vs raw text/textarea)
- What dependencies are needed?

### 5. Integration Points
- Which existing components are affected?
- How does this integrate with existing features?
- What state management is involved?

### 6. Architecture Parity
If adding API endpoints or backend logic:
- Identify all backend entry points that need updates
- Document which helper functions need to be duplicated
- Ensure parity across all environments

Rules:
- Favor reversible decisions
- Avoid overengineering
- Call out any decision that would be hard to undo later
- Be explicit about what "generates" vs "enhances" vs "transforms"

End by asking:
"Are these the correct design boundaries for v1?"

---

**Next Steps:**
1. Review and approve design decisions
2. Run `/pre-implementation-checklist` to verify all requirements
3. Run `/execute-plan` to begin implementation
