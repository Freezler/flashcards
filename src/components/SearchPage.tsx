import React from 'react'
import { SearchProvider, useSearchContext } from '../contexts/SearchContext'
import SearchBox from './SearchBox'
import SearchResults from './SearchResults'
import { FlashCard } from '../types'

interface SearchPageProps {
  data: FlashCard[]
  onSelectCard?: (card: FlashCard) => void
  onStartStudy?: (card: FlashCard) => void
}

/**
 * Complete search page component demonstrating modern search implementation
 * This component shows how to integrate all search components together
 */
function SearchPageContent({
  onSelectCard,
  onStartStudy,
}: Omit<SearchPageProps, 'data'>): React.JSX.Element {
  const {
    state,
    search,
    clearSearch,
    searchHistory,
    filters,
    updateFilters,
    clearFilters,
  } = useSearchContext()

  return (
    <div className="search-page">
      {/* Search Header */}
      <header className="search-page__header">
        <h1 className="search-page__title">Zoek in Flashcards</h1>
        <p className="search-page__description">
          Vind snel de flashcards die je zoekt met onze geavanceerde zoekfunctie
        </p>
      </header>

      {/* Search Input */}
      <div className="search-page__input">
        <SearchBox
          query={state.query}
          onSearch={search}
          onClear={clearSearch}
          isSearching={state.isSearching}
          searchHistory={searchHistory}
          onSelectFromHistory={search}
          placeholder="Zoek naar vraag, antwoord, categorie, moeilijkheidsgraad, of tags..."
          autoFocus={true}
        />
      </div>

      {/* Search Filters */}
      <div className="search-page__filters">
        <div className="search-filters">
          <h3 className="search-filters__title">Filters</h3>

          <div className="search-filters__group">
            <label
              htmlFor="difficulty-filter"
              className="search-filters__label"
            >
              Moeilijkheidsgraad:
            </label>
            <select
              id="difficulty-filter"
              className="search-filters__select"
              value={filters.difficulty || ''}
              onChange={e =>
                updateFilters({
                  difficulty: e.target.value || undefined,
                })
              }
            >
              <option value="">Alle</option>
              <option value="easy">Makkelijk</option>
              <option value="medium">Gemiddeld</option>
              <option value="hard">Moeilijk</option>
            </select>
          </div>

          <div className="search-filters__group">
            <label htmlFor="category-filter" className="search-filters__label">
              Categorie:
            </label>
            <select
              id="category-filter"
              className="search-filters__select"
              value={filters.category || ''}
              onChange={e =>
                updateFilters({
                  category: e.target.value || undefined,
                })
              }
            >
              <option value="">Alle categorieën</option>
              <option value="Nederlands">Nederlands</option>
              <option value="Geschiedenis">Geschiedenis</option>
              <option value="Geografie">Geografie</option>
              <option value="Cultuur">Cultuur</option>
            </select>
          </div>

          {(filters.difficulty || filters.category) && (
            <button
              className="search-filters__clear"
              onClick={clearFilters}
              type="button"
            >
              Filters wissen
            </button>
          )}
        </div>
      </div>

      {/* Search Results */}
      <div className="search-page__results">
        <SearchResults
          results={state.results}
          query={state.query}
          isSearching={state.isSearching}
          hasSearched={state.hasSearched}
          totalResults={state.totalResults}
          onSelectCard={onSelectCard}
          onStartStudy={onStartStudy}
          showStats={true}
        />
      </div>

      {/* Search Tips */}
      {!state.hasSearched && (
        <div className="search-page__tips">
          <div className="search-tips">
            <h3 className="search-tips__title">💡 Zoektips</h3>
            <div className="search-tips__grid">
              <div className="search-tip">
                <strong>Basis zoeken:</strong>
                <p>
                  Type gewoon wat je zoekt, zoals "werkwoord", "geschiedenis", of "easy"
                </p>
              </div>
              <div className="search-tip">
                <strong>Exacte zoektermen:</strong>
                <p>Gebruik aanhalingstekens: "de VOC"</p>
              </div>
              <div className="search-tip">
                <strong>Fuzzy search:</strong>
                <p>Kleine typfouten worden automatisch gecorrigeerd</p>
              </div>
              <div className="search-tip">
                <strong>Meerdere woorden:</strong>
                <p>Zoek op "nederland geografie" voor specifieke onderwerpen</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export function SearchPage({
  data,
  onSelectCard,
  onStartStudy,
}: SearchPageProps): React.JSX.Element {
  return (
    <SearchProvider
      data={data}
      options={{
        threshold: 0.3,
        enableSuggestions: true,
        maxResults: 20,
        searchFields: ['front', 'back', 'category', 'difficulty', 'tags'],
      }}
    >
      <SearchPageContent
        onSelectCard={onSelectCard}
        onStartStudy={onStartStudy}
      />
    </SearchProvider>
  )
}

export default SearchPage
