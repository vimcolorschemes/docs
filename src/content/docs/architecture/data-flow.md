---
title: Data flow
description: How repository data moves from GitHub into the public website.
---

The database is the contract between the Worker and the app.

## Daily flow

```text
GitHub API
  -> Worker import
  -> repositories
  -> Worker update
  -> repositories + repository_job_events
  -> Worker generate
  -> colorschemes + colorscheme_groups
  -> Worker publish
  -> frontend deploy
  -> vimcolorschemes.com
```

## Main tables

| Table | Written By | Read By | Purpose |
|---|---|---|---|
| `repositories` | Worker | App | Repository identity, metadata, stars, eligibility, timestamps |
| `repository_job_events` | Worker | Worker/debugging | Job history and success/error state |
| `colorschemes` | Worker | App | Colorscheme names linked to repositories |
| `colorscheme_groups` | Worker | App | Highlight groups and hex colors for preview rendering |
| `reports` | Worker | Worker/debugging | One summary row per job run, used by `publish` to check daily success |

## App-facing repository fields

The app does not read every column. These fields are part of the practical app contract:

| Field | Why it matters |
|---|---|
| `id` | Joins repositories to colorschemes and highlight groups |
| `owner_name`, `name` | Repository routes, titles, and GitHub identity |
| `description`, `github_url` | Repository cards and detail pages |
| `stargazers_count`, `week_stargazers_count` | Top and trending sorting |
| `github_created_at`, `pushed_at` | New/old sorting and repository metadata |
| `featured_rank` | Featured repositories on the homepage |
| `has_dark`, `has_light` | Listing visibility and background filters |

The Worker also owns operational fields such as `is_eligible`, `is_disabled`, `last_generate_event_at`, and `updated_at`. Those fields decide what the Worker processes next, even when the app does not render them directly.

## Preview data contract

Preview rendering depends on these relationships:

1. `colorschemes.repository_id` points to `repositories.id`.
2. `colorscheme_groups.colorscheme_id` points to `colorschemes.id`.
3. `colorscheme_groups.background` is `light` or `dark`.
4. `colorscheme_groups.name` matches the CSS custom property suffix used by the app.
5. `colorscheme_groups.hex_code` is the color value applied to that CSS custom property.

For example, a group named `vimStringFg` becomes `--colorscheme-vimStringFg` in the app.

## Frontend contract

The app expects repository rows, colorscheme rows, and highlight group rows to be present in a shape it understands. If the Worker changes a table, column, or generated value, the app may need to change in the same pull request or release window.

Schema changes should usually include a Worker migration, Worker read/write updates, app query/model updates, and a local database validation.

## Deploy contract

The app is deployed after Worker jobs succeed. The `publish` job checks the daily `import`, `update`, and `generate` reports before triggering the frontend deploy webhook.

The app deploy runs after the daily data jobs have succeeded.
