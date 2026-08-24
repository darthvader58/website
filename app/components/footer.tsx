'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Shell, GapBand, SectionHeader } from './Shell'

function GitHubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
  )
}

function TwitterIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function CoffeeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
      <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
      <line x1="6" y1="1" x2="6" y2="4" />
      <line x1="10" y1="1" x2="10" y2="4" />
      <line x1="14" y1="1" x2="14" y2="4" />
    </svg>
  )
}

function SubstackIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 5.5h16" />
      <path d="M4 9h16" />
      <path d="M6 12.5h12V21l-6-3.5L6 21v-8.5z" />
    </svg>
  )
}

function RssIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
      <circle cx="5" cy="19" r="1" fill="currentColor" stroke="none" />
      <path d="M4 11a9 9 0 0 1 9 9" />
      <path d="M4 4a16 16 0 0 1 16 16" />
    </svg>
  )
}

const FOOTER_LINKS = [
  { label: 'Github', href: 'https://github.com/darthvader58', Icon: GitHubIcon },
  { label: 'Twitter', href: 'https://x.com/fooldarthvader', Icon: TwitterIcon },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/raj-shashwat', Icon: LinkedInIcon },
  { label: 'Substack', href: 'https://substack.com/@shash58', Icon: SubstackIcon },
  { label: 'RSS', href: '/rss.xml', Icon: RssIcon },
]

const QUOTES = [
  { text: 'Simplicity is a prerequisite for reliability.', author: 'Edsger W. Dijkstra' },
  { text: 'The best way to predict the future is to invent it.', author: 'Alan Kay' },
  { text: "If you don't like your destiny, don't accept it.", author: 'Naruto Uzumaki' },
]

export default function Footer() {
  const [localTime, setLocalTime] = useState('')
  const [quoteIndex, setQuoteIndex] = useState(0)

  useEffect(() => {
    const updateTime = () => {
      setLocalTime(
        new Intl.DateTimeFormat('en-US', {
          timeZone: 'America/Phoenix',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        }).format(new Date())
      )
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => setQuoteIndex((prev) => (prev + 1) % QUOTES.length), 6000)
    return () => clearInterval(timer)
  }, [])

  const quote = QUOTES[quoteIndex]

  return (
    <footer className="w-full">
      <GapBand h="h-12" />

      <SectionHeader
        title="Scrolled Too Far"
        aside={
          <div className="hidden flex-wrap gap-x-4 gap-y-1 sm:flex">
            {FOOTER_LINKS.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('/') ? undefined : '_blank'}
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 font-mono text-[11px] text-[var(--muted)] transition-colors hover:text-[var(--fg)]"
              >
                <Icon />
                {label}
              </a>
            ))}
          </div>
        }
      />
      <Shell className="px-6 py-10 text-center sm:px-8">
        <p className="text-[14px] text-[var(--muted)]">
          Thanks for stopping by — interested to chat more? Let&apos;s buy some coffee.
        </p>
        <Link
          href="/coffee"
          className="group mt-5 inline-flex items-center gap-2 rounded-lg bg-[var(--fg)] px-5 py-2.5 text-[13px] font-semibold text-[var(--bg)] transition-transform duration-200 hover:-translate-y-0.5"
        >
          <CoffeeIcon className="size-4 text-purple-500" />
          Let&apos;s Talk
          <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>

        <div className="mt-8 flex flex-wrap justify-center gap-x-4 gap-y-2 sm:hidden">
          {FOOTER_LINKS.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('/') ? undefined : '_blank'}
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 font-mono text-[11px] text-[var(--muted)] transition-colors hover:text-[var(--fg)]"
            >
              <Icon />
              {label}
            </a>
          ))}
        </div>
      </Shell>

      <GapBand className="border-t border-[var(--line)]" />
      <div className="w-full border-y border-[var(--line)]">
        <Shell className="flex min-h-[160px] flex-col items-center justify-center border-x-0 px-8 py-12 text-center">
          <span className="font-serif text-4xl leading-none text-[var(--soft)]">&ldquo;</span>
          <p className="font-serif -mt-2 max-w-md text-[20px] italic leading-snug text-[var(--fg)] sm:text-[22px]">
            {quote.text}
          </p>
          <p className="mt-4 font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--soft)]">
            — {quote.author}
          </p>
        </Shell>
      </div>

      <GapBand h="h-5" />
      <div className="w-full border-t border-[var(--line)]">
        <Shell className="border-x-0 border-b-0 px-6 py-8 text-center sm:px-8">
          <p className="text-[14.5px] text-[var(--muted)]">
            Designed &amp; Developed by <span className="font-semibold text-[var(--fg)]">Shashwat Raj</span>
          </p>
          <p className="mt-1.5 font-mono text-[12px] text-[var(--soft)]">© {new Date().getFullYear()} All rights reserved.</p>
          <p className="mt-2.5 flex items-center justify-center gap-2 font-mono text-[12px] text-[var(--soft)]">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-purple-400 opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-purple-500" />
            </span>
            Tempe, Arizona · {localTime || 'MST'}
          </p>
        </Shell>
      </div>
    </footer>
  )
}
