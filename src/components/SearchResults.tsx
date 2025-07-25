import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { SearchResult } from '../hooks/useSearch'
import { FlashCard, DifficultyLevel } from '../types'
import { getTextSnippets } from '../utils/searchUtils'

export interface SearchResultsProps {
  results: SearchResult[]
  query: string
  isSearching: boolean
  hasSearched: boolean
  totalResults: number
  onSelectCard?: (card: FlashCard) => void
  onStartStudy?: (card: FlashCard) => void
  className?: string
  showStats?: boolean
  emptyStateMessage?: string
  loadingMessage?: string
}

/**
 * SearchResults component with highlighted matches and interactive cards
 * Features: match highlighting, difficulty indicators, study actions
 */
export function SearchResults({
  results,
  query,
  isSearching,
  hasSearched,
  totalResults,
  onSelectCard,
  onStartStudy,
  className = '',
  showStats = true,
  emptyStateMessage = 'Geen resultaten gevonden',
  loadingMessage = 'Zoeken...',
}: SearchResultsProps): React.JSX.Element {
  const { t } = useTranslation(['common', 'decks'])

  // Handle card selection
  const handleCardClick = useCallback(
    (card: FlashCard) => {
      onSelectCard?.(card)
    },
    [onSelectCard]
  )

  // Handle study action
  const handleStudyClick = useCallback(
    (event: React.MouseEvent, card: FlashCard) => {
      event.stopPropagation()
      onStartStudy?.(card)
    },
    [onStartStudy]
  )

  // Get difficulty color class
  const getDifficultyClass = (difficulty: DifficultyLevel): string => {
    switch (difficulty) {
      case DifficultyLevel.EASY:
        return 'search-result--easy'
      case DifficultyLevel.MEDIUM:
        return 'search-result--medium'
      case DifficultyLevel.HARD:
        return 'search-result--hard'
      default:
        return 'search-result--medium'
    }
  }

  // Render highlighted text
  const renderHighlightedText = useCallback(
    (text: string, matches: SearchResult['matches'], fieldKey: string) => {
      const fieldMatches = matches.filter(match => match.key === fieldKey)
      if (!fieldMatches.length) {
        return <span>{text}</span>
      }

      const snippets = getTextSnippets(text, fieldMatches)

      return (
        <span>
          {snippets.map((snippet, index) =>
            snippet.isHighlighted ? (
              <mark key={index} className="search-highlight">
                {snippet.text}
              </mark>
            ) : (
              <span key={index}>{snippet.text}</span>
            )
          )}
        </span>
      )
    },
    []
  )

  // Render loading state
  if (isSearching) {
    return (
      <div className={`search-results search-results--loading ${className}`}>
        <div className="search-results__loading">
          <div className="search-results__loading-icon" aria-hidden="true">
            🔍
          </div>
          <p className="search-results__loading-text">{loadingMessage}</p>
        </div>
      </div>
    )
  }

  // Render empty state
  if (hasSearched && totalResults === 0) {
    return (
      <div className={`search-results search-results--empty ${className}`}>
        <div className="search-results__empty">
          <div className="search-results__empty-icon" aria-hidden="true">
            📭
          </div>
          <h3 className="search-results__empty-title">{emptyStateMessage}</h3>
          <p className="search-results__empty-description">
            Probeer een andere zoekterm of controleer de spelling.
          </p>
          {query && (
            <div className="search-results__query-info">
              Gezocht naar: <strong>"{query}"</strong>
            </div>
          )}
        </div>
      </div>
    )
  }

  // Don't render if no search has been performed
  if (!hasSearched) {
    return <div className={`search-results ${className}`} />
  }

  return (
    <div className={`search-results ${className}`}>
      {/* Results Statistics */}
      {showStats && totalResults > 0 && (
        <div className="search-results__stats">
          <p className="search-results__stats-text">
            <strong>{totalResults}</strong> resultaten gevonden voor{' '}
            <strong>"{query}"</strong>
          </p>
        </div>
      )}

      {/* Results List */}
      <div className="search-results__list" role="list">
        {results.map((result, index) => {
          const { item: card, score, matches } = result

          return (
            <article
              key={`${card.id}-${index}`}
              className={`search-result ${getDifficultyClass(card.difficulty)}`}
              onClick={() => handleCardClick(card)}
              role="listitem"
              tabIndex={0}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  handleCardClick(card)
                }
              }}
              aria-label={`Flashcard: ${t(card.front, { ns: 'decks' })}`}
            >
              {/* Card Header */}
              <header className="search-result__header">
                <div className="search-result__meta">
                  <span
                    className={`search-result__difficulty difficulty--${card.difficulty.toLowerCase()}`}
                  >
                    {card.difficulty}
                  </span>
                  <span className="search-result__category">
                    {card.category}
                  </span>
                  {score !== undefined && (
                    <span
                      className="search-result__score"
                      title={`Relevantie: ${Math.round((1 - score) * 100)}%`}
                    >
                      {Math.round((1 - score) * 100)}% match
                    </span>
                  )}
                </div>

                {onStartStudy && (
                  <button
                    className="search-result__study-btn"
                    onClick={e => handleStudyClick(e, card)}
                    aria-label={`Begin studie met deze kaart`}
                    title="Begin studie"
                  >
                    📚 Studeren
                  </button>
                )}
              </header>

              {/* Card Content */}
              <div className="search-result__content">
                <div className="search-result__question">
                  <strong className="search-result__label">Vraag:</strong>
                  <div className="search-result__text">
                    {renderHighlightedText(
                      t(card.front, { ns: 'decks' }),
                      matches,
                      'front'
                    )}
                  </div>
                </div>

                <div className="search-result__answer">
                  <strong className="search-result__label">Antwoord:</strong>
                  <div className="search-result__text">
                    {renderHighlightedText(
                      t(card.back, { ns: 'decks' }),
                      matches,
                      'back'
                    )}
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              {card.tags.length > 0 && (
                <footer className="search-result__footer">
                  <div className="search-result__tags">
                    {card.tags.slice(0, 3).map((tag, tagIndex) => (
                      <span key={tagIndex} className="search-result__tag">
                        {renderHighlightedText(`#${tag}`, matches, 'tags')}
                      </span>
                    ))}
                    {card.tags.length > 3 && (
                      <span className="search-result__tag search-result__tag--more">
                        +{card.tags.length - 3} meer
                      </span>
                    )}
                  </div>
                </footer>
              )}

              {/* Accessibility Enhancement */}
              <div className="sr-only">
                Flashcard in categorie {card.category}, moeilijkheidsgraad{' '}
                {card.difficulty},
                {card.tags.length > 0 && `tags: ${card.tags.join(', ')}`}
              </div>
            </article>
          )
        })}
      </div>

      {/* Load More (Future Enhancement) */}
      {totalResults > results.length && (
        <div className="search-results__load-more">
          <button
            className="search-results__load-more-btn"
            onClick={() => {
              // Future: Implement load more functionality
              console.log('Load more results')
            }}
          >
            Meer resultaten laden ({totalResults - results.length} resterend)
          </button>
        </div>
      )}
    </div>
  )
}

export default React.memo(SearchResults)
