# vimcolorschemes docs

Documentation site for [vimcolorschemes.com](https://vimcolorschemes.com), deployed at [docs.vimcolorschemes.com](https://docs.vimcolorschemes.com).

Built with [Astro Starlight](https://starlight.astro.build/).

## Local development

```bash
corepack enable
pnpm install
pnpm dev
```

Then visit `http://localhost:4321`.

## Structure

- `src/content/docs/` - documentation pages
- `src/styles/custom.css` - Starlight theme overrides
- `astro.config.mjs` - site metadata, navigation, and integrations
- `public/` - static files copied to the built site
