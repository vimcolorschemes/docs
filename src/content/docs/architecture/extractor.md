---
title: extractor.nvim
description: The Neovim plugin used to read highlight groups from colorschemes.
---

`extractor.nvim` is a small Neovim plugin used by the Worker during `generate` jobs.

Repository: [vimcolorschemes/extractor.nvim](https://github.com/vimcolorschemes/extractor.nvim)

## Stack

- [Lua](https://www.lua.org/)
- [Neovim API](https://neovim.io/doc/user/api.html)

## Responsibility

The plugin tries each colorscheme/background combination, reads highlight groups from a real Neovim instance, and outputs structured color data consumed by the app.

Vim colorschemes are executable editor configuration, not static theme files. The Worker loads them in Neovim and inspects the resulting highlight groups.

## How it fits into generation

1. The Worker installs `extractor.nvim`.
2. The Worker installs a candidate repository as a Neovim plugin.
3. The Worker asks Neovim which colorschemes are available.
4. For each colorscheme, Neovim tries supported backgrounds such as `light` and `dark`.
5. `extractor.nvim` moves through a known Vim code sample and records highlight information.
6. The Worker stores the extracted data in `colorschemes` and `colorscheme_groups`.

Read [Code Previews](/development/previews/) for how that data becomes UI.
