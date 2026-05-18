'use client';

import { useEffect, useRef } from 'react';
import { GISCUS } from '@/lib/site';

export function Comments() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isConfigured = GISCUS.repoId && GISCUS.categoryId;

  useEffect(() => {
    if (!isConfigured) return;
    const container = containerRef.current;
    if (!container || container.querySelector('script')) return;

    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.async = true;
    script.crossOrigin = 'anonymous';
    script.setAttribute('data-repo', GISCUS.repo);
    script.setAttribute('data-repo-id', GISCUS.repoId);
    script.setAttribute('data-category', GISCUS.category);
    script.setAttribute('data-category-id', GISCUS.categoryId);
    script.setAttribute('data-mapping', GISCUS.mapping);
    script.setAttribute('data-strict', '0');
    script.setAttribute('data-reactions-enabled', GISCUS.reactionsEnabled);
    script.setAttribute('data-emit-metadata', GISCUS.emitMetadata);
    script.setAttribute('data-input-position', GISCUS.inputPosition);
    script.setAttribute('data-theme', GISCUS.theme);
    script.setAttribute('data-lang', GISCUS.lang);
    script.setAttribute('data-loading', 'lazy');
    container.appendChild(script);
  }, [isConfigured]);

  if (!isConfigured) {
    return (
      <div className="border border-dashed border-zinc-900 rounded-lg p-6 text-center text-sm text-zinc-600 italic">
        Comments will appear here once Giscus is configured.
      </div>
    );
  }

  return <div ref={containerRef} className="giscus" />;
}
