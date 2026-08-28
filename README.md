# guojiaxing.com

Personal research portfolio for Guo Jiaxing. The site uses Astro, TypeScript, Markdown, and MDX.

## Local development

```sh
npm install
npm run dev
```

Create a production build with:

```sh
npm run build
```

Run the complete pre-publish validation with:

```sh
npm run validate
```

## Edit content

- Research entries: `src/content/research/`
- Project entries: `src/content/projects/`
- Blog posts: `src/content/blog/`
- Biography: `src/pages/about.astro`
- Site details: `src/data/site.ts`

Markdown is the default content format. Use MDX only when an entry needs an interactive component.

Blog entries with `draft: true` do not appear on the site or in the RSS feed.

## Publishing

The project is configured for `https://guojiaxing.com` and includes a GitHub Pages workflow.

Before the first deployment:

1. Confirm that the GitHub plan supports Pages for this private repository.
2. Commit and push the site to the `main` branch.
3. Select GitHub Actions as the Pages source in repository settings.
4. Verify `guojiaxing.com` in GitHub account settings.
5. Replace the GoDaddy parking records with the GitHub Pages DNS records.
6. Add `guojiaxing.com` as the custom domain and enable HTTPS.
