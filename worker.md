# The Worker

<p align="center">
  <img src="https://github.com/vimcolorschemes/worker/blob/media/logo.png?raw=true" alt="logo" width="400" />
</p>

The Worker is an essential part of `vimcolorschemes`. It manages and updates
the repository data used by the app.

As of `v3.0.0`, the Worker uses libSQL/SQLite (local or Turso) for storage.

## 3 jobs

The Worker runs 3 jobs:

- [`import`](#import): search for new repositories and store their basic info
- [`update`](#update): refresh repository metadata such as timestamps and stars
- [`generate`](#generate): generate the color data used in the [code previews](/previews)

It is currently configured to do all of these things daily to ensure
up-to-date, clean data.

After those jobs finish, the app fetches the latest data and builds
[vimcolorschemes.com](https://vimcolorschemes.com).

## `import`

The `import` job is simple. It fetches a list of repositories and saves only
the most basic information at this stage. The queries used to fetch
repositories only match repositories that could potentially be a vim color
scheme. Still, since the queries are flexible and little to no validation is
done at this point, many repositories are not vim color schemes at all, but
dotfiles, vim plugins, etc.

Each repository is inserted in the database.

Here is an example repository shape at this stage:

```json
{
  "_id": "397434315",
  "owner": {
    "avatarURL": "https://avatars.githubusercontent.com/u/93489351?v=4",
    "name": "catppuccin"
  },
  "name": "nvim",
  "description": "🍨 Soothing pastel theme for (Neo)vim",
  "githubCreatedAt": "2021-08-18T01:14:49.000Z",
  "githubURL": "https://github.com/catppuccin/nvim"
}
```

## `update`

The `update` job fetches repositories one by one and enriches them with data
used by the website.

### What's added

- the stargazers count history
- the stargazers count for the last week
- the last push date

Here is a sample of a valid vim color scheme after this stage:

```json
{
  "_id": "397434315",
  "owner": {
    "avatarURL": "https://avatars.githubusercontent.com/u/93489351?v=4",
    "name": "catppuccin"
  },
  "name": "nvim",
  "description": "🍨 Soothing pastel theme for (Neo)vim",
  "githubCreatedAt": "2021-08-18T01:14:49.000Z",
  "githubURL": "https://github.com/catppuccin/nvim",
  "pushedAt": "2025-02-22T19:13:26.000Z",
  "stargazersCount": 6021,
  "stargazersCountHistory": [
    {
      "date": "2025-02-22T00:00:00.000Z",
      "stargazersCount": 6021
    },
    {
      "date": "2025-02-21T00:00:00.000Z",
      "stargazersCount": 6011
    }
  ],
  "weekStargazersCount": 10,
  "updateValid": true,
  "updatedAt": "2025-02-22T22:45:45.525Z"
}
```

## `generate`

The `generate` job installs the
[vimcolorschemes/extractor.nvim](https://github.com/vimcolorschemes/extractor.nvim)
plugin, then installs each repository as a Neovim plugin, lists the possible
colorschemes it contains, and generates the color data for each one.

Here is a sample of a valid vim color scheme after this stage:

```json
{
  ...
  "vimColorSchemes": [ ... ],
  "generateValid": true,
  "generatedAt": "2021-10-13T21:12:19.281Z"
}
```

See [Colorscheme code previews](/previews) for the full structure of `vimColorSchemes`.
