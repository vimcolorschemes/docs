---
title: Troubleshooting
description: Local development issues and diagnostic steps.
---

## The app cannot connect to the database

Check that `.env.local` exists in the app repository root and contains:

```ini
DATABASE_URL=file:./database/vimcolorschemes.db
```

Also confirm that the local database file exists at `database/vimcolorschemes.db`.

## `pnpm` is missing

Run:

```bash
corepack enable
```

Then rerun the install command.

## The website runs but data looks missing

Use the bundled local database for frontend work. If you are using a custom SQLite or Turso database, it may not contain repository, colorscheme, or highlight group data yet.

Read [Data Flow](/architecture/data-flow/) to understand which Worker jobs populate which tables.

## Preview colors look wrong

Preview colors depend on both generated data and frontend rendering.

Check:

- The Worker generated rows in `colorschemes` and `colorscheme_groups`.
- Highlight group names match the classes rendered by the app preview component.
- CSS custom properties are being set for the selected colorscheme and background.

Read [Code Previews](/development/previews/) for the full flow.

## Open an issue

Open an issue in the relevant repository and include:

- What you were trying to do.
- The command you ran.
- The error message or broken behavior.
- Your Node, pnpm, and operating system versions when relevant.
