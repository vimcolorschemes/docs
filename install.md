# Installation

## 0. Requirements

- [Node.js 24](https://nodejs.org/en/download)
- [pnpm 10](https://pnpm.io/installation) (or `corepack enable`)
- A local clone of your fork of [the app repository](https://github.com/vimcolorschemes/vimcolorschemes). Need help? [Read how to fork a repository](https://docs.github.com/en/get-started/quickstart/fork-a-repo).

## 1. Set up the local database

The app now uses libSQL/SQLite.

1. Configure your database URL.
   - Local SQLite file (default):
     - `DATABASE_URL=file:./database/vimcolorschemes.db`
   - Remote Turso database:
     - `DATABASE_URL=libsql://your-database.turso.io`
     - `DATABASE_AUTH_TOKEN=your-turso-auth-token`
2. Put these values in `.env.local` (or `.env`) before running the app.

## 2. Run the app

1. Run `nvm install && nvm use` if you use `nvm`
2. Run `corepack enable` if `pnpm` is not installed yet
3. Run `pnpm install`
4. Run `pnpm dev`
5. Open `http://localhost:3000`

## Running into problems?

If you run into trouble getting `vimcolorschemes` working locally,
[open an issue](https://github.com/vimcolorschemes/vimcolorschemes/issues) and
we will be happy to help.
