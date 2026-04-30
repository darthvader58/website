import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { sendPendingBlogPostNewsletters } from '@/app/lib/newsletter'

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization')

  if (!process.env.CRON_SECRET || authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const results = await sendPendingBlogPostNewsletters()

    return NextResponse.json({
      success: true,
      processed: results.length,
      results: results.map((result) => {
        if ('sent' in result) {
          return {
            status: result.status,
            post: {
              slug: result.post.slug,
              title: result.post.title,
            },
            sent: result.sent,
            failed: result.failed,
          }
        }

        return {
          status: result.status,
          post: null,
          sent: 0,
          failed: 0,
        }
      }),
    })
  } catch (error) {
    console.error('Cron newsletter processing error:', error)
    return NextResponse.json(
      { error: 'Failed to process pending blog newsletters' },
      { status: 500 }
    )
  }
}
