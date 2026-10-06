# Repository instructions

## GitHub CLI shell policy

- Always run GitHub CLI commands (`gh`) using either `cmd.exe` or Git Bash.
- Do not use PowerShell for `gh` commands in this repository.
- PowerShell execution policies may block scripts in this environment, so `gh` must be invoked through a shell that is permitted by the company policy.
- Preferred patterns:
  - `cmd /d /c "gh ..."`
  - `git bash` or `bash -lc "gh ..."`
- If a shell reports `gh: command not found`, do not retry in PowerShell. Instead, use a trusted shell and verify the binary is available in PATH, for example:
  - `cmd /d /c "where gh"`
  - `git bash -lc "which gh || where gh"`
  - Then run the command through the working shell, such as `cmd /d /c "gh ..."` or `bash -lc "gh ..."`.
- For future sessions, ensure the GitHub CLI is installed and the install location is added to the system PATH, not just the current terminal session.
  - Typical install directory on Windows: `C:\Program Files\GitHub CLI\gh.exe`
  - After installing, close and reopen the terminal before retrying `gh`.
- This rule applies to all automated agents and manual commands in this repo.
