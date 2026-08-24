'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Search,
  Compass,
  Terminal,
  FolderGit2,
  BookOpen,
  Mail,
  Copy,
  Check,
  Moon,
  Sun,
  ExternalLink,
} from 'lucide-react'
import { useTheme } from './ThemeProvider'
import { usePalette } from './PaletteContext'

const EMAIL = 'rajayshashwat@gmail.com'

interface PaletteItem {
  id: string
  category: 'navigation' | 'actions'
  title: string
  subtitle?: string
  icon: React.ReactNode
  action: () => void
}

export default function CommandPalette() {
  const router = useRouter()
  const { open, setOpen } = usePalette()
  const onClose = () => setOpen(false)
  const { theme, toggleTheme } = useTheme()
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [copied, setCopied] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (open) {
      setQuery('')
      setSelectedIndex(0)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [open])

  const goTo = (href: string) => {
    router.push(href)
    onClose()
  }

  const copyEmail = () => {
    navigator.clipboard.writeText(EMAIL)
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
      onClose()
    }, 900)
  }

  const items: PaletteItem[] = [
    { id: 'nav-home', category: 'navigation', title: 'Go to Home', subtitle: 'Overview and highlights', icon: <Compass size={16} />, action: () => goTo('/') },
    { id: 'nav-about', category: 'navigation', title: 'Go to About', subtitle: 'Bio and developer snapshot', icon: <Terminal size={16} />, action: () => goTo('/#about') },
    { id: 'nav-projects', category: 'navigation', title: 'Go to Projects', subtitle: 'Browse all projects and live demos', icon: <FolderGit2 size={16} />, action: () => goTo('/projects') },
    { id: 'nav-experience', category: 'navigation', title: 'Go to Experience', subtitle: 'Work history and research', icon: <FolderGit2 size={16} />, action: () => goTo('/experience') },
    { id: 'nav-blog', category: 'navigation', title: 'Go to Blog', subtitle: 'Essays and technical writing', icon: <BookOpen size={16} />, action: () => goTo('/blog') },
    { id: 'nav-contact', category: 'navigation', title: 'Go to Contact', subtitle: 'Social links and email', icon: <Mail size={16} />, action: () => goTo('/coffee') },
    { id: 'action-theme', category: 'actions', title: theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme', subtitle: theme === 'dark' ? 'Go light mode' : 'Go dark mode', icon: theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />, action: () => { toggleTheme(); onClose() } },
    { id: 'action-copy-email', category: 'actions', title: copied ? 'Copied!' : 'Copy Email Address', subtitle: EMAIL, icon: copied ? <Check size={16} className="text-purple-500" /> : <Copy size={16} />, action: copyEmail },
  ]

  const filteredItems = items.filter((item) => {
    const term = query.toLowerCase().trim()
    if (!term) return true
    return (
      item.title.toLowerCase().includes(term) ||
      item.subtitle?.toLowerCase().includes(term) ||
      item.category.toLowerCase().includes(term)
    )
  })

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!open) return
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIndex((prev) => (prev + 1) % filteredItems.length)
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length)
      } else if (e.key === 'Enter') {
        e.preventDefault()
        filteredItems[selectedIndex]?.action()
      } else if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open, filteredItems, selectedIndex, onClose])

  useEffect(() => {
    listRef.current?.querySelector('[data-active="true"]')?.scrollIntoView({ block: 'nearest' })
  }, [selectedIndex])

  if (!open) return null

  const grouped = filteredItems.reduce<Record<string, PaletteItem[]>>((acc, item) => {
    acc[item.category] = acc[item.category] || []
    acc[item.category].push(item)
    return acc
  }, {})

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-[15vh]">
      <div onClick={onClose} className="fixed inset-0 bg-[var(--bg)]/80 backdrop-blur-md" />

      <div className="relative z-10 flex max-h-[60vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--card)] shadow-2xl backdrop-blur-xl">
        <div className="flex items-center gap-2.5 border-b border-[var(--line)] px-4 py-3.5">
          <Search className="shrink-0 text-[var(--muted)]" size={18} />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setSelectedIndex(0)
            }}
            placeholder="Search pages or actions..."
            className="w-full border-none bg-transparent text-sm text-[var(--fg)] outline-none placeholder:text-[var(--soft)]"
          />
          <kbd className="hidden rounded-md border border-[var(--line)] bg-[var(--chip)] px-1.5 py-0.5 font-mono text-[10px] text-[var(--muted)] sm:inline-block">
            ESC
          </kbd>
        </div>

        <div ref={listRef} className="flex-1 divide-y divide-[var(--line)] overflow-y-auto py-2">
          {filteredItems.length === 0 ? (
            <div className="px-4 py-8 text-center font-mono text-xs text-[var(--soft)]">
              No commands matched &ldquo;{query}&rdquo;
            </div>
          ) : (
            Object.entries(grouped).map(([category, catItems]) => (
              <div key={category} className="py-2 first:pt-0 last:pb-0">
                <h4 className="px-4 py-1.5 font-mono text-[9px] font-semibold uppercase tracking-wider text-[var(--soft)]">
                  {category}
                </h4>
                <div className="mt-1 flex flex-col gap-0.5 px-2">
                  {catItems.map((item) => {
                    const itemIndex = filteredItems.indexOf(item)
                    const isActive = itemIndex === selectedIndex
                    return (
                      <button
                        key={item.id}
                        data-active={isActive}
                        onClick={item.action}
                        onMouseEnter={() => setSelectedIndex(itemIndex)}
                        className={`flex w-full items-center gap-3.5 rounded-xl border px-3.5 py-2.5 text-left transition-all duration-150 ${
                          isActive ? 'border-[var(--line)] bg-[var(--hover)] text-[var(--fg)]' : 'border-transparent text-[var(--muted)] hover:bg-[var(--hover)]'
                        }`}
                      >
                        <span className={`shrink-0 ${isActive ? 'text-[var(--fg)]' : 'text-[var(--soft)]'}`}>{item.icon}</span>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-xs font-semibold leading-tight">{item.title}</p>
                          {item.subtitle && (
                            <p className="mt-0.5 truncate text-[10px] leading-tight text-[var(--soft)]">{item.subtitle}</p>
                          )}
                        </div>
                        {isActive && <ExternalLink size={12} className="text-[var(--fg)] opacity-60" />}
                      </button>
                    )
                  })}
                </div>
              </div>
            ))
          )}
        </div>

        <div className="flex items-center justify-between border-t border-[var(--line)] bg-[var(--chip)] px-4 py-2.5 font-mono text-[9px] text-[var(--soft)]">
          <div className="flex gap-2">
            <span>↑↓ navigate</span>
            <span>•</span>
            <span>Enter select</span>
          </div>
          <span>ESC close</span>
        </div>
      </div>
    </div>
  )
}
