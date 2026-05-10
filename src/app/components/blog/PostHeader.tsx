import type { Post } from '@/lib/posts';

interface PostHeaderProps {
  post: Post;
}

const formatLongDate = (iso: string): string => {
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export function PostHeader({ post }: PostHeaderProps) {
  const { title, description, date, updated, tags } = post.frontmatter;
  return (
    <header className="mb-12">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-zinc-500 mb-5">
        <time dateTime={date}>{formatLongDate(date)}</time>
        {updated && updated !== date && (
          <>
            <span className="text-zinc-700">·</span>
            <span className="text-zinc-600">updated {formatLongDate(updated)}</span>
          </>
        )}
        <span className="text-zinc-700">·</span>
        <span>{post.readingTimeMinutes} min read</span>
        {tags.length > 0 && <span className="text-zinc-700">·</span>}
        {tags.map((tag) => (
          <span key={tag} className="text-violet-300/70">
            {tag}
          </span>
        ))}
      </div>
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-light text-zinc-100 leading-tight tracking-tight">
        {title}
      </h1>
      <p className="mt-5 text-lg text-zinc-400 font-light leading-relaxed">
        {description}
      </p>
    </header>
  );
}
