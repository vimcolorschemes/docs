---
title: Full stack path
description: Set up the project when you need the app, database, Worker, and generated data.
---

Use this path when your change affects data generation, database shape, repository eligibility, Worker jobs, or how the app consumes generated data.

## Start with the app

Follow the [frontend path](/getting-started/frontend/) first. It gives you a working app with the bundled SQLite database.

This gives you a working app before you change the database, Worker, or generated data.

## Understand the moving parts

Before changing full stack behavior, read these pages:

- [Architecture](/architecture/)
- [The Worker](/architecture/worker/)
- [Data Flow](/architecture/data-flow/)
- [Code Previews](/development/previews/)

## Local database options

The app can use local SQLite or a hosted Turso/libSQL database.

For local development, use SQLite unless you need to test remote database behavior:

```ini
DATABASE_URL=file:./database/vimcolorschemes.db
```

Use Turso only when you need remote behavior:

```ini
DATABASE_URL=libsql://your-database.turso.io
DATABASE_AUTH_TOKEN=your-turso-auth-token
```

Relative `file:` URLs are resolved from the repository where the command runs. When the app needs to read data written by the Worker, point both projects at the same underlying database file. The simplest option is an absolute file URL:

```ini
DATABASE_URL=file:/absolute/path/to/vimcolorschemes.db
```

You can also let the Worker write to its local database and copy that database into the app repository when you only need to inspect the result.

## Run Worker jobs locally

The Worker repository is [vimcolorschemes/worker](https://github.com/vimcolorschemes/worker).

Requirements:

- Go, using the version in `go.mod`.
- `git`.
- Neovim, when running `generate`.
- `GITHUB_TOKEN`, recommended for `import` and `update` to avoid low unauthenticated rate limits.

Create a `.env` file in the Worker repository. Start from `.env.example` and set at least:

```bash
export DATABASE_URL=file:./data/vimcolorschemes.db
export DATABASE_AUTH_TOKEN=
export GITHUB_TOKEN=
export GITHUB_REPOSITORY_COUNT_LIMIT=25
```

Run jobs with `bin/start`:

```bash
bin/start import
bin/start update
bin/start generate
```

For most development, run against one repository first:

```bash
bin/start import --repo morhetz/gruvbox
bin/start update --repo morhetz/gruvbox
bin/start generate --repo morhetz/gruvbox
```

Use `--force` when you intentionally want to bypass the normal incremental behavior for jobs that support it.

`publish` is different from the data jobs. It requires successful daily `import`, `update`, and `generate` reports plus `PUBLISH_WEBHOOK_URL`, then triggers the frontend deploy webhook.

## What to validate

For full stack changes, validate both sides of the database contract:

- The Worker writes the expected repository, colorscheme, and highlight group data.
- The app can read and render the changed data.
- Job events record failure messages for debugging.
- The publish flow still only deploys after successful daily data jobs.

Useful checks:

```bash
# app repository
pnpm check

# worker repository
bin/test
bin/lint
bin/format
```

## When to update docs

Update these docs when a change affects:

- Required local setup.
- Database columns or table relationships.
- Worker job behavior.
- Preview generation or rendering.
- Repository ownership for the affected code.
