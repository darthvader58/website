'use client'

import { useEffect, useRef } from 'react'
import { useTheme } from './ThemeProvider'

interface CircuitPoint {
  x: number
  y: number
}

interface CircuitTrace {
  points: CircuitPoint[]
  width: number
}

interface CircuitPad {
  x: number
  y: number
  size: number
  type: 'circle' | 'rect'
}

interface CircuitBlock {
  x: number
  y: number
  width: number
  height: number
}

const DIRECTIONS = [
  { x: 1, y: 0 },
  { x: -1, y: 0 },
  { x: 0, y: 1 },
  { x: 0, y: -1 }
]

const edgeKey = (a: CircuitPoint, b: CircuitPoint) => {
  const start = `${a.x},${a.y}`
  const end = `${b.x},${b.y}`
  return start < end ? `${start}|${end}` : `${end}|${start}`
}

const pointKey = (point: CircuitPoint) => `${point.x},${point.y}`

export default function CircuitBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const tracesRef = useRef<CircuitTrace[]>([])
  const padsRef = useRef<CircuitPad[]>([])
  const blocksRef = useRef<CircuitBlock[]>([])

  let theme = 'dark'
  try {
    const themeContext = useTheme()
    theme = themeContext.theme
  } catch (e) {
    // ThemeProvider not available yet
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const distanceToSegment = (
      mouseX: number,
      mouseY: number,
      start: CircuitPoint,
      end: CircuitPoint
    ): number => {
      const A = mouseX - start.x
      const B = mouseY - start.y
      const C = end.x - start.x
      const D = end.y - start.y

      const dot = A * C + B * D
      const lenSq = C * C + D * D
      let param = -1

      if (lenSq !== 0) param = dot / lenSq

      let xx: number
      let yy: number

      if (param < 0) {
        xx = start.x
        yy = start.y
      } else if (param > 1) {
        xx = end.x
        yy = end.y
      } else {
        xx = start.x + param * C
        yy = start.y + param * D
      }

      const dx = mouseX - xx
      const dy = mouseY - yy
      return Math.sqrt(dx * dx + dy * dy)
    }

    const distanceToTrace = (mouseX: number, mouseY: number, trace: CircuitTrace): number => {
      let minDistance = Number.POSITIVE_INFINITY

      for (let i = 0; i < trace.points.length - 1; i++) {
        const distance = distanceToSegment(mouseX, mouseY, trace.points[i], trace.points[i + 1])
        minDistance = Math.min(minDistance, distance)
      }

      return minDistance
    }

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      generateCircuitBoard()
    }

    const generateCircuitBoard = () => {
      const traces: CircuitTrace[] = []
      const pads: CircuitPad[] = []
      const blocks: CircuitBlock[] = []
      const occupiedEdges = new Map<string, number>()
      const occupiedNodes = new Set<string>()
      const occupiedCells = new Set<string>()
      const gridSize = Math.max(9, Math.min(12, Math.round(Math.min(canvas.width, canvas.height) / 72)))
      const margin = gridSize * 3
      const cols = Math.ceil((canvas.width + margin * 2) / gridSize)
      const rows = Math.ceil((canvas.height + margin * 2) / gridSize)
      const busCount = Math.max(140, Math.min(340, Math.round((canvas.width * canvas.height) / 9500)))

      const inBounds = (col: number, row: number) => col >= -2 && row >= -2 && col <= cols && row <= rows
      const inInterior = (col: number, row: number) => col >= 0 && row >= 0 && col < cols && row < rows
      const toPoint = (col: number, row: number): CircuitPoint => ({
        x: col * gridSize - margin,
        y: row * gridSize - margin
      })
      const cellKey = (col: number, row: number) => `${col},${row}`
      const markCell = (col: number, row: number) => {
        if (inInterior(col, row)) {
          occupiedCells.add(cellKey(col, row))
        }
      }
      const markSegmentCells = (startCol: number, startRow: number, endCol: number, endRow: number) => {
        let col = startCol
        let row = startRow
        markCell(col, row)
        while (col !== endCol || row !== endRow) {
          if (col < endCol) col += 1
          else if (col > endCol) col -= 1
          else if (row < endRow) row += 1
          else if (row > endRow) row -= 1
          markCell(col, row)
        }
      }
      const markPathCells = (path: CircuitPoint[]) => {
        for (let i = 0; i < path.length - 1; i++) {
          const startCol = Math.round((path[i].x + margin) / gridSize)
          const startRow = Math.round((path[i].y + margin) / gridSize)
          const endCol = Math.round((path[i + 1].x + margin) / gridSize)
          const endRow = Math.round((path[i + 1].y + margin) / gridSize)
          markSegmentCells(startCol, startRow, endCol, endRow)
        }
      }

      const addPad = (point: CircuitPoint, size = 3.5 + Math.random() * 1.8, type: 'circle' | 'rect' = 'circle') => {
        pads.push({
          x: point.x,
          y: point.y,
          size,
          type
        })
      }

      const addViaCluster = (point: CircuitPoint) => {
        const clusterRoll = Math.random()
        if (clusterRoll < 0.88) return

        const spread = gridSize * 0.8
        const count = clusterRoll > 0.97 ? 6 : 4

        for (let i = 0; i < count; i++) {
          const offsetX = ((i % 2 === 0 ? -1 : 1) * spread) / 2
          const offsetY = ((i < 2 ? -1 : 1) * spread) / 2
          pads.push({
            x: point.x + offsetX,
            y: point.y + offsetY,
            size: 2.3 + Math.random() * 1.1,
            type: 'circle'
          })
        }
      }

      const intersectsBlock = (point: CircuitPoint) =>
        blocks.some(block =>
          point.x >= block.x - gridSize &&
          point.x <= block.x + block.width + gridSize &&
          point.y >= block.y - gridSize &&
          point.y <= block.y + block.height + gridSize
        )

      const addBlock = (col: number, row: number, widthUnits: number, heightUnits: number) => {
        const point = toPoint(col, row)
        blocks.push({
          x: point.x,
          y: point.y,
          width: widthUnits * gridSize,
          height: heightUnits * gridSize
        })

        for (let c = col - 1; c <= col + widthUnits; c++) {
          for (let r = row - 1; r <= row + heightUnits; r++) {
            markCell(c, r)
          }
        }
      }

      const createPinRow = (
        startCol: number,
        startRow: number,
        count: number,
        direction: { x: number; y: number },
        travel: { x: number; y: number }
      ) => {
        for (let i = 0; i < count; i++) {
          const col = startCol + direction.x * i
          const row = startRow + direction.y * i
          const point = toPoint(col, row)
          addPad(point, 3.6, 'circle')

          const tracePoints = [
            point,
            toPoint(col + travel.x * 2, row + travel.y * 2),
            toPoint(col + travel.x * (3 + Math.floor(Math.random() * 4)), row + travel.y * (3 + Math.floor(Math.random() * 3)))
          ]

          traces.push({
            points: tracePoints,
            width: 1.2
          })
          markPathCells(tracePoints)
        }
      }

      const blockCount = Math.max(10, Math.min(22, Math.round((canvas.width * canvas.height) / 100000)))
      for (let i = 0; i < blockCount; i++) {
        const widthUnits = 3 + Math.floor(Math.random() * 6)
        const heightUnits = 2 + Math.floor(Math.random() * 4)
        const col = 3 + Math.floor(Math.random() * Math.max(4, cols - widthUnits - 6))
        const row = 3 + Math.floor(Math.random() * Math.max(4, rows - heightUnits - 6))
        addBlock(col, row, widthUnits, heightUnits)

        if (widthUnits >= heightUnits) {
          createPinRow(col, row - 1, Math.min(widthUnits, 8), { x: 1, y: 0 }, { x: 0, y: -1 })
          createPinRow(col, row + heightUnits, Math.min(widthUnits, 8), { x: 1, y: 0 }, { x: 0, y: 1 })
        } else {
          createPinRow(col - 1, row, Math.min(heightUnits, 8), { x: 0, y: 1 }, { x: -1, y: 0 })
          createPinRow(col + widthUnits, row, Math.min(heightUnits, 8), { x: 0, y: 1 }, { x: 1, y: 0 })
        }
      }

      const offsetPath = (points: CircuitPoint[], offsetX: number, offsetY: number) =>
        points.map(point => ({ x: point.x + offsetX, y: point.y + offsetY }))

      const createBusPath = () => {
        const side = Math.floor(Math.random() * 4)
        let col = 0
        let row = 0
        let direction = DIRECTIONS[0]

        if (side === 0) {
          col = -1
          row = Math.floor(Math.random() * rows)
          direction = { x: 1, y: 0 }
        } else if (side === 1) {
          col = cols
          row = Math.floor(Math.random() * rows)
          direction = { x: -1, y: 0 }
        } else if (side === 2) {
          col = Math.floor(Math.random() * cols)
          row = -1
          direction = { x: 0, y: 1 }
        } else {
          col = Math.floor(Math.random() * cols)
          row = rows
          direction = { x: 0, y: -1 }
        }

        const points: CircuitPoint[] = [toPoint(col, row)]
        const maxSegments = 8 + Math.floor(Math.random() * 8)

        for (let i = 0; i < maxSegments; i++) {
          const options = DIRECTIONS.filter(candidate => {
            if (candidate.x === -direction.x && candidate.y === -direction.y) {
              return false
            }

            if (i > 0 && Math.random() < 0.72 && candidate.x === direction.x && candidate.y === direction.y) {
              return true
            }

            return candidate.x !== direction.x || candidate.y !== direction.y
          })

          direction = options[Math.floor(Math.random() * options.length)]
          const stepSpan = 5 + Math.floor(Math.random() * 14)
          let advanced = false

          for (let step = 0; step < stepSpan; step++) {
            const nextCol = col + direction.x
            const nextRow = row + direction.y
            if (!inBounds(nextCol, nextRow)) break

            const endPoint = toPoint(nextCol, nextRow)
            if (intersectsBlock(endPoint)) break

            const startPoint = points[points.length - 1]
            if (Math.abs(endPoint.x - startPoint.x) + Math.abs(endPoint.y - startPoint.y) < gridSize) break

            const key = edgeKey(startPoint, endPoint)
            const usage = occupiedEdges.get(key) ?? 0

            if (usage > 0 && Math.random() < 0.9) break

            occupiedEdges.set(key, usage + 1)
            col = nextCol
            row = nextRow
            points.push(endPoint)
            occupiedNodes.add(pointKey(endPoint))
            advanced = true

            if (Math.random() > 0.96) break
          }

          if (!advanced) break
        }

        return points
      }

      for (let busIndex = 0; busIndex < busCount; busIndex++) {
        const busPath = createBusPath()
        if (busPath.length < 4) continue

        const firstSegment = {
          x: busPath[1].x - busPath[0].x,
          y: busPath[1].y - busPath[0].y
        }

        const laneNormal =
          Math.abs(firstSegment.x) > Math.abs(firstSegment.y)
            ? { x: 0, y: gridSize * 0.42 }
            : { x: gridSize * 0.42, y: 0 }
        const laneCount = 3 + Math.floor(Math.random() * 5)
        const laneCenter = (laneCount - 1) / 2

        for (let laneIndex = 0; laneIndex < laneCount; laneIndex++) {
          const laneOffset = laneIndex - laneCenter
          const lanePath = offsetPath(busPath, laneNormal.x * laneOffset, laneNormal.y * laneOffset)
          traces.push({
            points: lanePath,
            width: laneIndex === 0 && Math.random() > 0.7 ? 1.8 : 1.2
          })
          markPathCells(lanePath)

          addPad(lanePath[0], 3.2 + Math.random() * 1.1)
          if (Math.random() > 0.25) {
            addPad(lanePath[lanePath.length - 1], 3.2 + Math.random() * 1.1)
          }

          for (let i = 1; i < lanePath.length - 1; i++) {
            if (Math.random() > 0.84) {
              addPad(lanePath[i], 2.6 + Math.random())
            }
            addViaCluster(lanePath[i])
          }
        }
      }

      const fillerDirections = [
        { x: 1, y: 0 },
        { x: -1, y: 0 },
        { x: 0, y: 1 },
        { x: 0, y: -1 }
      ]

      const createFillerPath = (startCol: number, startRow: number) => {
        let col = startCol
        let row = startRow
        let direction = fillerDirections[Math.floor(Math.random() * fillerDirections.length)]
        const points: CircuitPoint[] = [toPoint(col, row)]

        for (let segment = 0; segment < 3 + Math.floor(Math.random() * 3); segment++) {
          const options = fillerDirections.filter(candidate => {
            if (candidate.x === -direction.x && candidate.y === -direction.y) {
              return false
            }

            const nextCol = col + candidate.x
            const nextRow = row + candidate.y
            if (!inInterior(nextCol, nextRow)) return false
            return true
          })

          if (options.length === 0) break
          direction = options[Math.floor(Math.random() * options.length)]
          const span = 2 + Math.floor(Math.random() * 6)
          let advanced = false

          for (let step = 0; step < span; step++) {
            const nextCol = col + direction.x
            const nextRow = row + direction.y
            if (!inInterior(nextCol, nextRow)) break

            const candidatePoint = toPoint(nextCol, nextRow)
            if (intersectsBlock(candidatePoint)) break

            const usagePenalty = occupiedCells.has(cellKey(nextCol, nextRow))
            if (usagePenalty && Math.random() < 0.65) break

            col = nextCol
            row = nextRow
            points.push(candidatePoint)
            advanced = true

            if (!usagePenalty) {
              markCell(col, row)
            }
          }

          if (!advanced) break
        }

        return points
      }

      const fillerAttempts = Math.round(cols * rows * 0.32)
      for (let attempt = 0; attempt < fillerAttempts; attempt++) {
        const col = Math.floor(Math.random() * cols)
        const row = Math.floor(Math.random() * rows)
        if (occupiedCells.has(cellKey(col, row))) continue

        const startPoint = toPoint(col, row)
        if (intersectsBlock(startPoint)) continue

        const fillerPath = createFillerPath(col, row)
        if (fillerPath.length < 3) continue

        traces.push({
          points: fillerPath,
          width: 1.05
        })
        markPathCells(fillerPath)

        addPad(fillerPath[0], 2.8 + Math.random() * 0.8)
        addPad(fillerPath[fillerPath.length - 1], 2.8 + Math.random() * 0.8)

        for (let i = 1; i < fillerPath.length - 1; i++) {
          if (Math.random() > 0.72) {
            addPad(fillerPath[i], 2.2 + Math.random() * 0.7)
          }
        }
      }

      occupiedNodes.forEach(key => {
        if (Math.random() > 0.965) {
          const [x, y] = key.split(',').map(Number)
          pads.push({
            x,
            y,
            size: 6 + Math.random() * 6,
            type: 'rect'
          })
        }
      })

      tracesRef.current = traces
      padsRef.current = pads
      blocksRef.current = blocks
    }

    const drawCircuit = () => {
      const isLight = theme === 'light'
      ctx.fillStyle = isLight ? '#f8fafc' : '#000000'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const mouse = mouseRef.current
      const influenceRadius = 145

      const gradient = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 120)
      if (isLight) {
        gradient.addColorStop(0, 'rgba(139, 92, 246, 0.08)')
        gradient.addColorStop(0.5, 'rgba(139, 92, 246, 0.03)')
        gradient.addColorStop(1, 'rgba(139, 92, 246, 0)')
      } else {
        gradient.addColorStop(0, 'rgba(139, 92, 246, 0.15)')
        gradient.addColorStop(0.5, 'rgba(139, 92, 246, 0.05)')
        gradient.addColorStop(1, 'rgba(139, 92, 246, 0)')
      }
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      blocksRef.current.forEach(block => {
        ctx.fillStyle = isLight ? 'rgba(215, 220, 232, 0.22)' : 'rgba(36, 32, 48, 0.4)'
        ctx.strokeStyle = isLight ? 'rgba(188, 194, 208, 0.45)' : 'rgba(64, 56, 82, 0.5)'
        ctx.lineWidth = 1
        ctx.fillRect(block.x, block.y, block.width, block.height)
        ctx.strokeRect(block.x, block.y, block.width, block.height)
      })

      tracesRef.current.forEach(trace => {
        const distance = distanceToTrace(mouse.x, mouse.y, trace)
        let intensity = 0

        if (distance < influenceRadius) {
          intensity = 1 - distance / influenceRadius
          intensity = Math.pow(intensity, 2.5)
        }

        const baseR = isLight ? 192 : 28
        const baseG = isLight ? 188 : 24
        const baseB = isLight ? 202 : 40

        const brightR = isLight ? 120 : 160
        const brightG = isLight ? 84 : 120
        const brightB = isLight ? 182 : 220

        const r = Math.round(baseR + (brightR - baseR) * intensity)
        const g = Math.round(baseG + (brightG - baseG) * intensity)
        const b = Math.round(baseB + (brightB - baseB) * intensity)
        const alpha = (0.32 + intensity * 0.68) * (isLight ? 0.5 : 0.56)

        ctx.beginPath()
        ctx.moveTo(trace.points[0].x, trace.points[0].y)
        for (let i = 1; i < trace.points.length; i++) {
          ctx.lineTo(trace.points[i].x, trace.points[i].y)
        }

        if (intensity > 0.18) {
          ctx.shadowBlur = 8 + 8 * intensity
          ctx.shadowColor = `rgba(${brightR}, ${brightG}, ${brightB}, ${0.18 + intensity * 0.62})`
        }

        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`
        ctx.lineWidth = trace.width
        ctx.lineJoin = 'round'
        ctx.lineCap = 'round'
        ctx.stroke()
        ctx.shadowBlur = 0
      })

      padsRef.current.forEach(pad => {
        const dx = pad.x - mouse.x
        const dy = pad.y - mouse.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        let intensity = 0

        if (distance < influenceRadius) {
          intensity = 1 - distance / influenceRadius
          intensity = Math.pow(intensity, 2.5)
        }

        const baseR = isLight ? 198 : 34
        const baseG = isLight ? 194 : 30
        const baseB = isLight ? 208 : 46

        const brightR = isLight ? 126 : 170
        const brightG = isLight ? 92 : 130
        const brightB = isLight ? 190 : 230

        const r = Math.round(baseR + (brightR - baseR) * intensity)
        const g = Math.round(baseG + (brightG - baseG) * intensity)
        const b = Math.round(baseB + (brightB - baseB) * intensity)
        const alpha = (0.36 + intensity * 0.64) * (isLight ? 0.54 : 0.62)

        if (intensity > 0.12) {
          ctx.shadowBlur = 8 + 7 * intensity
          ctx.shadowColor = `rgba(${brightR}, ${brightG}, ${brightB}, ${0.18 + intensity * 0.52})`
        }

        if (pad.type === 'circle') {
          ctx.beginPath()
          ctx.arc(pad.x, pad.y, pad.size / 2, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`
          ctx.fill()
        } else {
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha * 0.88})`
          ctx.fillRect(
            pad.x - pad.size / 2,
            pad.y - pad.size / 2,
            pad.size,
            pad.size
          )
        }

        ctx.shadowBlur = 0
      })
    }

    let animationId: number
    const animate = () => {
      drawCircuit()
      animationId = requestAnimationFrame(animate)
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY
      }
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    window.addEventListener('mousemove', handleMouseMove)
    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationId)
    }
  }, [theme])

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
      style={{ background: theme === 'light' ? '#f8fafc' : '#000000' }}
    />
  )
}
