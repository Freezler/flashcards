import { useState, useCallback } from 'react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { FlashCard } from '../types'
import { useCards } from '../contexts/CardContext'
import CardForm from './CardForm'

interface CardListProps {
  deckId: string
  cards: FlashCard[]
}

interface CardItemProps {
  card: FlashCard
  onEdit: (card: FlashCard) => void
  onDelete: (cardId: string) => void
}

const CardItem = React.memo(function CardItem({
  card,
  onEdit,
  onDelete,
}: CardItemProps): React.JSX.Element {
  const { t } = useTranslation(['common', 'decks'])
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const handleDeleteClick = (): void => {
    setShowDeleteConfirm(true)
  }

  const handleDeleteConfirm = (): void => {
    onDelete(card.id)
    setShowDeleteConfirm(false)
  }

  const handleDeleteCancel = (): void => {
    setShowDeleteConfirm(false)
  }

  const getDifficultyColor = (difficulty: string): string => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return 'var(--success-500)'
      case 'medium':
        return 'var(--warning-500)'
      case 'hard':
        return 'var(--error-500)'
      default:
        return 'var(--text-2)'
    }
  }

  return (
    <div className="card-item">
      <div className="card-item__content">
        <div className="card-item__front">
          <strong>Q:</strong> {t(card.front, { ns: 'decks' })}
        </div>
        <div className="card-item__back">
          <strong>A:</strong> {t(card.back, { ns: 'decks' })}
        </div>
        <div className="card-item__meta">
          <span className="card-item__category">{card.category}</span>
          <span
            className="card-item__difficulty"
            style={{ color: getDifficultyColor(card.difficulty) }}
          >
            {card.difficulty}
          </span>
          {card.tags.length > 0 && (
            <div className="card-item__tags">
              {card.tags.slice(0, 3).map(tag => (
                <span key={tag} className="card-item__tag">
                  {tag}
                </span>
              ))}
              {card.tags.length > 3 && (
                <span className="card-item__tag-more">
                  +{card.tags.length - 3}
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="card-item__actions">
        <button
          className="card-action-btn card-action-btn--edit"
          onClick={() => onEdit(card)}
          title="Bewerk kaart"
          aria-label="Bewerk deze kaart"
        >
          ✏️
        </button>
        <button
          className="card-action-btn card-action-btn--delete"
          onClick={handleDeleteClick}
          title="Verwijder kaart"
          aria-label="Verwijder deze kaart"
        >
          🗑️
        </button>
      </div>

      {showDeleteConfirm && (
        <div className="delete-confirm-overlay">
          <div className="delete-confirm">
            <h3>Kaart verwijderen?</h3>
            <p>
              Weet je zeker dat je deze kaart wilt verwijderen? Deze actie kan
              niet ongedaan worden gemaakt.
            </p>
            <div className="delete-confirm__actions">
              <button className="btn-secondary" onClick={handleDeleteCancel}>
                Annuleren
              </button>
              <button className="btn-danger" onClick={handleDeleteConfirm}>
                Verwijderen
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
})

const CardList = React.memo(function CardList({
  deckId,
  cards,
}: CardListProps): React.JSX.Element {
  const { updateCard, deleteCard } = useCards()
  const [showForm, setShowForm] = useState(false)
  const [editingCard, setEditingCard] = useState<FlashCard | undefined>()

  const handleEdit = useCallback((card: FlashCard): void => {
    setEditingCard(card)
    setShowForm(true)
  }, [])

  const handleDelete = useCallback(
    (cardId: string): void => {
      deleteCard(deckId, cardId)
    },
    [deckId, deleteCard]
  )

  const handleFormSave = useCallback(
    (cardData: Omit<FlashCard, 'id'>): void => {
      if (editingCard) {
        updateCard(deckId, editingCard.id, cardData)
      }
      setShowForm(false)
      setEditingCard(undefined)
    },
    [editingCard, updateCard, deckId]
  )

  const handleFormCancel = useCallback((): void => {
    setShowForm(false)
    setEditingCard(undefined)
  }, [])

  if (cards.length === 0) {
    return (
      <div className="card-list-empty">
        <div className="empty-state">
          <div className="empty-icon">📝</div>
          <h3>Geen kaarten</h3>
          <p>
            Dit deck bevat nog geen kaarten. Voeg je eerste kaart toe om te
            beginnen!
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="card-list">
      <div className="card-list__header">
        <h3 className="card-list__title">Kaarten ({cards.length})</h3>
      </div>

      <div className="card-list__items">
        {cards.map(card => (
          <CardItem
            key={card.id}
            card={card}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {showForm && (
        <CardForm
          card={editingCard}
          onSave={handleFormSave}
          onCancel={handleFormCancel}
          isEditing={!!editingCard}
        />
      )}
    </div>
  )
})

export default CardList
