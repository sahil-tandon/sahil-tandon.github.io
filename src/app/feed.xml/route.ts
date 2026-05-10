import { Feed } from 'feed';
import { getAllPosts } from '@/lib/posts';
import {
  AUTHOR,
  BLOG,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  absoluteUrl,
} from '@/lib/site';

export const dynamic = 'force-static';

export async function GET() {
  const posts = getAllPosts();
  const updated = posts[0]
    ? new Date(posts[0].frontmatter.updated ?? posts[0].frontmatter.date)
    : new Date();

  const feed = new Feed({
    title: `${SITE_NAME} — ${BLOG.title}`,
    description: SITE_DESCRIPTION,
    id: SITE_URL,
    link: absoluteUrl(BLOG.basePath),
    language: 'en',
    image: absoluteUrl('/og-default.png'),
    favicon: absoluteUrl('/favicon.ico'),
    copyright: `© ${new Date().getFullYear()} ${AUTHOR.name}`,
    updated,
    feedLinks: {
      rss2: absoluteUrl('/feed.xml'),
    },
    author: {
      name: AUTHOR.name,
      email: AUTHOR.email,
      link: AUTHOR.url,
    },
  });

  for (const post of posts) {
    const url = absoluteUrl(`${BLOG.basePath}/${post.slug}`);
    feed.addItem({
      title: post.frontmatter.title,
      id: url,
      link: url,
      description: post.frontmatter.description,
      content: post.content,
      author: [
        {
          name: AUTHOR.name,
          email: AUTHOR.email,
          link: AUTHOR.url,
        },
      ],
      date: new Date(post.frontmatter.updated ?? post.frontmatter.date),
      category: post.frontmatter.tags.map((tag) => ({ name: tag })),
    });
  }

  return new Response(feed.rss2(), {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
