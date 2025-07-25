import { useEffect, useState } from 'react'

/**
 * Scroll Progress Indicator with CSS Masters Phase 2 animations
 * Features:
 * - Smooth scroll progress tracking
 * - Advanced CSS animations with shine effect
 * - Accessibility support (reduced motion)
 * - Modern CSS custom properties
 */
function ScrollProgress(): React.JSX.Element {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const updateScrollProgress = (): void => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = scrollTop / docHeight

      setScrollProgress(progress)
      
      // Update CSS custom property for animation
      document.documentElement.style.setProperty('--progress', `${progress * 100}%`)
    }

    // Initial calculation
    updateScrollProgress()

    // Throttled scroll listener for better performance
    let ticking = false
    const scrollListener = (): void => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateScrollProgress()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', scrollListener, { passive: true })
    window.addEventListener('resize', updateScrollProgress, { passive: true })

    return () => {
      window.removeEventListener('scroll', scrollListener)
      window.removeEventListener('resize', updateScrollProgress)
    }
  }, [])

  return (
    <div 
      className="scroll-progress"
      role="progressbar"
      aria-label="Page scroll progress"
      aria-valuenow={Math.round(scrollProgress * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
    />
  )
}

export default ScrollProgress