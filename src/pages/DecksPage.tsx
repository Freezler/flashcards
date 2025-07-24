import React, { useCallback, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCards } from '../contexts/CardContext'
import { LoadingBoundary, EmptyState } from '../components/common'

const DecksPage = React.memo(function DecksPage(): React.JSX.Element {
  const { state, deleteDeck } = useCards()
  const { decks, loading, error } = state
  const navigate = useNavigate()
  const [deckToDelete, setDeckToDelete] = useState<string | null>(null)

  const handleCreateNewDeck = useCallback(() => {
    navigate('/decks/new')
  }, [navigate])

  const handleDeleteDeck = useCallback((deckId: string) => {
    setDeckToDelete(deckId)
  }, [])

  const confirmDelete = useCallback(() => {
    if (deckToDelete) {
      deleteDeck(deckToDelete)
      setDeckToDelete(null)
    }
  }, [deckToDelete, deleteDeck])

  const cancelDelete = useCallback(() => {
    setDeckToDelete(null)
  }, [])

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1 className="dashboard-title">Mijn Decks</h1>
        <p className="dashboard-subtitle">
          Beheer al je flashcard decks op één plek
        </p>
      </header>

      <div className="page-actions-top">
        <Link to="/decks/new" className="btn-primary">
          ➕ Nieuw Deck Maken
        </Link>
      </div>

      <LoadingBoundary loading={loading} error={error}>
        {decks.length === 0 ? (
          <EmptyState
            icon="📚"
            title="Geen decks gevonden"
            description="Je hebt nog geen flashcard decks. Maak je eerste deck aan om te beginnen!"
            action={{
              text: '➕ Eerste Deck Maken',
              onClick: handleCreateNewDeck,
              variant: 'primary',
            }}
          />
        ) : (
          <div className="deck-grid">
            {decks.map(deck => (
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
                  <button
                    onClick={() => handleDeleteDeck(deck.id)}
                    className="btn-danger btn-danger--outline"
                    title="Dit deck verwijderen"
                    aria-label="Dit deck verwijderen"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </LoadingBoundary>

      {/* Delete Confirmation Modal */}
      {deckToDelete && (
        <>
          <div className="modal-overlay" onClick={cancelDelete} />
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title">Deck verwijderen</h3>
            </div>
            <div className="modal-body">
              <p>
                Weet je zeker dat je dit deck wilt verwijderen? Deze actie kan
                niet ongedaan worden gemaakt.
              </p>
              <p className="modal-warning">
                Alle kaarten in dit deck worden permanent verwijderd.
              </p>
            </div>
            <div className="modal-actions">
              <button onClick={cancelDelete} className="btn-secondary">
                Annuleren
              </button>
              <button onClick={confirmDelete} className="btn-danger">
                🗑️ Verwijderen
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
})

export default DecksPage
