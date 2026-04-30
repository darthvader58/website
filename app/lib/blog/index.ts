import { blogPosts } from './posts'

export type { BlogPost, BlogPostBlock } from './types'

const longDateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
  timeZone: 'UTC',
})

const shortDateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
  timeZone: 'UTC',
})

function parseDateString(dateString: string) {
  const [year, month, day] = dateString.split('-').map(Number)
  return new Date(Date.UTC(year, month - 1, day))
}

export function getAllBlogPosts() {
  return [...blogPosts].sort(
    (a, b) => parseDateString(b.publishedAt).getTime() - parseDateString(a.publishedAt).getTime()
  )
}

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug)
}

export function getLatestBlogPost() {
  return getAllBlogPosts()[0]
}

export function formatBlogDate(
  dateString: string,
  variant: 'long' | 'short' = 'long'
) {
  const date = parseDateString(dateString)
  return variant === 'short'
    ? shortDateFormatter.format(date)
    : longDateFormatter.format(date)
}
