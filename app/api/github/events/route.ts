import { NextRequest, NextResponse } from 'next/server'

export const revalidate = 15 * 60

const USERNAME_PATTERN = /^[a-z\d](?:[a-z\d-]{0,37}[a-z\d])?$/i

interface GitHubEventResponse {
  id?: string
  type?: string
  repo?: {
    name?: string
    url?: string
  }
  created_at?: string
  payload?: {
    size?: number
    commits?: unknown[]
    ref_type?: string
    action?: string
  }
}

export async function GET(request: NextRequest) {
  const username = request.nextUrl.searchParams.get('username')

  if (!username || !USERNAME_PATTERN.test(username)) {
    return NextResponse.json({ error: 'A valid username is required' }, { status: 400 })
  }

  try {
    const response = await fetch(
      `https://api.github.com/users/${encodeURIComponent(username)}/events/public`,
      {
        headers: {
          Accept: 'application/vnd.github+json',
          'User-Agent': 'shashwatraj-portfolio',
        },
        next: { revalidate: 15 * 60 },
      },
    )

    if (!response.ok) {
      throw new Error(`GitHub responded with ${response.status}`)
    }

    const data = (await response.json()) as GitHubEventResponse[]
    const events = data
      .filter((event) => event.id && event.type)
      .slice(0, 30)
      .map((event) => ({
        id: event.id,
        type: event.type,
        repo: event.repo?.name
          ? { name: event.repo.name, url: event.repo.url ?? '' }
          : undefined,
        created_at: event.created_at,
        payload: {
          size: event.payload?.size ?? event.payload?.commits?.length,
          ref_type: event.payload?.ref_type,
          action: event.payload?.action,
        },
      }))

    return NextResponse.json(events, {
      headers: {
        'Cache-Control': 'public, s-maxage=900, stale-while-revalidate=3600',
      },
    })
  } catch (error) {
    console.error('GitHub events request failed:', error)
    return NextResponse.json({ error: 'Failed to load GitHub activity' }, { status: 502 })
  }
}
