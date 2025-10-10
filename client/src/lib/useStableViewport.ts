// client/src/lib/useStableViewport.ts
import { useEffect } from 'react'

export function useStableViewport() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    let lockedVh = 0

    const measure = () => (window.visualViewport?.height ?? window.innerHeight) * 0.01

    const set = (v: number) => {
      document.documentElement.style.setProperty('--vh', `${v}px`)
    }

    const init = () => {
      lockedVh = measure()
      set(lockedVh)
    }

    const onVVResize = () => {
      const now = measure()
      // Only update when change is big enough (e.g., rotation / true UI change)
      if (Math.abs(now - lockedVh) >= 4) { // ~>= 40px on a 1000px tall screen
        lockedVh = now
        set(lockedVh)
      }
    }

    const onOrientation = () => {
      // reset lock on orientation change
      lockedVh = 0
      init()
    }

    init()

    // Listen to visualViewport only; avoid window 'scroll' or window 'resize'
    window.visualViewport?.addEventListener('resize', onVVResize, { passive: true })
    window.addEventListener('orientationchange', onOrientation, { passive: true })

    return () => {
      window.visualViewport?.removeEventListener('resize', onVVResize as any)
      window.removeEventListener('orientationchange', onOrientation)
    }
  }, [])
}
