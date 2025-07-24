/**
 * Resource Preloading Utilities
 *
 * Advanced resource preloading strategies to eliminate render-blocking
 * requests and improve LCP, FCP, and overall page performance.
 */

interface PreloadResource {
  url: string
  as: 'script' | 'style' | 'font' | 'image' | 'fetch'
  type?: string
  crossOrigin?: 'anonymous' | 'use-credentials'
  priority?: 'high' | 'low'
}

/**
 * Preload critical resources using Resource Hints
 */
export class ResourcePreloader {
  private preloadedResources = new Set<string>()
  private preloadPromises = new Map<string, Promise<void>>()

  /**
   * Preload a single resource
   */
  preload(resource: PreloadResource): Promise<void> {
    const { url, as, type, crossOrigin, priority = 'high' } = resource

    // Avoid duplicate preloads
    if (this.preloadedResources.has(url)) {
      return this.preloadPromises.get(url) || Promise.resolve()
    }

    const promise = new Promise<void>((resolve, reject) => {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.href = url
      link.as = as

      if (type) link.type = type
      if (crossOrigin) link.crossOrigin = crossOrigin
      if (priority === 'high') link.setAttribute('fetchpriority', 'high')

      link.onload = () => {
        console.log(`✅ Preloaded: ${url}`)
        resolve()
      }

      link.onerror = () => {
        console.warn(`⚠️ Failed to preload: ${url}`)
        reject(new Error(`Failed to preload: ${url}`))
      }

      document.head.appendChild(link)
    })

    this.preloadedResources.add(url)
    this.preloadPromises.set(url, promise)

    return promise
  }

  /**
   * Preload multiple resources in parallel
   */
  async preloadAll(resources: PreloadResource[]): Promise<void> {
    const promises = resources.map(resource =>
      this.preload(resource).catch(error => {
        console.warn('Resource preload failed:', error)
        return Promise.resolve() // Don't fail the entire batch
      })
    )

    await Promise.all(promises)
    console.log(`✅ Preloaded ${resources.length} resources`)
  }

  /**
   * Prefetch resources for future navigation
   */
  prefetch(url: string): void {
    if (this.preloadedResources.has(url)) return

    const link = document.createElement('link')
    link.rel = 'prefetch'
    link.href = url
    document.head.appendChild(link)

    this.preloadedResources.add(url)
    console.log(`📦 Prefetched: ${url}`)
  }

  /**
   * DNS prefetch for external domains
   */
  dnsPrefetch(domain: string): void {
    const link = document.createElement('link')
    link.rel = 'dns-prefetch'
    link.href = domain
    document.head.appendChild(link)
    console.log(`🌐 DNS prefetched: ${domain}`)
  }

  /**
   * Preconnect to external origins
   */
  preconnect(origin: string, crossOrigin = false): void {
    const link = document.createElement('link')
    link.rel = 'preconnect'
    link.href = origin
    if (crossOrigin) link.crossOrigin = 'anonymous'
    document.head.appendChild(link)
    console.log(`🔗 Preconnected: ${origin}`)
  }
}

/**
 * Critical resource preloading for the flashcards app
 */
export const preloadCriticalResources = async (): Promise<void> => {
  const preloader = new ResourcePreloader()

  // Skip font preloading to avoid CORS and URL issues
  // Fonts are loaded via CSS which handles fallbacks better
  const criticalFonts: PreloadResource[] = []

  // Skip module preloading for now to avoid MIME type issues
  // These will be loaded naturally by Vite's import system
  const criticalModules: PreloadResource[] = []

  // Critical images (if any)
  const criticalImages: PreloadResource[] = [
    {
      url: '/brainBulb.svg',
      as: 'image',
      priority: 'high',
    },
  ]

  try {
    // Preload only images and other working resources
    await preloader.preloadAll(criticalImages)
    console.log('✅ Critical resources preloaded')
  } catch (error) {
    console.warn('⚠️ Some critical resources failed to preload:', error)
  }
}

/**
 * Setup performance-optimized resource hints
 */
export const setupResourceHints = (): void => {
  const preloader = new ResourcePreloader()

  // DNS prefetch for external domains
  preloader.dnsPrefetch('https://fonts.googleapis.com')
  preloader.dnsPrefetch('https://fonts.gstatic.com')

  // Preconnect to font services
  preloader.preconnect('https://fonts.googleapis.com')
  preloader.preconnect('https://fonts.gstatic.com', true)

  // Skip module prefetching to avoid MIME type issues
  // Vite handles module loading and chunking automatically
  console.log('Skipping module prefetching - handled by Vite')
}

/**
 * Initialize all resource preloading optimizations
 */
export const initializeResourcePreloading = async (): Promise<void> => {
  console.log('🚀 Initializing resource preloading...')

  // Setup resource hints immediately
  setupResourceHints()

  // Preload critical resources
  await preloadCriticalResources()

  console.log('✅ Resource preloading optimizations complete')
}

/**
 * Performance monitoring and reporting
 */
export const reportPerformanceMetrics = (): void => {
  if (!('performance' in window)) {
    console.warn('Performance API not available')
    return
  }

  // Wait for navigation to complete
  window.addEventListener('load', () => {
    setTimeout(() => {
      const navigation = performance.getEntriesByType(
        'navigation'
      )[0] as PerformanceNavigationTiming
      const paint = performance.getEntriesByType('paint')

      const metrics = {
        'DNS Lookup': Math.round(
          navigation.domainLookupEnd - navigation.domainLookupStart
        ),
        'TCP Connect': Math.round(
          navigation.connectEnd - navigation.connectStart
        ),
        Request: Math.round(navigation.responseStart - navigation.requestStart),
        Response: Math.round(navigation.responseEnd - navigation.responseStart),
        'DOM Parse': Math.round(
          navigation.domContentLoadedEventStart - navigation.responseEnd
        ),
        'Resource Load': Math.round(
          navigation.loadEventStart - navigation.domContentLoadedEventEnd
        ),
        'Total Load Time': Math.round(
          navigation.loadEventEnd - navigation.navigationStart
        ),
        'First Paint': Math.round(
          paint.find(p => p.name === 'first-paint')?.startTime || 0
        ),
        'First Contentful Paint': Math.round(
          paint.find(p => p.name === 'first-contentful-paint')?.startTime || 0
        ),
      }

      console.table(metrics)

      // Report potential improvements
      if (metrics['First Contentful Paint'] > 1500) {
        console.warn(
          '⚠️ FCP is slow (>1.5s). Consider optimizing critical resources.'
        )
      }
      if (metrics['Total Load Time'] > 3000) {
        console.warn(
          '⚠️ Total load time is slow (>3s). Consider code splitting.'
        )
      }

      console.log('🎯 Performance target: FCP < 1.8s, LCP < 2.5s')
    }, 0)
  })
}
