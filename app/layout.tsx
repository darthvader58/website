import './global.css'
import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Navbar } from './components/nav'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Footer from './components/footer'

export const metadata: Metadata = {
  metadataBase: new URL('https://shashwatraj.com'),
  title: {
    default: 'Shashwat Raj | Computer Systems Engineering & Mathematics',
    template: '%s | Shashwat Raj',
  },
  description: 'Portfolio of Shashwat Raj - Computer Systems Engineering and Mathematics student at Arizona State University. Machine Learning Researcher, Software Developer, and Robotics Enthusiast.',
  openGraph: {
    title: 'Shashwat Raj | Computer Systems Engineering & Mathematics',
    description: 'Portfolio of Shashwat Raj - Computer Systems Engineering and Mathematics student at Arizona State University.',
    url: 'https://shashwatraj.com',
    siteName: 'Shashwat Raj Portfolio',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

const cx = (...classes: (string | false | null | undefined)[]) => classes.filter(Boolean).join(' ')

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={cx(
        'text-black bg-white dark:text-white dark:bg-black',
        GeistSans.variable,
        GeistMono.variable
      )}
    >
      <body className="antialiased max-w-xl mx-4 mt-8 lg:mx-auto">
        <main className="flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0">
          <Navbar />
          {children}
          <Footer />
          <Analytics />
          <SpeedInsights />
        </main>
      </body>
    </html>
  )
}