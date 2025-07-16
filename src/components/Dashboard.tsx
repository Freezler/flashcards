import { Link } from 'react-router-dom'

interface DashboardStats {
  totalDecks: number
  totalCards: number
  studyStreak: number
  cardsToReview: number
}

function Dashboard(): React.JSX.Element {
  const stats: DashboardStats = {
    totalDecks: 0,
    totalCards: 0,
    studyStreak: 0,
    cardsToReview: 0,
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1 className="dashboard-title">
          Welkom terug bij <span className="gradient-text">FlashCards</span>
        </h1>
        <p className="dashboard-subtitle">
          Klaar om je kennis te vergroten? Start vandaag met leren!
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
        <h2 className="section-title">Recente activiteit</h2>
        <div className="activity-placeholder">
          <p className="placeholder-text">
            Je hebt nog geen leeractiviteiten. Begin met het maken van je eerste
            deck!
          </p>
          <Link to="/decks/new" className="btn-primary">
            Maak je eerste deck
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Dashboard
