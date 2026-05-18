import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';
import { BLOG } from '@/lib/site';
import { PostCard } from './blog/PostCard';

interface LatestPostsProps {
  limit?: number;
}

export function LatestPosts({ limit = 3 }: LatestPostsProps) {
  const posts = getAllPosts().slice(0, limit);
  if (posts.length === 0) return null;

  return (
    <section
      aria-labelledby="writing-heading"
      className="border-t border-zinc-900 pt-12 pb-2"
    >
      <div className="flex items-baseline justify-between mb-8">
        <h2
          id="writing-heading"
          className="text-lg tracking-[0.2em] font-light text-violet-400"
        >
          LATEST WRITING
        </h2>
        <Link
          href={BLOG.basePath}
          className="text-xs text-zinc-500 hover:text-violet-400 transition-colors tracking-wider"
        >
          VIEW ALL →
        </Link>
      </div>

      <ul className="divide-y divide-zinc-900">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} variant="compact" />
        ))}
      </ul>
    </section>
  );
}
