import './globals.css'
import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Instrument_Serif } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import OnekoCat from './components/OnekoCat'
import { ThemeProvider } from './components/ThemeProvider'
import SiteShell from './components/SiteShell'

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-instrument-serif',
})

export const metadata: Metadata = {
  title: 'Shash is me',
  description: 'Computer Engineering & Math student at Arizona State University. Passionate about embedded systems, robotics, and full-stack development.',
  icons: {
    icon: '/assets/favicon.ico',
  },
  alternates: {
    types: {
      'application/rss+xml': 'https://shashwatraj.com/rss.xml',
    },
  },
  openGraph: {
    title: 'Shash is me',
    description: 'Computer Engineering & Math student at Arizona State University',
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
    <html lang="en" className={cx(GeistSans.variable, GeistMono.variable, instrumentSerif.variable)}>
      <body className="font-sans antialiased text-[var(--fg)]">
        <ThemeProvider>
          <OnekoCat />
          <SiteShell>{children}</SiteShell>
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  )
}
