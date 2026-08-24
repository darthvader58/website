'use client'

import { useEffect, useState } from 'react'
import { useGithubHeatmap } from '../lib/useGithubHeatmap'

const HEAT_OPACITY = [0.08, 0.28, 0.5, 0.72, 1]

interface GitHubEvent {
  id: string
  type: string
  repo?: {
    name?: string
    url: string
  }
  created_at?: string
  payload?: any
}

type GroupedGitHubEvent = GitHubEvent & { totalCommits?: number }

function hasRepoName<T extends GitHubEvent>(event: T): event is T & { repo: { name: string; url: string } } {
  return typeof event.repo?.name === 'string' && event.repo.name.length > 0
}

function getRepoName(event: GitHubEvent) {
  const fullName = event.repo?.name

  if (!fullName) {
    return 'GitHub'
  }

  return fullName.split('/').pop() || fullName
}

function getRepoUrl(event: GitHubEvent) {
  return hasRepoName(event) ? `https://github.com/${event.repo.name}` : `https://github.com/darthvader58`
}

export default function GitHubActivity() {
  const [events, setEvents] = useState<GitHubEvent[]>([])
  const [loading, setLoading] = useState(true)
  const username = 'darthvader58'
  const heatmap = useGithubHeatmap(username)

  useEffect(() => {
    fetch(`https://api.github.com/users/${username}/events/public`)
      .then(res => res.json())
      .then(data => {
        if (!Array.isArray(data)) {
          setEvents([])
          setLoading(false)
          return
        }

        // Group consecutive push events to the same repo
        const groupedEvents: GroupedGitHubEvent[] = []
        
        data.forEach((event: GitHubEvent) => {
          if (!event?.id || !event?.type) {
            return
          }

          const lastEvent = groupedEvents[groupedEvents.length - 1]
          
          // If this is a push event to the same repo as the last event, merge them
          if (
            lastEvent &&
            event.type === 'PushEvent' &&
            lastEvent.type === 'PushEvent' &&
            hasRepoName(event) &&
            hasRepoName(lastEvent) &&
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

  const getEventDescription = (event: GroupedGitHubEvent) => {
    const repoName = getRepoName(event)
    switch (event.type) {
      case 'PushEvent':
        const commits = event.totalCommits || event.payload?.size || event.payload?.commits?.length || 1
        return `Pushed ${commits} commit${commits !== 1 ? 's' : ''} to ${repoName}`
      case 'CreateEvent':
        return `Created ${event.payload?.ref_type || 'something'} in ${repoName}`
      case 'WatchEvent':
        return `Starred ${repoName}`
      case 'ForkEvent':
        return `Forked ${repoName}`
      case 'PullRequestEvent':
        return `${event.payload?.action || 'Updated'} pull request in ${repoName}`
      case 'IssuesEvent':
        return `${event.payload?.action || 'Updated'} issue in ${repoName}`
      default:
        return `Activity in ${repoName}`
    }
  }

  const getTimeAgo = (date?: string) => {
    if (!date) {
      return 'Recently'
    }

    const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000)

    if (!Number.isFinite(seconds)) {
      return 'Recently'
    }
    
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
            <div className="h-4 bg-[var(--chip)] rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-[var(--chip)] rounded w-1/2"></div>
          </div>
        ))}
      </div>
    )
  }

  // Language data based on your GitHub profile
  const languages = [
    { name: 'Python', percentage: 28.5 },
    { name: 'TypeScript', percentage: 18.2 },
    { name: 'JavaScript', percentage: 15.8 },
    { name: 'C', percentage: 12.4 },
    { name: 'Java', percentage: 8.6 },
    { name: 'Swift', percentage: 6.3 },
    { name: 'Rust', percentage: 4.2 },
    { name: 'Go', percentage: 3.1 },
    { name: 'Ruby', percentage: 2.9 }
  ]

  return (
    <div className="space-y-6">
      {/* Contribution Graph - native heatmap grid */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-[var(--fg)]">Contributions</h3>
        <div className="overflow-x-auto rounded-lg border border-[var(--line)] bg-[var(--chip)] p-3 pb-2">
          {heatmap.loading ? (
            <div className="h-[104px] animate-pulse rounded bg-[var(--line)]" />
          ) : !heatmap.live ? (
            <p className="py-6 text-center text-xs text-[var(--soft)]">Contributions are unavailable right now.</p>
          ) : (
            <div className="min-w-[640px]">
              <div
                className="relative mb-1.5 h-[13px] font-mono text-[10px] text-[var(--soft)]"
                style={{ display: 'grid', gridTemplateColumns: `repeat(${heatmap.columns}, 10px)`, gap: '3px' }}
              >
                {heatmap.monthLabels.map((m) => (
                  <span key={m.column} className="whitespace-nowrap" style={{ gridColumnStart: m.column + 1 }}>
                    {m.label}
                  </span>
                ))}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: `repeat(${heatmap.columns}, 10px)`, gap: '3px' }}>
                {heatmap.cells.map((cell) => (
                  <span
                    key={cell.date}
                    title={cell.date}
                    className="size-[10px] rounded-[2px] bg-[var(--fg)] transition-transform duration-150 hover:scale-125"
                    style={{ opacity: HEAT_OPACITY[cell.level] }}
                  />
                ))}
              </div>

              <div className="mt-2.5 flex items-center justify-between font-mono text-[11px] text-[var(--muted)]">
                <span>{heatmap.total.toLocaleString()} contributions in the last year</span>
                <span className="flex items-center gap-1.5">
                  Less
                  {HEAT_OPACITY.map((o) => (
                    <span key={o} className="size-[10px] rounded-[2px] bg-[var(--fg)]" style={{ opacity: o }} />
                  ))}
                  More
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Language Stats - Monochrome, glitch-textured bars */}
      <div className="space-y-3">
        <h3 className="text-glitch text-sm font-semibold uppercase tracking-widest text-[var(--fg)]">Top Languages</h3>
        <div className="rounded-lg border border-[var(--line)] bg-[var(--chip)] p-3 space-y-2.5">
          {languages.slice(0, 8).map((lang) => (
            <div key={lang.name}>
              <div className="mb-1 flex justify-between font-mono text-xs">
                <span className="text-[var(--muted)]">{lang.name}</span>
                <span className="text-[var(--soft)]">{lang.percentage.toString().padStart(4, '0')}%</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-[var(--line)]">
                <div
                  className="h-1.5 rounded-full transition-all duration-500"
                  style={{
                    width: `${lang.percentage}%`,
                    backgroundImage: 'repeating-linear-gradient(45deg, var(--fg) 0, var(--fg) 2px, transparent 2px, transparent 4px)',
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-[var(--fg)]">Recent Activity</h3>
        <div className="space-y-3">
          {events.slice(0, 5).map(event => (
            <a
              key={event.id}
              href={getRepoUrl(event)}
              target="_blank"
              rel="noopener noreferrer"
              className="block group"
            >
              <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-[var(--hover)] transition-colors">
                <div className="text-purple-400 mt-0.5">
                  {getEventIcon(event.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-[var(--muted)] group-hover:text-[var(--fg)] transition-colors line-clamp-2">
                    {getEventDescription(event)}
                  </p>
                  <p className="text-xs text-[var(--soft)] mt-1">
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
