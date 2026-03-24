# Workflow

## Projects

Three projects work together to make `vimcolorschemes` possible:

- [The Worker](#the-worker)
- [The App](#the-app)
- [extractor.nvim](#extractornvim)

## The Worker

The Worker is a series of scripts that run daily. Their main goal is to fetch
repositories that could resemble a vim/neovim colorscheme from GitHub, store
them in the project database, and trigger the app deploy once the daily data
jobs succeed.

For every repository it finds, it installs the repository as a Neovim plugin and
uses the
[vimcolorschemes/extractor.nvim](https://github.com/vimcolorschemes/extractor.nvim/)
plugin to generate the color data used in the previews. It stores the result in
the database.

After `import`, `update`, and `generate` succeed for the day, a separate
`publish` job triggers the frontend deploy webhook.

### Links

- [See the repository](https://github.com/vimcolorschemes/worker)
- [Read about the Worker in more detail](/worker)

### Tech stack

- [Golang](https://golang.org/)
- [SQLite/libSQL](https://docs.turso.tech/libsql)
- [GitHub API](https://docs.github.com/en/rest)
- [extractor.nvim](https://github.com/vimcolorschemes/extractor.nvim)

## The App

The App is the website that displays all colorschemes found by the Worker.

> Curious about how the vim colorscheme previews are built? Visit [/previews](/previews).

### Links

- [See the repository](https://github.com/vimcolorschemes/vimcolorschemes)

### Stack

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [SQLite/libSQL](https://docs.turso.tech/libsql)

## extractor.nvim

`extractor.nvim` is a small Neovim plugin used by the Worker during `generate`
jobs.

It tries each colorscheme/background combination, reads highlight groups from a
real Neovim instance, and outputs structured color data consumed by the app.

### Links

- [See the repository](https://github.com/vimcolorschemes/extractor.nvim)

### Stack

- [Lua](https://www.lua.org/)
- [Neovim API](https://neovim.io/doc/user/api.html)
