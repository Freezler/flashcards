import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
  useMemo,
} from 'react'
import { FlashCard, Deck } from '../types'
import { testDecks } from '../data'

interface CardState {
  decks: Deck[]
  loading: boolean
  error: string | null
}

type CardAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_DECKS'; payload: Deck[] }
  | { type: 'ADD_CARD'; payload: { deckId: string; card: FlashCard } }
  | {
      type: 'UPDATE_CARD'
      payload: { deckId: string; cardId: string; card: Partial<FlashCard> }
    }
  | { type: 'DELETE_CARD'; payload: { deckId: string; cardId: string } }
  | { type: 'ADD_DECK'; payload: Deck }
  | { type: 'UPDATE_DECK'; payload: { deckId: string; deck: Partial<Deck> } }
  | { type: 'DELETE_DECK'; payload: string }

interface CardContextType {
  state: CardState
  addCard: (deckId: string, cardData: Omit<FlashCard, 'id'>) => void
  updateCard: (
    deckId: string,
    cardId: string,
    cardData: Partial<FlashCard>
  ) => void
  deleteCard: (deckId: string, cardId: string) => void
  addDeck: (deckData: Omit<Deck, 'id'>) => void
  updateDeck: (deckId: string, deckData: Partial<Deck>) => void
  deleteDeck: (deckId: string) => void
  getDeck: (deckId: string) => Deck | undefined
  getCard: (deckId: string, cardId: string) => FlashCard | undefined
}

const CardContext = createContext<CardContextType | undefined>(undefined)

const cardReducer = (state: CardState, action: CardAction): CardState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload }

    case 'SET_ERROR':
      return { ...state, error: action.payload }

    case 'SET_DECKS':
      return { ...state, decks: action.payload, loading: false }

    case 'ADD_CARD': {
      const { deckId, card } = action.payload
      return {
        ...state,
        decks: state.decks.map(deck =>
          deck.id === deckId ? { ...deck, cards: [...deck.cards, card] } : deck
        ),
      }
    }

    case 'UPDATE_CARD': {
      const { deckId, cardId, card: cardUpdate } = action.payload
      return {
        ...state,
        decks: state.decks.map(deck =>
          deck.id === deckId
            ? {
                ...deck,
                cards: deck.cards.map(card =>
                  card.id === cardId ? { ...card, ...cardUpdate } : card
                ),
              }
            : deck
        ),
      }
    }

    case 'DELETE_CARD': {
      const { deckId, cardId } = action.payload
      return {
        ...state,
        decks: state.decks.map(deck =>
          deck.id === deckId
            ? { ...deck, cards: deck.cards.filter(card => card.id !== cardId) }
            : deck
        ),
      }
    }

    case 'ADD_DECK':
      return {
        ...state,
        decks: [...state.decks, action.payload],
      }

    case 'UPDATE_DECK': {
      const { deckId, deck: deckUpdate } = action.payload
      return {
        ...state,
        decks: state.decks.map(deck =>
          deck.id === deckId ? { ...deck, ...deckUpdate } : deck
        ),
      }
    }

    case 'DELETE_DECK':
      return {
        ...state,
        decks: state.decks.filter(deck => deck.id !== action.payload),
      }

    default:
      return state
  }
}

const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2)
}

interface CardProviderProps {
  children: React.ReactNode
}

export function CardProvider({
  children,
}: CardProviderProps): React.JSX.Element {
  const [state, dispatch] = useReducer(cardReducer, {
    decks: [],
    loading: true,
    error: null,
  })

  // Load data from localStorage or use test data
  useEffect(() => {
    try {
      // Force clear all localStorage and load fresh Dutch data
      localStorage.removeItem('flashcard-decks')
      localStorage.removeItem('flashcard-data-version')

      console.log('Loading fresh Dutch flashcard data...', testDecks.length, 'decks')
      dispatch({ type: 'SET_DECKS', payload: testDecks })
      localStorage.setItem('flashcard-data-version', '2.1-nl')
    } catch (error) {
      console.error('Failed to load decks:', error)
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load data' })
      dispatch({ type: 'SET_DECKS', payload: testDecks })
    }
  }, [])

  // Save to localStorage whenever decks change
  useEffect(() => {
    if (!state.loading && state.decks.length > 0) {
      try {
        localStorage.setItem('flashcard-decks', JSON.stringify(state.decks))
      } catch (error) {
        console.error('Failed to save decks to localStorage:', error)
        dispatch({ type: 'SET_ERROR', payload: 'Failed to save data' })
      }
    }
  }, [state.decks, state.loading])

  const addCard = useCallback(
    (deckId: string, cardData: Omit<FlashCard, 'id'>): void => {
      const card: FlashCard = {
        ...cardData,
        id: generateId(),
        updatedAt: new Date(),
      }
      dispatch({ type: 'ADD_CARD', payload: { deckId, card } })
    },
    []
  )

  const updateCard = useCallback(
    (deckId: string, cardId: string, cardData: Partial<FlashCard>): void => {
      dispatch({
        type: 'UPDATE_CARD',
        payload: { deckId, cardId, card: cardData },
      })
    },
    []
  )

  const deleteCard = useCallback((deckId: string, cardId: string): void => {
    dispatch({ type: 'DELETE_CARD', payload: { deckId, cardId } })
  }, [])

  const addDeck = useCallback((deckData: Omit<Deck, 'id'>): void => {
    const deck: Deck = {
      ...deckData,
      id: generateId(),
      updatedAt: new Date(),
    }
    dispatch({ type: 'ADD_DECK', payload: deck })
  }, [])

  const updateDeck = useCallback(
    (deckId: string, deckData: Partial<Deck>): void => {
      dispatch({ type: 'UPDATE_DECK', payload: { deckId, deck: deckData } })
    },
    []
  )

  const deleteDeck = useCallback((deckId: string): void => {
    dispatch({ type: 'DELETE_DECK', payload: deckId })
  }, [])

  const getDeck = useCallback(
    (deckId: string): Deck | undefined => {
      return state.decks.find(deck => deck.id === deckId)
    },
    [state.decks]
  )

  const getCard = useCallback(
    (deckId: string, cardId: string): FlashCard | undefined => {
      const deck = getDeck(deckId)
      return deck?.cards.find(card => card.id === cardId)
    },
    [getDeck]
  )

  const contextValue = useMemo(
    (): CardContextType => ({
      state,
      addCard,
      updateCard,
      deleteCard,
      addDeck,
      updateDeck,
      deleteDeck,
      getDeck,
      getCard,
    }),
    [
      state,
      addCard,
      updateCard,
      deleteCard,
      addDeck,
      updateDeck,
      deleteDeck,
      getDeck,
      getCard,
    ]
  )

  return (
    <CardContext.Provider value={contextValue}>{children}</CardContext.Provider>
  )
}

export const useCards = (): CardContextType => {
  const context = useContext(CardContext)
  if (context === undefined) {
    throw new Error('useCards must be used within a CardProvider')
  }
  return context
}

export default CardContext
