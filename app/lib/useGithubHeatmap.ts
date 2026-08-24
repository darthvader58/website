import { useEffect, useState } from 'react'

interface HeatmapCell {
  date: string
  level: number
}

interface MonthLabel {
  label: string
  column: number
}

interface HeatmapData {
  cells: HeatmapCell[]
  columns: number
  total: number
  monthLabels: MonthLabel[]
  live: boolean
  loading: boolean
}

const EMPTY: HeatmapData = { cells: [], columns: 0, total: 0, monthLabels: [], live: false, loading: true }

export function useGithubHeatmap(username: string) {
  const [data, setData] = useState<HeatmapData>(EMPTY)

  useEffect(() => {
    let cancelled = false

    fetch(`/api/github/contributions?username=${username}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load contributions')
        return res.json() as Promise<{ cells: HeatmapCell[]; total: number }>
      })
      .then((json) => {
        if (cancelled || !json.cells?.length) throw new Error('Empty response')

        const columns = Math.floor(json.cells.length / 7)
        const monthLabels: MonthLabel[] = []
        let lastMonth = ''

        for (let c = 0; c < columns; c++) {
          const dateStr = json.cells[c]?.date
          if (!dateStr) continue
          const month = dateStr.slice(0, 7)
          if (month !== lastMonth) {
            const label = new Date(`${dateStr}T00:00:00Z`).toLocaleDateString('en-US', { month: 'short', timeZone: 'UTC' })
            monthLabels.push({ label, column: c })
            lastMonth = month
          }
        }

        setData({ cells: json.cells, columns, total: json.total, monthLabels, live: true, loading: false })
      })
      .catch(() => {
        if (!cancelled) setData({ ...EMPTY, loading: false })
      })

    return () => {
      cancelled = true
    }
  }, [username])

  return data
}
