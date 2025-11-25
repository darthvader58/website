'use client'

import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'

const navItems = {
  '/': { name: 'Home' },
  '/experience': { name: 'Experience' },
  '/projects': { name: 'Projects' },
  /*'/gcsp': { name: 'GCSP' },*/
  '/resume': { name: 'Resume' },
  '/coffee': { name: 'Contact' },
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <aside className="-ml-[8px] mb-16 tracking-tight">
      <div className="lg:sticky lg:top-20">
        <nav className="flex flex-col md:flex-row items-start relative px-0 pb-0 fade md:overflow-auto scroll-pr-6 md:relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex flex-col justify-center items-center p-2 m-1 focus:outline-none"
          >
            <span className={`block w-6 h-0.5 bg-purple-400 transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-purple-400 mt-1 transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-purple-400 mt-1 transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
          </button>

          <div className="hidden md:flex flex-row space-x-0 pr-10">
            {Object.entries(navItems).map(([path, { name }]) => {
              const isActive = pathname === path || (path !== '/' && pathname?.startsWith(path))
              return (
                <Link
                  key={path}
                  href={path}
                  className={`transition-all hover:text-purple-400 flex align-middle relative py-1 px-2 m-1 ${
                    isActive ? 'text-purple-300 font-medium' : 'text-slate-400'
                  }`}
                >
                  {name}
                </Link>
              )
            })}
          </div>

          <div className={`md:hidden flex flex-col w-full space-y-1 transition-all duration-300 overflow-hidden ${
              isOpen ? 'max-h-96 opacity-100 mt-2' : 'max-h-0 opacity-0'
            }`}>
            {Object.entries(navItems).map(([path, { name }]) => {
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