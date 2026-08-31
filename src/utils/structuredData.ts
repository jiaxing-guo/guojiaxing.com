import { site } from '../data/site';

export type StructuredData = Record<string, unknown>;

const personId = new URL('/#person', site.url).href;

function personReference(name: string = site.alternateName): StructuredData {
  if (name === site.name || name === site.alternateName) {
    return {
      '@type': 'Person',
      '@id': personId,
      name: site.name,
      alternateName: site.alternateName,
      url: site.url,
    };
  }

  return { '@type': 'Person', name };
}

export function createBlogPostingSchema(input: {
  path: string;
  title: string;
  summary: string;
  publishedAt: Date;
  updatedAt?: Date;
  tags: string[];
  images?: string[];
}): StructuredData {
  const url = new URL(input.path, site.url).href;
  const images = input.images?.map((path) => new URL(path, site.url).href);

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${url}#article`,
    headline: input.title,
    description: input.summary,
    url,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    datePublished: input.publishedAt.toISOString(),
    ...(input.updatedAt ? { dateModified: input.updatedAt.toISOString() } : {}),
    ...(images && images.length > 0 ? { image: images } : {}),
    author: personReference(),
    keywords: input.tags,
    inLanguage: 'en',
  };
}

export function createScholarlyArticleSchema(input: {
  path: string;
  title: string;
  summary: string;
  authors?: string[];
  submittedAt?: Date;
  revisedAt?: Date;
  arxivId?: string;
  paper?: string;
  doi?: string;
  topics: string[];
}): StructuredData {
  const url = new URL(input.path, site.url).href;
  const sameAs = [input.paper, input.doi].filter((value): value is string => Boolean(value));

  return {
    '@context': 'https://schema.org',
    '@type': 'ScholarlyArticle',
    '@id': `${url}#article`,
    headline: input.title,
    abstract: input.summary,
    description: input.summary,
    url,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    author: (input.authors ?? [site.alternateName]).map((name) => personReference(name)),
    ...(input.submittedAt ? { datePublished: input.submittedAt.toISOString() } : {}),
    ...(input.revisedAt ? { dateModified: input.revisedAt.toISOString() } : {}),
    ...(input.arxivId
      ? {
          identifier: {
            '@type': 'PropertyValue',
            propertyID: 'arXiv',
            value: input.arxivId,
          },
        }
      : {}),
    ...(sameAs.length > 0 ? { sameAs } : {}),
    keywords: input.topics,
    inLanguage: 'en',
    isAccessibleForFree: true,
  };
}
