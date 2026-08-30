## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

## Publishing metadata requirements

- Every published blog detail page must emit `BlogPosting` JSON-LD with its headline, description, publication date, author, canonical URL, and keywords.
- Every research detail page must emit `ScholarlyArticle` JSON-LD with its headline, abstract, authors, canonical URL, and available publication dates and identifiers.
- Record meaningful blog revisions in `updatedAt` and research revisions in `revisedAt` so modified dates remain accurate.
- Cross-link each related research and project entry through typed `projectId` and `researchId` frontmatter fields.
