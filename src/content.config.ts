import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const contentImage = z.object({
  src: z.string().startsWith('/'),
  alt: z.string(),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
  mobile: z
    .object({
      src: z.string().startsWith('/'),
      width: z.number().int().positive(),
      height: z.number().int().positive(),
    })
    .optional(),
  caption: z.string().optional(),
  social: z.object({
    src: z.string().startsWith('/'),
    width: z.number().int().positive(),
    height: z.number().int().positive(),
    type: z.string().startsWith('image/'),
  }),
  structured: z.array(z.string().startsWith('/')).min(1),
});

const relatedContent = z.object({
  eyebrow: z.string(),
  title: z.string(),
  summary: z.string(),
  href: z.string().startsWith('/'),
});

const research = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/research' }),
  schema: z.object({
    title: z.string(),
    shortTitle: z.string().optional(),
    summary: z.string(),
    question: z.string(),
    year: z.number(),
    status: z.string(),
    topics: z.array(z.string()),
    authors: z.array(z.string()).optional(),
    arxivId: z.string().optional(),
    version: z.string().optional(),
    submittedAt: z.coerce.date().optional(),
    revisedAt: z.coerce.date().optional(),
    repo: z.url().optional(),
    paper: z.url().optional(),
    pdf: z.url().optional(),
    doi: z.url().optional(),
    attachment: z.string().startsWith('/').optional(),
    projectId: z.string().optional(),
    blogId: z.string().optional(),
    featured: z.boolean().default(false),
    order: z.number(),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    year: z.number(),
    languages: z.array(z.string()).min(1),
    topics: z.array(z.string()),
    repo: z.url(),
    researchId: z.string().optional(),
    featured: z.boolean().default(false),
    order: z.number(),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    seoTitle: z.string().optional(),
    summary: z.string(),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    tags: z.array(z.string()),
    image: contentImage.optional(),
    related: z.array(relatedContent).min(2).max(3),
    draft: z.boolean().default(false),
  }),
});

export const collections = { research, projects, blog };
