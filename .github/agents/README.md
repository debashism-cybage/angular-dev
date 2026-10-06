# Agentic SDLC Pipeline for Angular Dev

This repository contains a working structure for the PES AIDLC agent pipeline using the Angular sample app as the delivery target.

## Purpose

The goal is to make the AIDLC skill pack executable in a real repo by connecting the agents into a single SDLC flow with clear handoffs, tool contracts, and human review gates.

## Agent sequence

1. PRD agent
2. Epic agent
3. Story agent
4. Task agent
5. Feature or defect execution agent
6. Coding standards validation
7. Security and secret checks
8. Code review / PR review
9. Test case generation and QA validation
10. UATForge acceptance review
11. Release notes and deploy readiness

## Operational model

The repo is designed around the following runtime assumptions:

- Jira is the work item and traceability source
- Confluence is the business and design document source
- GitHub is the code review + branch + PR source of truth
- Sonar and secret scanning provide automated quality gates
- Human approval is required at each major handoff

## Shared configuration

The runtime config is stored in `.claude/config.yaml`.

Update the values for your environment before enabling the pipeline.

## Repository artifacts

- `.claude/config.yaml` — environment and tool contract
- `.github/agents/agent-pipeline.yaml` — agent sequence and stage metadata
- `.github/workflows/agent-sdlc-orchestrator.yml` — automated gating pipeline

## Required tool access

The pipeline assumes these capabilities are available:

- Jira read/write access
- Confluence page lookup/search
- GitHub repo access and PR approval flow
- Node and Angular build/test commands
- Sonar or equivalent quality gate
- Secret scanning and SAST tooling
- Automated release/deploy tooling

## Human-in-the-loop gates

The flow is intentionally gated. The agents may prepare artifacts, but they should not move work to the next phase without explicit approval.

Recommended gates:

- Product review
- Epic review
- Story review
- Task review
- Implementation review
- Security gate
- PR approval
- UAT business sign-off
- Release approval

## This repo's concrete workflow

The Angular sample app is already wired with a GitHub Actions pipeline for build validation. The agent pipeline adds the missing SDLC structure around it:

- requirement generation
- story/task breakdown
- implementation
- quality gates
- UAT and release readiness

## Suggested execution flow

Use the sequence below when starting a feature or defect:

```text
PRD -> Epic -> Story -> Task -> Implementation -> Standards -> Security -> Review -> QA/UAT -> Release
```

This sequence matches the PES AIDLC pack and gives you a practical, auditable path from business intent to deployed change.
