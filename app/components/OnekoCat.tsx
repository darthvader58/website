'use client'

import { useEffect } from 'react'

// oneko.js: https://github.com/adryd325/oneko.js (MIT License, see /public/oneko-LICENSE.txt)
export default function OnekoCat() {
  useEffect(() => {
    if (document.getElementById('oneko-script')) return

    const script = document.createElement('script')
    script.id = 'oneko-script'
    script.src = '/oneko.js'
    script.async = true
    document.body.appendChild(script)

    return () => {
      script.remove()
      document.getElementById('oneko')?.remove()
    }
  }, [])

  return null
}
