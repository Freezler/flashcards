import React, { useCallback, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useCards } from '../contexts/CardContext'
import { LoadingBoundary, EmptyState } from '../components/common'

const DecksPage = React.memo(function DecksPage(): React.JSX.Element {
  const { t } = useTranslation(['common', 'decks'])
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
    <main
      className="dashboard-container"
      role="main"
      aria-labelledby="decks-title"
    >
      <header className="dashboard-header">
        <h1 id="decks-title" className="dashboard-title">
          {t('decksPage.title')}
        </h1>
        <p className="dashboard-subtitle">{t('decksPage.subtitle')}</p>
      </header>

      <section className="page-actions-top" aria-label={t('decksPage.actions')}>
        <Link
          to="/decks/new"
          className="btn-primary"
          aria-label={t('decksPage.createNewLabel')}
        >
          {t('decksPage.createNew')}
        </Link>
      </section>

      <LoadingBoundary loading={loading} error={error}>
        {decks.length === 0 ? (
          <EmptyState
            icon="📚"
            title={t('decksPage.noDecksTitle')}
            description={t('decksPage.noDecksDescription')}
            action={{
              text: t('decksPage.createFirst'),
              onClick: handleCreateNewDeck,
              variant: 'primary',
            }}
          />
        ) : (
          <section className="deck-grid" aria-labelledby="deck-list-title">
            <h2 id="deck-list-title" className="sr-only">
              {t('decksPage.deckListTitle')}
            </h2>
            {decks.map(deck => (
              <article key={deck.id} className="deck-card">
                <div className="deck-header">
                  <h3 className="deck-title">
                    {t(deck.name, { ns: 'decks' })}
                  </h3>
                  <span className="deck-count">
                    {deck.totalCards} {t('decksPage.cards')}
                  </span>
                </div>
                <p className="deck-description">
                  {t(deck.description, { ns: 'decks' })}
                </p>
                <div className="deck-meta">
                  <span className="deck-created">
                    {t('decksPage.created')}{' '}
                    {deck.createdAt.toLocaleDateString()}
                  </span>
                  <span className="deck-reviewed">
                    {deck.reviewedCards}/{deck.totalCards}{' '}
                    {t('decksPage.reviewed')}
                  </span>
                </div>
                <div className="deck-actions">
                  <Link to={`/deck/${deck.id}/study`} className="btn-primary">
                    {t('decksPage.startStudy')}
                  </Link>
                  <Link to={`/deck/${deck.id}`} className="btn-secondary">
                    {t('decksPage.viewCards')}
                  </Link>
                  <button
                    onClick={() => handleDeleteDeck(deck.id)}
                    className="btn-danger btn-danger--outline"
                    title={t('decksPage.deleteTitle')}
                  >
                    🗑️
                  </button>
                </div>
              </article>
            ))}
          </section>
        )}
      </LoadingBoundary>

      {/* Delete Confirmation Modal */}
      {deckToDelete && (
        <>
          <div className="modal-overlay" onClick={cancelDelete} />
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title">
                {t('decksPage.deleteConfirmTitle')}
              </h3>
            </div>
            <div className="modal-body">
              <p>{t('decksPage.deleteConfirmMessage')}</p>
              <p className="modal-warning">{t('decksPage.deleteWarning')}</p>
            </div>
            <div className="modal-actions">
              <button onClick={cancelDelete} className="btn-secondary">
                {t('decksPage.cancel')}
              </button>
              <button onClick={confirmDelete} className="btn-danger">
                {t('decksPage.delete')}
              </button>
            </div>
          </div>
        </>
      )}
    </main>
  )
})

export default DecksPage
