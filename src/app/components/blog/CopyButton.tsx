'use client';

import { Check, Copy } from 'lucide-react';
import { useState } from 'react';
import { trackEvent } from '@/lib/analytics';

interface CopyButtonProps {
  text: string;
}

export function CopyButton({ text }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleClick = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      trackEvent({ action: 'copy_code', category: 'Blog' });
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // navigator.clipboard can fail in older contexts; silently degrade.
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={copied ? 'Copied' : 'Copy code'}
      className="absolute top-2 right-2 p-1.5 rounded-md border border-zinc-800 bg-zinc-900/80 text-zinc-500 hover:text-violet-300 hover:bg-zinc-900 transition-colors"
    >
      {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
    </button>
  );
}
