'use client'

import { useRef, useState, type SyntheticEvent } from 'react'

export type AnimationGalleryItem = {
  src: string
  label: string
}

interface AnimationGalleryProps {
  items: AnimationGalleryItem[]
  title: string
}

export default function AnimationGallery({ items, title }: AnimationGalleryProps) {
  const galleryRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const scrollToSlide = (index: number) => {
    const gallery = galleryRef.current
    if (!gallery) return

    const nextIndex = Math.max(0, Math.min(index, items.length - 1))
    gallery.scrollTo({ left: nextIndex * gallery.clientWidth, behavior: 'smooth' })
    setActiveIndex(nextIndex)
  }

  const stopCardNavigation = (event: SyntheticEvent) => {
    event.preventDefault()
    event.stopPropagation()
  }

  return (
    <div
      className="relative h-full w-full overflow-hidden bg-[#0b0b0e]"
      aria-label={`${title} animation gallery`}
      aria-roledescription="carousel"
      role="region"
      onClick={stopCardNavigation}
    >
      <div
        ref={galleryRef}
        className="scrollbar-hide flex h-full w-full snap-x snap-mandatory overflow-x-auto overscroll-x-contain scroll-smooth"
        onScroll={(event) => {
          const gallery = event.currentTarget
          const nextIndex = Math.round(gallery.scrollLeft / gallery.clientWidth)
          setActiveIndex(Math.max(0, Math.min(nextIndex, items.length - 1)))
        }}
      >
        {items.map((item, index) => (
          <div
            key={item.src}
            className="h-full w-full flex-none snap-center"
            role="group"
            aria-label={`${index + 1} of ${items.length}: ${item.label}`}
            aria-roledescription="slide"
          >
            <img
              src={item.src}
              alt={`${item.label} animation`}
              className="h-full w-full select-none object-contain"
              loading="lazy"
              decoding="async"
              draggable={false}
            />
          </div>
        ))}
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex min-h-11 items-center justify-between gap-4 border-t border-white/10 bg-slate-950/95 px-4 py-2.5 shadow-[0_-8px_24px_rgba(0,0,0,0.55)] backdrop-blur-md">
        <p className="truncate text-sm font-semibold text-white drop-shadow-md" aria-live="polite">
          {items[activeIndex]?.label}
        </p>
        <span className="shrink-0 rounded-full border border-white/20 bg-white/10 px-2 py-1 text-[10px] font-medium tabular-nums text-slate-100">
          {activeIndex + 1} / {items.length}
        </span>
      </div>

      <button
        type="button"
        onClick={(event) => {
          stopCardNavigation(event)
          scrollToSlide(activeIndex - 1)
        }}
        disabled={activeIndex === 0}
        className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/15 bg-black/65 p-2 text-white shadow-lg backdrop-blur-sm transition hover:bg-purple-600 disabled:pointer-events-none disabled:opacity-30"
        aria-label="Previous animation"
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m15 18-6-6 6-6" />
        </svg>
      </button>

      <button
        type="button"
        onClick={(event) => {
          stopCardNavigation(event)
          scrollToSlide(activeIndex + 1)
        }}
        disabled={activeIndex === items.length - 1}
        className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/15 bg-black/65 p-2 text-white shadow-lg backdrop-blur-sm transition hover:bg-purple-600 disabled:pointer-events-none disabled:opacity-30"
        aria-label="Next animation"
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m9 18 6-6-6-6" />
        </svg>
      </button>
    </div>
  )
}
