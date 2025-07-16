import { Link } from 'react-router-dom'
import { testDecks } from '../data'

function DecksPage(): React.JSX.Element {
  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1 className="dashboard-title">Mijn Decks</h1>
        <p className="dashboard-subtitle">
          Beheer al je flashcard decks op één plek
        </p>
      </header>

      <div className="deck-grid">
        {testDecks.map(deck => (
          <div key={deck.id} className="deck-card">
            <div className="deck-header">
              <h3 className="deck-title">{deck.name}</h3>
              <span className="deck-count">{deck.totalCards} kaarten</span>
            </div>
            <p className="deck-description">{deck.description}</p>
            <div className="deck-meta">
              <span className="deck-created">
                Gemaakt: {deck.createdAt.toLocaleDateString('nl-NL')}
              </span>
              <span className="deck-reviewed">
                {deck.reviewedCards}/{deck.totalCards} bestudeerd
              </span>
            </div>
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

      <div className="page-actions">
        <Link to="/decks/new" className="btn-primary">
          ➕ Nieuw Deck Maken
        </Link>
      </div>
    </div>
  )
}

export default DecksPage