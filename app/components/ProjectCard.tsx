'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

interface ProjectCardProps {
  title: string
  description: string
  technologies: string[]
  github?: string
  link?: string
  hasLivePreview?: boolean
  customPreview?: 'queens-crown' | string
  previewImage?: string
}

export default function ProjectCard({ title, description, technologies, github, link, hasLivePreview, customPreview, previewImage }: ProjectCardProps) {
  const href = hasLivePreview ? link : github || '#'
  const [showIframe, setShowIframe] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [showReadMore, setShowReadMore] = useState(false)
  
  // Only try to load iframe for vercel.app domains
  useEffect(() => {
    if (hasLivePreview && link) {
      setShowIframe(link.includes('vercel.app'))
    }
  }, [hasLivePreview, link])
  
  // Check if description is longer than 2 lines (roughly 100 characters)
  useEffect(() => {
    setShowReadMore(description.length > 100)
  }, [description])
  
  // Render custom preview for specific projects
  const renderCustomPreview = () => {
    if (customPreview === 'queens-crown') {
      return (
        <div className="w-full h-full bg-gradient-to-br from-purple-700 to-purple-900 flex items-center justify-center relative overflow-hidden">
          <svg className="w-32 h-32" viewBox="0 0 100 100" fill="none">
            {/* Crown base */}
            <rect x="25" y="70" width="50" height="8" fill="#FDB022" />
            <rect x="27" y="72" width="46" height="4" fill="#FBBF24" />
            
            {/* Sparkles on base */}
            <circle cx="35" cy="74" r="1.5" fill="white" opacity="0.9" />
            <circle cx="50" cy="74" r="1.5" fill="white" opacity="0.9" />
            <circle cx="65" cy="74" r="1.5" fill="white" opacity="0.9" />
            
            {/* Crown body */}
            <path d="M 28 70 L 32 40 L 42 50 L 50 30 L 58 50 L 68 40 L 72 70 Z" fill="#FDB022" />
            <path d="M 30 70 L 34 42 L 43 51 L 50 33 L 57 51 L 66 42 L 70 70 Z" fill="#FBBF24" />
            
            {/* Crown points (circles) */}
            <circle cx="32" cy="40" r="4" fill="#FDB022" />
            <circle cx="32" cy="40" r="3" fill="#FBBF24" />
            
            <circle cx="50" cy="30" r="5" fill="#FDB022" />
            <circle cx="50" cy="30" r="4" fill="#FBBF24" />
            
            <circle cx="68" cy="40" r="4" fill="#FDB022" />
            <circle cx="68" cy="40" r="3" fill="#FBBF24" />
            
            {/* Sparkles */}
            <g className="animate-pulse">
              <path d="M 50 25 L 51 27 L 53 28 L 51 29 L 50 31 L 49 29 L 47 28 L 49 27 Z" fill="white" opacity="0.9" />
              <path d="M 68 35 L 69 36.5 L 70.5 37.5 L 69 38.5 L 68 40 L 67 38.5 L 65.5 37.5 L 67 36.5 Z" fill="white" opacity="0.8" />
            </g>
          </svg>
        </div>
      )
    }
    return null
  }
  
  return (
    <Link 
      href={href || '#'} 
      target="_blank"
      rel="noopener noreferrer"
      className="block group"
    >
      <div className="border border-slate-800 rounded-lg p-6 hover:border-purple-700/50 transition-all duration-300 bg-slate-950/30">
        <div className="mb-4 h-48 rounded-md overflow-hidden flex items-center justify-center relative">
          {previewImage ? (
            <div className="w-full h-full relative">
              <img 
                src={previewImage}
                alt={`${title} preview`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            </div>
          ) : customPreview ? (
            renderCustomPreview()
          ) : hasLivePreview && link && showIframe ? (
            <div className="w-full h-full relative">
              <iframe 
                src={link}
                className="w-full h-full border-0 pointer-events-none scale-[0.5] origin-top-left"
                style={{ width: '200%', height: '200%' }}
                title={`${title} preview`}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute top-2 right-2 bg-purple-600/90 text-white text-xs px-2 py-1 rounded">
                Live
              </div>
            </div>
          ) : hasLivePreview && link ? (
            <div className="w-full h-full bg-gradient-to-br from-purple-900/40 to-blue-900/40 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-4 left-4 w-16 h-16 border-2 border-purple-400 rounded-full animate-pulse" />
                <div className="absolute bottom-8 right-8 w-12 h-12 border-2 border-blue-400 rounded-lg animate-pulse" style={{ animationDelay: '0.5s' }} />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 border-2 border-purple-300 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
              </div>
              <div className="text-center relative z-10">
                <svg className="w-12 h-12 mx-auto mb-3 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
                <p className="text-sm font-medium text-purple-300 mb-1">Live Site</p>
                <p className="text-xs text-slate-400">Click to visit →</p>
              </div>
              <div className="absolute top-2 right-2 bg-green-600/90 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-300 rounded-full animate-pulse" />
                Online
              </div>
            </div>
          ) : github ? (
            <div className="w-full h-full bg-gradient-to-br from-slate-900/50 to-slate-800/50 flex items-center justify-center">
              <div className="text-center">
                <svg className="w-6 h-6 mx-auto mb-2 text-slate-400" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
                </svg>
                <p className="text-xs text-slate-400 mt-1">{title}</p>
              </div>
            </div>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-purple-950/30 to-slate-900/30 flex items-center justify-center relative overflow-hidden">
              <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 200 100">
                <path d="M 10 50 L 50 50" stroke="#a855f7" strokeWidth="2" fill="none" />
                <path d="M 50 30 L 50 70" stroke="#a855f7" strokeWidth="2" fill="none" />
                <path d="M 50 50 L 90 50" stroke="#a855f7" strokeWidth="2" fill="none" />
                <circle cx="10" cy="50" r="3" fill="#a855f7" />
                <circle cx="50" cy="50" r="4" fill="#a855f7" />
                <circle cx="90" cy="50" r="3" fill="#a855f7" />
                <path d="M 110 50 L 150 50" stroke="#8b5cf6" strokeWidth="2" fill="none" />
                <path d="M 150 30 L 150 70" stroke="#8b5cf6" strokeWidth="2" fill="none" />
                <circle cx="110" cy="50" r="3" fill="#8b5cf6" />
                <circle cx="150" cy="50" r="4" fill="#8b5cf6" />
              </svg>
              <p className="text-xs text-slate-400 relative z-10">{title}</p>
            </div>
          )}
        </div>
        
        <h3 className="text-lg font-semibold text-slate-100 group-hover:text-purple-400 transition-colors mb-2">
          {title}
        </h3>
        
        <div className="mb-4">
          <p className={`text-sm text-slate-400 ${!isExpanded && showReadMore ? 'line-clamp-2' : ''}`}>
            {description}
          </p>
          {showReadMore && (
            <button
              onClick={(e) => {
                e.preventDefault()
                setIsExpanded(!isExpanded)
              }}
              className="text-xs text-purple-400 hover:text-purple-300 mt-1 transition-colors"
            >
              {isExpanded ? 'Read less' : 'Read more'}
            </button>
          )}
        </div>
        
        <div className="flex flex-wrap gap-2 mt-auto">
          {technologies.slice(0, 5).map((tech, i) => (
            <span key={i} className="text-xs px-2 py-1 rounded bg-purple-950/50 text-purple-300 border border-purple-900/50">
              {tech}
            </span>
          ))}
          {technologies.length > 5 && (
            <span className="text-xs px-2 py-1 rounded bg-slate-900/50 text-slate-400">
              +{technologies.length - 5} more
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}