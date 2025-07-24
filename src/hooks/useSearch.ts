import { useState, useCallback, useMemo } from 'react'
import { useDebounce } from './useDebounce'
import { FlashCard } from '../types'
import {
  FlashCardSearchEngine,
  EnhancedSearchResult,
  SearchOptions,
} from '../utils/searchUtils'

export interface SearchResult extends EnhancedSearchResult {}

export interface SearchState {
  query: string
  results: SearchResult[]
  isSearching: boolean
  hasSearched: boolean
  totalResults: number
  suggestions: string[]
}

export interface SearchFilters {
  difficulty?: string
  category?: string
  deckId?: string
  tags?: string[]
}

export interface UseSearchOptions extends SearchOptions {
  enableSuggestions?: boolean
  maxSuggestions?: number
}

/**
 * Modern search hook with debouncing, filtering, and fuzzy matching
 * Provides comprehensive search functionality for flashcards
 */
export function useSearch(data: FlashCard[], options: UseSearchOptions = {}) {
  const {
    searchFields = ['front', 'back', 'category', 'tags'],
    threshold = 0.3,
    includeScore = true,
    includeMatches = true,
    minMatchCharLength = 2,
    maxResults = 50,
    enableSuggestions = true,
    maxSuggestions = 5,
  } = options

  const [query, setQuery] = useState('')
  const [filters, setFilters] = useState<SearchFilters>({})
  const [isSearching, setIsSearching] = useState(false)
  const [searchHistory, setSearchHistory] = useState<string[]>([])

  // Debounce the search query to prevent excessive searches
  const debouncedQuery = useDebounce(query, 300)

  // Filter data based on current filters
  const filteredData = useMemo(() => {
    return data.filter(item => {
      if (filters.difficulty && item.difficulty !== filters.difficulty)
        return false
      if (filters.category && item.category !== filters.category) return false
      if (filters.deckId && !item.id.startsWith(filters.deckId)) return false
      if (
        filters.tags?.length &&
        !filters.tags.some(tag => item.tags.includes(tag))
      )
        return false
      return true
    })
  }, [data, filters])

  // Create search engine instance
  const searchEngine = useMemo(() => {
    return new FlashCardSearchEngine(filteredData, {
      threshold,
      includeScore,
      includeMatches,
      minMatchCharLength,
      maxResults,
      searchFields,
    })
  }, [
    filteredData,
    threshold,
    includeScore,
    includeMatches,
    minMatchCharLength,
    maxResults,
    searchFields,
  ])

  // Perform search when debounced query changes
  const searchResults = useMemo(() => {
    if (!debouncedQuery.trim()) {
      return {
        results: [],
        totalResults: 0,
        hasSearched: false,
        suggestions: [],
      }
    }

    if (debouncedQuery.length < minMatchCharLength) {
      return {
        results: [],
        totalResults: 0,
        hasSearched: true,
        suggestions: enableSuggestions
          ? searchEngine.getSuggestions(debouncedQuery, maxSuggestions)
          : [],
      }
    }

    // Use Fuse.js powered search engine
    const results = searchEngine.search(debouncedQuery, maxResults)
    const suggestions = enableSuggestions
      ? searchEngine.getSuggestions(debouncedQuery, maxSuggestions)
      : []

    return {
      results,
      totalResults: results.length,
      hasSearched: true,
      suggestions,
    }
  }, [
    debouncedQuery,
    searchEngine,
    minMatchCharLength,
    maxResults,
    enableSuggestions,
    maxSuggestions,
  ])

  // Update search query
  const search = useCallback(
    (newQuery: string) => {
      setQuery(newQuery)
      setIsSearching(true)

      // Add to search history if not empty and not already in history
      if (newQuery.trim() && !searchHistory.includes(newQuery.trim())) {
        setSearchHistory(prev => [newQuery.trim(), ...prev.slice(0, 9)]) // Keep last 10 searches
      }
    },
    [searchHistory]
  )

  // Clear search
  const clearSearch = useCallback(() => {
    setQuery('')
    setIsSearching(false)
  }, [])

  // Update filters
  const updateFilters = useCallback((newFilters: Partial<SearchFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }))
  }, [])

  // Clear filters
  const clearFilters = useCallback(() => {
    setFilters({})
  }, [])

  // Stop searching indicator when results are ready
  const stopSearching = useCallback(() => {
    setIsSearching(false)
  }, [])

  // Effect to stop searching when debounced query settles
  useMemo(() => {
    if (debouncedQuery === query) {
      setIsSearching(false)
    }
  }, [debouncedQuery, query])

  const state: SearchState = {
    query,
    results: searchResults.results,
    isSearching: isSearching && debouncedQuery !== query,
    hasSearched: searchResults.hasSearched,
    totalResults: searchResults.totalResults,
    suggestions: searchResults.suggestions,
  }

  return {
    state,
    search,
    clearSearch,
    filters,
    updateFilters,
    clearFilters,
    searchHistory,
    actions: {
      search,
      clearSearch,
      updateFilters,
      clearFilters,
      stopSearching,
    },
  }
}
