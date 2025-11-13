'use client'

import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'

const navItems = {
  '/': {
    name: 'Home',
  },
  '/experience': {
    name: 'Experience',
  },
  '/projects': {
    name: 'Projects',
  },
  /*'/blog': {
    name: 'Blogs',
  },*/
  /*'/gcsp': {
    name: 'GCSP',
  },*/
  '/resume': {
    name: 'Resume',
  },
  '/coffee': {
    name: 'Coffee',
  },
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  return (
    <aside className="-ml-[8px] mb-16 tracking-tight">
      <div className="lg:sticky lg:top-20">
        <nav className="flex flex-col md:flex-row items-start relative px-0 pb-0 fade md:overflow-auto scroll-pr-6 md:relative">
          <button
            onClick={toggleMenu}
            className="md:hidden flex flex-col justify-center items-center p-2 m-1 focus:outline-none"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            <span className={`block w-6 h-0.5 bg-neutral-800 dark:bg-neutral-200 transition-all duration-300 ease-in-out ${isOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-neutral-800 dark:bg-neutral-200 mt-1 transition-all duration-300 ease-in-out ${isOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-neutral-800 dark:bg-neutral-200 mt-1 transition-all duration-300 ease-in-out ${isOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
          </button>

          {/* Desktop Navigation - Always visible on md+ screens */}
          <div className="hidden md:flex flex-row space-x-0 pr-10">
            {Object.entries(navItems).map(([path, { name }]) => {
              const isActive = pathname === path || (path !== '/' && pathname?.startsWith(path))
              return (
                <Link
                  key={path}
                  href={path}
                  className={`transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle relative py-1 px-2 m-1 ${
                    isActive ? 'text-neutral-900 dark:text-neutral-100 font-medium' : 'text-neutral-600 dark:text-neutral-400'
                  }`}
                >
                  {name}
                </Link>
              )
            })}
          </div>

          {/* Mobile Navigation - Toggleable dropdown */}
          <div
            className={`md:hidden flex flex-col w-full space-y-1 transition-all duration-300 ease-in-out overflow-hidden ${
              isOpen ? 'max-h-96 opacity-100 mt-2' : 'max-h-0 opacity-0'
            }`}
          >
            {Object.entries(navItems).map(([path, { name }]) => {
              const isActive = pathname === path || (path !== '/' && pathname?.startsWith(path))
              return (
                <Link
                  key={path}
                  href={path}
                  onClick={closeMenu}
                  className={`transition-all hover:text-neutral-800 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-900 flex align-middle py-2 px-3 m-1 rounded-md ${
                    isActive ? 'text-neutral-900 dark:text-neutral-100 font-medium bg-neutral-100 dark:bg-neutral-900' : 'text-neutral-600 dark:text-neutral-400'
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