import { useEffect } from 'react'

export function useStableViewport() {
  useEffect(() => {
    const setVH = () => {
      const h = (window.visualViewport?.height ?? window.innerHeight) * 0.01
      document.documentElement.style.setProperty('--vh', `${h}px`)
    }
    setVH()
    const vv = window.visualViewport
    vv?.addEventListener('resize', setVH)
    window.addEventListener('resize', setVH)
    window.addEventListener('orientationchange', setVH)
    return () => {
      vv?.removeEventListener('resize', setVH)
      window.removeEventListener('resize', setVH)
      window.removeEventListener('orientationchange', setVH)
    }
  }, [])
}
