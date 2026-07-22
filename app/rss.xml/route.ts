import { getPublishedBlogPosts } from '../lib/blog'

export const revalidate = 3600

const SITE_URL = 'https://shashwatraj.com'
const FEED_URL = `${SITE_URL}/rss.xml`

function escapeXml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => {
    const entities: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&apos;',
      '"': '&quot;',
    }

    return entities[character]
  })
}

function formatRssDate(date: string) {
  return new Date(`${date}T00:00:00.000Z`).toUTCString()
}

export async function GET() {
  const posts = getPublishedBlogPosts()
  const lastBuildDate = posts[0]
    ? formatRssDate(posts[0].publishedAt)
    : new Date().toUTCString()

  const items = posts
    .map((post) => {
      const postUrl = `${SITE_URL}/blog/${post.slug}`
      const description = `${post.subtitle} ${post.excerpt}`

      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <description>${escapeXml(description)}</description>
      <category>${escapeXml(post.category)}</category>
      <pubDate>${formatRssDate(post.publishedAt)}</pubDate>
    </item>`
    })
    .join('\n')

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Shashwat Raj — Blog</title>
    <link>${SITE_URL}/blog</link>
    <description>Essays on software, systems, AI, physics, and engineering by Shashwat Raj.</description>
    <language>en-us</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${FEED_URL}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`

  return new Response(feed, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
