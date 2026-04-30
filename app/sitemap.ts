import { MetadataRoute } from 'next'
import { getAllBlogPosts } from './lib/blog'

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/blog',
    '/experience',
    '/projects',
    '/resume',
    '/coffee',
    '/gcsp',
    '/gcsp/talent',
    '/gcsp/service',
    '/gcsp/entrepreneurship',
    '/gcsp/multicultural',
  ]

  const blogRoutes = getAllBlogPosts().map((post) => `/blog/${post.slug}`)

  return [...routes, ...blogRoutes].map((route) => ({
    url: `https://shashwatraj.com${route}`,
    lastModified: new Date().toISOString(),
  }))
}
