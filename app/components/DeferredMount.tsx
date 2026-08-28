'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

interface DeferredMountProps {
  children: ReactNode;
  fallback: ReactNode;
  className?: string;
  rootMargin?: string;
}

export default function DeferredMount({
  children,
  fallback,
  className = '',
  rootMargin = '300px 0px',
}: DeferredMountProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldMount, setShouldMount] = useState(false);

  useEffect(() => {
    const container = containerRef.current;

    if (!container || typeof IntersectionObserver === 'undefined') {
      setShouldMount(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldMount(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <div ref={containerRef} className={className}>
      {shouldMount ? children : fallback}
    </div>
  );
}
