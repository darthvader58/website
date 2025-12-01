'use client'

import { useEffect, useRef } from 'react'
import { useTheme } from './ThemeProvider'

interface CircuitTrace {
  x: number
  y: number
  width: number
  height: number
  isHorizontal: boolean
}

interface CircuitPad {
  x: number
  y: number
  size: number
  type: 'circle' | 'rect'
}

export default function CircuitBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const tracesRef = useRef<CircuitTrace[]>([])
  const padsRef = useRef<CircuitPad[]>([])
  
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

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      generateCircuitBoard()
    }

    const generateCircuitBoard = () => {
      const traces: CircuitTrace[] = []
      const pads: CircuitPad[] = []
      const gridSize = 60
      const cols = Math.ceil(canvas.width / gridSize) + 2
      const rows = Math.ceil(canvas.height / gridSize) + 2

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const x = col * gridSize
          const y = row * gridSize

          if (Math.random() > 0.5) {
            const length = gridSize * (1 + Math.floor(Math.random() * 3))
            if (Math.random() > 0.3) {
              traces.push({
                x,
                y,
                width: length,
                height: 2,
                isHorizontal: true
              })
            }
          }

          if (Math.random() > 0.5) {
            const length = gridSize * (1 + Math.floor(Math.random() * 3))
            if (Math.random() > 0.3) {
              traces.push({
                x,
                y,
                width: 2,
                height: length,
                isHorizontal: false
              })
            }
          }

          if (Math.random() > 0.6) {
            pads.push({
              x,
              y,
              size: Math.random() > 0.5 ? 4 : 6,
              type: Math.random() > 0.5 ? 'circle' : 'rect'
            })
          }

          if (Math.random() > 0.95) {
            pads.push({
              x: x + Math.random() * 20 - 10,
              y: y + Math.random() * 20 - 10,
              size: 8 + Math.random() * 8,
              type: 'rect'
            })
          }
        }
      }

      tracesRef.current = traces
      padsRef.current = pads
    }

    const distanceToTrace = (mouseX: number, mouseY: number, trace: CircuitTrace): number => {
      const x1 = trace.x
      const y1 = trace.y
      const x2 = trace.isHorizontal ? trace.x + trace.width : trace.x
      const y2 = trace.isHorizontal ? trace.y : trace.y + trace.height

      const A = mouseX - x1
      const B = mouseY - y1
      const C = x2 - x1
      const D = y2 - y1

      const dot = A * C + B * D
      const lenSq = C * C + D * D
      let param = -1

      if (lenSq !== 0) param = dot / lenSq

      let xx, yy

      if (param < 0) {
        xx = x1
        yy = y1
      } else if (param > 1) {
        xx = x2
        yy = y2
      } else {
        xx = x1 + param * C
        yy = y1 + param * D
      }

      const dx = mouseX - xx
      const dy = mouseY - yy
      return Math.sqrt(dx * dx + dy * dy)
    }

    const drawCircuit = () => {
      const isLight = theme === 'light'
      ctx.fillStyle = isLight ? '#f8fafc' : '#000000'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const mouse = mouseRef.current
      const influenceRadius = 180

      // Draw cursor glow effect
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

      tracesRef.current.forEach(trace => {
        const distance = distanceToTrace(mouse.x, mouse.y, trace)
        let intensity = 0

        if (distance < influenceRadius) {
          intensity = 1 - (distance / influenceRadius)
          intensity = Math.pow(intensity, 1.2)
        }

        const baseR = isLight ? 200 : 20
        const baseG = isLight ? 195 : 18
        const baseB = isLight ? 210 : 35

        const brightR = isLight ? 120 : 160
        const brightG = isLight ? 80 : 120
        const brightB = isLight ? 180 : 220

        const r = Math.round(baseR + (brightR - baseR) * intensity)
        const g = Math.round(baseG + (brightG - baseG) * intensity)
        const b = Math.round(baseB + (brightB - baseB) * intensity)
        const alpha = (0.25 + intensity * 0.75) * (isLight ? 0.35 : 0.45)

        if (intensity > 0.4) {
          ctx.shadowBlur = 8 * intensity
          ctx.shadowColor = `rgba(${brightR}, ${brightG}, ${brightB}, ${intensity * 0.8})`
        }

        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`
        ctx.fillRect(trace.x, trace.y, trace.width, trace.height)

        ctx.shadowBlur = 0
      })

      padsRef.current.forEach(pad => {
        const dx = pad.x - mouse.x
        const dy = pad.y - mouse.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        let intensity = 0

        if (distance < influenceRadius) {
          intensity = 1 - (distance / influenceRadius)
          intensity = Math.pow(intensity, 1.2)
        }

        const isLight = theme === 'light'
        const baseR = isLight ? 205 : 25
        const baseG = isLight ? 200 : 22
        const baseB = isLight ? 215 : 40

        const brightR = isLight ? 130 : 170
        const brightG = isLight ? 90 : 130
        const brightB = isLight ? 190 : 230

        const r = Math.round(baseR + (brightR - baseR) * intensity)
        const g = Math.round(baseG + (brightG - baseG) * intensity)
        const b = Math.round(baseB + (brightB - baseB) * intensity)
        const alpha = (0.3 + intensity * 0.7) * (isLight ? 0.35 : 0.45)

        if (intensity > 0.4) {
          ctx.shadowBlur = 6 * intensity
          ctx.shadowColor = `rgba(${brightR}, ${brightG}, ${brightB}, ${intensity * 0.6})`
        }

        if (pad.type === 'circle') {
          ctx.beginPath()
          ctx.arc(pad.x, pad.y, pad.size / 2, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`
          ctx.fill()
        } else {
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`
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