import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://docs.vimcolorschemes.com',
  integrations: [
    starlight({
      title: 'vimcolorschemes',
      description:
        'Developer documentation for vimcolorschemes.com and its data pipeline.',
      favicon: '/favicon.svg',
      logo: {
        src: './public/logo.svg',
        alt: 'vimcolorschemes',
      },
      customCss: ['./src/styles/custom.css'],
      editLink: {
        baseUrl: 'https://github.com/vimcolorschemes/docs/edit/main/',
      },
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/vimcolorschemes/vimcolorschemes',
        },
      ],
      sidebar: [
        {
          label: 'Start here',
          items: [
            { label: 'Overview', slug: 'overview' },
            { label: 'Architecture map', slug: 'architecture' },
          ],
        },
        {
          label: 'Getting started',
          items: [
            { label: 'Frontend path', slug: 'getting-started/frontend' },
            { label: 'Full stack path', slug: 'getting-started/full-stack' },
          ],
        },
        {
          label: 'System details',
          items: [
            { label: 'The app', slug: 'architecture/app' },
            { label: 'The worker', slug: 'architecture/worker' },
            { label: 'extractor.nvim', slug: 'architecture/extractor' },
            { label: 'Data flow', slug: 'architecture/data-flow' },
          ],
        },
        {
          label: 'Development',
          items: [
            { label: 'Local setup', slug: 'development/local-setup' },
            { label: 'Workflow', slug: 'development/workflow' },
            { label: 'Code previews', slug: 'development/previews' },
            { label: 'Troubleshooting', slug: 'troubleshooting' },
          ],
        },
        { label: 'Contributing', slug: 'contributing' },
      ],
    }),
  ],
});
