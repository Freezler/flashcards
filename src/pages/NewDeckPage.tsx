import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCards } from '../contexts/CardContext'

function NewDeckPage(): React.JSX.Element {
  const { addDeck } = useCards()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  })
  const [errors, setErrors] = useState<{ name?: string; description?: string }>(
    {}
  )

  const validateForm = (): boolean => {
    const newErrors: { name?: string; description?: string } = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Naam is verplicht'
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Beschrijving is verplicht'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    const newDeck = {
      name: formData.name.trim(),
      description: formData.description.trim(),
      cards: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
      totalCards: 0,
      reviewedCards: 0,
    }

    addDeck(newDeck)
    navigate('/decks')
  }

  const handleInputChange = (field: string, value: string): void => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }))

    // Clear error when user starts typing
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined,
      }))
    }
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1 className="dashboard-title">Nieuw Deck Maken</h1>
        <p className="dashboard-subtitle">Maak een nieuw flashcard deck aan</p>
      </header>

      <div className="deck-form-container">
        <form onSubmit={handleSubmit} className="deck-form">
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Deck Naam *
            </label>
            <input
              type="text"
              id="name"
              className={`form-input ${errors.name ? 'error' : ''}`}
              value={formData.name}
              onChange={e => handleInputChange('name', e.target.value)}
              placeholder="bijv. Nederlands Woordenschat"
            />
            {errors.name && <span className="form-error">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="description" className="form-label">
              Beschrijving *
            </label>
            <textarea
              id="description"
              className={`form-textarea ${errors.description ? 'error' : ''}`}
              value={formData.description}
              onChange={e => handleInputChange('description', e.target.value)}
              placeholder="Beschrijf waar dit deck over gaat..."
              rows={4}
            />
            {errors.description && (
              <span className="form-error">{errors.description}</span>
            )}
          </div>

          <div className="form-actions">
            <Link to="/decks" className="btn-secondary">
              Annuleren
            </Link>
            <button type="submit" className="btn-primary">
              Deck Aanmaken
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default NewDeckPage
