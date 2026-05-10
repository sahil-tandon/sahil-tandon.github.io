import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { SpotlightBackground } from '@/components/SpotlightBackground';
import { Footer } from '@/components/Footer';
import { BLOG } from '@/lib/site';

export default function PostNotFound() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 overflow-hidden relative flex flex-col">
      <SpotlightBackground />

      <div className="flex-1 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 w-full">
        <h1 className="text-lg tracking-[0.2em] font-light text-violet-400 mb-3">
          NOT FOUND
        </h1>
        <p className="text-zinc-400 font-light text-lg max-w-xl mb-8">
          That post doesn&apos;t exist — or has been retired.
        </p>
        <Link
          href={BLOG.basePath}
          className="inline-flex items-center gap-2 text-xs text-zinc-500 hover:text-violet-400 transition-colors tracking-wider"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          ALL WRITING
        </Link>
      </div>

      <Footer />
    </main>
  );
}
