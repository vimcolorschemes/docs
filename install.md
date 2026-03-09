# Installation

## 0. Requirements

- [Node.js 24](https://nodejs.org/en/download)
- [pnpm 10](https://pnpm.io/installation) (or `corepack enable`)
- [MongoDB](https://www.mongodb.com/docs/manual/installation/)
- `mongoimport` from [MongoDB Database Tools](https://www.mongodb.com/try/download/database-tools)
- A local clone of your fork of [the app repository](https://github.com/vimcolorschemes/vimcolorschemes). Need help? [Read how to fork a repository](https://docs.github.com/en/get-started/quickstart/fork-a-repo).

## 1. Set up the local database

1. Start MongoDB locally.
   - By default, the app uses `mongodb://localhost:27017/vimcolorschemes`.
   - If you use a different connection string, set `DATABASE_CONNECTION_STRING`
     in `.env.local`.
2. Seed the database: `pnpm seed`
   - The seed script reads `DATABASE_CONNECTION_STRING` from the environment.
   - If the command fails, verify that `mongoimport` is installed and that your
     MongoDB instance is running.

The seed script imports the example data from `database/seed.json` into your
local database.

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
