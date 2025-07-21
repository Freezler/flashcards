import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { CardProvider, useCards } from '../CardContext'
import { DifficultyLevel } from '../../types'

// Mock the testDecks import with a simple mock
vi.mock('../../data', () => {
  return {
    testDecks: [],
  }
})

describe('CardContext', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.clearAllMocks()
  })

  it('loads test data when localStorage is empty', async () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <CardProvider>{children}</CardProvider>
    )

    const { result } = renderHook(() => useCards(), { wrapper })

    // Wait for initial load
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0))
    })

    expect(result.current.state.decks).toHaveLength(0)
    expect(result.current.state.loading).toBe(false)
  })

  it('loads data from localStorage when available', async () => {
    const savedDecks = [
      {
        id: 'deck1',
        name: 'Saved Deck',
        description: 'Saved Description',
        cards: [],
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
        isActive: true,
        totalCards: 0,
        reviewedCards: 0,
      },
    ]

    localStorage.setItem('flashcard-decks', JSON.stringify(savedDecks))

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <CardProvider>{children}</CardProvider>
    )

    const { result } = renderHook(() => useCards(), { wrapper })

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0))
    })

    expect(result.current.state.decks[0]?.name).toBe('Saved Deck')
  })

  it('adds a new card to deck', async () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <CardProvider>{children}</CardProvider>
    )

    const { result } = renderHook(() => useCards(), { wrapper })

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0))
    })

    // First add a deck
    const testDeck = {
      name: 'Test Deck',
      description: 'Test Description',
      cards: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
      totalCards: 0,
      reviewedCards: 0,
    }

    act(() => {
      result.current.addDeck(testDeck)
    })

    const deckId = result.current.state.decks[0]?.id || ''

    const newCard = {
      front: 'New Question',
      back: 'New Answer',
      category: 'New Category',
      difficulty: DifficultyLevel.MEDIUM,
      tags: ['new'],
      createdAt: new Date(),
      updatedAt: new Date(),
      lastReviewed: null,
      nextReview: null,
      timesReviewed: 0,
      correctCount: 0,
      incorrectCount: 0,
    }

    act(() => {
      result.current.addCard(deckId, newCard)
    })

    const deck = result.current.getDeck(deckId)
    expect(deck?.cards).toHaveLength(1)
    expect(deck?.cards[0]).toMatchObject(newCard)
  })

  it('updates an existing card', async () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <CardProvider>{children}</CardProvider>
    )

    const { result } = renderHook(() => useCards(), { wrapper })

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0))
    })

    const cardUpdate = {
      front: 'Updated Question',
      difficulty: DifficultyLevel.HARD,
    }

    act(() => {
      result.current.updateCard('deck1', 'card1', cardUpdate)
    })

    const card = result.current.getCard('deck1', 'card1')
    expect(card?.front).toBe('Updated Question')
    expect(card?.difficulty).toBe(DifficultyLevel.HARD)
  })

  it('deletes a card from deck', async () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <CardProvider>{children}</CardProvider>
    )

    const { result } = renderHook(() => useCards(), { wrapper })

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0))
    })

    act(() => {
      result.current.deleteCard('deck1', 'card1')
    })

    const deck = result.current.getDeck('deck1')
    expect(deck?.cards).toHaveLength(0)
  })

  it('adds a new deck', async () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <CardProvider>{children}</CardProvider>
    )

    const { result } = renderHook(() => useCards(), { wrapper })

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0))
    })

    const newDeck = {
      name: 'New Deck',
      description: 'New Description',
      cards: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
      totalCards: 0,
      reviewedCards: 0,
    }

    act(() => {
      result.current.addDeck(newDeck)
    })

    expect(result.current.state.decks).toHaveLength(2)
    expect(result.current.state.decks[1]).toMatchObject(newDeck)
  })

  it('updates a deck', async () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <CardProvider>{children}</CardProvider>
    )

    const { result } = renderHook(() => useCards(), { wrapper })

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0))
    })

    const deckUpdate = {
      name: 'Updated Deck Name',
      description: 'Updated Description',
    }

    act(() => {
      result.current.updateDeck('deck1', deckUpdate)
    })

    const deck = result.current.getDeck('deck1')
    expect(deck?.name).toBe('Updated Deck Name')
    expect(deck?.description).toBe('Updated Description')
  })

  it('deletes a deck', async () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <CardProvider>{children}</CardProvider>
    )

    const { result } = renderHook(() => useCards(), { wrapper })

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0))
    })

    act(() => {
      result.current.deleteDeck('deck1')
    })

    expect(result.current.state.decks).toHaveLength(0)
  })

  it('saves to localStorage when decks change', async () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <CardProvider>{children}</CardProvider>
    )

    const { result } = renderHook(() => useCards(), { wrapper })

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0))
    })

    const newCard = {
      front: 'Test',
      back: 'Test',
      category: 'Test',
      difficulty: DifficultyLevel.EASY,
      tags: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      lastReviewed: null,
      nextReview: null,
      timesReviewed: 0,
      correctCount: 0,
      incorrectCount: 0,
    }

    act(() => {
      result.current.addCard('deck1', newCard)
    })

    // Wait for localStorage to be called
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0))
    })

    expect(localStorage.setItem).toHaveBeenCalledWith(
      'flashcard-decks',
      expect.any(String)
    )
  })

  it('throws error when used outside provider', () => {
    expect(() => {
      renderHook(() => useCards())
    }).toThrow('useCards must be used within a CardProvider')
  })
})
