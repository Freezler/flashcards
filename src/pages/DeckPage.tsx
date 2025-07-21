import { useParams, Link } from 'react-router-dom'
import { useState } from 'react'
import { useCards } from '../contexts/CardContext'
import CardList from '../components/CardList'
import CardForm from '../components/CardForm'
import { FlashCard } from '../types'

function DeckPage(): React.JSX.Element {
  const { deckId } = useParams<{ deckId: string }>()
  const { getDeck, addCard } = useCards()
  const [showCreateForm, setShowCreateForm] = useState(false)

  const deck = deckId ? getDeck(deckId) : undefined

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
            <span className="stat-value">
              {deck.createdAt.toLocaleDateString('nl-NL')}
            </span>
          </div>
        </div>

        <div className="deck-actions">
          <Link to={`/deck/${deck.id}/study`} className="btn-primary">
            🎯 Start studie
          </Link>
          <button
            className="btn-primary"
            onClick={() => setShowCreateForm(true)}
          >
            ➕ Nieuwe kaart
          </button>
          <Link to="/decks" className="btn-secondary">
            ← Terug naar decks
          </Link>
        </div>
      </div>

      <section className="cards-section">
        <CardList deckId={deck.id} cards={deck.cards} />
      </section>

      {showCreateForm && (
        <CardForm
          onSave={(cardData: Omit<FlashCard, 'id'>) => {
            addCard(deck.id, cardData)
            setShowCreateForm(false)
          }}
          onCancel={() => setShowCreateForm(false)}
          isEditing={false}
        />
      )}
    </div>
  )
}

export default DeckPage
