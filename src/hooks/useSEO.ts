import { useEffect } from 'react'

interface SEOProps {
  title?: string
  description?: string
  keywords?: string
  image?: string
  url?: string
  type?: string
  noIndex?: boolean
}

/**
 * Custom hook voor dynamische SEO meta tags
 * Gebruik dit om pagina-specifieke SEO optimalisatie toe te passen
 */
export const useSEO = ({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website',
  noIndex = false
}: SEOProps = {}) => {
  useEffect(() => {
    const baseTitle = 'Nederlandse Flashcards - Leer Nederlands met Spaced Repetition'
    const baseDescription = 'Interactieve Nederlandse flashcards app met spaced repetition algoritme. Leer grammatica, geschiedenis, geografie en cultuur effectief.'
    const baseUrl = 'https://nederlandse-flashcards.vercel.app'
    const baseImage = `${baseUrl}/og-image.jpg`

    // Update document title
    if (title) {
      document.title = `${title} | Nederlandse Flashcards`
    } else {
      document.title = baseTitle
    }

    // Update meta tags
    const updateMetaTag = (name: string, content: string, property = false) => {
      const attribute = property ? 'property' : 'name'
      let meta = document.querySelector(`meta[${attribute}="${name}"]`)
      
      if (!meta) {
        meta = document.createElement('meta')
        meta.setAttribute(attribute, name)
        document.head.appendChild(meta)
      }
      
      meta.setAttribute('content', content)
    }

    // Basic meta tags
    updateMetaTag('description', description || baseDescription)
    if (keywords) updateMetaTag('keywords', keywords)
    
    // Robots meta tag
    updateMetaTag('robots', noIndex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1')

    // Open Graph tags
    updateMetaTag('og:title', title ? `${title} | Nederlandse Flashcards` : baseTitle, true)
    updateMetaTag('og:description', description || baseDescription, true)
    updateMetaTag('og:image', image || baseImage, true)
    updateMetaTag('og:url', url || baseUrl, true)
    updateMetaTag('og:type', type, true)
    updateMetaTag('og:site_name', 'Nederlandse Flashcards', true)
    updateMetaTag('og:locale', 'nl_NL', true)

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image', true)
    updateMetaTag('twitter:title', title ? `${title} | Nederlandse Flashcards` : baseTitle, true)
    updateMetaTag('twitter:description', description || baseDescription, true)
    updateMetaTag('twitter:image', image || baseImage, true)
    updateMetaTag('twitter:url', url || baseUrl, true)

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', url || baseUrl)

  }, [title, description, keywords, image, url, type, noIndex])
}

/**
 * Helper functie voor deck-specifieke SEO
 */
export const useDeckSEO = (deckName: string, deckDescription?: string, cardCount?: number) => {
  const title = `${deckName} Flashcards`
  const description = deckDescription || `Leer ${deckName.toLowerCase()} met interactieve flashcards. ${cardCount ? `${cardCount} kaarten beschikbaar.` : ''} Spaced repetition algoritme voor effectief leren.`
  const keywords = `${deckName.toLowerCase()}, flashcards, nederlands leren, spaced repetition, educatie`
  
  useSEO({
    title,
    description,
    keywords,
    type: 'article'
  })
}

/**
 * Helper functie voor studie sessie SEO
 */
export const useStudySEO = (deckName: string) => {
  const title = `Studeer ${deckName}`
  const description = `Actieve studie sessie voor ${deckName.toLowerCase()}. Verbeter je kennis met ons spaced repetition algoritme.`
  const keywords = `${deckName.toLowerCase()}, studie, leren, flashcards, spaced repetition`
  
  useSEO({
    title,
    description,
    keywords,
    type: 'article'
  })
}