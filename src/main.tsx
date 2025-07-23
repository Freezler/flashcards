import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { initializeFontOptimizations } from './utils/fontLoading'
import { initializeResourcePreloading, reportPerformanceMetrics } from './utils/resourcePreloader'

// Performance monitoring
const startTime = performance.now()

async function initializeApp() {
  // Initialize all performance optimizations in parallel
  const fontOptimizationPromise = initializeFontOptimizations()
  const resourcePreloadingPromise = initializeResourcePreloading()
  
  // Get root element
  const rootElement = document.getElementById('root')
  if (!rootElement) throw new Error('Root element not found')
  
  // Create React root
  const root = createRoot(rootElement)
  
  // Start React rendering immediately (don't wait for fonts)
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  )
  
  // Wait for all optimizations to complete
  try {
    await Promise.all([fontOptimizationPromise, resourcePreloadingPromise])
    console.log('✅ All performance optimizations completed')
  } catch (error) {
    console.warn('⚠️ Some optimizations failed:', error)
  }
  
  // Start performance monitoring
  reportPerformanceMetrics()
  
  // Performance metrics
  const loadTime = performance.now() - startTime
  console.log(`🚀 App initialized in ${Math.round(loadTime)}ms`)
  
  // Hide loading indicator
  const loadingIndicator = document.getElementById('loading-indicator')
  if (loadingIndicator) {
    loadingIndicator.classList.add('hidden')
    setTimeout(() => loadingIndicator.remove(), 300)
  }
}

// Initialize the app
initializeApp().catch(error => {
  console.error('Failed to initialize app:', error)
  // Fallback: render app anyway
  const rootElement = document.getElementById('root')
  if (rootElement) {
    createRoot(rootElement).render(
      <StrictMode>
        <App />
      </StrictMode>
    )
  }
})
