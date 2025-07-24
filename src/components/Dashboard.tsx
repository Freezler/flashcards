import { Link, useNavigate } from 'react-router-dom'
import { getTestDeckStats } from '../data'
import { useAuth } from '../contexts/AuthContext'
import { useCards } from '../contexts/CardContext'
import { useState, useEffect, useMemo } from 'react'
import { useSEO } from '../hooks/useSEO'
import { useSearch } from '../hooks/useSearch'
import { FlashCard } from '../types'

interface DashboardStats {
  totalDecks: number
  totalCards: number
  studyStreak: number
  cardsToReview: number
}

interface StudyReminder {
  id: string
  message: string
  type: 'streak' | 'overdue' | 'daily'
  priority: 'high' | 'medium' | 'low'
}

function Dashboard(): React.JSX.Element {
  const { isFirstLogin, user } = useAuth()
  const { state } = useCards()
  const navigate = useNavigate()
  const [currentTime, setCurrentTime] = useState(new Date())

  // Get all cards for search
  const allCards = useMemo(() => {
    return state.decks.flatMap(deck => deck.cards)
  }, [state.decks])

  // Initialize search hook
  const {
    state: searchState,
    search,
    clearSearch,
    searchHistory,
  } = useSearch(allCards, {
    threshold: 0.3,
    maxResults: 6, // Show top 6 results in dashboard
    enableSuggestions: true,
    searchFields: ['front', 'back', 'category', 'difficulty', 'tags'],
  })

  // Memoize stats to prevent infinite re-renders
  const stats: DashboardStats = useMemo(() => getTestDeckStats(), [])

  // Ensure dashboard always starts at top when mounted
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Update time every minute for fresh greeting
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000)
    return () => clearInterval(timer)
  }, [])

  // Generate study reminders based on stats (no dependencies since stats is memoized)
  const studyReminders = useMemo(() => {
    const reminders: StudyReminder[] = []

    if (stats.cardsToReview > 0) {
      reminders.push({
        id: 'overdue',
        message: `${stats.cardsToReview} kaarten wachten op herhaling`,
        type: 'overdue',
        priority: 'high',
      })
    }

    if (stats.studyStreak >= 7) {
      reminders.push({
        id: 'streak',
        message: `Geweldig! ${stats.studyStreak} dagen op rij gestudeerd!`,
        type: 'streak',
        priority: 'medium',
      })
    }

    // Always show daily encouragement
    reminders.push({
      id: 'daily',
      message: '🎯 Tijd om te studeren! Start je dagelijkse sessie',
      type: 'daily',
      priority: 'medium',
    })

    return reminders
  }, [])

  const getTimeBasedGreeting = (): string => {
    const hour = currentTime.getHours()
    if (hour < 12) return 'Goedemorgen'
    if (hour < 17) return 'Goedemiddag'
    return 'Goedenavond'
  }

  // Handle card selection from search results
  const handleCardSelect = (card: FlashCard) => {
    // Find the deck this card belongs to
    const deck = state.decks.find(d => d.cards.some(c => c.id === card.id))
    if (deck) {
      navigate(`/deck/${deck.id}`)
    }
  }

  // Handle starting study with selected card
  const handleStartStudy = (card: FlashCard) => {
    const deck = state.decks.find(d => d.cards.some(c => c.id === card.id))
    if (deck) {
      navigate(`/deck/${deck.id}/study`, {
        state: { startWithCard: card.id },
      })
    }
  }

  // SEO optimalisatie voor homepage
  useSEO({
    title: 'Dashboard',
    description: `Persoonlijk dashboard voor Nederlandse flashcards. ${stats.totalDecks} decks beschikbaar met ${stats.totalCards} kaarten. Start je leertraject vandaag!`,
    keywords:
      'dashboard, persoonlijk, leren, voortgang, nederlandse flashcards, spaced repetition',
    url: 'https://nederlandse-flashcards.vercel.app/',
  })

  return (
    <main
      className="dashboard-container"
      role="main"
      aria-labelledby="dashboard-title"
    >
      <header className="dashboard-header">
        <div className="dashboard-greeting">
          <h1 id="dashboard-title" className="dashboard-title">
            {getTimeBasedGreeting()}, {user?.name || 'Student'}!{' '}
            <span aria-hidden="true">👋</span>
          </h1>
          <h2 className="dashboard-subtitle-main">
            {isFirstLogin ? 'Welkom bij' : 'Welkom terug bij'}{' '}
            <span className="gradient-text">FlashCards</span>
          </h2>
          <p className="dashboard-subtitle">
            {isFirstLogin
              ? 'Klaar om je kennis te vergroten? Start vandaag met leren!'
              : 'Klaar om verder te gaan met leren? Zet je studie voort!'}
          </p>
        </div>

        {/* Study Reminders */}
        {studyReminders.length > 0 && (
          <section
            className="study-reminders"
            aria-labelledby="reminders-title"
          >
            <h3 id="reminders-title" className="sr-only">
              Studie herinneringen
            </h3>
            {studyReminders.map(reminder => (
              <div
                key={reminder.id}
                className={`study-reminder study-reminder--${reminder.type}`}
                role={reminder.priority === 'high' ? 'alert' : 'status'}
                aria-live={
                  reminder.priority === 'high' ? 'assertive' : 'polite'
                }
              >
                <div className="reminder-icon" aria-hidden="true">
                  {reminder.type === 'overdue' && '⏰'}
                  {reminder.type === 'streak' && '🔥'}
                  {reminder.type === 'daily' && '📚'}
                </div>
                <span className="reminder-message">{reminder.message}</span>
                {reminder.type === 'overdue' && (
                  <Link
                    to="/decks"
                    className="reminder-action"
                    aria-label="Ga naar decks om te studeren"
                  >
                    Ga studeren →
                  </Link>
                )}
              </div>
            ))}
          </section>
        )}
      </header>

      {/* Search Hero Section */}
      <section className="search-hero" aria-labelledby="search-title">
        <div className="search-hero__header">
          <h2 id="search-title" className="search-hero__title">
            🔍 Zoek in al je flashcards
          </h2>
          <p className="search-hero__subtitle">
            Vind snel de kaarten die je zoekt met intelligente fuzzy search
          </p>
        </div>

        <div className="search-hero__input">
          <div className="search-input-container">
            <input
              type="text"
              className="search-input search-input--hero"
              placeholder="Zoek naar vraag, antwoord, categorie, moeilijkheidsgraad..."
              value={searchState.query}
              onChange={e => search(e.target.value)}
              autoComplete="off"
            />
            {searchState.query && (
              <button
                className="search-clear"
                onClick={clearSearch}
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
            {searchState.isSearching && (
              <div className="search-loading" aria-hidden="true">
                ⏳
              </div>
            )}
          </div>
        </div>

        {/* Search Results */}
        {searchState.hasSearched && (
          <div className="search-hero__results">
            {searchState.results.length > 0 ? (
              <>
                <div className="search-results-header">
                  <span className="search-results-count">
                    {searchState.totalResults} resultaten gevonden
                  </span>
                  {searchState.totalResults > searchState.results.length && (
                    <button
                      className="search-view-all-link"
                      onClick={() =>
                        navigate(
                          `/search?q=${encodeURIComponent(searchState.query)}`
                        )
                      }
                    >
                      Bekijk alle resultaten →
                    </button>
                  )}
                </div>

                <div className="search-results-grid">
                  {searchState.results.map((result, index) => (
                    <div
                      key={`${result.item.id}-${index}`}
                      className="search-result-card"
                      onClick={() => handleCardSelect(result.item)}
                    >
                      <div className="search-result-content">
                        <div className="search-result-question">
                          {result.item.front}
                        </div>
                        <div className="search-result-answer">
                          {result.item.back}
                        </div>
                        <div className="search-result-meta">
                          <span
                            className={`search-result-difficulty difficulty--${result.item.difficulty.toLowerCase()}`}
                          >
                            {result.item.difficulty}
                          </span>
                          <span className="search-result-category">
                            {result.item.category}
                          </span>
                          {result.score !== undefined && (
                            <span className="search-result-score">
                              {Math.round((1 - result.score) * 100)}% match
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="search-result-actions">
                        <button
                          className="search-result-study"
                          onClick={e => {
                            e.stopPropagation()
                            handleStartStudy(result.item)
                          }}
                          aria-label="Start study"
                          title="Begin studie met deze kaart"
                        >
                          📚
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : searchState.query.length > 0 ? (
              <div className="search-no-results">
                <div className="search-no-results-icon">📭</div>
                <div className="search-no-results-text">
                  Geen resultaten gevonden voor "{searchState.query}"
                </div>
                <p className="search-no-results-suggestion">
                  Probeer andere zoektermen of controleer je spelling
                </p>
              </div>
            ) : null}
          </div>
        )}

        {/* Search History */}
        {!searchState.hasSearched && searchHistory.length > 0 && (
          <div className="search-history">
            <div className="search-history-header">Recente zoekopdrachten</div>
            <div className="search-history-list">
              {searchHistory.slice(0, 4).map((query, index) => (
                <button
                  key={index}
                  className="search-history-item"
                  onClick={() => search(query)}
                >
                  🕒 {query}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Search Tips */}
        {!searchState.hasSearched && searchHistory.length === 0 && (
          <div className="search-tips">
            <div className="search-tips-grid">
              <div className="search-tip">
                <span className="search-tip-icon">💡</span>
                <div>
                  <strong>Fuzzy search:</strong>
                  <p>Kleine typfouten worden automatisch gecorrigeerd</p>
                </div>
              </div>
              <div className="search-tip">
                <span className="search-tip-icon">🎯</span>
                <div>
                  <strong>Categorieën:</strong>
                  <p>Zoek op "grammatica", "geschiedenis", "geografie"</p>
                </div>
              </div>
              <div className="search-tip">
                <span className="search-tip-icon">⚡</span>
                <div>
                  <strong>Moeilijkheid:</strong>
                  <p>
                    Zoek op "easy", "medium", "hard", "makkelijk", of "moeilijk"
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      <section className="stats-grid" aria-labelledby="stats-title">
        <h3 id="stats-title" className="sr-only">
          Studie statistieken
        </h3>

        <Link
          to="/decks"
          className="stat-card stat-card--interactive"
          aria-label={`${stats.totalDecks} decks beschikbaar. Klik om alle decks te bekijken.`}
        >
          <div className="stat-icon" aria-hidden="true">
            📚
          </div>
          <div className="stat-content">
            <div className="stat-number" role="text">
              {stats.totalDecks}
            </div>
            <div className="stat-label">Decks</div>
            <div className="stat-detail">Alle collecties</div>
          </div>
          <div className="stat-trend stat-trend--neutral" aria-hidden="true">
            →
          </div>
        </Link>

        <div
          className="stat-card"
          role="status"
          aria-label={`${stats.totalCards} kaarten totaal beschikbaar`}
        >
          <div className="stat-icon" aria-hidden="true">
            🎯
          </div>
          <div className="stat-content">
            <div className="stat-number" role="text">
              {stats.totalCards}
            </div>
            <div className="stat-label">Kaarten</div>
            <div className="stat-detail">Totaal beschikbaar</div>
          </div>
          <div
            className="stat-progress"
            role="progressbar"
            aria-valuenow={stats.totalCards}
            aria-valuemax={100}
            aria-label="Voortgang kaarten collectie"
          >
            <div
              className="stat-progress-bar"
              style={
                {
                  '--progress': `${Math.min((stats.totalCards / 100) * 100, 100)}%`,
                } as React.CSSProperties
              }
            />
          </div>
        </div>

        <div
          className={`stat-card ${stats.studyStreak >= 7 ? 'stat-card--highlight' : ''}`}
        >
          <div className="stat-icon">🔥</div>
          <div className="stat-content">
            <h3 className="stat-number">{stats.studyStreak}</h3>
            <p className="stat-label">Dag streak</p>
            <div className="stat-detail">
              {stats.studyStreak === 0
                ? 'Start je streak!'
                : stats.studyStreak < 7
                  ? 'Ga zo door!'
                  : 'Fantastisch! 🎉'}
            </div>
          </div>
          {stats.studyStreak >= 7 && (
            <div
              className="stat-badge"
              role="status"
              aria-label={`Prestatie badge: Hot streak! Je hebt ${stats.studyStreak} dagen op rij gestudeerd`}
            >
              Hot streak!
            </div>
          )}
        </div>

        <Link
          to="/decks"
          className={`stat-card stat-card--interactive ${stats.cardsToReview > 0 ? 'stat-card--urgent' : ''}`}
        >
          <div className="stat-icon">⏰</div>
          <div className="stat-content">
            <h3 className="stat-number">{stats.cardsToReview}</h3>
            <p className="stat-label">Te herhalen</p>
            <div className="stat-detail">
              {stats.cardsToReview === 0 ? 'Alles bijgewerkt!' : 'Wacht op jou'}
            </div>
          </div>
          {stats.cardsToReview > 0 && <div className="stat-pulse"></div>}
        </Link>
      </section>

      <section className="quick-actions" aria-labelledby="actions-title">
        <div className="section-header">
          <h2 id="actions-title" className="section-title">
            Snelle acties
          </h2>
          <div className="section-subtitle">Start direct met leren</div>
        </div>

        <div className="actions-grid">
          {/* Quick Study - Featured Action */}
          {stats.cardsToReview > 0 && (
            <Link to="/decks" className="action-card action-card--featured">
              <div className="action-icon action-icon--pulse">⚡</div>
              <h3 className="action-title">Snelle Studie</h3>
              <p className="action-description">
                {stats.cardsToReview} kaarten klaar voor herhaling
              </p>
              <div
                className="action-badge"
                role="status"
                aria-label={`Urgentie indicator: ${stats.cardsToReview} kaarten wachten op herhaling`}
              >
                Urgent
              </div>
            </Link>
          )}

          <Link to="/decks/new" className="action-card">
            <div className="action-icon">➕</div>
            <h3 className="action-title">Nieuw Deck</h3>
            <p className="action-description">
              Maak een nieuwe set kaarten om mee te leren
            </p>
          </Link>

          <Link to="/decks" className="action-card">
            <div className="action-icon">📖</div>
            <h3 className="action-title">Mijn Decks</h3>
            <p className="action-description">
              Bekijk en beheer al je bestaande decks
            </p>
            <div className="action-meta">{stats.totalDecks} decks</div>
          </Link>

          <Link to="/progress" className="action-card">
            <div className="action-icon">📊</div>
            <h3 className="action-title">Voortgang</h3>
            <p className="action-description">
              Analyseer je leerresultaten en prestaties
            </p>
          </Link>
        </div>
      </section>

      <section
        className="recent-activity"
        aria-labelledby="activity-title"
        role="region"
      >
        <div className="section-header">
          <h2 id="activity-title" className="section-title">
            Beschikbare Decks
          </h2>
          <div className="section-subtitle">
            Kies een deck om mee te starten
          </div>
        </div>

        <div className="deck-grid">
          {state.decks.map(deck => {
            // Create stable mock data based on deck ID to prevent constant updates
            const deckHash = deck.id.split('').reduce((a, b) => {
              a = (a << 5) - a + b.charCodeAt(0)
              return a & a
            }, 0)
            const completionRate = Math.abs(deckHash % 100) // Stable progress percentage
            const lastStudied = Math.abs(deckHash % 7) // Stable days ago
            const accuracy = 85 + Math.abs(deckHash % 15) // Stable accuracy percentage

            return (
              <div key={deck.id} className="deck-card deck-card--enhanced">
                <div className="deck-header">
                  <div className="deck-info">
                    <h3 className="deck-title">{deck.name}</h3>
                    <div className="deck-meta">
                      <span className="deck-count">
                        {deck.totalCards} kaarten
                      </span>
                      <span className="deck-dot">•</span>
                      <span className="deck-category">
                        {deck.name.includes('Grammatica')
                          ? '📝 Grammatica'
                          : deck.name.includes('Geschiedenis')
                            ? '🏛️ Geschiedenis'
                            : deck.name.includes('Geografie')
                              ? '🌍 Geografie'
                              : deck.name.includes('Cultuur')
                                ? '🎭 Cultuur'
                                : deck.name.includes('Literatuur')
                                  ? '📚 Literatuur'
                                  : '⚽ Sport'}
                      </span>
                    </div>
                  </div>
                  <div className="deck-progress-ring">
                    <svg width="40" height="40" viewBox="0 0 40 40">
                      <circle
                        cx="20"
                        cy="20"
                        r="16"
                        fill="none"
                        stroke="var(--border-2)"
                        strokeWidth="3"
                      />
                      <circle
                        cx="20"
                        cy="20"
                        r="16"
                        fill="none"
                        stroke="var(--brand-500)"
                        strokeWidth="3"
                        strokeDasharray={`${completionRate} 100`}
                        strokeDashoffset="25"
                        strokeLinecap="round"
                        transform="rotate(-90 20 20)"
                      />
                    </svg>
                    <span className="progress-text">{completionRate}%</span>
                  </div>
                </div>

                <p className="deck-description">{deck.description}</p>

                <div className="deck-stats">
                  <div className="deck-stat">
                    <span className="stat-icon">🎯</span>
                    <span>{accuracy}%</span>
                  </div>
                  <div className="deck-stat">
                    <span className="stat-icon">⏱️</span>
                    <span>
                      {lastStudied === 0
                        ? 'Vandaag'
                        : lastStudied === 1
                          ? 'Gisteren'
                          : `${lastStudied}d geleden`}
                    </span>
                  </div>
                </div>

                <div className="deck-actions">
                  <Link
                    to={`/deck/${deck.id}/study`}
                    className="btn-primary btn-primary--full"
                  >
                    <span className="btn-icon">🚀</span>
                    Start studie
                  </Link>
                  <Link
                    to={`/deck/${deck.id}`}
                    className="btn-secondary btn-secondary--outline"
                  >
                    Bekijk kaarten
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </main>
  )
}

export default Dashboard
