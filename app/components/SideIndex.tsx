'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

const INDEX_ITEMS = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'writing', label: 'Writing' },
  { id: 'skills', label: 'Skills' },
  { id: 'github', label: 'GitHub' },
  { id: 'contact', label: 'Contact' },
]

export default function SideIndex() {
  const pathname = usePathname()
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    if (pathname !== '/') return

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200
      for (const item of INDEX_ITEMS) {
        const el = document.getElementById(item.id)
        if (el) {
          const top = el.offsetTop
          const height = el.offsetHeight
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.id)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [pathname])

  if (pathname !== '/') return null

  return (
    <aside className="pointer-events-auto fixed left-[calc(50%+410px)] top-[26vh] z-30 hidden flex-col gap-3.5 xl:flex">
      <h3 className="mb-1 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--soft)]">
        Index
      </h3>
      {INDEX_ITEMS.map((item) => {
        const isActive = activeSection === item.id
        return (
          <a
            key={item.id}
            href={`/#${item.id}`}
            className={`group flex items-center gap-2.5 font-mono text-[12px] font-medium tracking-[0.05em] transition-all duration-300 ${
              isActive ? 'text-[var(--fg)] font-semibold' : 'text-[var(--soft)] hover:text-[var(--muted)]'
            }`}
          >
            <span className={`h-px bg-current transition-all duration-300 ${isActive ? 'w-4' : 'w-0 group-hover:w-2'}`} />
            {item.label}
          </a>
        )
      })}
    </aside>
  )
}
