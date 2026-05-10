import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import { z } from 'zod';

const POSTS_DIR = path.join(process.cwd(), 'content', 'posts');

const FrontmatterSchema = z.object({
  title: z.string().min(1).max(140),
  description: z.string().min(20).max(200),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}/),
  updated: z.string().regex(/^\d{4}-\d{2}-\d{2}/).optional(),
  tags: z.array(z.string().regex(/^[a-z0-9-]+$/)).default([]),
  draft: z.boolean().default(false),
  cover: z
    .object({
      src: z.string(),
      alt: z.string(),
    })
    .optional(),
  canonical: z.string().url().optional(),
  ogImage: z.string().optional(),
  crossposted: z
    .object({
      devto: z.string().url().optional(),
      hashnode: z.string().url().optional(),
    })
    .partial()
    .optional(),
});

export type PostFrontmatter = z.infer<typeof FrontmatterSchema>;

export type Post = {
  slug: string;
  frontmatter: PostFrontmatter;
  content: string;
  readingTimeMinutes: number;
};

const includeDrafts = (): boolean => process.env.NODE_ENV !== 'production';

const readPost = (filename: string): Post => {
  const filePath = path.join(POSTS_DIR, filename);
  const raw = fs.readFileSync(filePath, 'utf8');
  const slug = filename.replace(/\.mdx$/, '');
  const { data, content } = matter(raw);

  const parsed = FrontmatterSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error(
      `Invalid frontmatter in content/posts/${filename}:\n${parsed.error.issues
        .map((i) => `  • ${i.path.join('.')}: ${i.message}`)
        .join('\n')}`,
    );
  }

  const stats = readingTime(content);

  return {
    slug,
    frontmatter: parsed.data,
    content,
    readingTimeMinutes: Math.max(1, Math.round(stats.minutes)),
  };
};

export const getAllPosts = (): Post[] => {
  if (!fs.existsSync(POSTS_DIR)) return [];

  const files = fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith('.mdx'));

  const posts = files
    .map(readPost)
    .filter((p) => includeDrafts() || !p.frontmatter.draft)
    .sort((a, b) =>
      a.frontmatter.date < b.frontmatter.date ? 1 : -1,
    );

  return posts;
};

export const getPostBySlug = (slug: string): Post | null => {
  const filename = `${slug}.mdx`;
  const filePath = path.join(POSTS_DIR, filename);
  if (!fs.existsSync(filePath)) return null;

  const post = readPost(filename);
  if (!includeDrafts() && post.frontmatter.draft) return null;

  return post;
};

export const getAllSlugs = (): string[] =>
  getAllPosts().map((p) => p.slug);

export const getAllTags = (): string[] => {
  const tags = new Set<string>();
  for (const post of getAllPosts()) {
    for (const tag of post.frontmatter.tags) tags.add(tag);
  }
  return Array.from(tags).sort();
};

export const groupPostsByYear = (
  posts: Post[],
): Array<{ year: string; posts: Post[] }> => {
  const groups = new Map<string, Post[]>();
  for (const post of posts) {
    const year = post.frontmatter.date.slice(0, 4);
    if (!groups.has(year)) groups.set(year, []);
    groups.get(year)!.push(post);
  }
  return Array.from(groups.entries())
    .sort((a, b) => (a[0] < b[0] ? 1 : -1))
    .map(([year, posts]) => ({ year, posts }));
};
