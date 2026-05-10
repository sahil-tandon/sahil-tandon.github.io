import Link from 'next/link';
import type { Post } from '@/lib/posts';
import { BLOG } from '@/lib/site';

interface PostCardProps {
  post: Post;
  variant?: 'list' | 'compact';
}

const formatDate = (iso: string, full = false): string => {
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    ...(full ? { year: 'numeric' } : {}),
  });
};

export function PostCard({ post, variant = 'list' }: PostCardProps) {
  const href = `${BLOG.basePath}/${post.slug}`;
  const { title, description, date, tags } = post.frontmatter;
  const primaryTag = tags[0];

  if (variant === 'compact') {
    return (
      <li className="py-5 group">
        <Link href={href} className="grid grid-cols-12 gap-4 items-baseline">
          <div className="col-span-12 sm:col-span-9">
            <h3 className="text-base font-normal text-zinc-200 group-hover:text-violet-400 transition-colors">
              {title}
            </h3>
            <p className="text-sm text-zinc-500 mt-1 font-light">{description}</p>
          </div>
          <div className="col-span-12 sm:col-span-3 flex sm:justify-end items-center gap-3 text-xs text-zinc-600 mt-1 sm:mt-0">
            <span>{formatDate(date, true)}</span>
            {primaryTag && (
              <span className="px-2 py-0.5 rounded-full border border-zinc-800 text-violet-300/70">
                {primaryTag}
              </span>
            )}
          </div>
        </Link>
      </li>
    );
  }

  return (
    <li>
      <Link
        href={href}
        className="grid grid-cols-12 gap-4 py-5 items-baseline group"
      >
        <span className="col-span-3 sm:col-span-2 text-sm text-zinc-500 font-light">
          {formatDate(date)}
        </span>
        <div className="col-span-9 sm:col-span-7">
          <h3 className="text-zinc-100 group-hover:text-violet-400 transition-colors font-normal">
            {title}
          </h3>
          <p className="text-sm text-zinc-500 mt-1 font-light hidden sm:block">
            {description}
          </p>
        </div>
        <div className="col-span-12 sm:col-span-3 flex sm:justify-end items-center gap-2 text-xs text-zinc-600">
          <span>{post.readingTimeMinutes} min</span>
          {primaryTag && (
            <>
              <span className="text-violet-300/60">·</span>
              <span className="text-violet-300/60">{primaryTag}</span>
            </>
          )}
        </div>
      </Link>
    </li>
  );
}
