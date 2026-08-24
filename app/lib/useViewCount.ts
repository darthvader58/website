import { useEffect, useState } from 'react'

const KEY = 'shashwatraj_com_portfolio_views'

export function useViewCount() {
  const [count, setCount] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchCount = async () => {
      const hasVisited = sessionStorage.getItem('has_visited_session')
      const endpoint = hasVisited ? 'get' : 'hit'
      const url = `https://countapi.mileshilliard.com/api/v1/${endpoint}/${KEY}`

      try {
        if (!hasVisited) {
          sessionStorage.setItem('has_visited_session', 'true')
        }

        const res = await fetch(url)
        if (!res.ok) throw new Error('Failed to fetch view count')

        const data = await res.json()
        setCount(typeof data.value === 'number' ? data.value : null)
      } catch (error) {
        setCount(null)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCount()
  }, [])

  return { count, isLoading }
}
