'use client';

import { trackLinkClick } from '@/lib/analytics';
import { Heart } from 'lucide-react';

export function Footer() {
  const handleClick = () => {
    trackLinkClick('Footer Name', 'https://github.com/sahil-tandon');
  };

  return (
    <footer className="w-full py-8 mt-auto">
      <style jsx global>{`
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          25% { transform: scale(1.25); }
          35% { transform: scale(1.15); }
          45% { transform: scale(1.25); }
          55% { transform: scale(1); }
        }
        
        .heart-icon {
          animation: heartbeat 1.5s ease-in-out infinite;
          transform-origin: center;
        }
      `}</style>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-right space-y-1">
          <p className="text-sm text-zinc-500 tracking-wide group font-light">
            <span className="text-zinc-400">&lt;crafted/&gt;</span>{' '}
            with{' '}
            <Heart 
              className="inline-block text-violet-400 heart-icon mx-1" 
              size={13} 
              fill="currentColor"
            />
            {' '}by{' '}
            <a 
              href="https://github.com/sahil-tandon" 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={handleClick}
              className="text-zinc-400 hover:text-violet-400 transition-colors duration-300"
            >
              @sahil-tandon
            </a>
          </p>
          <p className="text-xs text-zinc-700">© 2024</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;