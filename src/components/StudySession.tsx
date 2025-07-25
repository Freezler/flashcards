import { useCallback, useEffect, useState } from 'react'
import { Deck, FlashCard as FlashCardType, StudyMode } from '../types'
import {
  AnswerQuality,
  calculateNextReview,
  calculateSessionStats,
  getAnswerQuality,
  getDueCards,
  SessionStats,
  sortCardsByPriority,
  updateCardWithSpacedRepetition,
} from '../utils/spacedRepetition'
import FlashCard from './FlashCard'

interface StudySessionProps {
  deck: Deck
  studyMode?: StudyMode
  onSessionComplete?: (results: StudySessionResults) => void
  onCardUpdate?: (card: FlashCardType) => void
  maxCards?: number
  timeLimit?: number // in minutes
}

export interface StudySessionResults {
  cardsStudied: number
  correctAnswers: number
  incorrectAnswers: number
  sessionDuration: number // in seconds
  averageResponseTime: number
  cardsGraduated: number // cards that moved to next level
  perfectCards: number // cards answered with very easy
}

interface SessionState {
  cards: FlashCardType[]
  currentCardIndex: number
  isSessionActive: boolean
  sessionStartTime: Date
  cardStartTime: Date | null
  results: StudySessionResults
  stats: SessionStats
}

function StudySession({
  deck,
  studyMode = StudyMode.SPACED,
  onSessionComplete,
  onCardUpdate,
  maxCards = 20,
  timeLimit = 30,
}: StudySessionProps): React.JSX.Element {
  const [sessionState, setSessionState] = useState<SessionState>(() => {
    const dueCards = getDueCards(deck.cards)
    const sessionCards =
      studyMode === StudyMode.SPACED
        ? sortCardsByPriority(dueCards).slice(0, maxCards)
        : deck.cards.slice(0, maxCards)

    return {
      cards: sessionCards,
      currentCardIndex: 0,
      isSessionActive: sessionCards.length > 0,
      sessionStartTime: new Date(),
      cardStartTime: null,
      results: {
        cardsStudied: 0,
        correctAnswers: 0,
        incorrectAnswers: 0,
        sessionDuration: 0,
        averageResponseTime: 0,
        cardsGraduated: 0,
        perfectCards: 0,
      },
      stats: calculateSessionStats(sessionCards),
    }
  })

  const [showSessionComplete, setShowSessionComplete] = useState(false)

  const handleSessionComplete = useCallback((): void => {
    if (!sessionState.isSessionActive) return

    const sessionDuration = Math.floor(
      (Date.now() - sessionState.sessionStartTime.getTime()) / 1000
    )

    const finalResults = {
      ...sessionState.results,
      sessionDuration,
    }

    setSessionState(prev => ({
      ...prev,
      isSessionActive: false,
      results: finalResults,
    }))

    setShowSessionComplete(true)

    if (onSessionComplete) {
      onSessionComplete(finalResults)
    }
  }, [
    sessionState.isSessionActive,
    sessionState.sessionStartTime,
    sessionState.results,
    onSessionComplete,
  ])

  // Start timing when card is shown
  useEffect(() => {
    if (sessionState.isSessionActive && sessionState.cardStartTime === null) {
      setSessionState(prev => ({
        ...prev,
        cardStartTime: new Date(),
      }))
    }
  }, [
    sessionState.currentCardIndex,
    sessionState.isSessionActive,
    sessionState.cardStartTime,
  ])

  // Handle session timeout
  useEffect(() => {
    if (!sessionState.isSessionActive) return

    const timeoutId = setTimeout(
      () => {
        handleSessionComplete()
      },
      timeLimit * 60 * 1000
    ) // Convert minutes to milliseconds

    return () => clearTimeout(timeoutId)
  }, [
    sessionState.isSessionActive,
    timeLimit,
    sessionState.cardStartTime,
    handleSessionComplete,
  ])

  const getCurrentCard = useCallback((): FlashCardType | null => {
    return sessionState.cards[sessionState.currentCardIndex] || null
  }, [sessionState.cards, sessionState.currentCardIndex])

  const handleAnswer = useCallback(
    (cardId: string, isCorrect: boolean): void => {
      const currentCard = getCurrentCard()
      if (
        !currentCard ||
        !sessionState.cardStartTime ||
        currentCard.id !== cardId
      )
        return

      const responseTime = Date.now() - sessionState.cardStartTime.getTime()
      const answerQuality = getAnswerQuality(
        isCorrect,
        responseTime,
        currentCard.difficulty
      )

      // Calculate spaced repetition for this card
      const spacedRepetitionResult = calculateNextReview(
        currentCard,
        answerQuality
      )

      // Update the card with new spaced repetition data
      const updatedCard = updateCardWithSpacedRepetition(
        currentCard,
        spacedRepetitionResult,
        isCorrect
      )

      // Notify parent component of card update
      if (onCardUpdate) {
        onCardUpdate(updatedCard)
      }

      // Update session state
      setSessionState(prev => {
        const newResults = {
          ...prev.results,
          cardsStudied: prev.results.cardsStudied + 1,
          correctAnswers: prev.results.correctAnswers + (isCorrect ? 1 : 0),
          incorrectAnswers: prev.results.incorrectAnswers + (isCorrect ? 0 : 1),
          averageResponseTime:
            (prev.results.averageResponseTime * prev.results.cardsStudied +
              responseTime) /
            (prev.results.cardsStudied + 1),
          cardsGraduated:
            prev.results.cardsGraduated +
            (answerQuality >= AnswerQuality.GOOD ? 1 : 0),
          perfectCards:
            prev.results.perfectCards +
            (answerQuality >= AnswerQuality.VERY_EASY ? 1 : 0),
        }

        // Update the card in our session cards array
        const updatedCards = [...prev.cards]
        updatedCards[prev.currentCardIndex] = updatedCard

        const isLastCard = prev.currentCardIndex >= prev.cards.length - 1

        return {
          ...prev,
          cards: updatedCards,
          currentCardIndex: isLastCard
            ? prev.currentCardIndex
            : prev.currentCardIndex + 1,
          isSessionActive: !isLastCard,
          cardStartTime: null,
          results: newResults,
        }
      })

      // Reset card state before showing next card or completing session
      setTimeout(() => {
        if (sessionState.currentCardIndex >= sessionState.cards.length - 1) {
          handleSessionComplete()
        } else {
          // Reset card state before showing next card
          setSessionState(prev => ({
            ...prev,
            cardStartTime: null,
          }))
        }
      }, 1500) // Delay to show feedback
    },
    [
      getCurrentCard,
      sessionState.cardStartTime,
      sessionState.currentCardIndex,
      sessionState.cards.length,
      onCardUpdate,
      handleSessionComplete,
    ]
  )

  const handleSkipCard = useCallback((): void => {
    if (sessionState.currentCardIndex < sessionState.cards.length - 1) {
      setSessionState(prev => ({
        ...prev,
        currentCardIndex: prev.currentCardIndex + 1,
        cardStartTime: null,
      }))
    } else {
      handleSessionComplete()
    }
  }, [
    sessionState.currentCardIndex,
    sessionState.cards.length,
    handleSessionComplete,
  ])

  const handlePreviousCard = useCallback((): void => {
    if (sessionState.currentCardIndex > 0) {
      setSessionState(prev => ({
        ...prev,
        currentCardIndex: prev.currentCardIndex - 1,
        cardStartTime: null,
      }))
    }
  }, [sessionState.currentCardIndex])

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const currentCard = getCurrentCard()
  const progress =
    sessionState.cards.length > 0
      ? Math.round(
          ((sessionState.currentCardIndex + 1) / sessionState.cards.length) *
            100
        )
      : 100

  if (showSessionComplete) {
    return (
      <div className="study-session-complete glass-container">
        <div className="session-complete-content">
          <div className="session-complete-header">
            <div className="session-complete-icon magical-glow">🎉</div>
            <h2 className="session-complete-title gradient-text">
              Sessie Voltooid!
            </h2>
            <div className="session-complete-subtitle">
              Geweldig werk! Hier zijn je resultaten:
            </div>
          </div>

          <div className="session-results-grid">
            <div
              className="result-item glass-card hover-lift"
              style={{ '--index': 1 } as React.CSSProperties}
            >
              <div className="result-icon">📚</div>
              <div className="result-number theme-accent">
                {sessionState.results.cardsStudied}
              </div>
              <div className="result-label">Kaarten bestudeerd</div>
            </div>

            <div
              className="result-item result-item--success glass-card hover-lift"
              style={{ '--index': 2 } as React.CSSProperties}
            >
              <div className="result-icon">✅</div>
              <div className="result-number">
                {sessionState.results.correctAnswers}
              </div>
              <div className="result-label">Correct</div>
            </div>

            <div
              className="result-item result-item--error glass-card hover-lift"
              style={{ '--index': 3 } as React.CSSProperties}
            >
              <div className="result-icon">❌</div>
              <div className="result-number">
                {sessionState.results.incorrectAnswers}
              </div>
              <div className="result-label">Fout</div>
            </div>

            <div
              className="result-item glass-card hover-lift"
              style={{ '--index': 4 } as React.CSSProperties}
            >
              <div className="result-icon">⏱️</div>
              <div className="result-number theme-accent">
                {formatTime(sessionState.results.sessionDuration)}
              </div>
              <div className="result-label">Studietijd</div>
            </div>

            <div
              className="result-item glass-card hover-lift"
              style={{ '--index': 5 } as React.CSSProperties}
            >
              <div className="result-icon">🎯</div>
              <div className="result-number theme-accent">
                {sessionState.results.cardsStudied > 0
                  ? Math.round(
                      (sessionState.results.correctAnswers /
                        sessionState.results.cardsStudied) *
                        100
                    )
                  : 0}
                %
              </div>
              <div className="result-label">Accuraatheid</div>
            </div>

            <div
              className="result-item glass-card hover-lift"
              style={{ '--index': 6 } as React.CSSProperties}
            >
              <div className="result-icon">🚀</div>
              <div className="result-number theme-accent">
                {sessionState.results.cardsGraduated}
              </div>
              <div className="result-label">Verbeterd</div>
            </div>
          </div>

          <div className="session-complete-actions">
            <button
              className="btn-primary magical-glow"
              onClick={() => window.location.reload()}
            >
              Nieuwe Sessie
            </button>
            <button
              className="btn-secondary glass-button"
              onClick={() => window.history.back()}
            >
              Terug naar Deck
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (!sessionState.isSessionActive || !currentCard) {
    return (
      <div className="study-session-empty">
        <div className="empty-state glass-card">
          <div className="empty-icon magical-glow">📚</div>
          <h3 className="gradient-text">Geen kaarten om te bestuderen</h3>
          <p>
            Er zijn momenteel geen kaarten beschikbaar voor deze studie sessie.
          </p>
          <button
            className="btn-primary magical-glow"
            onClick={() => window.history.back()}
          >
            Terug naar Deck
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="study-session">
      <div className="study-session-header glass-card">
        <div className="session-progress">
          <div className="progress-bar glass-border">
            <div
              className="progress-fill magical-gradient"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="progress-text theme-accent">
            {sessionState.currentCardIndex + 1} van {sessionState.cards.length}
          </div>
        </div>

        <div className="session-stats">
          <div className="stat glass-button hover-lift">
            <span className="stat-icon">✅</span>
            <span className="stat-value theme-accent">
              {sessionState.results.correctAnswers}
            </span>
          </div>
          <div className="stat glass-button hover-lift">
            <span className="stat-icon">❌</span>
            <span className="stat-value theme-accent">
              {sessionState.results.incorrectAnswers}
            </span>
          </div>
          <div className="stat glass-button hover-lift">
            <span className="stat-icon">⏱️</span>
            <span className="stat-value theme-accent">
              {formatTime(
                Math.floor(
                  (Date.now() - sessionState.sessionStartTime.getTime()) / 1000
                )
              )}
            </span>
          </div>
        </div>
      </div>

      <div className="study-session-main">
        <div className="card-counter">
          {sessionState.currentCardIndex + 1} van {sessionState.cards.length}
        </div>
        {currentCard && (
          <FlashCard
            card={currentCard}
            onAnswer={handleAnswer}
            showActions={true}
            size="large"
          />
        )}
      </div>

      <div className="study-session-controls glass-card">
        <button
          className="session-control-btn session-control-btn--secondary glass-button hover-lift"
          onClick={handlePreviousCard}
          disabled={sessionState.currentCardIndex === 0}
        >
          ← Vorige
        </button>

        <button
          className="session-control-btn session-control-btn--neutral glass-button hover-lift"
          onClick={handleSkipCard}
        >
          Overslaan
        </button>

        <button
          className="session-control-btn session-control-btn--primary session-control-btn--wide magical-glow"
          onClick={handleSessionComplete}
        >
          Sessie Beëindigen
        </button>
      </div>
    </div>
  )
}

export default StudySession
