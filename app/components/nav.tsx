'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { Search, Sun, Moon, Menu, X } from 'lucide-react'
import { useTheme } from './ThemeProvider'
import { Shell } from './Shell'
import { usePalette } from './PaletteContext'

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Experience', path: '/experience' },
  { label: 'Projects', path: '/projects' },
  { label: 'Blog', path: '/blog' },
  { label: 'Resume', path: '/resume' },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const { setOpen: setPaletteOpen } = usePalette()

  let theme: 'dark' | 'light' = 'dark'
  let toggleTheme = () => {}
  try {
    const themeContext = useTheme()
    theme = themeContext.theme
    toggleTheme = themeContext.toggleTheme
  } catch (e) {
    // ThemeProvider not available yet
  }

  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      const hash = window.location.hash.substring(1)
      setTimeout(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 100)
    }
  }, [])

  const isActive = (path: string) => (path === '/' ? pathname === '/' : pathname === path || pathname?.startsWith(`${path}/`))

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--line)] bg-[var(--bg)]/85 backdrop-blur-md">
      <Shell className="flex items-center justify-between border-x-0 px-6 py-3 sm:px-8">
        <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center transition-opacity hover:opacity-80">
          <img src="/assets/favicon.ico" alt="Shashwat Raj" className="size-8 rounded-md" />
        </Link>

        <nav className="hidden items-center gap-5 text-[13px] text-[var(--muted)] sm:flex">
          {navLinks.map(({ label, path }) => {
            const active = isActive(path)
            return (
              <Link
                key={path}
                href={path}
                className={`group relative transition-colors hover:text-[var(--fg)] ${active ? 'font-semibold text-[var(--fg)]' : ''}`}
              >
                {label}
                <span
                  className={`absolute -bottom-0.5 left-0 h-px w-full origin-right scale-x-0 bg-current transition-transform duration-300 group-hover:origin-left group-hover:scale-x-100 ${active ? 'origin-left scale-x-100' : ''}`}
                />
              </Link>
            )
          })}

          <button
            type="button"
            onClick={() => setPaletteOpen(true)}
            aria-label="Search command palette"
            className="grid size-7 place-items-center rounded-full border border-[var(--line)] text-[var(--muted)] transition-all duration-300 hover:text-[var(--fg)]"
          >
            <Search className="size-3.5" />
          </button>

          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="grid size-7 place-items-center rounded-full border border-[var(--line)] text-[var(--muted)] transition-all duration-300 hover:rotate-45 hover:text-[var(--fg)]"
          >
            {theme === 'dark' ? <Sun className="size-3.5" /> : <Moon className="size-3.5" />}
          </button>
        </nav>

        <div className="flex items-center gap-3 sm:hidden">
          <button type="button" onClick={() => setPaletteOpen(true)} aria-label="Search command palette" className="grid size-8 place-items-center rounded-full border border-[var(--line)] text-[var(--muted)] hover:text-[var(--fg)]">
            <Search className="size-4" />
          </button>
          <button type="button" onClick={toggleTheme} aria-label="Toggle theme" className="grid size-8 place-items-center rounded-full border border-[var(--line)] text-[var(--muted)] hover:text-[var(--fg)]">
            {theme === 'dark' ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </button>
          <button type="button" onClick={() => setIsOpen((o) => !o)} aria-label="Toggle mobile menu" className="grid size-8 place-items-center rounded-full border border-[var(--line)] text-[var(--muted)] hover:text-[var(--fg)]">
            {isOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </Shell>

      <div className={`overflow-hidden border-b border-[var(--line)] bg-[var(--bg)] transition-all duration-300 sm:hidden ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="flex flex-col gap-4 px-6 py-6 font-serif text-lg">
          {navLinks.map(({ label, path }) => {
            const active = isActive(path)
            return (
              <Link
                key={path}
                href={path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-2 border-b border-dashed border-[var(--line)]/50 pb-2.5 transition-colors ${active ? 'font-semibold text-[var(--fg)]' : 'text-[var(--muted)]'}`}
              >
                <span className={`size-1.5 rounded-full bg-[var(--fg)] ${active ? 'opacity-100' : 'opacity-0'}`} />
                {label}
              </Link>
            )
          })}
        </div>
      </div>
    </header>
  )
}
