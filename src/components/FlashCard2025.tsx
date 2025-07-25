import React, { useState, useEffect, useCallback, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { FlashCard as FlashCardType, DifficultyLevel } from '../types'

interface FlashCardProps {
  card: FlashCardType
  onAnswer?: (cardId: string, isCorrect: boolean, responseTime?: number) => void
  showActions?: boolean
  autoFlip?: boolean
  size?: 'small' | 'medium' | 'large'
  enableSound?: boolean
  showStats?: boolean
}

const FlashCard2025 = React.memo(function FlashCard2025({
  card,
  onAnswer,
  showActions = true,
  autoFlip = false,
  size = 'medium',
  enableSound = false,
  showStats = false,
}: FlashCardProps): React.JSX.Element {
  const { t } = useTranslation(['common', 'decks'])
  const [isFlipped, setIsFlipped] = useState(false)
  const [isRevealing, setIsRevealing] = useState(false)
  const [flipStartTime, setFlipStartTime] = useState<number | null>(null)
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  // Reset flip state when card changes
  useEffect(() => {
    setIsFlipped(false)
    setIsRevealing(false)
    setFlipStartTime(null)
  }, [card.id])

  const handleFlip = useCallback((): void => {
    if (autoFlip) return

    // Track flip start time for response tracking
    if (!isFlipped && !flipStartTime) {
      setFlipStartTime(Date.now())
    }

    setIsFlipped(!isFlipped)

    // Optional haptic feedback on mobile
    if (navigator.vibrate && !isFlipped) {
      navigator.vibrate(50)
    }
  }, [isFlipped, flipStartTime, autoFlip])

  const handleKeyDown = useCallback((e: React.KeyboardEvent): void => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleFlip()
    }
  }, [handleFlip])

  const handleReveal = useCallback((): void => {
    setIsRevealing(true)
    setFlipStartTime(Date.now())
    setTimeout(() => {
      setIsFlipped(true)
      setIsRevealing(false)
    }, 300)
  }, [])

  const handleAnswer = useCallback((isCorrect: boolean): void => {
    if (!onAnswer) return

    const responseTime = flipStartTime ? Date.now() - flipStartTime : undefined
    onAnswer(card.id, isCorrect, responseTime)

    // Reset card for next question with smooth transition
    setTimeout(() => {
      setIsFlipped(false)
      setFlipStartTime(null)
    }, 1000)
  }, [card.id, onAnswer, flipStartTime])

  const getDifficultyColor = (difficulty: DifficultyLevel): string => {
    switch (difficulty) {
      case DifficultyLevel.EASY:
        return 'difficulty-pill--easy'
      case DifficultyLevel.MEDIUM:
        return 'difficulty-pill--medium'
      case DifficultyLevel.HARD:
        return 'difficulty-pill--hard'
      default:
        return 'difficulty-pill--medium'
    }
  }

  const getSizeClass = (size: string): string => {
    switch (size) {
      case 'small':
        return 'h-40 text-sm'
      case 'large':
        return 'h-80 text-xl'
      default:
        return 'h-60 text-base'
    }
  }

  const difficultyLabels = {
    [DifficultyLevel.EASY]: t('common:difficulty.easy'),
    [DifficultyLevel.MEDIUM]: t('common:difficulty.medium'),
    [DifficultyLevel.HARD]: t('common:difficulty.hard'),
  }

  return (
    <article
      ref={cardRef}
      className={`flashcard-2025 ${isFlipped ? 'flipped' : ''} ${getSizeClass(size)} ${
        isRevealing ? 'revealing' : ''
      }`}
      role="button"
      tabIndex={0}
      aria-label={
        isFlipped
          ? `${t('common:flashcard.back')}: ${t(card.back, { ns: 'decks' })}`
          : `${t('common:flashcard.front')}: ${t(card.front, { ns: 'decks' })}`
      }
      aria-expanded={isFlipped}
      aria-live="polite"
      onClick={handleFlip}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flashcard-2025__inner">
        {/* Front Side */}
        <div className="flashcard-2025__front">
          <div className="flex flex-col h-full p-6">
            {/* Header with difficulty and category */}
            <header className="flex items-center justify-between mb-4">
              <div className={`difficulty-pill ${getDifficultyColor(card.difficulty)}`}>
                <div className="w-2 h-2 rounded-full bg-current opacity-70"></div>
                {difficultyLabels[card.difficulty]}
              </div>
              <div className="text-xs font-medium opacity-60 uppercase tracking-wider">
                {card.category}
              </div>
            </header>

            {/* Main content */}
            <main className="flex-1 flex items-center justify-center">
              <h3 className="text-lg font-medium text-center leading-relaxed">
                {t(card.front, { ns: 'decks' })}
              </h3>
            </main>

            {/* Footer with actions and meta */}
            <footer className="space-y-3">
              {!autoFlip && !isFlipped && (
                <div className="flex justify-center">
                  <button
                    className="btn-2025 btn-2025--ghost"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleReveal()
                    }}
                    aria-label={t('common:flashcard.reveal')}
                  >
                    <span className="text-base">👁️</span>
                    {t('common:flashcard.reveal')}
                  </button>
                </div>
              )}

              {/* Tags and stats */}
              <div className="flex items-center justify-between text-xs opacity-60">
                <div className="flex gap-2">
                  {card.tags.slice(0, 2).map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-white/50 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                
                {showStats && (
                  <div className="flex gap-3">
                    <span className="flex items-center gap-1">
                      ✅ {card.correctCount}
                    </span>
                    <span className="flex items-center gap-1">
                      ❌ {card.incorrectCount}
                    </span>
                    {card.timesReviewed > 0 && (
                      <span className="flex items-center gap-1">
                        👁️ {card.timesReviewed}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </footer>
          </div>
        </div>

        {/* Back Side */}
        <div className="flashcard-2025__back">
          <div className="flex flex-col h-full p-6 text-white">
            {/* Answer content */}
            <main className="flex-1 flex items-center justify-center">
              <div className="text-lg font-medium text-center leading-relaxed">
                {t(card.back, { ns: 'decks' })}
              </div>
            </main>
            
            {/* Action buttons */}
            {showActions && onAnswer && (
              <footer className="flex gap-3 justify-center mt-6">
                <button
                  className="btn-2025 btn-2025--ghost text-red-100 border-red-300/30 hover:bg-red-500/20"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleAnswer(false)
                  }}
                  aria-label={t('common:flashcard.markIncorrect')}
                >
                  <span>❌</span>
                  {t('common:flashcard.incorrect')}
                </button>
                <button
                  className="btn-2025 btn-2025--ghost text-green-100 border-green-300/30 hover:bg-green-500/20"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleAnswer(true)
                  }}
                  aria-label={t('common:flashcard.markCorrect')}
                >
                  <span>✅</span>
                  {t('common:flashcard.correct')}
                </button>
              </footer>
            )}
          </div>
        </div>
      </div>

      {/* Hover hint */}
      {isHovered && !isFlipped && (
        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 
                        px-3 py-1.5 bg-black/80 text-white text-xs rounded-lg
                        opacity-0 animate-in fade-in duration-200 pointer-events-none
                        backdrop-blur-sm">
          {t('common:flashcard.clickToReveal')}
        </div>
      )}

      {/* Revealing animation overlay */}
      {isRevealing && (
        <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-primary-600 
                        rounded-2xl flex items-center justify-center opacity-90">
          <div className="text-white text-lg font-medium animate-pulse">
            {t('common:flashcard.revealing')}...
          </div>
        </div>
      )}
    </article>
  )
})

export default FlashCard2025