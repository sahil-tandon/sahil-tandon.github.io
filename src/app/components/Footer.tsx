'use client';

import { trackLinkClick } from '@/lib/analytics';
import { Heart } from 'lucide-react';

export function Footer() {
  const handleClick = () => {
    trackLinkClick('Footer Signature Link', 'https://github.com/sahil-tandon');
  };

  return (
    <footer className="w-full py-8 mt-auto">
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
          <p className="text-sm text-zinc-500 tracking-wide group font-light">
            <span className="text-zinc-400">&lt;crafted&gt;</span>{' '}
            with{' '}
            <Heart 
              className="inline-block heart-icon" 
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
              &lt;sahil-tandon/&gt;
            </a>
          </p>
          <p className="text-[10px] text-zinc-800">© {new Date().getFullYear()}</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;