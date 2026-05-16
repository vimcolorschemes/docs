---
title: Overview
description: What vimcolorschemes is and how its main pieces fit together.
---

`vimcolorschemes` helps people discover Vim and Neovim colorschemes by turning GitHub repositories into searchable pages and rendered code previews.

The project is split into three main parts:

- **The App** displays colorschemes, repository metadata, rankings, filters, and preview UI at [vimcolorschemes.com](https://vimcolorschemes.com).
- **The Worker** finds candidate repositories, updates metadata, generates colorscheme data, and triggers app deploys.
- **extractor.nvim** runs inside Neovim and reads highlight groups from real colorschemes so previews reflect actual editor output.

## What you can work on

Many frontend changes can be made without running the full system.

Use the [frontend path](/getting-started/frontend/) if your work is about the website experience. The app includes a local SQLite database for UI work that does not require Worker jobs.

Use the [full stack path](/getting-started/full-stack/) if your work changes data shape, repository import behavior, preview generation, or the interaction between the Worker and the app.

## Project repositories

| Part | Repository | Main Stack |
|---|---|---|
| App | [vimcolorschemes/vimcolorschemes](https://github.com/vimcolorschemes/vimcolorschemes) | Next.js, TypeScript, SQLite/libSQL |
| Worker | [vimcolorschemes/worker](https://github.com/vimcolorschemes/worker) | Go, SQLite/libSQL, GitHub API |
| Extractor | [vimcolorschemes/extractor.nvim](https://github.com/vimcolorschemes/extractor.nvim) | Lua, Neovim API |

## Mental model

The data flow has these steps:

1. The Worker searches GitHub for repositories that may be Vim or Neovim colorschemes.
2. The Worker stores repository metadata in SQLite/libSQL.
3. The Worker installs candidate repositories as Neovim plugins.
4. `extractor.nvim` reads highlight groups from a real Neovim session.
5. The Worker stores generated colorscheme data in the database.
6. A publish job triggers the frontend deploy after the daily data jobs succeed.
7. The app reads the latest database and renders the public website.

For more detail, read the [architecture map](/architecture/) and [data flow](/architecture/data-flow/).
