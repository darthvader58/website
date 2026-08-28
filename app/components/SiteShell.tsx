'use client'

import type { ReactNode } from 'react'
import { Navbar } from './nav'
import Footer from './footer'
import SideIndex from './SideIndex'
import ScrollProgress from './ScrollProgress'
import CommandPalette from './CommandPalette'
import { PaletteProvider } from './PaletteContext'

export default function SiteShell({ children }: { children: ReactNode }) {
  return (
    <PaletteProvider>
      <div className="relative min-h-screen">
        <ScrollProgress />
        <Navbar />
        <SideIndex />

        <main className="relative z-10">{children}</main>

        <Footer />
        <CommandPalette />
      </div>
    </PaletteProvider>
  )
}
