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
      <main className="dashboard-container" role="main">
        <section className="error-message" role="alert" aria-labelledby="error-title">
          <h1 id="error-title">Deck niet gevonden</h1>
          <p>Het deck dat je zoekt bestaat niet of is verwijderd.</p>
          <Link to="/decks" className="btn-primary" aria-label="Ga terug naar alle decks">
            Terug naar decks
          </Link>
        </section>
      </main>
    )
  }

  return (
    <main className="dashboard-container" role="main" aria-labelledby="deck-title">
      <header className="dashboard-header">
        <h1 id="deck-title" className="dashboard-title">{deck.name}</h1>
        <p className="dashboard-subtitle">{deck.description}</p>
      </header>

      <section className="deck-info" aria-labelledby="deck-info-title">
        <h2 id="deck-info-title" className="sr-only">Deck informatie en acties</h2>
        <aside className="deck-stats" aria-labelledby="stats-title">
          <h3 id="stats-title" className="sr-only">Deck statistieken</h3>
          <dl className="stat-items">
            <div className="stat-item">
              <dt className="stat-label">Totaal kaarten:</dt>
              <dd className="stat-value">{deck.totalCards}</dd>
            </div>
            <div className="stat-item">
              <dt className="stat-label">Bestudeerd:</dt>
              <dd className="stat-value">{deck.reviewedCards}</dd>
            </div>
            <div className="stat-item">
              <dt className="stat-label">Gemaakt:</dt>
              <dd className="stat-value">
                <time dateTime={deck.createdAt.toISOString()}>
                  {deck.createdAt.toLocaleDateString('nl-NL')}
                </time>
              </dd>
            </div>
          </dl>
        </aside>

        <nav className="deck-actions" aria-label="Deck acties">
          <Link 
            to={`/deck/${deck.id}/study`} 
            className="btn-primary"
            aria-label={`Start studie voor ${deck.name}`}
          >
            🎯 Start studie
          </Link>
          <button
            className="btn-primary"
            onClick={() => setShowCreateForm(true)}
            aria-label="Nieuwe flashcard toevoegen"
          >
            ➕ Nieuwe kaart
          </button>
          <Link 
            to="/decks" 
            className="btn-secondary"
            aria-label="Ga terug naar alle decks"
          >
            ← Terug naar decks
          </Link>
        </nav>
      </section>

      <section className="cards-section" aria-labelledby="cards-title">
        <h2 id="cards-title" className="sr-only">Flashcards in dit deck</h2>
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
    </main>
  )
}

export default DeckPage
