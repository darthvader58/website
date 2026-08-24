'use client'

import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'
import { Navbar } from './nav'
import Footer from './footer'
import SideIndex from './SideIndex'
import ScrollProgress from './ScrollProgress'
import CommandPalette from './CommandPalette'
import { PaletteProvider } from './PaletteContext'

export default function SiteShell({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const isBlog = pathname === '/blog' || pathname.startsWith('/blog/')

  return (
    <PaletteProvider>
      <div className="relative min-h-screen">
        <ScrollProgress />
        <Navbar />
        <SideIndex />

        <main className="relative z-10">
          {isBlog ? <div className="mx-auto max-w-[880px] px-5 py-8 sm:px-8 sm:py-12">{children}</div> : children}
        </main>

        <Footer />
        <CommandPalette />
      </div>
    </PaletteProvider>
  )
}
