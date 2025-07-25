import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useCards } from '../contexts/CardContext'
import { getTestDeckStats } from '../data'
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
  const { t } = useTranslation('common')

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
        message: `${stats.cardsToReview} ${t('reminders.overdue')}`,
        type: 'overdue',
        priority: 'high',
      })
    }

    if (stats.studyStreak >= 7) {
      reminders.push({
        id: 'streak',
        message: t('reminders.streak', { days: stats.studyStreak }),
        type: 'streak',
        priority: 'medium',
      })
    }

    // Always show daily encouragement
    reminders.push({
      id: 'daily',
      message: t('reminders.daily'),
      type: 'daily',
      priority: 'medium',
    })

    return reminders
  }, [t, stats.cardsToReview, stats.studyStreak])

  const getTimeBasedGreeting = (): string => {
    const hour = currentTime.getHours()
    if (hour < 12) return t('greetings.morning')
    if (hour < 17) return t('greetings.afternoon')
    return t('greetings.evening')
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
    title: t('dashboard.title'),
    description: `${t('dashboard.title')} voor Nederlandse flashcards. ${stats.totalDecks} ${t('stats.decks')} beschikbaar met ${stats.totalCards} ${t('stats.cards')}. ${t('dashboard.subtitleNew')}`,
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
            {isFirstLogin
              ? t('dashboard.welcomeNew')
              : t('dashboard.welcomeBack')}{' '}
            <span className="gradient-text">CogniCraft</span>
          </h2>
          <p className="dashboard-subtitle">
            {isFirstLogin
              ? t('dashboard.subtitleNew')
              : t('dashboard.subtitleReturning')}
          </p>
        </div>

        {/* Study Reminders */}
        {studyReminders.length > 0 && (
          <section
            className="study-reminders"
            aria-labelledby="reminders-title"
          >
            <h3 id="reminders-title" className="sr-only">
              {t('dashboard.studyReminders')}
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
                    aria-label={t('actions.goToDecks')}
                  >
                    {t('reminders.goStudy')}
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
            {t('dashboard.searchTitle')}
          </h2>
          <p className="search-hero__subtitle">
            {t('dashboard.searchSubtitle')}
          </p>
        </div>

        <div className="search-hero__input">
          <div className="search-input-container">
            <input
              type="text"
              className="search-input search-input--hero"
              placeholder={t('dashboard.searchPlaceholder')}
              value={searchState.query}
              onChange={e => search(e.target.value)}
              autoComplete="off"
            />
            {searchState.query && (
              <button
                className="search-clear"
                onClick={clearSearch}
                aria-label={t('dashboard.clearSearch')}
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
                    {searchState.totalResults} {t('dashboard.resultsFound')}
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
                      {t('dashboard.viewAllResults')}
                    </button>
                  )}
                </div>

                <div className="search-results-grid">
                  {searchState.results.map((result, index) => (
                    <article
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
                              {Math.round((1 - result.score) * 100)}%{' '}
                              {t('common.match')}
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
                          aria-label={t('actions.startStudy')}
                          title={t('actions.beginStudyWith')}
                        >
                          📚
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              </>
            ) : searchState.query.length > 0 ? (
              <div className="search-no-results">
                <div className="search-no-results-icon">📭</div>
                <div className="search-no-results-text">
                  {t('dashboard.noResultsTitle')} "{searchState.query}"
                </div>
                <p className="search-no-results-suggestion">
                  {t('dashboard.noResultsSuggestion')}
                </p>
              </div>
            ) : null}
          </div>
        )}

        {/* Search History */}
        {!searchState.hasSearched && searchHistory.length > 0 && (
          <div className="search-history">
            <div className="search-history-header">
              {t('dashboard.recentSearches')}
            </div>
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
          <aside className="search-tips" aria-labelledby="search-tips-title">
            <h3 id="search-tips-title" className="sr-only">
              {t('dashboard.searchTips')}
            </h3>
            <div className="search-tips-grid">
              <article className="search-tip">
                <span className="search-tip-icon" aria-hidden="true">
                  💡
                </span>
                <div>
                  <h4>{t('searchTips.fuzzyTitle')}</h4>
                  <p>{t('searchTips.fuzzyDescription')}</p>
                </div>
              </article>
              <article className="search-tip">
                <span className="search-tip-icon" aria-hidden="true">
                  🎯
                </span>
                <div>
                  <h4>{t('searchTips.categoriesTitle')}</h4>
                  <p>{t('searchTips.categoriesDescription')}</p>
                </div>
              </article>
              <article className="search-tip">
                <span className="search-tip-icon" aria-hidden="true">
                  ⚡
                </span>
                <div>
                  <h4>{t('searchTips.difficultyTitle')}</h4>
                  <p>{t('searchTips.difficultyDescription')}</p>
                </div>
              </article>
            </div>
          </aside>
        )}
      </section>

      <section className="stats-grid" aria-labelledby="stats-title">
        <h3 id="stats-title" className="sr-only">
          {t('dashboard.studyStatistics')}
        </h3>

        <Link
          to="/decks"
          className="stat-card stat-card--interactive"
          aria-label={`${stats.totalDecks} ${t('stats.decks')} beschikbaar. Klik om alle decks te bekijken.`}
        >
          <div className="stat-icon" aria-hidden="true">
            📚
          </div>
          <div className="stat-content">
            <div className="stat-number" role="text">
              {stats.totalDecks}
            </div>
            <div className="stat-label">{t('stats.decks')}</div>
            <div className="stat-detail">{t('stats.allCollections')}</div>
          </div>
          <div className="stat-trend stat-trend--neutral" aria-hidden="true">
            →
          </div>
        </Link>

        <div
          className="stat-card"
          role="status"
          aria-label={`${stats.totalCards} ${t('stats.cards')} totaal beschikbaar`}
        >
          <div className="stat-icon" aria-hidden="true">
            🎯
          </div>
          <div className="stat-content">
            <div className="stat-number" role="text">
              {stats.totalCards}
            </div>
            <div className="stat-label">{t('stats.cards')}</div>
            <div className="stat-detail">{t('stats.totalAvailable')}</div>
          </div>
          <div
            className="stat-progress"
            role="progressbar"
            aria-valuenow={stats.totalCards}
            aria-valuemax={100}
            aria-label={t('stats.progressCards')}
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
            <p className="stat-label">{t('stats.dayStreak')}</p>
            <div className="stat-detail">
              {stats.studyStreak === 0
                ? t('stats.startStreak')
                : stats.studyStreak < 7
                  ? t('stats.keepGoing')
                  : t('stats.fantastic')}
            </div>
          </div>
          {stats.studyStreak >= 7 && (
            <div
              className="stat-badge"
              role="status"
              aria-label={t('actions.achievementBadge', {
                days: stats.studyStreak,
              })}
            >
              {t('stats.hotStreak')}
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
            <p className="stat-label">{t('stats.toReview')}</p>
            <div className="stat-detail">
              {stats.cardsToReview === 0
                ? t('stats.allUpdated')
                : t('stats.waitingForYou')}
            </div>
          </div>
          {stats.cardsToReview > 0 && <div className="stat-pulse"></div>}
        </Link>
      </section>

      <section className="quick-actions" aria-labelledby="actions-title">
        <div className="section-header">
          <h2 id="actions-title" className="section-title">
            {t('quickActions.title')}
          </h2>
          <div className="section-subtitle">{t('quickActions.subtitle')}</div>
        </div>

        <div className="actions-grid">
          {/* Quick Study - Featured Action */}
          {stats.cardsToReview > 0 && (
            <Link to="/decks" className="action-card action-card--featured">
              <div className="action-icon action-icon--pulse">⚡</div>
              <h3 className="action-title">{t('quickActions.quickStudy')}</h3>
              <p className="action-description">
                {t('quickActions.quickStudyDescription', {
                  count: stats.cardsToReview,
                })}
              </p>
              <div
                className="action-badge"
                role="status"
                aria-label={`Urgentie indicator: ${stats.cardsToReview} kaarten wachten op herhaling`}
              >
                {t('quickActions.urgent')}
              </div>
            </Link>
          )}

          <Link to="/decks/new" className="action-card">
            <div className="action-icon">➕</div>
            <h3 className="action-title">{t('quickActions.newDeck')}</h3>
            <p className="action-description">
              {t('quickActions.newDeckDescription')}
            </p>
          </Link>

          <Link to="/decks" className="action-card">
            <div className="action-icon">📖</div>
            <h3 className="action-title">{t('quickActions.myDecks')}</h3>
            <p className="action-description">
              {t('quickActions.myDecksDescription')}
            </p>
            <div className="action-meta">
              {stats.totalDecks} {t('stats.decks')}
            </div>
          </Link>

          <Link to="/progress" className="action-card">
            <div className="action-icon">📊</div>
            <h3 className="action-title">{t('quickActions.progress')}</h3>
            <p className="action-description">
              {t('quickActions.progressDescription')}
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
            {t('recentActivity.title')}
          </h2>
          <div className="section-subtitle">{t('recentActivity.subtitle')}</div>
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
                        {deck.totalCards} {t('recentActivity.cards')}
                      </span>
                      <span className="deck-dot">•</span>
                      <span className="deck-category">
                        {deck.name.includes('Frontend')
                          ? t('categories.frontend')
                          : deck.name.includes('Backend')
                            ? t('categories.backend')
                            : deck.name.includes('Fundamentals')
                              ? t('categories.fundamentals')
                              : deck.name.includes('DevOps')
                                ? t('categories.devops')
                                : t('categories.general')}
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
                    {t('recentActivity.study')}
                  </Link>
                  <Link
                    to={`/deck/${deck.id}`}
                    className="btn-secondary--outline btn-secondary"
                  >
                    {t('recentActivity.viewDetails')}
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
