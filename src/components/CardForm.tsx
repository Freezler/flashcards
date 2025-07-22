import { useState, useEffect } from 'react'
import { FlashCard, DifficultyLevel } from '../types'

interface CardFormProps {
  card?: FlashCard
  onSave: (card: Omit<FlashCard, 'id'>) => void
  onCancel: () => void
  isEditing?: boolean
}

interface CardFormData {
  front: string
  back: string
  category: string
  difficulty: DifficultyLevel
  tags: string[]
}

function CardForm({
  card,
  onSave,
  onCancel,
  isEditing = false,
}: CardFormProps): React.JSX.Element {
  const [formData, setFormData] = useState<CardFormData>({
    front: '',
    back: '',
    category: '',
    difficulty: DifficultyLevel.MEDIUM,
    tags: [],
  })

  const [tagInput, setTagInput] = useState('')
  const [errors, setErrors] = useState<Partial<CardFormData>>({})

  useEffect(() => {
    if (card) {
      setFormData({
        front: card.front,
        back: card.back,
        category: card.category,
        difficulty: card.difficulty,
        tags: card.tags,
      })
    }
  }, [card])

  const validateForm = (): boolean => {
    const newErrors: Partial<CardFormData> = {}

    if (!formData.front.trim()) {
      newErrors.front = 'Voorkant is verplicht'
    }

    if (!formData.back.trim()) {
      newErrors.back = 'Achterkant is verplicht'
    }

    if (!formData.category.trim()) {
      newErrors.category = 'Categorie is verplicht'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    const cardData: Omit<FlashCard, 'id'> = {
      ...formData,
      front: formData.front.trim(),
      back: formData.back.trim(),
      category: formData.category.trim(),
      tags: formData.tags.filter(tag => tag.trim() !== ''),
      createdAt: card?.createdAt || new Date(),
      lastReviewed: card?.lastReviewed || null,
      nextReview: card?.nextReview || null,
      timesReviewed: card?.timesReviewed || 0,
      correctCount: card?.correctCount || 0,
      incorrectCount: card?.incorrectCount || 0,
      updatedAt: new Date(),
    }

    onSave(cardData)
  }

  const handleInputChange = (
    field: keyof CardFormData,
    value: string | DifficultyLevel
  ): void => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }))

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined,
      }))
    }
  }

  const addTag = (): void => {
    const tag = tagInput.trim()
    if (tag && !formData.tags.includes(tag)) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tag],
      }))
      setTagInput('')
    }
  }

  const removeTag = (tagToRemove: string): void => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove),
    }))
  }

  const handleTagKeyDown = (e: React.KeyboardEvent): void => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addTag()
    }
  }

  return (
    <div className="card-form-overlay">
      <div className="card-form">
        <div className="card-form__header">
          <h2 className="card-form__title">
            {isEditing ? 'Kaart Bewerken' : 'Nieuwe Kaart'}
          </h2>
          <button
            type="button"
            className="card-form__close"
            onClick={onCancel}
            aria-label="Sluiten"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="card-form__form">
          <div className="form-group">
            <label htmlFor="front" className="form-label">
              Voorkant *
            </label>
            <textarea
              id="front"
              className={`form-textarea ${errors.front ? 'error' : ''}`}
              value={formData.front}
              onChange={e => handleInputChange('front', e.target.value)}
              placeholder="Vraag of term..."
              rows={3}
              aria-describedby={errors.front ? 'front-error' : undefined}
              aria-invalid={errors.front ? 'true' : 'false'}
            />
            {errors.front && <span className="form-error" id="front-error" role="alert">{errors.front}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="back" className="form-label">
              Achterkant *
            </label>
            <textarea
              id="back"
              className={`form-textarea ${errors.back ? 'error' : ''}`}
              value={formData.back}
              onChange={e => handleInputChange('back', e.target.value)}
              placeholder="Antwoord of definitie..."
              rows={3}
              aria-describedby={errors.back ? 'back-error' : undefined}
              aria-invalid={errors.back ? 'true' : 'false'}
            />
            {errors.back && <span className="form-error" id="back-error" role="alert">{errors.back}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="category" className="form-label">
                Categorie *
              </label>
              <input
                type="text"
                id="category"
                className={`form-input ${errors.category ? 'error' : ''}`}
                value={formData.category}
                onChange={e => handleInputChange('category', e.target.value)}
                placeholder="bijv. Nederlands, Wiskunde..."
                aria-describedby={errors.category ? 'category-error' : undefined}
                aria-invalid={errors.category ? 'true' : 'false'}
              />
              {errors.category && (
                <span className="form-error" id="category-error" role="alert">{errors.category}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="difficulty" className="form-label">
                Moeilijkheidsgraad
              </label>
              <select
                id="difficulty"
                className="form-select"
                value={formData.difficulty}
                onChange={e =>
                  handleInputChange(
                    'difficulty',
                    e.target.value as DifficultyLevel
                  )
                }
              >
                <option value={DifficultyLevel.EASY}>Makkelijk</option>
                <option value={DifficultyLevel.MEDIUM}>Gemiddeld</option>
                <option value={DifficultyLevel.HARD}>Moeilijk</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Tags</label>
            <div className="tags-input">
              <input
                type="text"
                className="form-input"
                value={tagInput}
                onChange={e => setTagInput(e.target.value)}
                onKeyDown={handleTagKeyDown}
                placeholder="Voeg tag toe en druk Enter..."
              />
              <button
                type="button"
                className="btn-secondary btn-sm"
                onClick={addTag}
                disabled={!tagInput.trim()}
              >
                Toevoegen
              </button>
            </div>
            {formData.tags.length > 0 && (
              <div className="tags-list">
                {formData.tags.map(tag => (
                  <span key={tag} className="tag">
                    {tag}
                    <button
                      type="button"
                      className="tag__remove"
                      onClick={() => removeTag(tag)}
                      aria-label={`Verwijder tag ${tag}`}
                    >
                      ✕
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="card-form__actions">
            <button type="button" className="btn-secondary" onClick={onCancel}>
              Annuleren
            </button>
            <button type="submit" className="btn-primary">
              {isEditing ? 'Bijwerken' : 'Aanmaken'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CardForm
