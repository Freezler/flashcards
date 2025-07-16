import { useParams, Link } from 'react-router-dom'
import { testDecks } from '../data'

function DeckPage(): React.JSX.Element {
  const { deckId } = useParams<{ deckId: string }>()
  const deck = testDecks.find(d => d.id === deckId)

  if (!deck) {
    return (
      <div className="dashboard-container">
        <div className="error-message">
          <h2>Deck niet gevonden</h2>
          <p>Het deck dat je zoekt bestaat niet of is verwijderd.</p>
          <Link to="/decks" className="btn-primary">
            Terug naar decks
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1 className="dashboard-title">{deck.name}</h1>
        <p className="dashboard-subtitle">{deck.description}</p>
      </header>

      <div className="deck-info">
        <div className="deck-stats">
          <div className="stat-item">
            <span className="stat-label">Totaal kaarten:</span>
            <span className="stat-value">{deck.totalCards}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Bestudeerd:</span>
            <span className="stat-value">{deck.reviewedCards}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Gemaakt:</span>
            <span className="stat-value">{deck.createdAt.toLocaleDateString('nl-NL')}</span>
          </div>
        </div>
        
        <div className="deck-actions">
          <Link to={`/deck/${deck.id}/study`} className="btn-primary">
            🎯 Start studie
          </Link>
          <Link to="/decks" className="btn-secondary">
            ← Terug naar decks
          </Link>
        </div>
      </div>

      <section className="cards-list">
        <h2 className="section-title">Kaarten in dit deck</h2>
        <div className="cards-grid">
          {deck.cards.map(card => (
            <div key={card.id} className="card-preview">
              <div className="card-front">
                <h4>Voorkant</h4>
                <p>{card.front}</p>
              </div>
              <div className="card-back">
                <h4>Achterkant</h4>
                <p>{card.back}</p>
              </div>
              <div className="card-meta">
                <span className={`difficulty-badge difficulty-${card.difficulty}`}>
                  {card.difficulty}
                </span>
                <span className="card-category">{card.category}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default DeckPage