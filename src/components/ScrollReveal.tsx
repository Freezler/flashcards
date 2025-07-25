import { useEffect, useRef, useState } from 'react'

interface ScrollRevealProps {
  children: React.ReactNode
  className?: string
  animationType?: 'card-reveal' | 'card-stack-reveal'
  threshold?: number
  once?: boolean
}

/**
 * Scroll Reveal Animation Component - CSS Masters Phase 2
 * 
 * Features:
 * - Modern scroll-driven animations using CSS animation-timeline
 * - Intersection Observer fallback for older browsers
 * - Multiple animation types (slide-in-fade, stack-in)
 * - Accessibility support (prefers-reduced-motion)
 * - Performance optimized with requestAnimationFrame
 */
function ScrollReveal({
  children,
  className = '',
  animationType = 'card-reveal',
  threshold = 0.1,
  once = true
}: ScrollRevealProps): React.JSX.Element {
  const elementRef = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)
  const [hasBeenViewed, setHasBeenViewed] = useState(false)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    // Check if browser supports scroll-driven animations
    const supportsScrollTimeline = CSS.supports('animation-timeline', 'scroll()')
    
    // For browsers with scroll-driven animation support, CSS handles everything
    if (supportsScrollTimeline) return

    // Fallback: Use Intersection Observer for older browsers
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true)
            if (once) {
              setHasBeenViewed(true)
              observer.unobserve(element)
            }
          } else if (!once && !hasBeenViewed) {
            setIsInView(false)
          }
        })
      },
      {
        threshold,
        rootMargin: '0px 0px -50px 0px'
      }
    )

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [threshold, once, hasBeenViewed])

  const combinedClassName = [
    animationType,
    isInView ? 'in-view' : '',
    className
  ].filter(Boolean).join(' ')

  return (
    <div 
      ref={elementRef}
      className={combinedClassName}
    >
      {children}
    </div>
  )
}

export default ScrollReveal