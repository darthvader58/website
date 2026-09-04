'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

type PlaybackState = 'error' | 'finished' | 'idle' | 'loading' | 'paused' | 'playing'

type BlogNarrationPlayerProps = {
  partLengths: number[]
  slug: string
  version: string
}

type PendingSeek = {
  fraction: number
  part: number
}

type FailureReason = 'generic' | 'quota'

function PlayIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5 translate-x-px" viewBox="0 0 24 24" fill="currentColor">
      <path d="M7.5 5.35a1 1 0 0 1 1.52-.85l10 6.65a1 1 0 0 1 0 1.7l-10 6.65a1 1 0 0 1-1.52-.85V5.35Z" />
    </svg>
  )
}

function PauseIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M7 5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V5Zm6 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V5Z" />
    </svg>
  )
}

function ReplayIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h5M5.5 9A7.5 7.5 0 1 1 4.7 15" />
    </svg>
  )
}

export default function BlogNarrationPlayer({
  partLengths,
  slug,
  version,
}: BlogNarrationPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const blobUrlsRef = useRef(new Map<number, string>())
  const unavailablePartsRef = useRef(new Map<number, FailureReason>())
  const preloadsRef = useRef(new Map<number, AbortController>())
  const preloadPromisesRef = useRef(new Map<number, Promise<string | undefined>>())
  const mountedRef = useRef(true)
  const requestIdRef = useRef(0)
  const loadedPartRef = useRef(0)
  const pendingSeekRef = useRef<PendingSeek | null>(null)
  const shouldPlayRef = useRef(false)
  const playbackRateRef = useRef(1)
  const longPressTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const longPressTriggeredRef = useRef(false)
  const ignoreNextClickRef = useRef(false)

  const [currentPart, setCurrentPart] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [failureReason, setFailureReason] = useState<FailureReason>('generic')
  const [isBoosted, setIsBoosted] = useState(false)
  const [isScrubbing, setIsScrubbing] = useState(false)
  const [pendingSeekValue, setPendingSeekValue] = useState<number | null>(null)
  const [playbackState, setPlaybackState] = useState<PlaybackState>('idle')
  const [scrubValue, setScrubValue] = useState(0)

  const partCount = partLengths.length
  const totalWeight = partLengths.reduce((sum, length) => sum + length, 0)

  const getPartUrl = useCallback(
    (part: number) =>
      `/api/blog/${encodeURIComponent(slug)}/narration?part=${part}&v=${encodeURIComponent(version)}`,
    [slug, version]
  )

  const preloadPart = useCallback(
    (part: number) => {
      if (
        part < 0 ||
        part >= partCount ||
        unavailablePartsRef.current.has(part)
      ) {
        return Promise.resolve(undefined)
      }

      const cachedUrl = blobUrlsRef.current.get(part)
      if (cachedUrl) return Promise.resolve(cachedUrl)

      const activePreload = preloadPromisesRef.current.get(part)
      if (activePreload) return activePreload

      const controller = new AbortController()
      preloadsRef.current.set(part, controller)

      const preload = fetch(getPartUrl(part), {
        cache: 'force-cache',
        signal: controller.signal,
      })
        .then((response) => {
          if (!response.ok) {
            const reason = response.status === 402 ? 'quota' : 'generic'
            unavailablePartsRef.current.set(part, reason)
            if (mountedRef.current) {
              setFailureReason(reason)
            }
            throw new Error('Unable to preload narration')
          }
          return response.blob()
        })
        .then((blob) => {
          if (!mountedRef.current) return undefined
          const blobUrl = URL.createObjectURL(blob)
          blobUrlsRef.current.set(part, blobUrl)
          return blobUrl
        })
        .catch(() => {
          // Preloading is an optimization; direct playback remains the fallback.
          return undefined
        })
        .finally(() => {
          preloadsRef.current.delete(part)
          preloadPromisesRef.current.delete(part)
        })

      preloadPromisesRef.current.set(part, preload)
      return preload
    },
    [getPartUrl, partCount]
  )

  const applyPendingSeek = useCallback((audio: HTMLAudioElement) => {
    const pendingSeek = pendingSeekRef.current

    if (
      !pendingSeek ||
      pendingSeek.part !== loadedPartRef.current ||
      !Number.isFinite(audio.duration) ||
      audio.duration <= 0
    ) {
      return
    }

    const maximumTime = Math.max(0, audio.duration - 0.05)
    const nextTime = Math.min(maximumTime, audio.duration * pendingSeek.fraction)
    audio.currentTime = nextTime
    setCurrentTime(nextTime)
    pendingSeekRef.current = null
    setPendingSeekValue(null)
  }, [])

  const setPlaybackRate = useCallback((rate: 1 | 2) => {
    playbackRateRef.current = rate
    setIsBoosted(rate === 2)

    if (audioRef.current) {
      audioRef.current.playbackRate = rate
      audioRef.current.preservesPitch = true
    }
  }, [])

  const playPart = useCallback(
    async (
      part: number,
      options: {
        retryUnavailable?: boolean
        seekFraction?: number
        shouldPlay?: boolean
      } = {}
    ) => {
      const audio = audioRef.current
      if (!audio || part < 0 || part >= partCount) return

      const {
        retryUnavailable = false,
        seekFraction = 0,
        shouldPlay = true,
      } = options

      if (retryUnavailable) {
        unavailablePartsRef.current.delete(part)
        setFailureReason('generic')
      } else if (unavailablePartsRef.current.has(part)) {
        requestIdRef.current += 1
        shouldPlayRef.current = false
        setCurrentPart(part)
        setFailureReason(unavailablePartsRef.current.get(part) ?? 'generic')
        setPlaybackState('error')
        return
      }

      const requestId = ++requestIdRef.current
      const isNewPart =
        loadedPartRef.current !== part || !audio.currentSrc || Boolean(audio.error)

      shouldPlayRef.current = shouldPlay
      setCurrentPart(part)
      setPlaybackState('loading')
      pendingSeekRef.current = { fraction: seekFraction, part }

      let source = blobUrlsRef.current.get(part)
      const activePreload = preloadPromisesRef.current.get(part)

      if (
        isNewPart &&
        !source &&
        (part === 0 || retryUnavailable || seekFraction > 0 || activePreload)
      ) {
        source = await (activePreload ?? preloadPart(part))
        if (!mountedRef.current || requestId !== requestIdRef.current) return

        if (unavailablePartsRef.current.has(part)) {
          shouldPlayRef.current = false
          pendingSeekRef.current = null
          setFailureReason(unavailablePartsRef.current.get(part) ?? 'generic')
          setPlaybackState('error')
          return
        }
      }

      if (isNewPart) {
        loadedPartRef.current = part
        setCurrentTime(0)
        setDuration(0)
        audio.src = source || getPartUrl(part)
        audio.load()
      } else {
        applyPendingSeek(audio)
      }

      audio.playbackRate = playbackRateRef.current
      audio.preservesPitch = true

      if (!shouldPlay) {
        if (audio.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) {
          setPlaybackState('paused')
        }
        return
      }

      try {
        await audio.play()
        if (mountedRef.current && requestId === requestIdRef.current) {
          setPlaybackState('playing')
          preloadPart(part + 1)
        }
      } catch {
        if (mountedRef.current && requestId === requestIdRef.current) {
          shouldPlayRef.current = false
          setPlaybackState('error')
        }
      }
    },
    [applyPendingSeek, getPartUrl, partCount, preloadPart]
  )

  const playCurrentSource = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return

    const requestId = ++requestIdRef.current
    shouldPlayRef.current = true
    setPlaybackState('loading')
    audio.playbackRate = playbackRateRef.current
    audio.preservesPitch = true

    void audio.play().then(
      () => {
        if (!mountedRef.current || requestId !== requestIdRef.current) return
        setPlaybackState('playing')
        setFailureReason('generic')
        preloadPart(currentPart + 1)
      },
      () => {
        if (!mountedRef.current || requestId !== requestIdRef.current) return
        shouldPlayRef.current = false
        setPlaybackState('error')
      }
    )
  }, [currentPart, preloadPart])

  const togglePlayback = () => {
    const audio = audioRef.current
    if (!audio) return

    if (playbackState === 'loading') {
      if (shouldPlayRef.current) {
        requestIdRef.current += 1
        shouldPlayRef.current = false
        audio.pause()
        setPlaybackState('paused')
        return
      }

      shouldPlayRef.current = true
      audio.playbackRate = playbackRateRef.current
      void audio.play().then(
        () => {
          setPlaybackState('playing')
          preloadPart(currentPart + 1)
        },
        () => {
          shouldPlayRef.current = false
          setPlaybackState('error')
        }
      )
      return
    }

    if (playbackState === 'playing') {
      shouldPlayRef.current = false
      audio.pause()
      setPlaybackState('paused')
      return
    }

    if (playbackState === 'finished' || playbackState === 'error') {
      void playPart(playbackState === 'finished' ? 0 : currentPart, {
        retryUnavailable: playbackState === 'error',
      })
      return
    }

    if (playbackState === 'idle') {
      void playPart(currentPart)
      return
    }

    playCurrentSource()
  }

  const handleEnded = () => {
    if (currentPart + 1 < partCount) {
      void playPart(currentPart + 1)
      return
    }

    shouldPlayRef.current = false
    setPlaybackState('finished')
  }

  const commitSeek = (value: number) => {
    const boundedValue = Math.max(0, Math.min(value, totalWeight))
    let precedingWeight = 0
    let targetPart = Math.max(0, partCount - 1)

    for (let index = 0; index < partCount; index += 1) {
      const partEnd = precedingWeight + partLengths[index]
      if (boundedValue <= partEnd || index === partCount - 1) {
        targetPart = index
        break
      }
      precedingWeight = partEnd
    }

    const targetLength = partLengths[targetPart] || 1
    const seekFraction = Math.max(
      0,
      Math.min(1, (boundedValue - precedingWeight) / targetLength)
    )
    const shouldContinuePlaying =
      playbackState === 'playing' ||
      (playbackState === 'loading' && shouldPlayRef.current)

    setIsScrubbing(false)
    setPendingSeekValue(boundedValue)
    void playPart(targetPart, {
      seekFraction,
      shouldPlay: shouldContinuePlaying,
    })
  }

  const clearLongPressTimer = useCallback(() => {
    if (!longPressTimerRef.current) return
    clearTimeout(longPressTimerRef.current)
    longPressTimerRef.current = null
  }, [])

  const activateLongPress = useCallback(() => {
    longPressTriggeredRef.current = true
    ignoreNextClickRef.current = true
    setPlaybackRate(2)

    if (
      playbackState === 'playing' ||
      (playbackState === 'loading' && shouldPlayRef.current)
    ) {
      return
    }

    if (playbackState === 'idle') {
      void playPart(currentPart)
      return
    }

    if (playbackState === 'paused') {
      playCurrentSource()
      return
    }

    void playPart(playbackState === 'finished' ? 0 : currentPart)
  }, [currentPart, playbackState, playCurrentSource, playPart, setPlaybackRate])

  const beginLongPress = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return

    clearLongPressTimer()
    longPressTriggeredRef.current = false
    event.currentTarget.setPointerCapture?.(event.pointerId)
    longPressTimerRef.current = setTimeout(activateLongPress, 3_000)
  }

  const endLongPress = (cancelled = false) => {
    clearLongPressTimer()

    if (longPressTriggeredRef.current) {
      setPlaybackRate(1)
      ignoreNextClickRef.current = !cancelled
      longPressTriggeredRef.current = false
    }
  }

  useEffect(() => {
    let cancelled = false
    mountedRef.current = true

    const prepareOpening = async () => {
      let source = await preloadPart(0)

      // React development mode mounts effects twice. If its first cleanup
      // aborted the shared preload, the active mount gets one clean retry.
      if (
        !cancelled &&
        mountedRef.current &&
        !source &&
        !unavailablePartsRef.current.has(0)
      ) {
        source = await preloadPart(0)
      }

      if (
        cancelled ||
        !mountedRef.current ||
        source ||
        !unavailablePartsRef.current.has(0)
      ) {
        return
      }

      setCurrentPart(0)
      setFailureReason(unavailablePartsRef.current.get(0) ?? 'generic')
      setPlaybackState('error')
    }

    void prepareOpening()

    return () => {
      cancelled = true
      mountedRef.current = false
      requestIdRef.current += 1
      clearLongPressTimer()
      audioRef.current?.pause()
      preloadsRef.current.forEach((controller) => controller.abort())
      blobUrlsRef.current.forEach((url) => URL.revokeObjectURL(url))
      blobUrlsRef.current.clear()
    }
  }, [clearLongPressTimer, preloadPart])

  const precedingWeight = partLengths
    .slice(0, currentPart)
    .reduce((sum, length) => sum + length, 0)
  const currentFraction = duration > 0 ? Math.min(1, currentTime / duration) : 0
  const actualProgress = precedingWeight + (partLengths[currentPart] || 0) * currentFraction
  const displayedProgress = isScrubbing
    ? scrubValue
    : pendingSeekValue ?? actualProgress
  const progressPercent = totalWeight > 0
    ? Math.round((displayedProgress / totalWeight) * 100)
    : 0

  const isPlaying = playbackState === 'playing'
  const isLoading = playbackState === 'loading'
  const isPreparingToPlay = isLoading && shouldPlayRef.current
  const isFinished = playbackState === 'finished'

  const statusText = isBoosted
    ? '2× while held'
    : {
        error: failureReason === 'quota'
          ? 'Cartesia limit reached — try later'
          : 'Narration unavailable — try again',
        finished: 'Finished',
        idle: 'Ready to listen',
        loading: 'Preparing narration…',
        paused: 'Paused',
        playing: 'Now playing',
      }[playbackState]

  return (
    <section
      aria-label="Audio narration"
      className="mt-6 rounded-xl border border-[var(--line)] bg-[var(--card)] p-4"
    >
      <audio
        ref={audioRef}
        preload="auto"
        playsInline
        onCanPlay={() => {
          if (loadedPartRef.current === 0) {
            void preloadPart(1)
          }

          if (playbackState === 'loading' && !shouldPlayRef.current) {
            setPlaybackState('paused')
          }
        }}
        onDurationChange={(event) => {
          const nextDuration = event.currentTarget.duration
          setDuration(Number.isFinite(nextDuration) ? nextDuration : 0)
          applyPendingSeek(event.currentTarget)
        }}
        onEnded={handleEnded}
        onError={(event) => {
          const audio = event.currentTarget
          if (!audio.getAttribute('src')) return

          if (!unavailablePartsRef.current.has(loadedPartRef.current)) {
            unavailablePartsRef.current.set(loadedPartRef.current, 'generic')
          }
          requestIdRef.current += 1
          shouldPlayRef.current = false
          pendingSeekRef.current = null
          audio.pause()
          audio.removeAttribute('src')
          audio.load()
          setFailureReason(
            unavailablePartsRef.current.get(loadedPartRef.current) ?? 'generic'
          )
          setPlaybackState('error')
        }}
        onLoadedMetadata={(event) => {
          const nextDuration = event.currentTarget.duration
          setDuration(Number.isFinite(nextDuration) ? nextDuration : 0)
          applyPendingSeek(event.currentTarget)
        }}
        onPlaying={() => {
          setFailureReason('generic')
          setPlaybackState('playing')
        }}
        onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
      />

      <div className="flex items-center gap-3.5">
        <button
          type="button"
          onClick={() => {
            if (ignoreNextClickRef.current) {
              ignoreNextClickRef.current = false
              return
            }
            togglePlayback()
          }}
          onContextMenu={(event) => event.preventDefault()}
          onPointerCancel={() => endLongPress(true)}
          onPointerDown={beginLongPress}
          onPointerUp={() => endLongPress()}
          title="Press to play or pause. Hold for 3 seconds for 2× speed."
          aria-label={isPlaying ? 'Pause blog narration; hold for 3 seconds for 2× speed' : isFinished ? 'Replay blog narration; hold for 3 seconds for 2× speed' : 'Play blog narration; hold for 3 seconds for 2× speed'}
          className="inline-flex h-11 w-11 touch-none select-none shrink-0 items-center justify-center rounded-full bg-[var(--fg)] text-[var(--bg)] transition-transform duration-200 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-400"
        >
          {isPlaying || isPreparingToPlay ? (
            <PauseIcon />
          ) : isFinished ? (
            <ReplayIcon />
          ) : (
            <PlayIcon />
          )}
        </button>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="font-mono text-[9px] font-semibold uppercase tracking-widest text-[var(--soft)]">
                Listen to this article
              </p>
              <p className="mt-1 truncate text-xs text-[var(--muted)]">
                Shash{isBoosted ? ' · 2×' : ''}
              </p>
            </div>
            <span className="shrink-0 font-mono text-[10px] tabular-nums text-[var(--soft)]">
              {progressPercent}%
            </span>
          </div>

          <input
            aria-label="Seek through the complete article narration"
            aria-valuetext={`${progressPercent}% of the article`}
            type="range"
            min={0}
            max={Math.max(1, totalWeight)}
            step={1}
            value={Math.min(displayedProgress, Math.max(1, totalWeight))}
            onChange={(event) => {
              setIsScrubbing(true)
              setScrubValue(Number(event.currentTarget.value))
            }}
            onKeyUp={(event) => commitSeek(Number(event.currentTarget.value))}
            onPointerDown={() => setIsScrubbing(true)}
            onPointerUp={(event) => commitSeek(Number(event.currentTarget.value))}
            className="mt-2 h-1 w-full cursor-pointer accent-purple-500"
          />

          <div className="mt-1 flex items-center justify-between gap-3 font-mono text-[9px] uppercase tracking-wider text-[var(--soft)]">
            <span aria-live="polite">{statusText}</span>
            <span>{partCount > 1 ? `Section ${currentPart + 1} of ${partCount}` : 'Full article'}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
