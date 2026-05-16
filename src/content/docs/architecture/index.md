---
title: Architecture
description: A map of the app, Worker, extractor, database, and deploy flow.
---

The project is organized around a static-feeling frontend backed by generated data.

```text
GitHub repositories
        |
        v
Worker import/update jobs
        |
        v
SQLite/libSQL database
        |
        v
Worker generate job + extractor.nvim + Neovim
        |
        v
colorschemes + colorscheme_groups tables
        |
        v
publish job triggers frontend deploy
        |
        v
vimcolorschemes.com
```

## Responsibilities

| Part | Responsibility |
|---|---|
| [The App](/architecture/app/) | User-facing website, pages, filters, rankings, and preview rendering |
| [The Worker](/architecture/worker/) | Scheduled repository discovery, metadata updates, preview data generation, and publish coordination |
| [extractor.nvim](/architecture/extractor/) | Neovim-based highlight extraction for each colorscheme/background combination |
| SQLite/libSQL | Shared storage for repositories, job events, colorschemes, and highlight groups |

## System boundaries

GitHub API calls, plugin installation, Neovim execution, and highlight extraction happen outside the app request path in the Worker.

The database is the contract between the Worker and the app. When a change affects that contract, update the app and Worker together and document the expected data shape.

## Where to make changes

| Goal | Start Here |
|---|---|
| Change website UI | [The App](/architecture/app/) |
| Change repository discovery | [The Worker](/architecture/worker/) |
| Change preview generation | [Code Previews](/development/previews/) |
| Change extracted highlight data | [extractor.nvim](/architecture/extractor/) |
| Understand data movement | [Data Flow](/architecture/data-flow/) |
