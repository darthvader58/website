export const baseUrl = 'https://shashwatraj.com'

export default async function sitemap() {
  let routes = ['', '/experience', '/projects', '/resume', '/coffee'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  return [...routes]
}