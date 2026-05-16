---
title: Workflow
description: How to choose the right repository and validate changes.
---

Three projects work together to make `vimcolorschemes` possible:

- [The App](/architecture/app/)
- [The Worker](/architecture/worker/)
- [extractor.nvim](/architecture/extractor/)

## Pick a development path

Use the environment that can validate your change.

| Change Type | Recommended Path |
|---|---|
| UI, CSS, copy, navigation | [Frontend Path](/getting-started/frontend/) |
| App behavior using existing data | [Frontend Path](/getting-started/frontend/) |
| Database shape or generated fields | [Full Stack Path](/getting-started/full-stack/) |
| Repository discovery or eligibility | [The Worker](/architecture/worker/) |
| Highlight extraction behavior | [extractor.nvim](/architecture/extractor/) |
| Preview rendering and generated data | [Code Previews](/development/previews/) |

## Development loop

1. Read the relevant architecture page.
2. Reproduce the current behavior locally.
3. Make the change.
4. Run the relevant tests, build, or manual checks.
5. Update docs when setup, data shape, or contributor workflow changes.
6. Open a pull request with the problem, solution, and validation steps.

## Validation commands

| Repository | Full check | Focused commands |
|---|---|---|
| App | `pnpm check` | `pnpm test`, `pnpm tc`, `pnpm lint.check`, `pnpm format.check` |
| Worker | `bin/test` | `bin/lint`, `bin/format`, `bin/start <job> --repo owner/name` |
| Docs | `pnpm build` | `pnpm dev` |

For UI changes, include screenshots or a short manual test note. For data changes, include the job commands you ran and which database you used.

## Code maps

Use these pages when you know the behavior but not the file:

- App UI and data reads: [The App](/architecture/app/)
- Worker jobs and database writes: [The Worker](/architecture/worker/)
- Preview generation and rendering: [Code Previews](/development/previews/)
- Database contract: [Data Flow](/architecture/data-flow/)

## Pull request notes

Pull requests include:

- What behavior changed.
- Which repository or part of the system changed.
- Whether the database contract changed.
- How the change was validated.
- Follow-up work, if any.
