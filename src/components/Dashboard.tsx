import { Link } from 'react-router-dom'
import { getTestDeckStats, testDecks } from '../data'
import { useAuth } from '../contexts/AuthContext'

interface DashboardStats {
  totalDecks: number
  totalCards: number
  studyStreak: number
  cardsToReview: number
}

function Dashboard(): React.JSX.Element {
  const stats: DashboardStats = getTestDeckStats()
  const { isFirstLogin } = useAuth()

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1 className="dashboard-title">
          {isFirstLogin ? 'Welkom bij' : 'Welkom terug bij'}{' '}
          <span className="gradient-text">FlashCards</span>
        </h1>
        <p className="dashboard-subtitle">
          {isFirstLogin 
            ? 'Klaar om je kennis te vergroten? Start vandaag met leren!'
            : 'Klaar om verder te gaan met leren? Zet je studie voort!'
          }
        </p>
      </header>

      <section className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📚</div>
          <div className="stat-content">
            <h3 className="stat-number">{stats.totalDecks}</h3>
            <p className="stat-label">Decks</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🎯</div>
          <div className="stat-content">
            <h3 className="stat-number">{stats.totalCards}</h3>
            <p className="stat-label">Kaarten</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🔥</div>
          <div className="stat-content">
            <h3 className="stat-number">{stats.studyStreak}</h3>
            <p className="stat-label">Dag streak</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">⏰</div>
          <div className="stat-content">
            <h3 className="stat-number">{stats.cardsToReview}</h3>
            <p className="stat-label">Te herhalen</p>
          </div>
        </div>
      </section>

      <section className="quick-actions">
        <h2 className="section-title">Snelle acties</h2>
        <div className="actions-grid">
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
        <h2 className="section-title">Beschikbare Decks</h2>
        <div className="deck-grid">
          {testDecks.map(deck => (
            <div key={deck.id} className="deck-card">
              <div className="deck-header">
                <h3 className="deck-title">{deck.name}</h3>
                <span className="deck-count">{deck.totalCards} kaarten</span>
              </div>
              <p className="deck-description">{deck.description}</p>
              <div className="deck-spacer"></div>
              <div className="deck-actions">
                <Link to={`/deck/${deck.id}/study`} className="btn-primary">
                  Start studie
                </Link>
                <Link to={`/deck/${deck.id}`} className="btn-secondary">
                  Bekijk kaarten
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Dashboard
