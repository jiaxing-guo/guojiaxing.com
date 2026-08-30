import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

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
    summary: z.string(),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    tags: z.array(z.string()),
    draft: z.boolean().default(false),
  }),
});

export const collections = { research, projects, blog };
