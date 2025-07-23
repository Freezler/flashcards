import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

function ScrollToTop(): null {
  const { pathname } = useLocation()

  useEffect(() => {
    console.log('ScrollToTop: Route changed to', pathname)
    
    // Force scroll to top immediately
    const scrollToTop = () => {
      console.log('ScrollToTop: Attempting to scroll to top')
      
      // Find the app container which might be the actual scrolling element
      const appContainer = document.querySelector('.app-container')
      const mainContent = document.querySelector('.main-content')
      
      console.log('Window scroll position:', window.scrollY)
      console.log('App container found:', !!appContainer)
      console.log('Main content found:', !!mainContent)
      
      // Try multiple methods and elements
      window.scrollTo(0, 0)
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
      
      // Scroll the app container if it exists
      if (appContainer) {
        appContainer.scrollTop = 0
        console.log('App container scroll position:', appContainer.scrollTop)
      }
      
      // Scroll the main content if it exists
      if (mainContent) {
        mainContent.scrollTop = 0
        console.log('Main content scroll position:', mainContent.scrollTop)
      }
      
      // Check if it worked
      setTimeout(() => {
        console.log('ScrollToTop: Final positions:')
        console.log('- Window:', window.scrollY)
        console.log('- App container:', appContainer?.scrollTop)
        console.log('- Main content:', mainContent?.scrollTop)
      }, 100)
    }

    // Execute immediately and with delays
    scrollToTop()
    setTimeout(scrollToTop, 0)
    setTimeout(scrollToTop, 10)
    setTimeout(scrollToTop, 100)
    
  }, [pathname])

  // This component doesn't render anything
  return null
}

export default ScrollToTop