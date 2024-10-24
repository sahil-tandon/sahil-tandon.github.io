'use client';

import { useState, useEffect } from 'react';

interface MousePosition {
  x: number;
  y: number;
}

export function SpotlightBackground() {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      requestAnimationFrame(() => {
        setMousePosition({ 
          x: e.pageX - window.scrollX, 
          y: e.pageY - window.scrollY 
        });
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      aria-hidden="true"
      className="fixed inset-0 opacity-40 pointer-events-none transition-opacity duration-300"
      style={{
        background: `
          radial-gradient(
            circle 400px at ${mousePosition.x}px ${mousePosition.y}px,
            rgba(139, 92, 246, 0.15) 0%,
            rgba(139, 92, 246, 0.1) 25%,
            rgba(139, 92, 246, 0.05) 50%,
            transparent 100%
          ),
          radial-gradient(
            circle 200px at ${mousePosition.x}px ${mousePosition.y}px,
            rgba(167, 139, 250, 0.3) 0%,
            transparent 100%
          )
        `
      }}
    />
  );
}