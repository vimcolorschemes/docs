# The Worker

<p align="center">
  <img src="https://github.com/vimcolorschemes/worker/blob/media/logo.png?raw=true" alt="logo" width="400" />
</p>

The Worker is an essential part of `vimcolorschemes`. It manages and updates
the repository data used by the app.

As of `v3.0.0`, the Worker uses libSQL/SQLite (local or Turso) for storage.

## 4 jobs

The Worker runs 4 jobs:

- [`import`](#import): search for new repositories and store their basic info
- [`update`](#update): refresh repository metadata such as timestamps and stars
- [`generate`](#generate): generate the color data used in the [code previews](/previews)
- [`publish`](#publish): trigger a frontend deploy after the daily jobs succeed

It is currently configured to do all of these things daily to ensure
up-to-date, clean data.

After `import`, `update`, and `generate` finish successfully, the `publish` job
triggers a frontend deploy so the app can fetch the latest data and build
[vimcolorschemes.com](https://vimcolorschemes.com).

## `import`

The `import` job is simple. It fetches a list of repositories and saves only
the most basic information at this stage. The queries used to fetch
repositories only match repositories that could potentially be a vim color
scheme. Still, since the queries are flexible and little to no validation is
done at this point, many repositories are not vim color schemes at all, but
dotfiles, vim plugins, etc.

Each repository is inserted in the database.

A row is inserted into the `repositories` table with the following columns populated:

| column | example |
|---|---|
| `id` | `397434315` |
| `owner_name` | `catppuccin` |
| `owner_avatar_url` | `https://avatars.githubusercontent.com/u/93489351?v=4` |
| `name` | `nvim` |
| `description` | `🍨 Soothing pastel theme for (Neo)vim` |
| `github_url` | `https://github.com/catppuccin/nvim` |
| `github_created_at` | `2021-08-18T01:14:49Z` |

A matching row is also added to `repository_job_events` with `job = 'import'` and `status = 'success'` (or `'error'` with a message if it failed).

## `update`

The `update` job fetches repositories one by one and enriches them with data
used by the website.

### What's added

- the stargazers count history
- the stargazers count for the last week
- the last push date

The following columns are updated on the `repositories` row:

| column | example |
|---|---|
| `pushed_at` | `2025-02-22T19:13:26Z` |
| `stargazers_count` | `6021` |
| `stargazers_count_history` | `[{"date":"2025-02-22T00:00:00Z","stargazersCount":6021}, ...]` (JSON text) |
| `week_stargazers_count` | `10` |
| `is_eligible` | `1` |
| `updated_at` | `2025-02-22T22:45:45Z` |

A row is added to `repository_job_events` with `job = 'update'`.

## `generate`

The `generate` job installs the
[vimcolorschemes/extractor.nvim](https://github.com/vimcolorschemes/extractor.nvim)
plugin, then installs each repository as a Neovim plugin, lists the possible
colorschemes it contains, and generates the color data for each one.

Color data is written to two tables linked to the repository:

- `colorschemes` — one row per colorscheme name found in the plugin
- `colorscheme_groups` — one row per highlight group per background variant

A row is added to `repository_job_events` with `job = 'generate'`.

See [Colorscheme code previews](/previews) for the full table structure and an example.

## `publish`

The `publish` job does not modify repository or colorscheme data.

Instead, it checks the latest reports for `import`, `update`, and `generate`
for the current UTC day. If all 3 jobs succeeded, it triggers the frontend
deploy webhook.

This keeps the app deploy step separate from the data processing jobs while
still ensuring the website is rebuilt from fresh data.
