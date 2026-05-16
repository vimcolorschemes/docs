---
title: vimcolorschemes docs
description: Understand how vimcolorschemes works and choose the right development path.
template: splash
hero:
  tagline: Developer docs for the vimcolorschemes app, data pipeline, and preview generation workflow.
  actions:
    - text: Understand the project
      link: /overview/
      icon: right-arrow
    - text: Work on the frontend
      link: /getting-started/frontend/
      variant: secondary
    - text: Run the full stack
      link: /getting-started/full-stack/
      variant: secondary
---

<script>
  const legacyDocsifyRoutes = {
    '#/intro': '/overview/',
    '#/install': '/getting-started/frontend/',
    '#/workflow': '/development/workflow/',
    '#/worker': '/architecture/worker/',
    '#/previews': '/development/previews/',
    '#/contribute': '/contributing/',
  };

  const normalizedHash = window.location.hash.replace(/\/$/, '');
  const target = legacyDocsifyRoutes[normalizedHash];

  if (target) {
    window.location.replace(target);
  }
</script>

## Choose your path

<div class="vcs-card-grid">
  <a class="vcs-card" href="/overview/">
    <strong>Understand the architecture</strong>
    <span>Learn how the app, Worker, and extractor.nvim fit together.</span>
  </a>
  <a class="vcs-card" href="/getting-started/frontend/">
    <strong>Work on the frontend</strong>
    <span>Change UI, routing, styling, filtering, sorting, or display behavior.</span>
  </a>
  <a class="vcs-card" href="/getting-started/full-stack/">
    <strong>Run the full stack</strong>
    <span>Work across the app, database, Worker jobs, and preview data.</span>
  </a>
  <a class="vcs-card" href="/contributing/">
    <strong>Open a pull request</strong>
    <span>Follow the development workflow and contribution checklist.</span>
  </a>
</div>
