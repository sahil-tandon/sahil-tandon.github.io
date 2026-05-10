import { ExternalLink } from 'lucide-react';
import type { PostFrontmatter } from '@/lib/posts';

interface CrosspostLinksProps {
  crossposted: PostFrontmatter['crossposted'];
}

export function CrosspostLinks({ crossposted }: CrosspostLinksProps) {
  if (!crossposted) return null;
  const entries: Array<{ label: string; href: string }> = [];
  if (crossposted.devto) entries.push({ label: 'dev.to', href: crossposted.devto });
  if (crossposted.hashnode)
    entries.push({ label: 'hashnode', href: crossposted.hashnode });
  if (entries.length === 0) return null;

  return (
    <div className="text-xs text-zinc-500 flex flex-wrap items-center gap-x-3 gap-y-1 mb-12">
      <span className="text-zinc-600 tracking-wider">ALSO ON</span>
      {entries.map((e, i) => (
        <span key={e.href} className="flex items-center gap-1">
          {i > 0 && <span className="text-zinc-700 mr-3">·</span>}
          <a
            href={e.href}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-violet-400 transition-colors flex items-center gap-1"
          >
            {e.label}
            <ExternalLink className="w-3 h-3" />
          </a>
        </span>
      ))}
    </div>
  );
}
