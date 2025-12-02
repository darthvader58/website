'use client'

import { useEffect, useState } from 'react'
import { useTheme } from './ThemeProvider'

interface GitHubEvent {
  id: string
  type: string
  repo: {
    name: string
    url: string
  }
  created_at: string
  payload: any
}

export default function GitHubActivity() {
  const [events, setEvents] = useState<GitHubEvent[]>([])
  const [loading, setLoading] = useState(true)
  const username = 'darthvader58'
  
  let theme = 'dark'
  try {
    const themeContext = useTheme()
    theme = themeContext.theme
  } catch (e) {
    // ThemeProvider not available yet
  }

  useEffect(() => {
    fetch(`https://api.github.com/users/${username}/events/public`)
      .then(res => res.json())
      .then(data => {
        // Group consecutive push events to the same repo
        const groupedEvents: (GitHubEvent & { totalCommits?: number })[] = []
        
        data.forEach((event: GitHubEvent) => {
          const lastEvent = groupedEvents[groupedEvents.length - 1]
          
          // If this is a push event to the same repo as the last event, merge them
          if (
            lastEvent &&
            event.type === 'PushEvent' &&
            lastEvent.type === 'PushEvent' &&
            event.repo.name === lastEvent.repo.name
          ) {
            const commits = event.payload?.size || event.payload?.commits?.length || 1
            lastEvent.totalCommits = (lastEvent.totalCommits || 0) + commits
          } else {
            // Add as new event
            groupedEvents.push({
              ...event,
              totalCommits: event.type === 'PushEvent'
                ? event.payload?.size || event.payload?.commits?.length || 1
                : undefined
            })
          }
        })
        
        setEvents(groupedEvents.slice(0, 10))
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'PushEvent':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Zm7-3.25v2.992l2.028.812a.75.75 0 0 1-.557 1.392l-2.5-1A.75.75 0 0 1 7 8.25v-3.5a.75.75 0 0 1 1.5 0Z"/>
          </svg>
        )
      case 'CreateEvent':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
            <path d="M7.75 2a.75.75 0 0 1 .75.75V7h4.25a.75.75 0 0 1 0 1.5H8.5v4.25a.75.75 0 0 1-1.5 0V8.5H2.75a.75.75 0 0 1 0-1.5H7V2.75A.75.75 0 0 1 7.75 2Z"/>
          </svg>
        )
      case 'WatchEvent':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.75.75 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z"/>
          </svg>
        )
      default:
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Z"/>
          </svg>
        )
    }
  }

  const getEventDescription = (event: GitHubEvent & { totalCommits?: number }) => {
    const repoName = event.repo.name.split('/')[1]
    switch (event.type) {
      case 'PushEvent':
        const commits = event.totalCommits || event.payload?.size || event.payload?.commits?.length || 1
        return `Pushed ${commits} commit${commits !== 1 ? 's' : ''} to ${repoName}`
      case 'CreateEvent':
        return `Created ${event.payload.ref_type} in ${repoName}`
      case 'WatchEvent':
        return `Starred ${repoName}`
      case 'ForkEvent':
        return `Forked ${repoName}`
      case 'PullRequestEvent':
        return `${event.payload.action} pull request in ${repoName}`
      case 'IssuesEvent':
        return `${event.payload.action} issue in ${repoName}`
      default:
        return `Activity in ${repoName}`
    }
  }

  const getTimeAgo = (date: string) => {
    const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000)
    
    if (seconds < 60) return `${seconds}s ago`
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
    return `${Math.floor(seconds / 86400)}d ago`
  }

  if (loading) {
    return (
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="h-4 bg-slate-800 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-slate-800 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    )
  }

  // Language data based on your GitHub profile
  const languages = [
    { name: 'Python', percentage: 28.5, color: '#3572A5' },
    { name: 'TypeScript', percentage: 18.2, color: '#3178c6' },
    { name: 'JavaScript', percentage: 15.8, color: '#f1e05a' },
    { name: 'C', percentage: 12.4, color: '#555555' },
    { name: 'Java', percentage: 8.6, color: '#b07219' },
    { name: 'Swift', percentage: 6.3, color: '#F05138' },
    { name: 'Rust', percentage: 4.2, color: '#dea584' },
    { name: 'Go', percentage: 3.1, color: '#00ADD8' },
    { name: 'Ruby', percentage: 2.9, color: '#701516' }
  ]

  return (
    <div className="space-y-6">
      {/* Activity Overview - Radar Chart Style */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-slate-100">Activity Overview</h3>
        <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-3">
          <div className="flex items-center justify-center h-40 relative">
            <svg viewBox="0 0 200 200" className="w-full h-full">
              {/* Grid circles */}
              <circle cx="100" cy="100" r="80" fill="none" stroke="#1e293b" strokeWidth="1" />
              <circle cx="100" cy="100" r="60" fill="none" stroke="#1e293b" strokeWidth="1" />
              <circle cx="100" cy="100" r="40" fill="none" stroke="#1e293b" strokeWidth="1" />
              <circle cx="100" cy="100" r="20" fill="none" stroke="#1e293b" strokeWidth="1" />
              
              {/* Axes */}
              <line x1="100" y1="20" x2="100" y2="180" stroke="#334155" strokeWidth="1" />
              <line x1="20" y1="100" x2="180" y2="100" stroke="#334155" strokeWidth="1" />
              
              {/* Data polygon - Commits: 87%, Code review: 12%, Issues: 25%, Pull requests: 18% */}
              <polygon 
                points="100,90 120,100 100,140 30,100" 
                fill="#10b981" 
                fillOpacity="0.3" 
                stroke="#10b981" 
                strokeWidth="2"
              />
              
              {/* Data points */}
              <circle cx="100" cy="90" r="4" fill="#10b981" />
              <circle cx="120" cy="100" r="4" fill="#10b981" />
              <circle cx="100" cy="140" r="4" fill="#10b981" />
              <circle cx="30" cy="100" r="4" fill="#10b981" />
              
              {/* Labels - positioned outside the chart */}
              <text x="100" y="12" textAnchor="middle" fill="#94a3b8" fontSize="9" fontWeight="500">Code review</text>
              <text x="188" y="103" textAnchor="start" fill="#94a3b8" fontSize="9" fontWeight="500">Issues</text>
              <text x="100" y="198" textAnchor="middle" fill="#94a3b8" fontSize="9" fontWeight="500">Pull requests</text>
              <text x="12" y="95" textAnchor="end" fill="#94a3b8" fontSize="9" fontWeight="500">Commits</text>
              
              {/* Percentage labels - positioned near data points */}
              <text x="100" y="82" textAnchor="middle" fill="#e2e8f0" fontSize="10" fontWeight="bold">12%</text>
              <text x="128" y="103" textAnchor="start" fill="#e2e8f0" fontSize="10" fontWeight="bold">25%</text>
              <text x="100" y="152" textAnchor="middle" fill="#e2e8f0" fontSize="10" fontWeight="bold">18%</text>
              <text x="22" y="110" textAnchor="end" fill="#e2e8f0" fontSize="10" fontWeight="bold">87%</text>
            </svg>
          </div>
        </div>
      </div>

      {/* Contribution Graph - Scrollable */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-100">Contributions</h3>
          <span className="text-xs text-slate-500">Last 365 days</span>
        </div>
        <div 
          className="rounded-lg border border-slate-800 bg-slate-900 p-3 overflow-x-auto"
          ref={(el) => {
            if (el) {
              // Scroll to show the most recent contributions (right side)
              el.scrollLeft = el.scrollWidth - el.clientWidth
            }
          }}
        >
          <div className="min-w-[900px]">
            <img 
              src={`https://ghchart.rshah.org/${username}`}
              alt="GitHub Contribution Chart"
              className="w-full"
              style={theme === 'light' ? { 
                filter: 'brightness(0.9) contrast(1.1)',
                mixBlendMode: 'normal'
              } : { 
                filter: 'invert(1) hue-rotate(180deg)',
                mixBlendMode: 'screen'
              }}
              loading="lazy"
            />
          </div>
        </div>
      </div>

      {/* Language Stats - Custom */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-slate-100">Top Languages</h3>
        <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-3 space-y-2">
          {languages.slice(0, 8).map((lang) => (
            <div key={lang.name}>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300">{lang.name}</span>
                <span className="text-slate-400">{lang.percentage}%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-1.5">
                <div 
                  className="h-1.5 rounded-full transition-all duration-500"
                  style={{ 
                    width: `${lang.percentage}%`,
                    backgroundColor: lang.color
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-slate-100">Recent Activity</h3>
        <div className="space-y-3">
          {events.slice(0, 5).map(event => (
            <a
              key={event.id}
              href={`https://github.com/${event.repo.name}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block group"
            >
              <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-900/50 transition-colors">
                <div className="text-purple-400 mt-0.5">
                  {getEventIcon(event.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-300 group-hover:text-slate-100 transition-colors line-clamp-2">
                    {getEventDescription(event)}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    {getTimeAgo(event.created_at)}
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}