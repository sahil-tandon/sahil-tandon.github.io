'use client';

import { trackLinkClick } from '@/lib/analytics';
import { Heart } from 'lucide-react';

export function Footer() {
  const handleClick = () => {
    trackLinkClick('Footer Signature Link', 'https://github.com/sahil-tandon');
  };

  return (
    <footer className="w-full pb-4 mt-auto">
      <style jsx global>{`
        @keyframes heartbeat {
          0%, 30%, 100% { transform: scale(1); }
          5% { transform: scale(1.25); }
          7% { transform: scale(1.15); }
          10% { transform: scale(1.25); }
          12% { transform: scale(1); }
        }
        
        .heart-icon {
          animation: heartbeat 3.5s ease-in-out infinite;
          transform-origin: center;
          margin-left: 0.1rem;
          margin-right: 0.1rem;
          width: 15px;
          height: 15px;
          color: #993344;
        }
      `}</style>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-right space-y-1">
          <p className="text-xs text-zinc-600 tracking-wide group">
            <span className="text-zinc-500">&lt;crafted&gt;</span>{' '}
            with{' '}
            <Heart 
              className="inline-block heart-icon"
              fill="currentColor"
              aria-label="love"
            />
            {' '}by{' '}
            <a 
              href="https://github.com/sahil-tandon" 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={handleClick}
              className="inline-flex items-center text-zinc-500 hover:text-violet-400 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-violet-400/50 focus:ring-offset-1 focus:ring-offset-zinc-950 rounded px-0.5"
              aria-label="Visit Sahil Tandon's GitHub profile (opens in new tab)"
            >
              &lt;sahil-tandon/&gt;
            </a>
          </p>
          <p className="text-[10px] text-zinc-800">© {new Date().getFullYear()}</p>
        </div>
      </div>
    </footer>
  );
}