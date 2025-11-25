import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
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

  return routes.map((route) => ({
    url: `https://shashwatraj.com${route}`,
    lastModified: new Date().toISOString(),
  }))
}