/**
 * Font Loading Optimization Utilities
 *
 * Implements advanced font loading strategies to eliminate render-blocking
 * and improve LCP (Largest Contentful Paint) performance.
 */

interface FontLoadingOptions {
  family: string
  weights: number[]
  display?: 'auto' | 'block' | 'swap' | 'fallback' | 'optional'
  timeout?: number
}

/**
 * Preload font files directly for instant rendering
 */
export const preloadFonts = async (): Promise<void> => {
  // Skip direct font file preloading to avoid CORS issues
  // Let the browser handle font loading through CSS
  console.log('Skipping direct font preloading - using CSS loading instead')
  return Promise.resolve()
}

/**
 * Load fonts asynchronously without blocking render
 */
export const loadFontsAsync = (options: FontLoadingOptions): Promise<void> => {
  return new Promise((resolve, reject) => {
    const { family, weights, display = 'swap', timeout = 3000 } = options

    // Create font CSS URL
    const weightsStr = weights.join(';')
    const fontUrl = `https://fonts.googleapis.com/css2?family=${family}:wght@${weightsStr}&display=${display}`

    // Create link element
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = fontUrl

    // Set up timeout
    const timeoutId = setTimeout(() => {
      reject(new Error(`Font loading timeout: ${family}`))
    }, timeout)

    // Handle successful load
    link.onload = () => {
      clearTimeout(timeoutId)
      console.log(`✅ Font loaded: ${family}`)
      resolve()
    }

    // Handle error
    link.onerror = () => {
      clearTimeout(timeoutId)
      reject(new Error(`Failed to load font: ${family}`))
    }

    // Add to document
    document.head.appendChild(link)
  })
}

/**
 * Check if fonts are loaded using Font Loading API
 */
export const waitForFontsReady = async (): Promise<void> => {
  if (!('fonts' in document)) {
    console.warn('Font Loading API not supported')
    return
  }

  try {
    // Wait for all fonts to be ready
    await document.fonts.ready
    console.log('✅ All fonts are ready')
  } catch (error) {
    console.warn('⚠️ Error waiting for fonts:', error)
  }
}

/**
 * Optimize font loading with FOUT (Flash of Unstyled Text) prevention
 */
export const optimizeFontLoading = async (): Promise<void> => {
  // Add font-display: swap CSS class for immediate text rendering
  const style = document.createElement('style')
  style.textContent = `
    /* Font loading optimization */
    @font-face {
      font-family: 'Inter Fallback';
      src: local('Inter'), local('Inter-Regular'), 
           local('system-ui'), local('-apple-system'), 
           local('BlinkMacSystemFont'), local('Segoe UI');
      font-display: swap;
      font-weight: 300 700;
    }
    
    /* Use fallback during font load */
    .font-loading {
      font-family: 'Inter Fallback', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    }
    
    /* Switch to loaded font */
    .fonts-loaded {
      font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    }
  `
  // Add nonce for CSP if available
  const nonce = document
    .querySelector('meta[name="csp-nonce"]')
    ?.getAttribute('content')
  if (nonce) {
    style.setAttribute('nonce', nonce)
  }
  document.head.appendChild(style)

  // Add font-loading class initially
  document.documentElement.classList.add('font-loading')

  try {
    // Load Inter font asynchronously
    await loadFontsAsync({
      family: 'Inter',
      weights: [300, 400, 500, 600, 700],
      display: 'swap',
    })

    // Wait for fonts to be fully ready
    await waitForFontsReady()

    // Switch to loaded fonts
    document.documentElement.classList.remove('font-loading')
    document.documentElement.classList.add('fonts-loaded')
  } catch (error) {
    console.warn('Font loading failed, using fallback:', error)
    // Keep using fallback fonts
    document.documentElement.classList.remove('font-loading')
    document.documentElement.classList.add('fonts-loaded')
  }
}

/**
 * Critical CSS injection for immediate styling
 */
export const injectCriticalCSS = (): void => {
  const criticalCSS = `
    /* Critical above-the-fold styles */
    *, *::before, *::after {
      box-sizing: border-box;
    }
    
    html {
      scroll-behavior: smooth;
    }
    
    body {
      margin: 0;
      font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      line-height: 1.5;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      background: linear-gradient(135deg, 
        oklch(100% 0 0) 0%, 
        oklch(98% 0.008 240) 25%,
        oklch(99% 0.005 260) 50%,
        oklch(97% 0.012 220) 75%,
        oklch(98.5% 0.006 250) 100%
      );
      min-height: 100vh;
    }
    
    #root {
      min-height: 100vh;
      background: inherit;
    }
    
    /* Navigation critical styles */
    .navigation {
      position: sticky;
      top: 0;
      z-index: 100;
      background: oklch(100% 0 0);
      border-bottom: 1px solid oklch(90% 0.01 240);
      backdrop-filter: blur(10px);
    }
    
    /* Loading states */
    .loading-skeleton {
      background: linear-gradient(90deg, 
        oklch(95% 0.005 240) 25%, 
        oklch(98% 0.002 240) 50%, 
        oklch(95% 0.005 240) 75%
      );
      background-size: 200% 100%;
      animation: loading-shimmer 2s infinite;
    }
    
    @keyframes loading-shimmer {
      0% { background-position: 200% 0; }
      100% { background-position: -200% 0; }
    }
  `

  const style = document.createElement('style')
  style.textContent = criticalCSS
  // Add nonce for CSP if available
  const nonce = document
    .querySelector('meta[name="csp-nonce"]')
    ?.getAttribute('content')
  if (nonce) {
    style.setAttribute('nonce', nonce)
  }
  document.head.appendChild(style)
}

/**
 * Initialize all font loading optimizations
 */
export const initializeFontOptimizations = async (): Promise<void> => {
  console.log('🚀 Initializing font loading optimizations...')

  // Inject critical CSS immediately
  injectCriticalCSS()

  // Start font loading process
  await optimizeFontLoading()

  console.log('✅ Font loading optimizations complete')
}
