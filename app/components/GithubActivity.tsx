'use client'

import { useEffect, useState } from 'react'

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

  useEffect(() => {
    fetch(`https://api.github.com/users/${username}/events/public`)
      .then(res => res.json())
      .then(data => {
        setEvents(data.slice(0, 10))
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

  const getEventDescription = (event: GitHubEvent) => {
    const repoName = event.repo.name.split('/')[1]
    switch (event.type) {
      case 'PushEvent':
        const commits = event.payload.commits?.length || 0
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

  return (
    <div className="space-y-3">
      {events.map(event => (
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
  )
}