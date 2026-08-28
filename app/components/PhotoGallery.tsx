'use client';

import { useEffect, useRef, useState } from 'react';

const galleryImages = [
  { src: '/gallery/thumbs/gallery-01.webp', width: 452, height: 450 },
  { src: '/gallery/thumbs/gallery-02.webp', width: 460, height: 450 },
  { src: '/gallery/thumbs/gallery-03.webp', width: 450, height: 450 },
  { src: '/gallery/thumbs/gallery-04.webp', width: 449, height: 450 },
  { src: '/gallery/thumbs/gallery-05.webp', width: 424, height: 450 },
  { src: '/gallery/thumbs/gallery-06.webp', width: 414, height: 450 },
  { src: '/gallery/thumbs/gallery-07.webp', width: 450, height: 450 },
  { src: '/gallery/thumbs/gallery-08.webp', width: 449, height: 450 },
  { src: '/gallery/thumbs/gallery-09.webp', width: 449, height: 450 },
  { src: '/gallery/thumbs/gallery-10.webp', width: 451, height: 450 },
  { src: '/gallery/thumbs/gallery-11.webp', width: 450, height: 450 },
  { src: '/gallery/thumbs/gallery-12.webp', width: 457, height: 450 },
  { src: '/gallery/thumbs/gallery-13.webp', width: 450, height: 450 },
  { src: '/gallery/thumbs/gallery-14.webp', width: 451, height: 450 },
  { src: '/gallery/thumbs/gallery-15.webp', width: 448, height: 450 },
];

type GalleryImage = (typeof galleryImages)[number];

function GalleryPhoto({ image, index }: { image: GalleryImage; index: number }) {
  const photoRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(index < 2);
  const displayWidth = Math.round((225 * image.width) / image.height);

  useEffect(() => {
    if (shouldLoad) return;

    const photo = photoRef.current;
    if (!photo || typeof IntersectionObserver === 'undefined') {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: '400px' },
    );

    observer.observe(photo);
    return () => observer.disconnect();
  }, [shouldLoad]);

  return (
    <div
      ref={photoRef}
      className="group relative inline-block"
      style={{ flexShrink: 0, width: `${displayWidth + 20}px` }}
    >
      <div
        className="absolute left-1 top-1 h-full w-full rounded-sm bg-[var(--chip)] shadow-md transition-transform duration-500 group-hover:rotate-2"
        style={{ transform: 'translateX(-3px)' }}
      />
      <div
        className="absolute left-0.5 top-0.5 h-full w-full rounded-sm bg-[var(--chip)]/60 shadow-md transition-transform duration-500 group-hover:rotate-1"
        style={{ transform: 'translateX(-1.5px)' }}
      />

      <div className="relative border-l-4 border-[var(--line)] bg-[var(--card)] p-2 shadow-2xl transition-transform duration-500 group-hover:rotate-3 group-hover:scale-105">
        {shouldLoad ? (
          <img
            src={image.src}
            alt={`Gallery photo ${index + 1}`}
            width={image.width}
            height={image.height}
            loading="lazy"
            decoding="async"
            className="block h-[225px] w-full object-cover opacity-0 animate-fadeInSlow"
            style={{
              animationFillMode: 'forwards',
              animationDelay: `${Math.min(index, 4) * 0.08}s`,
            }}
          />
        ) : (
          <div className="h-[225px] w-full animate-pulse bg-[var(--chip)]" aria-hidden="true" />
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-transparent via-white/[0.02] to-black/10" />
        <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-r from-[var(--soft)]/40 to-transparent" />
      </div>
    </div>
  );
}

export default function PhotoGallery() {
  const scrollGallery = (left: number) => {
    document.getElementById('photo-gallery-container')?.scrollBy({
      left,
      behavior: 'smooth',
    });
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => scrollGallery(-300)}
        className="absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full border border-[var(--line)] bg-[var(--card)] p-3 text-[var(--muted)] shadow-lg transition-all duration-200 hover:scale-110 hover:bg-[var(--chip)]"
        aria-label="Scroll left"
      >
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        type="button"
        onClick={() => scrollGallery(300)}
        className="absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full border border-[var(--line)] bg-[var(--card)] p-3 text-[var(--muted)] shadow-lg transition-all duration-200 hover:scale-110 hover:bg-[var(--chip)]"
        aria-label="Scroll right"
      >
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <div id="photo-gallery-container" className="scrollbar-hide w-full overflow-x-auto">
        <div className="flex gap-4 pb-4" style={{ width: 'max-content' }}>
          {galleryImages.map((image, index) => (
            <GalleryPhoto key={image.src} image={image} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
