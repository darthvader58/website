import 'server-only'

import { existsSync, readdirSync } from 'node:fs'
import path from 'node:path'
import type { BlogImageSlot } from './blog'

const IMAGE_EXTENSIONS = /\.(png|jpe?g|webp|gif|avif|svg)$/i

const slotMatchers: Record<BlogImageSlot, RegExp[]> = {
  'after-safety': [
    /^after[-_ ]?safety/i,
    /^safety/i,
    /^image3\b/i,
    /^img3\b/i,
    /^slot3\b/i,
  ],
  'before-hackprinceton': [
    /^before[-_ ]?hack/i,
    /^hackprinceton/i,
    /^hack/i,
    /^image2\b/i,
    /^img2\b/i,
    /^slot2\b/i,
  ],
  'after-questions': [
    /^after[-_ ]?questions/i,
    /^questions/i,
    /^main/i,
    /^default/i,
    /^image1\b/i,
    /^img1\b/i,
    /^slot1\b/i,
  ],
}

const fallbackOrder: BlogImageSlot[] = [
  'after-safety',
  'before-hackprinceton',
  'after-questions',
]

export function getBlogImageMap(imageFolder: string) {
  const folderPath = path.join(process.cwd(), 'public', 'blog-images', imageFolder)

  if (!existsSync(folderPath)) {
    return {} as Partial<Record<BlogImageSlot, string>>
  }

  const files = readdirSync(folderPath)
    .filter((file) => !file.startsWith('.') && IMAGE_EXTENSIONS.test(file))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }))

  const imageMap: Partial<Record<BlogImageSlot, string>> = {}
  const usedFiles = new Set<string>()

  for (const slot of Object.keys(slotMatchers) as BlogImageSlot[]) {
    const matchedFile = files.find((file) =>
      slotMatchers[slot].some((pattern) => pattern.test(path.parse(file).name))
    )

    if (matchedFile) {
      imageMap[slot] = `/blog-images/${imageFolder}/${matchedFile}`
      usedFiles.add(matchedFile)
    }
  }

  const remainingFiles = files.filter((file) => !usedFiles.has(file))

  if (remainingFiles.length === 1 && !imageMap['after-questions']) {
    imageMap['after-questions'] = `/blog-images/${imageFolder}/${remainingFiles[0]}`
    return imageMap
  }

  const remainingSlots = fallbackOrder.filter((slot) => !imageMap[slot])

  remainingFiles.forEach((file, index) => {
    const slot = remainingSlots[index]

    if (slot) {
      imageMap[slot] = `/blog-images/${imageFolder}/${file}`
    }
  })

  return imageMap
}
