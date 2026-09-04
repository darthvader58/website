import type { BlogPost } from './types'

const MAX_NARRATION_PART_LENGTH = 1_800
const FIRST_NARRATION_PART_LENGTH = 260
const NARRATION_FORMAT_VERSION = 'v2'

const namedEntities: Record<string, string> = {
  amp: '&',
  apos: "'",
  gt: '>',
  lt: '<',
  nbsp: ' ',
  quot: '"',
}

function decodeHtmlEntities(value: string) {
  return value.replace(/&(#x?[\da-f]+|[a-z]+);/gi, (entity, code: string) => {
    if (code[0] !== '#') {
      return namedEntities[code.toLowerCase()] ?? entity
    }

    const isHex = code[1]?.toLowerCase() === 'x'
    const numericCode = Number.parseInt(code.slice(isHex ? 2 : 1), isHex ? 16 : 10)

    if (!Number.isFinite(numericCode)) {
      return entity
    }

    try {
      return String.fromCodePoint(numericCode)
    } catch {
      return entity
    }
  })
}

function htmlToNarrationText(html: string) {
  const visibleText = html
    .replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<sup\b[^>]*>[\s\S]*?<\/sup>/gi, ' ')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/\s*(?:blockquote|div|h[1-6]|li|ol|p|pre|section|ul)\s*>/gi, '\n')
    .replace(/<[^>]+>/g, ' ')

  return decodeHtmlEntities(visibleText)
    .split(/\n+/)
    .map((line) => line.replace(/\s+/g, ' ').trim())
    .filter(Boolean)
    .map((line) => (/[,.:;!?…]["')\]]?$/.test(line) ? line : `${line}.`))
    .join('\n\n')
}

function splitLongText(value: string, maxLength: number) {
  const pieces: string[] = []
  let current = ''

  for (const word of value.split(/\s+/)) {
    if (!word) continue

    if (current && current.length + word.length + 1 > maxLength) {
      pieces.push(current)
      current = word
    } else {
      current = current ? `${current} ${word}` : word
    }
  }

  if (current) pieces.push(current)
  return pieces
}

function splitParagraph(paragraph: string, maxLength: number) {
  const sentences = paragraph.match(/[^.!?…]+(?:[.!?…]+["')\]]*|$)/g) ?? [paragraph]

  return sentences.flatMap((sentence) => {
    const trimmed = sentence.trim()
    return trimmed.length > maxLength ? splitLongText(trimmed, maxLength) : [trimmed]
  })
}

function chunkNarration(text: string, maxLength = MAX_NARRATION_PART_LENGTH) {
  const chunks: string[] = []
  let current = ''

  const append = (piece: string) => {
    if (!piece) return

    const separator = current ? '\n\n' : ''
    const currentLimit = chunks.length === 0 ? FIRST_NARRATION_PART_LENGTH : maxLength

    if (current && current.length + separator.length + piece.length > currentLimit) {
      chunks.push(current)
      current = piece
      return
    }

    current += `${separator}${piece}`
  }

  for (const paragraph of text.split(/\n{2,}/)) {
    const trimmed = paragraph.trim()
    if (!trimmed) continue

    if (trimmed.length <= maxLength) {
      append(trimmed)
      continue
    }

    for (const sentence of splitParagraph(trimmed, maxLength)) {
      append(sentence)
    }
  }

  if (current) chunks.push(current)
  return chunks
}

function withTerminalPunctuation(value: string) {
  const trimmed = value.trim()
  return /[.!?…]["')\]]?$/.test(trimmed) ? trimmed : `${trimmed}.`
}

export function getBlogNarrationParts(post: BlogPost) {
  const articleText = post.blocks
    .filter((block) => block.type === 'html')
    .map((block) => htmlToNarrationText(block.html))
    .filter(Boolean)
    .join('\n\n')

  const introduction = [
    post.title,
    post.subtitle,
    `Written by ${post.author ?? 'Shashwat Raj'}.`,
  ]
    .map(withTerminalPunctuation)
    .join('\n\n')

  return chunkNarration(`${introduction}\n\n${articleText}`)
}

export function getBlogNarrationVersion(post: BlogPost) {
  const text = `${NARRATION_FORMAT_VERSION}:${getBlogNarrationParts(post).join('|')}`
  let hash = 2_166_136_261

  for (let index = 0; index < text.length; index += 1) {
    hash ^= text.charCodeAt(index)
    hash = Math.imul(hash, 16_777_619)
  }

  return (hash >>> 0).toString(36)
}
