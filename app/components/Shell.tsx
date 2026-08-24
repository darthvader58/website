import type { ReactNode } from 'react'

export function Shell({ children, className = '' }: { children?: ReactNode; className?: string }) {
  return (
    <div className={`relative mx-auto w-full max-w-[760px] border-x border-dashed border-[var(--line)] ${className}`}>
      {children}
    </div>
  )
}

export function SectionHeader({ title, aside, id }: { title: string; aside?: ReactNode; id?: string }) {
  return (
    <div id={id} className="relative w-full scroll-mt-24 border-y border-[var(--line)] bg-stripes">
      <span className="absolute left-0 top-0 h-[3px] w-[3px] -translate-x-1/2 -translate-y-1/2 bg-[var(--fg)] opacity-40" />
      <span className="absolute right-0 top-0 h-[3px] w-[3px] -translate-y-1/2 translate-x-1/2 bg-[var(--fg)] opacity-40" />
      <span className="absolute bottom-0 left-0 h-[3px] w-[3px] -translate-x-1/2 translate-y-1/2 bg-[var(--fg)] opacity-40" />
      <span className="absolute bottom-0 right-0 h-[3px] w-[3px] translate-x-1/2 translate-y-1/2 bg-[var(--fg)] opacity-40" />

      <Shell className="flex items-center justify-between gap-4 border-x-0 bg-[var(--bg)] px-6 py-3 sm:px-8">
        <h2 className="font-serif text-2xl tracking-wide text-[var(--fg)]">{title}</h2>
        {aside}
      </Shell>
    </div>
  )
}

export function GapBand({ h = 'h-7', className = '' }: { h?: string; className?: string }) {
  return (
    <div className={`relative w-full bg-stripes ${h} ${className}`}>
      <Shell className="h-full" />
    </div>
  )
}
