import 'server-only'

import { existsSync } from 'node:fs'
import path from 'node:path'

export function getBlogImagePath(imageDirectory: string, fileName: string) {
  const imagePath = path.join(
    process.cwd(),
    'public',
    'blog-images',
    imageDirectory,
    fileName
  )

  if (!existsSync(imagePath)) {
    return null
  }

  return `/blog-images/${encodeURIComponent(imageDirectory)}/${encodeURIComponent(fileName)}`
}
