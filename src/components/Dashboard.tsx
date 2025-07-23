import { Link } from 'react-router-dom'
import { getTestDeckStats } from '../data'
import { useAuth } from '../contexts/AuthContext'
import { useCards } from '../contexts/CardContext'
import { useState, useEffect, useMemo } from 'react'

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
  const [currentTime, setCurrentTime] = useState(new Date())

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

  return (
    <main className="dashboard-container" role="main" aria-labelledby="dashboard-title">
      <header className="dashboard-header">
        <div className="dashboard-greeting">
          <h1 id="dashboard-title" className="dashboard-title">
            {getTimeBasedGreeting()}, {user?.name || 'Student'}! <span aria-hidden="true">👋</span>
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
          <section className="study-reminders" aria-labelledby="reminders-title">
            <h3 id="reminders-title" className="sr-only">Studie herinneringen</h3>
            {studyReminders.map(reminder => (
              <div
                key={reminder.id}
                className={`study-reminder study-reminder--${reminder.type}`}
                role={reminder.priority === 'high' ? 'alert' : 'status'}
                aria-live={reminder.priority === 'high' ? 'assertive' : 'polite'}
              >
                <div className="reminder-icon" aria-hidden="true">
                  {reminder.type === 'overdue' && '⏰'}
                  {reminder.type === 'streak' && '🔥'}
                  {reminder.type === 'daily' && '📚'}
                </div>
                <span className="reminder-message">{reminder.message}</span>
                {reminder.type === 'overdue' && (
                  <Link to="/decks" className="reminder-action" aria-label="Ga naar decks om te studeren">
                    Ga studeren →
                  </Link>
                )}
              </div>
            ))}
          </section>
        )}
      </header>

      <section className="stats-grid" aria-labelledby="stats-title">
        <h3 id="stats-title" className="sr-only">Studie statistieken</h3>
        
        <Link 
          to="/decks" 
          className="stat-card stat-card--interactive"
          aria-label={`${stats.totalDecks} decks beschikbaar. Klik om alle decks te bekijken.`}
        >
          <div className="stat-icon" aria-hidden="true">📚</div>
          <div className="stat-content">
            <div className="stat-number" role="text">{stats.totalDecks}</div>
            <div className="stat-label">Decks</div>
            <div className="stat-detail">Alle collecties</div>
          </div>
          <div className="stat-trend stat-trend--neutral" aria-hidden="true">→</div>
        </Link>

        <div className="stat-card" role="status" aria-label={`${stats.totalCards} kaarten totaal beschikbaar`}>
          <div className="stat-icon" aria-hidden="true">🎯</div>
          <div className="stat-content">
            <div className="stat-number" role="text">{stats.totalCards}</div>
            <div className="stat-label">Kaarten</div>
            <div className="stat-detail">Totaal beschikbaar</div>
          </div>
          <div className="stat-progress" role="progressbar" aria-valuenow={stats.totalCards} aria-valuemax={100} aria-label="Voortgang kaarten collectie">
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
            <div className="stat-badge">Hot streak!</div>
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

      <section className="quick-actions">
        <div className="section-header">
          <h2 className="section-title">Snelle acties</h2>
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
              <div className="action-badge">Urgent</div>
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

      <section className="recent-activity">
        <div className="section-header">
          <h2 className="section-title">Beschikbare Decks</h2>
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
