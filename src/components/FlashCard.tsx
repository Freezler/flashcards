import React, { useState, useEffect, useCallback, useRef } from 'react'
import { FlashCard as FlashCardType, DifficultyLevel } from '../types'

interface FlashCardProps {
  card: FlashCardType
  onAnswer?: (cardId: string, isCorrect: boolean, responseTime?: number) => void
  showActions?: boolean
  autoFlip?: boolean
  size?: 'small' | 'medium' | 'large'
  enableSound?: boolean
  showStats?: boolean
  key?: string // Add key prop to force reset when card changes
}

const FlashCard = function FlashCard({
  card,
  onAnswer,
  showActions = true,
  autoFlip = false,
  size = 'medium',
  enableSound = false,
  showStats = false,
}: FlashCardProps): React.JSX.Element {
  const [isFlipped, setIsFlipped] = useState(false)
  const [isRevealing, setIsRevealing] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [flipStartTime, setFlipStartTime] = useState<number | null>(null)
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  // Reset flip state when card changes
  useEffect(() => {
    setIsFlipped(false)
    setIsRevealing(false)
    setIsTransitioning(false)
  }, [card.id])

  const handleFlip = useCallback((): void => {
    if (autoFlip) return

    // Track flip start time for response tracking
    if (!isFlipped && !flipStartTime) {
      setFlipStartTime(Date.now())
    }

    setIsFlipped(!isFlipped)

    // Optional sound feedback
    if (enableSound && !isFlipped) {
      // Could integrate with Web Audio API for card flip sound
    }
  }, [autoFlip, isFlipped, flipStartTime, enableSound])

  const handleReveal = useCallback((): void => {
    setIsRevealing(true)
    setFlipStartTime(Date.now())

    setTimeout(() => {
      setIsFlipped(true)
      setIsRevealing(false)
    }, 300)

    // Optional sound feedback
    if (enableSound) {
    }
  }, [enableSound])

  const handleAnswer = useCallback(
    (isCorrect: boolean): void => {
      const responseTime = flipStartTime
        ? Date.now() - flipStartTime
        : undefined

      if (onAnswer) {
        onAnswer(card.id, isCorrect, responseTime)
      }

      // Visual feedback animation
      if (cardRef.current) {
        cardRef.current.classList.add(
          isCorrect ? 'flashcard--success' : 'flashcard--error'
        )
        setTimeout(() => {
          cardRef.current?.classList.remove(
            'flashcard--success',
            'flashcard--error'
          )
        }, 1000)
      }

      // Optional sound feedback
      if (enableSound) {
      }

      // Start transitioning state to hide content
      setIsTransitioning(true)
      // Reset card for next question
      setTimeout(() => {
        setIsFlipped(false)
        setFlipStartTime(null)
        // Clear transitioning state after flip completes
        setTimeout(() => {
          setIsTransitioning(false)
        }, 600) // Wait for flip animation to complete
      }, 1000)
    },
    [card.id, onAnswer, flipStartTime, enableSound]
  )

  const getDifficultyClass = (difficulty: DifficultyLevel): string => {
    switch (difficulty) {
      case DifficultyLevel.EASY:
        return 'flashcard--easy'
      case DifficultyLevel.MEDIUM:
        return 'flashcard--medium'
      case DifficultyLevel.HARD:
        return 'flashcard--hard'
      default:
        return 'flashcard--medium'
    }
  }

  const getSizeClass = (size: string): string => {
    switch (size) {
      case 'small':
        return 'flashcard--small'
      case 'large':
        return 'flashcard--large'
      default:
        return 'flashcard--medium'
    }
  }

  return (
    <div
      ref={cardRef}
      className={`flashcard ${getDifficultyClass(card.difficulty)} ${getSizeClass(size)} ${
        isFlipped ? 'flashcard--flipped' : ''
      } ${isRevealing ? 'flashcard--revealing' : ''} ${
        isTransitioning ? 'flashcard--transitioning' : ''
      } ${isHovered ? 'flashcard--hovered' : ''}`}
      onClick={handleFlip}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="button"
      tabIndex={0}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          handleFlip()
        }
      }}
      aria-label={`Flashcard: ${card.front}. Press Enter to flip.`}
    >
      <div className="flashcard__inner">
        {/* Front Side */}
        <div className="flashcard__front">
          <div className="flashcard__header">
            <div className="flashcard__difficulty">
              <span className="flashcard__difficulty-text">
                {card.difficulty}
              </span>
            </div>
            <div className="flashcard__category">{card.category}</div>
          </div>

          <div className="flashcard__content">
            <div className="flashcard__question">{card.front}</div>
          </div>

          <div className="flashcard__footer">
            <div className="flashcard__meta">
              <div className="flashcard__tags">
                {card.tags.slice(0, 2).map((tag, index) => (
                  <span key={index} className="flashcard__tag">
                    #{tag}
                  </span>
                ))}
              </div>
              {showStats && (
                <div className="flashcard__stats">
                  <span className="flashcard__stat">
                    ✅ {card.correctCount}
                  </span>
                  <span className="flashcard__stat">
                    ❌ {card.incorrectCount}
                  </span>
                  {card.timesReviewed > 0 && (
                    <span className="flashcard__stat">
                      🔄 {card.timesReviewed}
                    </span>
                  )}
                </div>
              )}
            </div>
            {!autoFlip && (
              <button
                className="flashcard__flip-hint"
                onClick={e => {
                  e.stopPropagation()
                  handleReveal()
                }}
                aria-label="Reveal answer"
              >
                <span className="flashcard__flip-icon">👁️</span>
                Reveal
              </button>
            )}
          </div>
        </div>

        {/* Back Side */}
        <div className="flashcard__back">
          <div className="flashcard__header">
            <div className="flashcard__difficulty">
              <span className="flashcard__difficulty-text">
                {card.difficulty}
              </span>
            </div>
            <div className="flashcard__category">{card.category}</div>
          </div>

          <div className="flashcard__content">
            <div className="flashcard__answer">{card.back}</div>
          </div>

          {showActions && (
            <div className="flashcard__actions">
              <button
                className="flashcard__action flashcard__action--incorrect"
                onClick={e => {
                  e.stopPropagation()
                  handleAnswer(false)
                }}
                aria-label="Mark as incorrect"
              >
                <span className="flashcard__action-icon">❌</span>
                Incorrect
              </button>
              <button
                className="flashcard__action flashcard__action--correct"
                onClick={e => {
                  e.stopPropagation()
                  handleAnswer(true)
                }}
                aria-label="Mark as correct"
              >
                <span className="flashcard__action-icon">✅</span>
                Correct
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Jhey's signature sparkle effects */}
      <div className="flashcard__sparkles" aria-hidden="true">
        <div className="flashcard__sparkle flashcard__sparkle--1">✨</div>
        <div className="flashcard__sparkle flashcard__sparkle--2">⭐</div>
        <div className="flashcard__sparkle flashcard__sparkle--3">💫</div>
        <div className="flashcard__sparkle flashcard__sparkle--4">🌟</div>
      </div>

      {/* Magical glow effect */}
      <div className="flashcard__glow" aria-hidden="true"></div>
    </div>
  )
}

export default React.memo(FlashCard)
