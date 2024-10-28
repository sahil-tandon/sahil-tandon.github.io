'use client';

import { useState, useEffect, useRef } from 'react';

const titles = [
  'Frontend Developer',
  'Product Enthusiast',
  'Agile Practitioner',
  'Design Conscious',
  'Data Driven',
];

export function TypewriterEffect() {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [titleIndex, setTitleIndex] = useState(0);
  const [delta, setDelta] = useState(150);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  
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

  useEffect(() => {
    if (textRef.current && containerRef.current) {
      const textMetrics = textRef.current.getBoundingClientRect();
      const containerMetrics = containerRef.current.getBoundingClientRect();
      
      if (textMetrics.height > containerMetrics.height / 2) {
        containerRef.current.classList.add('pb-16', 'sm:pb-20');
      } else {
        containerRef.current.classList.remove('pb-16', 'sm:pb-20');
      }
    }
  }, [text]);

  return (
    <div 
      ref={containerRef}
      className="relative min-h-[5rem] sm:min-h-[6rem] pb-8 sm:pb-12 transition-all duration-300"
    >
      <h1 className="text-4xl sm:text-6xl md:text-7xl font-normal leading-tight text-zinc-100 absolute">
        <span 
          ref={textRef} 
          className="relative inline"
        >
          {text}
          <span 
            className="absolute top-0 -right-[2px] w-[4px] h-[1.1em] bg-violet-400 animate-blink"
            style={{ transform: 'translateX(100%)' }}
          />
        </span>
      </h1>
    </div>
  );
}