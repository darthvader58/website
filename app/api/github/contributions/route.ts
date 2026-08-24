import { NextRequest, NextResponse } from 'next/server'

export const revalidate = 3600

export async function GET(request: NextRequest) {
  const username = request.nextUrl.searchParams.get('username')

  if (!username) {
    return NextResponse.json({ error: 'username is required' }, { status: 400 })
  }

  try {
    const res = await fetch(`https://github.com/users/${username}/contributions`, {
      headers: { 'User-Agent': 'Mozilla/5.0' },
      next: { revalidate: 3600 },
    })

    if (!res.ok) {
      throw new Error(`GitHub responded with ${res.status}`)
    }

    const html = await res.text()

    const cells: { date: string; level: number }[] = []
    const cellPattern = /data-date="(\d{4}-\d{2}-\d{2})"[^>]*data-level="(\d)"/g
    let match: RegExpExecArray | null
    while ((match = cellPattern.exec(html))) {
      cells.push({ date: match[1], level: Number(match[2]) })
    }

    const totalMatch = html.match(/([\d,]+)\s+contributions?\s+in the last year/)
    const total = totalMatch ? Number(totalMatch[1].replace(/,/g, '')) : cells.reduce((sum) => sum, 0)

    if (cells.length === 0) {
      throw new Error('No contribution cells found')
    }

    return NextResponse.json({ cells, total })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to load contributions' }, { status: 502 })
  }
}
