import Cartesia, { APIError } from '@cartesia/cartesia-js'
import { NextRequest, NextResponse } from 'next/server'
import { getPublishedBlogPosts } from '@/app/lib/blog'
import {
  getBlogNarrationParts,
  getBlogNarrationVersion,
} from '@/app/lib/blog/narration'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 60

const SHASH_VOICE_ID = 'c63361f8-d142-4c62-8da7-8f8149d973d6'
const MAX_MEMORY_CACHE_ENTRIES = 24
const QUOTA_BACKOFF_MS = 60_000

type CachedNarration = {
  bytes: ArrayBuffer
  contentType: string
}

type NarrationGlobals = typeof globalThis & {
  blogNarrationCache?: Map<string, CachedNarration>
  blogNarrationInFlight?: Map<string, Promise<CachedNarration>>
  blogNarrationQuotaBlockedUntil?: number
}

const narrationGlobals = globalThis as NarrationGlobals
const narrationCache =
  narrationGlobals.blogNarrationCache ?? new Map<string, CachedNarration>()
const narrationInFlight =
  narrationGlobals.blogNarrationInFlight ?? new Map<string, Promise<CachedNarration>>()

narrationGlobals.blogNarrationCache = narrationCache
narrationGlobals.blogNarrationInFlight = narrationInFlight
narrationGlobals.blogNarrationQuotaBlockedUntil ??= 0

function errorResponse(
  message: string,
  status: number,
  headers?: Record<string, string>
) {
  return NextResponse.json({ error: message }, { headers, status })
}

function quotaResponse() {
  const remainingSeconds = Math.max(
    1,
    Math.ceil(
      ((narrationGlobals.blogNarrationQuotaBlockedUntil ?? 0) - Date.now()) / 1_000
    )
  )

  return errorResponse(
    'Narration generation is temporarily unavailable because the Cartesia quota is exhausted.',
    402,
    {
      'Cache-Control': `private, max-age=${remainingSeconds}`,
      'Retry-After': String(remainingSeconds),
    }
  )
}

function cartesiaErrorResponse(error: unknown) {
  if (error instanceof APIError && error.status === 402) {
    narrationGlobals.blogNarrationQuotaBlockedUntil = Date.now() + QUOTA_BACKOFF_MS
    return quotaResponse()
  }

  return errorResponse('Narration could not be generated. Please try again.', 502)
}

function cacheNarration(key: string, narration: CachedNarration) {
  narrationCache.delete(key)
  narrationCache.set(key, narration)

  while (narrationCache.size > MAX_MEMORY_CACHE_ENTRIES) {
    const oldestKey = narrationCache.keys().next().value
    if (!oldestKey) break
    narrationCache.delete(oldestKey)
  }
}

function narrationResponse(
  narration: CachedNarration,
  fileName: string,
  partIndex: number,
  partCount: number,
  cacheStatus: 'COALESCED' | 'HIT'
) {
  return new Response(narration.bytes, {
    headers: {
      'Cache-Control': 'public, max-age=31536000, s-maxage=31536000, immutable',
      'Content-Disposition': `inline; filename="${fileName}"`,
      'Content-Length': String(narration.bytes.byteLength),
      'Content-Type': narration.contentType,
      'X-Narration-Cache': cacheStatus,
      'X-Narration-Part': String(partIndex + 1),
      'X-Narration-Parts': String(partCount),
    },
  })
}

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const post = getPublishedBlogPosts().find((candidate) => candidate.slug === params.slug)

  if (!post) {
    return errorResponse('Blog post not found.', 404)
  }

  const partValue = request.nextUrl.searchParams.get('part')
  const requestedVersion = request.nextUrl.searchParams.get('v')
  const parameterKeys = [...request.nextUrl.searchParams.keys()]
  const hasInvalidParameters =
    parameterKeys.length !== 2 ||
    parameterKeys.some((key) => key !== 'part' && key !== 'v') ||
    request.nextUrl.searchParams.getAll('part').length !== 1 ||
    request.nextUrl.searchParams.getAll('v').length !== 1

  if (hasInvalidParameters || !partValue || !/^\d+$/.test(partValue)) {
    return errorResponse('A valid narration part is required.', 400)
  }

  if (requestedVersion !== getBlogNarrationVersion(post)) {
    return errorResponse('This narration version is no longer available.', 409)
  }

  const partIndex = Number(partValue)
  const parts = getBlogNarrationParts(post)

  if (partIndex < 0 || partIndex >= parts.length) {
    return errorResponse('Narration part not found.', 404)
  }

  const apiKey = process.env.CARTESIA_API_KEY

  if (!apiKey) {
    return errorResponse('Narration is not configured.', 503)
  }

  const fileName = `${post.slug}-${partIndex + 1}.mp3`
  const cacheKey = `${post.slug}:${requestedVersion}:${partIndex}`
  const cachedNarration = narrationCache.get(cacheKey)

  if (cachedNarration) {
    cacheNarration(cacheKey, cachedNarration)
    return narrationResponse(cachedNarration, fileName, partIndex, parts.length, 'HIT')
  }

  const activeGeneration = narrationInFlight.get(cacheKey)

  if (activeGeneration) {
    try {
      const narration = await activeGeneration
      return narrationResponse(narration, fileName, partIndex, parts.length, 'COALESCED')
    } catch (error) {
      return cartesiaErrorResponse(error)
    }
  }

  if ((narrationGlobals.blogNarrationQuotaBlockedUntil ?? 0) > Date.now()) {
    return quotaResponse()
  }

  let resolveGeneration: (narration: CachedNarration) => void = () => undefined
  let rejectGeneration: (reason?: unknown) => void = () => undefined
  const generationComplete = new Promise<CachedNarration>((resolve, reject) => {
    resolveGeneration = resolve
    rejectGeneration = reject
  })

  // Mark the part as in flight before contacting Cartesia so concurrent browser
  // preload/play requests share a single generation.
  narrationInFlight.set(cacheKey, generationComplete)
  void generationComplete.catch(() => undefined)

  try {
    const cartesia = new Cartesia({ apiKey })
    const audio = await cartesia.tts.generate({
      model_id: 'sonic-3',
      transcript: parts[partIndex],
      voice: process.env.CARTESIA_VOICE_ID || SHASH_VOICE_ID,
      output_format: {
        container: 'mp3',
        sample_rate: 44_100,
        bit_rate: 96_000,
      },
      locale: 'en-US',
      normalization: 'en-US',
      generation_config: {
        emotion: 'calm',
        speed: 0.93,
        volume: 1,
      },
    })

    if (!audio.body) {
      rejectGeneration(new Error('Cartesia returned an empty narration.'))
      narrationInFlight.delete(cacheKey)
      return errorResponse('Cartesia returned an empty narration.', 502)
    }

    const contentType = audio.headers.get('content-type') || 'audio/mpeg'
    const [playbackStream, cacheStream] = audio.body.tee()

    void new Response(cacheStream)
      .arrayBuffer()
      .then((buffer) => {
        const narration = {
          bytes: buffer,
          contentType,
        }
        cacheNarration(cacheKey, narration)
        resolveGeneration(narration)
      })
      .catch((error) => {
        rejectGeneration(error)
      })
      .finally(() => {
        narrationInFlight.delete(cacheKey)
      })

    return new Response(playbackStream, {
      headers: {
        'Cache-Control': 'public, max-age=31536000, s-maxage=31536000, immutable',
        'Content-Disposition': `inline; filename="${fileName}"`,
        'Content-Type': contentType,
        'X-Narration-Cache': 'MISS',
        'X-Narration-Part': String(partIndex + 1),
        'X-Narration-Parts': String(parts.length),
      },
    })
  } catch (error) {
    rejectGeneration(error)
    narrationInFlight.delete(cacheKey)

    if (error instanceof APIError && error.status === 402) {
      console.warn('Cartesia narration quota exhausted; pausing generation attempts for 60 seconds.')
    } else {
      console.error(
        'Cartesia narration failed:',
        error instanceof Error ? error.message : 'Unknown error'
      )
    }

    return cartesiaErrorResponse(error)
  }
}
