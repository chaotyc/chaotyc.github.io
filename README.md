# Tim Chao — Research Portfolio

A content-first personal portfolio for Tim Chao's research, software, publications, and talks across machine learning, photonics, and quantum systems.

## Site map

- `/` — single-column homepage with selected work and publications
- `/work` — one text-first list of research, software, and publications
- `/about` — background, current interests, tools, and personal details
- `/tim-chao-resume.pdf` — current résumé, linked directly from the global navigation

## Local development

Requires Node.js 22.13 or newer.

```bash
npm install
npm run dev
```

Useful checks:

```bash
npm run build
npm run lint
node --test tests/rendered-html.test.mjs
```

## GitHub Pages deployment

This repository is configured as a static export for `https://chaotyc.github.io`.
Use a GitHub repository named exactly `chaotyc.github.io`, set **Settings →
Pages → Source** to **GitHub Actions**, and push the `main` branch. The included
workflow validates the project and deploys `dist/client` automatically.

## Content safeguards

The public project copy distinguishes measured, simulated, projected, and preliminary results. Unverified metrics, private implementation details, unpublished figures, and unapproved artifact links are intentionally omitted. Contact and downloadable links are enabled only after their final public values are confirmed.

See `docs/asset-ledger.md` before adding or replacing any research figure or downloadable artifact.
