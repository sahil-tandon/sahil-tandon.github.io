import Link from 'next/link';
import { ArrowLeft, Rss } from 'lucide-react';
import type { Metadata } from 'next';
import { SpotlightBackground } from '@/components/SpotlightBackground';
import { Footer } from '@/components/Footer';
import { PostCard } from '@/components/blog/PostCard';
import { getAllPosts, groupPostsByYear } from '@/lib/posts';
import { AUTHOR, BLOG, SITE_NAME, absoluteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: BLOG.title,
  description: BLOG.description,
  alternates: {
    canonical: BLOG.basePath,
  },
  openGraph: {
    title: `${BLOG.title} · ${SITE_NAME}`,
    description: BLOG.description,
    url: absoluteUrl(BLOG.basePath),
    type: 'website',
  },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();
  const groups = groupPostsByYear(posts);

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 overflow-hidden relative flex flex-col">
      <SpotlightBackground />

      <div className="flex-1 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 pb-20 w-full">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs text-zinc-500 hover:text-violet-400 transition-colors tracking-wider mb-12"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          BACK
        </Link>

        <h1 className="text-lg tracking-[0.2em] font-light text-violet-400 mb-3">
          {BLOG.title.toUpperCase()}
        </h1>
        <p className="text-zinc-400 font-light text-lg max-w-xl mb-16">
          {BLOG.description}
        </p>

        {groups.length === 0 ? (
          <p className="text-sm text-zinc-500 font-light italic">
            Nothing published yet. Subscribe via RSS to know when something lands.
          </p>
        ) : (
          groups.map((group) => (
            <div key={group.year} className="space-y-1 mb-16 last:mb-0">
              <div className="flex items-center gap-4 mb-6">
                <h2 className="text-xs tracking-[0.3em] font-light text-zinc-500">
                  {group.year}
                </h2>
                <div className="flex-1 h-px bg-zinc-900" />
              </div>
              <ul className="divide-y divide-zinc-900/60">
                {group.posts.map((post) => (
                  <PostCard key={post.slug} post={post} />
                ))}
              </ul>
            </div>
          ))
        )}

        <div className="mt-20 pt-8 border-t border-zinc-900 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-zinc-500">
          <span className="text-zinc-600 tracking-wider">FOLLOW</span>
          <Link
            href="/feed.xml"
            className="hover:text-violet-400 transition-colors flex items-center gap-1.5"
          >
            <Rss className="w-3 h-3" />
            RSS
          </Link>
          <a
            href={AUTHOR.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-violet-400 transition-colors"
          >
            LinkedIn
          </a>
          <a
            href={AUTHOR.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-violet-400 transition-colors"
          >
            GitHub
          </a>
        </div>
      </div>

      <Footer />
    </main>
  );
}
