---
description: Install all 21 global workflows into the current project
---

# Install Global Workflows

Run this command in the terminal to install all 21 workflows into the current project:

```powershell
powershell -ExecutionPolicy Bypass -File "$env:USERPROFILE\.windsurf\install-workflows.ps1"
```

This will:
1. Create `.windsurf/workflows/` in the current project if it doesn't exist
2. Copy all 21 workflows from your global folder into it
3. Add `.windsurf/` to `.gitignore` automatically (so workflows stay private)
