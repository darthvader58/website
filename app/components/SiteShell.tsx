'use client'

import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'
import { Navbar } from './nav'
import Footer from './footer'
import GitHubActivity from './GithubActivity'

export default function SiteShell({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const isBlog = pathname === '/blog' || pathname.startsWith('/blog/')

  return (
    <div className={isBlog ? 'mx-auto max-w-[1120px] px-5 sm:px-8' : 'mx-auto max-w-[90%] px-4 lg:px-5'}>
      <div className={isBlog ? 'py-8 sm:py-12' : 'flex flex-col gap-6 py-12 lg:flex-row'}>
        <main className="min-w-0 flex-1">
          <Navbar />
          {children}
          <Footer />
        </main>

        {!isBlog && (
          <aside className="flex-shrink-0 lg:sticky lg:top-12 lg:max-h-[calc(100vh-6rem)] lg:w-[340px] lg:overflow-y-auto">
            <div className="rounded-lg border border-slate-800 bg-slate-950/50 p-6 dark:border-slate-800 dark:bg-slate-950/50 light:border-slate-200 light:bg-white/80">
              <GitHubActivity />
            </div>
          </aside>
        )}
      </div>
    </div>
  )
}
