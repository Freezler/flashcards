import { describe, it, expect, vi } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { render } from '../../test/test-utils'
import CardForm from '../CardForm'
import { DifficultyLevel } from '../../types'

const mockCard = {
  id: '1',
  front: 'Test Question',
  back: 'Test Answer',
  category: 'Test Category',
  difficulty: DifficultyLevel.MEDIUM,
  tags: ['tag1', 'tag2'],
  createdAt: new Date(),
  lastReviewed: null,
  nextReview: null,
  repetitions: 0,
  easeFactor: 2.5,
  interval: 0,
}

describe('CardForm', () => {
  const mockOnSave = vi.fn()
  const mockOnCancel = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders form for creating new card', () => {
    render(<CardForm onSave={mockOnSave} onCancel={mockOnCancel} />)

    expect(screen.getByText('Nieuwe Kaart')).toBeInTheDocument()
    expect(screen.getByLabelText(/voorkant/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/achterkant/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/categorie/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/moeilijkheidsgraad/i)).toBeInTheDocument()
    expect(screen.getByText('Aanmaken')).toBeInTheDocument()
  })

  it('renders form for editing existing card', () => {
    render(
      <CardForm
        card={mockCard}
        onSave={mockOnSave}
        onCancel={mockOnCancel}
        isEditing={true}
      />
    )

    expect(screen.getByText('Kaart Bewerken')).toBeInTheDocument()
    expect(screen.getByDisplayValue('Test Question')).toBeInTheDocument()
    expect(screen.getByDisplayValue('Test Answer')).toBeInTheDocument()
    expect(screen.getByDisplayValue('Test Category')).toBeInTheDocument()
    expect(screen.getByText('Bijwerken')).toBeInTheDocument()
  })

  it('shows validation errors for empty required fields', async () => {
    const user = userEvent.setup()

    render(<CardForm onSave={mockOnSave} onCancel={mockOnCancel} />)

    const submitButton = screen.getByText('Aanmaken')
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText('Voorkant is verplicht')).toBeInTheDocument()
      expect(screen.getByText('Achterkant is verplicht')).toBeInTheDocument()
      expect(screen.getByText('Categorie is verplicht')).toBeInTheDocument()
    })

    expect(mockOnSave).not.toHaveBeenCalled()
  })

  it('submits form with valid data', async () => {
    const user = userEvent.setup()

    render(<CardForm onSave={mockOnSave} onCancel={mockOnCancel} />)

    // Fill in form fields
    await user.type(screen.getByLabelText(/voorkant/i), 'New Question')
    await user.type(screen.getByLabelText(/achterkant/i), 'New Answer')
    await user.type(screen.getByLabelText(/categorie/i), 'New Category')

    const submitButton = screen.getByText('Aanmaken')
    await user.click(submitButton)

    await waitFor(() => {
      expect(mockOnSave).toHaveBeenCalledWith(
        expect.objectContaining({
          front: 'New Question',
          back: 'New Answer',
          category: 'New Category',
          difficulty: DifficultyLevel.MEDIUM,
          tags: [],
        })
      )
    })
  })

  it('adds and removes tags', async () => {
    const user = userEvent.setup()

    render(<CardForm onSave={mockOnSave} onCancel={mockOnCancel} />)

    // Add a tag
    const tagInput = screen.getByPlaceholderText(/voeg tag toe/i)
    await user.type(tagInput, 'newtag')
    await user.keyboard('{Enter}')

    expect(screen.getByText('newtag')).toBeInTheDocument()

    // Remove the tag
    const removeButton = screen.getByLabelText(/verwijder tag newtag/i)
    await user.click(removeButton)

    expect(screen.queryByText('newtag')).not.toBeInTheDocument()
  })

  it('calls onCancel when cancel button is clicked', async () => {
    const user = userEvent.setup()

    render(<CardForm onSave={mockOnSave} onCancel={mockOnCancel} />)

    const cancelButton = screen.getByText('Annuleren')
    await user.click(cancelButton)

    expect(mockOnCancel).toHaveBeenCalled()
  })

  it('calls onCancel when close button is clicked', async () => {
    const user = userEvent.setup()

    render(<CardForm onSave={mockOnSave} onCancel={mockOnCancel} />)

    const closeButton = screen.getByLabelText(/sluiten/i)
    await user.click(closeButton)

    expect(mockOnCancel).toHaveBeenCalled()
  })

  it('changes difficulty level', async () => {
    const user = userEvent.setup()

    render(<CardForm onSave={mockOnSave} onCancel={mockOnCancel} />)

    const difficultySelect = screen.getByLabelText(/moeilijkheidsgraad/i)
    await user.selectOptions(difficultySelect, DifficultyLevel.HARD)

    // Fill in required fields and submit
    await user.type(screen.getByLabelText(/voorkant/i), 'Question')
    await user.type(screen.getByLabelText(/achterkant/i), 'Answer')
    await user.type(screen.getByLabelText(/categorie/i), 'Category')

    await user.click(screen.getByText('Aanmaken'))

    await waitFor(() => {
      expect(mockOnSave).toHaveBeenCalledWith(
        expect.objectContaining({
          difficulty: DifficultyLevel.HARD,
        })
      )
    })
  })

  it('clears validation errors when user starts typing', async () => {
    const user = userEvent.setup()

    render(<CardForm onSave={mockOnSave} onCancel={mockOnCancel} />)

    // Submit empty form to show errors
    await user.click(screen.getByText('Aanmaken'))

    await waitFor(() => {
      expect(screen.getByText('Voorkant is verplicht')).toBeInTheDocument()
    })

    // Start typing in front field
    await user.type(screen.getByLabelText(/voorkant/i), 'A')

    // Error should be cleared
    expect(screen.queryByText('Voorkant is verplicht')).not.toBeInTheDocument()
  })
})
