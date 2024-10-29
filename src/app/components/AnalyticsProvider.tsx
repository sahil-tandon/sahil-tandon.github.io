'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { initGA, trackPageView } from '@/lib/analytics';

export function AnalyticsProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const initialize = async () => {
      try {
        await initGA();
      } catch (error) {
        console.error('Failed to initialize analytics:', error);
      }
    };
    initialize();
  }, []);

  useEffect(() => {
    if (pathname) {
      const url = searchParams.size > 0 
        ? `${pathname}?${searchParams.toString()}`
        : pathname;
        
      trackPageView(url);
    }
  }, [pathname, searchParams]);

  return <>{children}</>;
}