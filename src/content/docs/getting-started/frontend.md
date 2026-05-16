---
title: Frontend path
description: Set up the app when you only need to work on the website frontend.
---

Use this path when your change is about the website experience: UI, pages, layout, filters, sorting, preview presentation, or copy.

You do not need to run the Worker for most frontend work.

## Requirements

- [Node.js 24](https://nodejs.org/en/download)
- [pnpm 11](https://pnpm.io/installation), or `corepack enable`
- A local clone of your fork of [vimcolorschemes/vimcolorschemes](https://github.com/vimcolorschemes/vimcolorschemes)

## Setup

```bash
git clone https://github.com/<you>/vimcolorschemes.git
cd vimcolorschemes
corepack enable
pnpm install
```

Create `.env.local` in the app repository root:

```ini
DATABASE_URL=file:./database/vimcolorschemes.db
```

The app repository includes a local example database at `database/vimcolorschemes.db`, so this works without Turso credentials.

## Run the app

```bash
pnpm dev
```

Open `http://localhost:3000`.

## Frontend areas

- Page layout and responsive behavior.
- Filter and sort UI.
- Colorscheme cards and detail pages.
- Preview component presentation.
- Empty states, loading states, and copy.

## Common edit points

| Change | Start here |
|---|---|
| Listing page behavior | `src/app/(index)/i/[...filters]/page.tsx` |
| Sort or filter options | `src/lib/sort.ts`, `src/lib/filter.ts`, `src/helpers/query.ts` |
| Repository cards | `src/components/repositoryCard/` |
| Repository detail page | `src/components/repositoryPageContent/` |
| Preview markup or colors | `src/components/preview/`, `src/app/vim.css` |
| API pagination data | `src/app/api/repositories/route.ts`, `src/services/repositoriesServer.ts` |

## Validate

Run the full app check when you can:

```bash
pnpm check
```

For focused work, use `pnpm test`, `pnpm tc`, `pnpm lint.check`, or `pnpm format.check`.

If your change needs new data or changes database assumptions, switch to the [full stack path](/getting-started/full-stack/).
