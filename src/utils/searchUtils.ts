import Fuse from 'fuse.js'
import { FlashCard } from '../types'

export interface SearchMatch {
  key: string
  value: string
  indices: Array<[number, number]>
}

export interface EnhancedSearchResult {
  item: FlashCard
  score: number
  matches: SearchMatch[]
  refIndex: number
}

export interface SearchOptions {
  threshold?: number
  includeScore?: boolean
  includeMatches?: boolean
  minMatchCharLength?: number
  maxResults?: number
  searchFields?: string[]
}

/**
 * Advanced search utility using Fuse.js for fuzzy matching
 * Provides typo-tolerant search with configurable options
 */
export class FlashCardSearchEngine {
  private fuse: Fuse<FlashCard>
  private options: Fuse.IFuseOptions<FlashCard>

  constructor(data: FlashCard[], searchOptions: SearchOptions = {}) {
    const {
      threshold = 0.3, // Lower = more strict matching
      includeScore = true,
      includeMatches = true,
      minMatchCharLength = 2,
      searchFields = ['front', 'back', 'category', 'tags', 'difficulty'],
    } = searchOptions

    // Configure Fuse.js options for optimal flashcard search
    this.options = {
      // Fuzzy matching configuration
      threshold, // 0.0 = perfect match, 1.0 = match anything
      distance: 100, // Maximum distance for match
      minMatchCharLength,

      // Result configuration
      includeScore,
      includeMatches,
      findAllMatches: true,

      // Search fields with weights (higher = more important)
      keys: [
        { name: 'front', weight: 0.4 }, // Question text is most important
        { name: 'back', weight: 0.3 }, // Answer text is second
        { name: 'category', weight: 0.15 }, // Category is third
        { name: 'difficulty', weight: 0.1 }, // Difficulty level
        { name: 'tags', weight: 0.05 }, // Tags are least important
      ],

      // Performance optimizations
      shouldSort: true,
      sortFn: (a, b) => a.score - b.score, // Sort by relevance

      // Advanced matching
      useExtendedSearch: true, // Enables exact matches with quotes
      ignoreLocation: true, // Don't consider position in string
      getFn: (obj, path) => {
        // Custom getter for nested properties
        if (path === 'tags') {
          return (obj as FlashCard).tags.join(' ')
        }
        return Fuse.config.getFn(obj, path)
      },
    }

    this.fuse = new Fuse(data, this.options)
  }

  /**
   * Perform fuzzy search with advanced matching
   */
  search(query: string, maxResults: number = 50): EnhancedSearchResult[] {
    if (!query.trim()) return []

    // Perform the search
    const fuseResults = this.fuse.search(query, { limit: maxResults })

    // Transform Fuse results to our format
    return fuseResults.map(result => ({
      item: result.item,
      score: result.score || 0,
      matches: this.transformMatches(result.matches || []),
      refIndex: result.refIndex || 0,
    }))
  }

  /**
   * Search with query operators (advanced search syntax)
   */
  advancedSearch(
    query: string,
    maxResults: number = 50
  ): EnhancedSearchResult[] {
    // Support for advanced query syntax:
    // "exact phrase" - exact match
    // ^starting - items that start with
    // ending$ - items that end with
    // !not - items that don't include
    // 'fuzzy - fuzzy match

    let processedQuery = query.trim()

    // Auto-add fuzzy search operator if no special syntax
    if (!this.hasSpecialSyntax(processedQuery)) {
      processedQuery = `'${processedQuery}` // Add fuzzy operator
    }

    return this.search(processedQuery, maxResults)
  }

  /**
   * Get search suggestions based on partial input
   */
  getSuggestions(partialQuery: string, maxSuggestions: number = 5): string[] {
    if (partialQuery.length < 2) return []

    const results = this.search(partialQuery, maxSuggestions * 2)
    const suggestions = new Set<string>()

    results.forEach(result => {
      // Extract words from matches
      result.matches.forEach(match => {
        const words = match.value.toLowerCase().split(/\s+/)
        words.forEach(word => {
          if (
            word.includes(partialQuery.toLowerCase()) &&
            word.length > partialQuery.length
          ) {
            suggestions.add(word)
          }
        })
      })
    })

    return Array.from(suggestions).slice(0, maxSuggestions)
  }

  /**
   * Update the search index with new data
   */
  updateIndex(newData: FlashCard[]): void {
    this.fuse.setCollection(newData)
  }

  /**
   * Get search statistics
   */
  getStats(): {
    totalItems: number
    indexSize: number
    searchFields: string[]
  } {
    return {
      totalItems: this.fuse.getIndex().size,
      indexSize: this.fuse.getIndex().size,
      searchFields:
        this.options.keys?.map(k => (typeof k === 'string' ? k : k.name)) || [],
    }
  }

  /**
   * Transform Fuse matches to our format
   */
  private transformMatches(
    fuseMatches: readonly Fuse.FuseResultMatch[]
  ): SearchMatch[] {
    return fuseMatches.map(match => ({
      key: match.key || 'unknown',
      value: match.value || '',
      indices: match.indices || [],
    }))
  }

  /**
   * Check if query has special search syntax
   */
  private hasSpecialSyntax(query: string): boolean {
    return /["'^$!]/.test(query)
  }
}

/**
 * Highlight search matches in text
 */
export function highlightMatches(
  text: string,
  matches: SearchMatch[],
  className: string = 'search-highlight'
): string {
  if (!matches.length) return text

  // Find the match for this text
  const match = matches.find(m => m.value === text)
  if (!match || !match.indices.length) return text

  let highlightedText = text
  let offset = 0

  // Sort indices by start position (descending to avoid offset issues)
  const sortedIndices = [...match.indices].sort((a, b) => b[0] - a[0])

  sortedIndices.forEach(([start, end]) => {
    const before = highlightedText.slice(0, start + offset)
    const highlighted = highlightedText.slice(start + offset, end + 1 + offset)
    const after = highlightedText.slice(end + 1 + offset)

    highlightedText = `${before}<mark class="${className}">${highlighted}</mark>${after}`
    offset += `<mark class="${className}"></mark>`.length
  })

  return highlightedText
}

/**
 * Extract highlighted text snippets
 */
export function getTextSnippets(
  text: string,
  matches: SearchMatch[],
  snippetLength: number = 100
): Array<{ text: string; isHighlighted: boolean }> {
  if (!matches.length) {
    return [{ text, isHighlighted: false }]
  }

  const match = matches.find(m => m.value === text)
  if (!match || !match.indices.length) {
    return [{ text, isHighlighted: false }]
  }

  const snippets: Array<{ text: string; isHighlighted: boolean }> = []
  let lastIndex = 0

  match.indices.forEach(([start, end]) => {
    // Add text before highlight
    if (start > lastIndex) {
      snippets.push({
        text: text.slice(lastIndex, start),
        isHighlighted: false,
      })
    }

    // Add highlighted text
    snippets.push({
      text: text.slice(start, end + 1),
      isHighlighted: true,
    })

    lastIndex = end + 1
  })

  // Add remaining text
  if (lastIndex < text.length) {
    snippets.push({
      text: text.slice(lastIndex),
      isHighlighted: false,
    })
  }

  return snippets
}
