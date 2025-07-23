import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

function ScrollToTop(): null {
  const { pathname } = useLocation()

  useEffect(() => {
    // Force scroll to top immediately on route change
    const scrollToTop = () => {
      // Find the app container which might be the actual scrolling element
      const appContainer = document.querySelector('.app-container')
      const mainContent = document.querySelector('.main-content')

      // Try multiple methods and elements
      window.scrollTo(0, 0)
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0

      // Scroll the app container if it exists
      if (appContainer) {
        appContainer.scrollTop = 0
      }

      // Scroll the main content if it exists
      if (mainContent) {
        mainContent.scrollTop = 0
      }
    }

    // Execute immediately and with delays to ensure it works
    scrollToTop()
    setTimeout(scrollToTop, 0)
    setTimeout(scrollToTop, 10)
    setTimeout(scrollToTop, 100)
  }, [pathname])

  // This component doesn't render anything
  return null
}

export default ScrollToTop
