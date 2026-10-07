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

## Required defect-fix completion flow

When the code fix is complete and tests pass, the agent MUST continue without pausing for extra prompting:

1. Create a feature branch using the Jira key and a short summary.
2. Stage only the relevant files.
3. Commit the fix with a commit message in the format `fix(<ISSUE_KEY>): <summary>`.
4. Push the branch to `origin` using `--set-upstream` on first push.
5. Create the PR against `main` using `gh pr create`.
6. Return the PR URL and do not stop before the PR is open.

The GitHub sequence is part of the required completion flow for the defect-fix task. It is not optional and must not be skipped after implementation.

## Required shell usage during automation

- If a command includes `gh`, `git`, or branch creation, run it through `cmd.exe` or Git Bash.
- Never rely on the default PowerShell session for GitHub automation in this repository.
- Do not ask the user to repeat the same branch or PR steps after the fix is implemented.
- If the shell is PowerShell, switch to `cmd.exe` before running `gh` commands.

## Rule for AI agents

Agents running in this repository must treat the GitHub branch + PR workflow as a mandatory final step after code changes, not as an optional follow-up instruction.
