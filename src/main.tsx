import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Get root element
const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('Root element not found')

// Create React root and render immediately
const root = createRoot(rootElement)
root.render(
  <StrictMode>
    <App />
  </StrictMode>
)

// Hide loading indicator when React loads
setTimeout(() => {
  const loadingIndicator = document.getElementById('loading-indicator')
  if (loadingIndicator) {
    loadingIndicator.classList.add('hidden')
    setTimeout(() => loadingIndicator.remove(), 300)
  }
}, 100)

console.log('🚀 Nederlandse Flashcards app loaded successfully!')
