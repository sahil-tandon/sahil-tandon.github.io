'use client';

import { useState, useEffect } from 'react';

const titles = [
  'Frontend Developer',
  'Product Enthusiast',
  'Agile Practitioner',
  'Design-Conscious',
  'Data-Driven',
  'Team Player',
  'Effective Communicator',
  'Skilled Collaborator',
  'A11y Aware',
  'Quick Learner'
];

export function TypewriterEffect() {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [titleIndex, setTitleIndex] = useState(0);
  const [delta, setDelta] = useState(150);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const currentTitle = titles[titleIndex];
    
    if (isPaused) {
      timeout = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, 2000);
    } else if (isDeleting) {
      setDelta(50);
      
      if (text === '') {
        setIsDeleting(false);
        setTitleIndex((prev) => (prev + 1) % titles.length);
        setDelta(500);
      } else {
        timeout = setTimeout(() => {
          setText(text.slice(0, -1));
        }, delta);
      }
    } else {
      setDelta(150);
      
      if (text === currentTitle) {
        setIsPaused(true);
      } else {
        timeout = setTimeout(() => {
          setText(currentTitle.slice(0, text.length + 1));
        }, delta);
      }
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, titleIndex, delta, isPaused]);

  return (
    <div className="relative min-h-[5rem] sm:min-h-[6rem]">
      <h1 className="text-6xl sm:text-7xl font-normal leading-tight text-zinc-100 absolute flex items-center">
        <span className="relative">
          {text}
          <span 
            className="absolute top-0 -right-[2px] w-[4px] h-full bg-violet-400 animate-blink"
            style={{ transform: 'translateX(100%)' }}
          />
        </span>
      </h1>
    </div>
  );
}