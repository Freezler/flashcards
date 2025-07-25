import React, { createContext, useContext, useCallback, useMemo } from 'react'
import {
  useSearch,
  SearchState,
  SearchFilters,
  UseSearchOptions,
} from '../hooks/useSearch'
import { FlashCard } from '../types'

export interface SearchContextType {
  // Search State
  state: SearchState

  // Search Actions
  search: (query: string) => void
  clearSearch: () => void

  // Filter Actions
  filters: SearchFilters
  updateFilters: (filters: Partial<SearchFilters>) => void
  clearFilters: () => void

  // Search History
  searchHistory: string[]

  // Utility Functions
  isActive: boolean
  hasResults: boolean

  // Search Configuration
  options: UseSearchOptions
  updateOptions: (newOptions: Partial<UseSearchOptions>) => void
}

const SearchContext = createContext<SearchContextType | null>(null)

export interface SearchProviderProps {
  children: React.ReactNode
  data: FlashCard[]
  options?: UseSearchOptions
  onSearchStateChange?: (state: SearchState) => void
}

/**
 * Search Context Provider
 * Provides search functionality to the entire application
 */
export function SearchProvider({
  children,
  data,
  options: initialOptions = {},
  onSearchStateChange,
}: SearchProviderProps): React.JSX.Element {
  const [options, setOptions] = React.useState<UseSearchOptions>(initialOptions)

  // Use the search hook
  const searchHook = useSearch(data, options)
  const {
    state,
    search,
    clearSearch,
    filters,
    updateFilters,
    clearFilters,
    searchHistory,
  } = searchHook

  // Notify parent of search state changes
  React.useEffect(() => {
    onSearchStateChange?.(state)
  }, [state, onSearchStateChange])

  // Update search options
  const updateOptions = useCallback((newOptions: Partial<UseSearchOptions>) => {
    setOptions(prev => ({ ...prev, ...newOptions }))
  }, [])

  // Computed values
  const contextValue = useMemo(
    (): SearchContextType => ({
      // State
      state,

      // Actions
      search,
      clearSearch,

      // Filters
      filters,
      updateFilters,
      clearFilters,

      // History
      searchHistory,

      // Utilities
      isActive: state.hasSearched && state.query.length > 0,
      hasResults: state.results.length > 0,

      // Configuration
      options,
      updateOptions,
    }),
    [
      state,
      search,
      clearSearch,
      filters,
      updateFilters,
      clearFilters,
      searchHistory,
      options,
      updateOptions,
    ]
  )

  return (
    <SearchContext.Provider value={contextValue}>
      {children}
    </SearchContext.Provider>
  )
}

/**
 * Hook to use search context
 * Must be used within a SearchProvider
 */
export function useSearchContext(): SearchContextType {
  const context = useContext(SearchContext)

  if (!context) {
    throw new Error('useSearchContext must be used within a SearchProvider')
  }

  return context
}

/**
 * Higher-order component to provide search functionality
 */
export function withSearch<P extends object>(
  Component: React.ComponentType<P>,
  searchOptions?: UseSearchOptions
) {
  return function WithSearchComponent(props: P & { data: FlashCard[] }) {
    const { data, ...componentProps } = props

    return (
      <SearchProvider data={data} options={searchOptions}>
        <Component {...(componentProps as P)} />
      </SearchProvider>
    )
  }
}

/**
 * Search hook with context fallback
 * Can be used with or without SearchProvider
 */
export function useSearchWithFallback(
  fallbackData?: FlashCard[],
  fallbackOptions?: UseSearchOptions
): SearchContextType {
  const context = useContext(SearchContext)

  // Always call hooks at the top level - moved before conditional returns
  const fallbackSearch = useSearch(fallbackData || [], fallbackOptions || {})
  
  // Memoize fallback context to prevent unnecessary re-renders
  const fallbackContext = useMemo(
    (): SearchContextType => ({
      state: fallbackSearch.state,
      search: fallbackSearch.search,
      clearSearch: fallbackSearch.clearSearch,
      filters: fallbackSearch.filters,
      updateFilters: fallbackSearch.updateFilters,
      clearFilters: fallbackSearch.clearFilters,
      searchHistory: fallbackSearch.searchHistory,
      isActive:
        fallbackSearch.state.hasSearched &&
        fallbackSearch.state.query.length > 0,
      hasResults: fallbackSearch.state.results.length > 0,
      options: fallbackOptions || {},
      updateOptions: () => {}, // Not implemented in fallback mode
    }),
    [fallbackSearch, fallbackOptions]
  )

  if (context) {
    return context
  }

  if (!fallbackData) {
    throw new Error(
      'useSearchWithFallback requires either SearchProvider or fallbackData'
    )
  }

  return fallbackContext
}

export default SearchProvider
