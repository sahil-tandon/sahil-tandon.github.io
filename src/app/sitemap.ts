import type { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/posts';
import { BLOG, SITE_URL, absoluteUrl } from '@/lib/site';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const posts = getAllPosts();

  const staticEntries: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: absoluteUrl(BLOG.basePath),
      lastModified: posts[0]
        ? new Date(posts[0].frontmatter.updated ?? posts[0].frontmatter.date)
        : now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: absoluteUrl(`${BLOG.basePath}/${post.slug}`),
    lastModified: new Date(post.frontmatter.updated ?? post.frontmatter.date),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticEntries, ...postEntries];
}
