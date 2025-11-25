import './globals.css'
import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Navbar } from './components/nav'
import Footer from './components/footer'
import CircuitBackground from './components/CircuitBackground'
import GitHubActivity from './components/GithubActivity'

export const metadata: Metadata = {
  title: 'Shashwat Raj - Portfolio',
  description: 'Computer Science & Engineering student at Arizona State University. Passionate about embedded systems, robotics, and full-stack development.',
  icons: {
    icon: '/assets/favicon.ico',
  },
  openGraph: {
    title: 'Shashwat Raj - Portfolio',
    description: 'Computer Science & Engineering student at Arizona State University',
    url: 'https://shashwatraj.com',
    siteName: 'Shashwat Raj',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
}

const cx = (...classes: string[]) => classes.filter(Boolean).join(' ')

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={cx(GeistSans.variable, GeistMono.variable)}>
      <body className="antialiased text-slate-100">
        <CircuitBackground />
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8 py-12">
            {/* Main Content - Left Side (70%) */}
            <main className="flex-1 lg:max-w-3xl">
              <Navbar />
              {children}
              <Footer />
            </main>

            {/* Sidebar - Right Side (35%) */}
            <aside className="lg:w-96 lg:sticky lg:top-12 lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto">
              <div className="rounded-lg border border-slate-800 bg-slate-950/50 p-6">
                <GitHubActivity />
              </div>
            </aside>
          </div>
        </div>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}