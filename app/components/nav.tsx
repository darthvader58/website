'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useTheme } from './ThemeProvider'

const navItems = {
  '/': { name: 'Home' },
  '/experience': { name: 'Experience' },
  '/projects': { name: 'Projects' },
  '/blog': { name: 'Blog' },
  /*'/gcsp': { name: 'GCSP' },*/
  '/resume': { name: 'Resume' },
}

const rightNavItems = {
  '/coffee': { name: 'Coffee' },
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)
  
  let theme = 'dark'
  let toggleTheme = () => {}
  
  try {
    const themeContext = useTheme()
    theme = themeContext.theme
    toggleTheme = themeContext.toggleTheme
  } catch (e) {
    // ThemeProvider not available yet
  }
  
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <aside className="-ml-[8px] mb-8 tracking-tight">
      <div className="lg:sticky lg:top-20">
        <nav className="flex flex-col md:flex-row items-start relative px-0 pb-4 fade md:overflow-auto scroll-pr-6 md:relative border-b border-slate-700">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex flex-col justify-center items-center p-2 m-1 focus:outline-none"
          >
            <span className={`block w-6 h-0.5 bg-purple-400 transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-purple-400 mt-1 transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-purple-400 mt-1 transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
          </button>

          <div className="hidden md:flex flex-row justify-between w-full items-center">
            <div className="flex flex-row space-x-0">
              {Object.entries(navItems).map(([path, { name }]) => {
                const isActive = pathname === path || (path !== '/' && pathname?.startsWith(path))
                return (
                  <Link
                    key={path}
                    href={path}
                    className={`transition-all hover:text-purple-400 flex align-middle relative py-1 px-2 m-1 ${
                      isActive ? 'text-purple-300 font-medium' : 'text-slate-400 dark:text-slate-400 light:text-slate-600'
                    }`}
                  >
                    {name}
                  </Link>
                )
              })}
            </div>
            <div className="flex flex-row space-x-0 items-center">
              {Object.entries(rightNavItems).map(([path, { name }]) => {
                const isActive = pathname === path || (path !== '/' && pathname?.startsWith(path))
                return (
                  <Link
                    key={path}
                    href={path}
                    className={`transition-all hover:text-purple-400 flex align-middle relative py-1 px-2 m-1 ${
                      isActive ? 'text-purple-300 font-medium' : 'text-slate-400 dark:text-slate-400 light:text-slate-600'
                    }`}
                  >
                    {name}
                  </Link>
                )
              })}
              <button
                onClick={toggleTheme}
                className="ml-2 p-2 rounded-lg hover:bg-slate-800 dark:hover:bg-slate-800 light:hover:bg-slate-200 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <svg className="w-5 h-5 text-slate-200" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-slate-700" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div className={`md:hidden flex flex-col w-full space-y-1 transition-all duration-300 overflow-hidden ${
              isOpen ? 'max-h-96 opacity-100 mt-2' : 'max-h-0 opacity-0'
            }`}>
            {Object.entries({...navItems, ...rightNavItems}).map(([path, { name }]) => {
              const isActive = pathname === path || (path !== '/' && pathname?.startsWith(path))
              return (
                <Link
                  key={path}
                  href={path}
                  onClick={() => setIsOpen(false)}
                  className={`transition-all hover:text-purple-400 hover:bg-slate-900 flex align-middle py-2 px-3 m-1 rounded-md ${
                    isActive ? 'text-purple-300 font-medium bg-slate-900' : 'text-slate-400'
                  }`}
                >
                  {name}
                </Link>
              )
            })}
          </div>
        </nav>
      </div>
    </aside>
  )
}