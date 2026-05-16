---
title: The worker
description: Scheduled jobs that discover repositories and generate colorscheme data.
---

The Worker manages and updates the repository data used by the app.

Repository: [vimcolorschemes/worker](https://github.com/vimcolorschemes/worker)

As of `v3.0.0`, the Worker uses SQLite/libSQL for storage. It can run against a local SQLite database or a hosted Turso database.

## Jobs

The Worker runs four jobs:

| Job | Purpose |
|---|---|
| `import` | Search for new repositories and store their basic information |
| `update` | Refresh repository metadata such as timestamps and stars |
| `generate` | Generate the color data used in code previews |
| `publish` | Trigger a frontend deploy after the daily data jobs succeed |

The jobs are currently configured to run daily.

After `import`, `update`, and `generate` finish successfully, `publish` triggers a frontend deploy so [vimcolorschemes.com](https://vimcolorschemes.com) can build with the latest data.

## Where to touch code

| Change | Start here |
|---|---|
| Add or rename a job | `cmd/worker/main.go` |
| Repository search queries and import data | `cli/import.go` |
| Repository metadata, eligibility, pruning, disable behavior | `cli/update.go`, `internal/repository/` |
| Preview generation and Neovim runtime setup | `cli/generate.go`, `vim/init.lua`, `vim/code_sample.vim` |
| Publish gate, deploy webhook, daily summary | `cli/publish.go` |
| Database schema and migrations | `internal/database/migrations/` |
| Database reads and writes | `internal/database/` |
| GitHub API client | `internal/github/` |
| AWS/SNS notifications | `internal/notify/`, `infra/` |

Run Worker changes locally with `bin/start <job>`. Add `--repo owner/name` for a focused loop and `--force` when you need to bypass normal incremental behavior for jobs that support it.

## `import`

The `import` job fetches repositories that could be Vim or Neovim colorschemes. The matching queries can also return dotfiles, unrelated Vim plugins, and other false positives.

Each repository is inserted into the `repositories` table with basic fields:

| Column | Example |
|---|---|
| `id` | `397434315` |
| `owner_name` | `catppuccin` |
| `owner_avatar_url` | `https://avatars.githubusercontent.com/u/93489351?v=4` |
| `name` | `nvim` |
| `description` | `Soothing pastel theme for (Neo)vim` |
| `github_url` | `https://github.com/catppuccin/nvim` |
| `github_created_at` | `2021-08-18T01:14:49Z` |

A matching row is also added to `repository_job_events` with `job = 'import'` and either a success or error status.

Set `GITHUB_REPOSITORY_COUNT_LIMIT` in `.env` to limit how many repositories a broad import tries to fetch.

## `update`

The `update` job fetches repositories one by one and enriches them with data used by the website.

It updates fields like:

| Column | Example |
|---|---|
| `pushed_at` | `2025-02-22T19:13:26Z` |
| `stargazers_count` | `6021` |
| `stargazers_count_history` | JSON text containing date/count pairs |
| `week_stargazers_count` | `10` |
| `is_eligible` | `1` |
| `is_disabled` | `0` |
| `updated_at` | `2025-02-22T22:45:45Z` |

A row is added to `repository_job_events` with `job = 'update'`.

If GitHub returns `404`, the Worker treats the repository as deleted, renamed, or private and prunes it from the database. If a repository has no commits, the Worker disables it so generation can skip it.

## `generate`

The `generate` job installs [vimcolorschemes/extractor.nvim](https://github.com/vimcolorschemes/extractor.nvim), installs each candidate repository as a Neovim plugin, lists the colorschemes it contains, and generates highlight data for each one.

Generated color data is written to two tables:

- `colorschemes` stores one row per colorscheme name found in a plugin.
- `colorscheme_groups` stores one row per highlight group per background variant.

A row is added to `repository_job_events` with `job = 'generate'`.

Read [Code Previews](/development/previews/) for the full preview data shape.

## `publish`

The `publish` job does not modify repository or colorscheme data.

Instead, it checks the latest reports for `import`, `update`, and `generate` for the current UTC day. If all three jobs succeeded, it triggers the frontend deploy webhook.

This keeps deploys separate from data processing. The website is rebuilt after the daily data jobs succeed.

`publish` needs `PUBLISH_WEBHOOK_URL`. In production it also sends a daily summary notification through SNS when notification infrastructure is configured.

## Validate Worker changes

Run these from the Worker repository:

```bash
bin/test
bin/lint
bin/format
```
