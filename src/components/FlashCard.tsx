import { useState } from 'react'
import { FlashCard as FlashCardType, DifficultyLevel } from '../types'

interface FlashCardProps {
  card: FlashCardType
  onAnswer?: (cardId: string, isCorrect: boolean) => void
  showActions?: boolean
  autoFlip?: boolean
  size?: 'small' | 'medium' | 'large'
}

function FlashCard({ 
  card, 
  onAnswer, 
  showActions = true, 
  autoFlip = false,
  size = 'medium' 
}: FlashCardProps): React.JSX.Element {
  const [isFlipped, setIsFlipped] = useState(false)
  const [isRevealing, setIsRevealing] = useState(false)

  const handleFlip = (): void => {
    if (autoFlip) return
    setIsFlipped(!isFlipped)
  }

  const handleReveal = (): void => {
    setIsRevealing(true)
    setTimeout(() => {
      setIsFlipped(true)
      setIsRevealing(false)
    }, 300)
  }

  const handleAnswer = (isCorrect: boolean): void => {
    if (onAnswer) {
      onAnswer(card.id, isCorrect)
    }
    // Reset card for next question
    setTimeout(() => {
      setIsFlipped(false)
    }, 1000)
  }

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
      className={`flashcard ${getDifficultyClass(card.difficulty)} ${getSizeClass(size)} ${
        isFlipped ? 'flashcard--flipped' : ''
      } ${isRevealing ? 'flashcard--revealing' : ''}`}
      onClick={handleFlip}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
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
            <div className="flashcard__category">
              {card.category}
            </div>
          </div>
          
          <div className="flashcard__content">
            <div className="flashcard__question">
              {card.front}
            </div>
          </div>

          <div className="flashcard__footer">
            <div className="flashcard__tags">
              {card.tags.slice(0, 2).map((tag, index) => (
                <span key={index} className="flashcard__tag">
                  {tag}
                </span>
              ))}
            </div>
            {!autoFlip && (
              <button 
                className="flashcard__flip-hint"
                onClick={(e) => {
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
            <div className="flashcard__category">
              {card.category}
            </div>
          </div>

          <div className="flashcard__content">
            <div className="flashcard__answer">
              {card.back}
            </div>
          </div>

          {showActions && (
            <div className="flashcard__actions">
              <button 
                className="flashcard__action flashcard__action--incorrect"
                onClick={(e) => {
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
                onClick={(e) => {
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

export default FlashCard