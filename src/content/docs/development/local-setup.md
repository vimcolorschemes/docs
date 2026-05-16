---
title: Local setup
description: Local setup details for the app, Worker, and documentation site.
---

## App setup

The app repository is [vimcolorschemes/vimcolorschemes](https://github.com/vimcolorschemes/vimcolorschemes).

Requirements:

- [Node.js 24](https://nodejs.org/en/download)
- [pnpm 11](https://pnpm.io/installation), or `corepack enable`
- A local clone of your fork of the app repository

Run:

```bash
git clone https://github.com/<you>/vimcolorschemes.git
cd vimcolorschemes
corepack enable
pnpm install
```

Create `.env.local`:

```ini
DATABASE_URL=file:./database/vimcolorschemes.db
```

Then start the app:

```bash
pnpm dev
```

Open `http://localhost:3000`.

## Docs setup

The docs repository is [vimcolorschemes/docs](https://github.com/vimcolorschemes/docs).

Run:

```bash
corepack enable
pnpm install
pnpm dev
```

Open `http://localhost:4321`.

## Worker setup

The Worker repository is [vimcolorschemes/worker](https://github.com/vimcolorschemes/worker).

Requirements:

- Go, using the version in `go.mod`.
- Neovim for preview generation.
- `git` for cloning colorscheme repositories during generation.

Create `.env` from `.env.example`, then set local development values:

```bash
export DATABASE_URL=file:./data/vimcolorschemes.db
export DATABASE_AUTH_TOKEN=
export GITHUB_TOKEN=
export GITHUB_REPOSITORY_COUNT_LIMIT=25
```

Run one job:

```bash
bin/start import --repo morhetz/gruvbox
```

Read the [full stack path](/getting-started/full-stack/) before running Worker jobs that should feed the app.
