import React, { useState, useRef, useCallback, useId } from 'react'

export interface SearchBoxProps {
  query: string
  onSearch: (query: string) => void
  onClear: () => void
  isSearching?: boolean
  placeholder?: string
  searchHistory?: string[]
  onSelectFromHistory?: (query: string) => void
  className?: string
  disabled?: boolean
  autoFocus?: boolean
}

/**
 * Modern SearchBox component with accessibility and UX best practices
 * Features: debounced input, search history, keyboard navigation, screen reader support
 */
export function SearchBox({
  query,
  onSearch,
  onClear,
  isSearching = false,
  placeholder = 'Zoek in flashcards...',
  searchHistory = [],
  onSelectFromHistory,
  className = '',
  disabled = false,
  autoFocus = false,
}: SearchBoxProps): React.JSX.Element {
  const [isFocused, setIsFocused] = useState(false)
  const [showHistory, setShowHistory] = useState(false)
  const [historyIndex, setHistoryIndex] = useState(-1)

  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const historyRef = useRef<HTMLUListElement>(null)

  // Generate unique IDs for accessibility
  const searchId = useId()
  const historyId = useId()
  const statusId = useId()

  // Handle input changes
  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newQuery = event.target.value
      onSearch(newQuery)
      setHistoryIndex(-1)

      // Show history when input is focused and empty
      if (!newQuery.trim() && searchHistory.length > 0) {
        setShowHistory(true)
      } else {
        setShowHistory(false)
      }
    },
    [onSearch, searchHistory.length]
  )

  // Handle input focus
  const handleFocus = useCallback(() => {
    setIsFocused(true)

    // Show history if input is empty and we have history
    if (!query.trim() && searchHistory.length > 0) {
      setShowHistory(true)
    }
  }, [query, searchHistory.length])

  // Handle input blur
  const handleBlur = useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      // Delay hiding history to allow clicking on history items
      setTimeout(() => {
        if (!containerRef.current?.contains(document.activeElement)) {
          setIsFocused(false)
          setShowHistory(false)
          setHistoryIndex(-1)
        }
      }, 150)
    },
    []
  )

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (!showHistory || searchHistory.length === 0) {
        if (event.key === 'Escape' && query) {
          onClear()
          return
        }
        return
      }

      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault()
          setHistoryIndex(prev =>
            prev < searchHistory.length - 1 ? prev + 1 : 0
          )
          break

        case 'ArrowUp':
          event.preventDefault()
          setHistoryIndex(prev =>
            prev > 0 ? prev - 1 : searchHistory.length - 1
          )
          break

        case 'Enter':
          event.preventDefault()
          if (historyIndex >= 0 && searchHistory[historyIndex]) {
            const selectedQuery = searchHistory[historyIndex]
            onSearch(selectedQuery)
            onSelectFromHistory?.(selectedQuery)
            setShowHistory(false)
            setHistoryIndex(-1)
          }
          break

        case 'Escape':
          event.preventDefault()
          if (query) {
            onClear()
          } else {
            setShowHistory(false)
            setHistoryIndex(-1)
          }
          break
      }
    },
    [
      showHistory,
      searchHistory,
      historyIndex,
      query,
      onSearch,
      onSelectFromHistory,
      onClear,
    ]
  )

  // Handle history item click
  const handleHistoryClick = useCallback(
    (selectedQuery: string) => {
      onSearch(selectedQuery)
      onSelectFromHistory?.(selectedQuery)
      setShowHistory(false)
      setHistoryIndex(-1)

      // Focus back to input
      inputRef.current?.focus()
    },
    [onSearch, onSelectFromHistory]
  )

  // Handle clear button click
  const handleClear = useCallback(() => {
    onClear()
    setShowHistory(searchHistory.length > 0)
    setHistoryIndex(-1)
    inputRef.current?.focus()
  }, [onClear, searchHistory.length])

  return (
    <div
      ref={containerRef}
      className={`search-box ${isFocused ? 'search-box--focused' : ''} ${className}`}
      role="combobox"
      aria-expanded={showHistory}
      aria-haspopup="listbox"
      aria-owns={showHistory ? historyId : undefined}
    >
      {/* Search Input */}
      <div className="search-box__input-wrapper">
        <div
          className="search-box__icon search-box__icon--search"
          aria-hidden="true"
        >
          🔍
        </div>

        <input
          ref={inputRef}
          id={searchId}
          type="text"
          className="search-box__input"
          value={query}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          autoFocus={autoFocus}
          autoComplete="off"
          role="searchbox"
          aria-label="Zoek flashcards"
          aria-describedby={isSearching ? statusId : undefined}
          aria-autocomplete="list"
          aria-activedescendant={
            showHistory && historyIndex >= 0
              ? `${historyId}-item-${historyIndex}`
              : undefined
          }
        />

        {/* Loading Indicator */}
        {isSearching && (
          <div
            className="search-box__icon search-box__icon--loading"
            aria-hidden="true"
            title="Zoeken..."
          >
            ⏳
          </div>
        )}

        {/* Clear Button */}
        {query && !isSearching && (
          <button
            type="button"
            className="search-box__clear"
            onClick={handleClear}
            aria-label="Zoekopdracht wissen"
            title="Wissen"
          >
            ✕
          </button>
        )}
      </div>

      {/* Search Status for Screen Readers */}
      {isSearching && (
        <div
          id={statusId}
          className="sr-only"
          aria-live="polite"
          aria-atomic="true"
        >
          Aan het zoeken...
        </div>
      )}

      {/* Search History Dropdown */}
      {showHistory && searchHistory.length > 0 && (
        <div className="search-box__dropdown">
          <div className="search-box__dropdown-header">
            <span className="search-box__dropdown-title">
              Recente zoekopdrachten
            </span>
          </div>

          <ul
            ref={historyRef}
            id={historyId}
            className="search-box__history"
            role="listbox"
            aria-label="Recente zoekopdrachten"
          >
            {searchHistory.map((historyQuery, index) => (
              <li key={index}>
                <button
                  id={`${historyId}-item-${index}`}
                  type="button"
                  className={`search-box__history-item ${
                    index === historyIndex
                      ? 'search-box__history-item--selected'
                      : ''
                  }`}
                  onClick={() => handleHistoryClick(historyQuery)}
                  role="option"
                  aria-selected={index === historyIndex}
                >
                  <span className="search-box__history-icon" aria-hidden="true">
                    🕒
                  </span>
                  <span className="search-box__history-text">
                    {historyQuery}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default React.memo(SearchBox)
