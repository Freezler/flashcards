import React, { useState, useEffect, useCallback, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { FlashCard as FlashCardType, DifficultyLevel } from '../types'

interface FlashCardEliteProps {
  card: FlashCardType
  onAnswer?: (cardId: string, isCorrect: boolean, responseTime?: number) => void
  showActions?: boolean
  autoFlip?: boolean
  size?: 'small' | 'medium' | 'large'
  enableSound?: boolean
  showStats?: boolean
  enableAdvancedAnimations?: boolean
}

const FlashCardElite = React.memo(function FlashCardElite({
  card,
  onAnswer,
  showActions = true,
  autoFlip = false,
  size = 'medium',
  enableSound = false,
  showStats = false,
  enableAdvancedAnimations = true,
}: FlashCardEliteProps): React.JSX.Element {
  const { t } = useTranslation(['common', 'decks'])
  const [isFlipped, setIsFlipped] = useState(false)
  const [isRevealing, setIsRevealing] = useState(false)
  const [flipStartTime, setFlipStartTime] = useState<number | null>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const cardRef = useRef<HTMLDivElement>(null)

  // Advanced mouse tracking for magnetic effect
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current || !enableAdvancedAnimations) return
    
    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const mouseX = e.clientX - centerX
    const mouseY = e.clientY - centerY
    
    setMousePosition({ x: mouseX, y: mouseY })
    
    // Set CSS custom properties for magnetic effect
    cardRef.current.style.setProperty('--mouse-x', mouseX.toString())
    cardRef.current.style.setProperty('--mouse-y', mouseY.toString())
  }, [enableAdvancedAnimations])

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false)
    setMousePosition({ x: 0, y: 0 })
    
    if (cardRef.current) {
      cardRef.current.style.setProperty('--mouse-x', '0')
      cardRef.current.style.setProperty('--mouse-y', '0')
    }
  }, [])

  // Reset flip state when card changes
  useEffect(() => {
    setIsFlipped(false)
    setIsRevealing(false)
    setFlipStartTime(null)
  }, [card.id])

  // Set CSS custom properties for card ID (for view transitions)
  useEffect(() => {
    if (cardRef.current) {
      cardRef.current.style.setProperty('--card-id', card.id)
    }
  }, [card.id])

  const handleFlip = useCallback((): void => {
    if (autoFlip) return

    // Track flip start time for response tracking
    if (!isFlipped && !flipStartTime) {
      setFlipStartTime(Date.now())
    }

    setIsFlipped(!isFlipped)

    // Enhanced haptic feedback
    if (navigator.vibrate && !isFlipped) {
      navigator.vibrate([50, 50, 100])
    }

    // Play sound if enabled
    if (enableSound) {
      const audio = new Audio()
      audio.volume = 0.1
      // You could add actual audio files here
      audio.play().catch(() => {}) // Ignore autoplay errors
    }
  }, [isFlipped, flipStartTime, autoFlip, enableSound])

  const handleKeyDown = useCallback((e: React.KeyboardEvent): void => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleFlip()
    }
  }, [handleFlip])

  const handleReveal = useCallback((): void => {
    setIsRevealing(true)
    setFlipStartTime(Date.now())
    
    // Smooth reveal animation
    setTimeout(() => {
      setIsFlipped(true)
      setIsRevealing(false)
    }, 300)
  }, [])

  const handleAnswer = useCallback((isCorrect: boolean): void => {
    if (!onAnswer) return

    const responseTime = flipStartTime ? Date.now() - flipStartTime : undefined
    onAnswer(card.id, isCorrect, responseTime)

    // Enhanced feedback for correct/incorrect answers
    if (navigator.vibrate) {
      if (isCorrect) {
        navigator.vibrate([100, 50, 100, 50, 200]) // Success pattern
      } else {
        navigator.vibrate([200, 100, 200]) // Error pattern
      }
    }

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

  const cardClasses = [
    'flashcard-container', // Container query wrapper
    enableAdvancedAnimations && 'card-reveal', // Scroll-driven animation
    enableAdvancedAnimations && 'magnetic-element', // Magnetic interaction
    'gpu-optimized', // Performance optimization
  ].filter(Boolean).join(' ')

  return (
    <div className={cardClasses}>
      <article
        ref={cardRef}
        className={`
          flashcard-enhanced
          ${isFlipped ? 'flipped' : ''} 
          ${getSizeClass(size)} 
          ${isRevealing ? 'revealing' : ''}
          ${enableAdvancedAnimations ? 'card-flip-transition' : ''}
        `.trim()}
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
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          '--card-id': card.id,
          '--anchor-name': `--card-${card.id}`,
        } as React.CSSProperties}
      >
        <div className="flashcard-2025__inner">
          {/* Front Side */}
          <div className="flashcard-2025__front">
            <div className="card-content">
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

              {/* Main content with enhanced typography */}
              <main className="flex-1 flex items-center justify-center">
                <h3 className="gradient-text text-lg font-medium text-center leading-relaxed">
                  {t(card.front, { ns: 'decks' })}
                </h3>
              </main>

              {/* Footer with actions and meta */}
              <footer className="space-y-3">
                {!autoFlip && !isFlipped && (
                  <div className="flex justify-center">
                    <button
                      className="btn-2025 btn-2025--ghost morphing-button"
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

                {/* Enhanced tags and stats */}
                <div className="flex items-center justify-between text-xs opacity-60">
                  <div className="flex gap-2">
                    {card.tags.slice(0, 2).map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 glass-blur rounded-full animate-in"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  
                  {showStats && (
                    <div className="flex gap-3">
                      <span className="flex items-center gap-1 animate-in" style={{ animationDelay: '200ms' }}>
                        ✅ {card.correctCount}
                      </span>
                      <span className="flex items-center gap-1 animate-in" style={{ animationDelay: '300ms' }}>
                        ❌ {card.incorrectCount}
                      </span>
                      {card.timesReviewed > 0 && (
                        <span className="flex items-center gap-1 animate-in" style={{ animationDelay: '400ms' }}>
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
            <div className="card-content text-white">
              {/* Answer content */}
              <main className="flex-1 flex items-center justify-center">
                <div className="text-lg font-medium text-center leading-relaxed animate-in">
                  {t(card.back, { ns: 'decks' })}
                </div>
              </main>
              
              {/* Enhanced action buttons */}
              {showActions && onAnswer && (
                <footer className="flex gap-3 justify-center mt-6">
                  <button
                    className="btn-2025 btn-2025--ghost text-red-100 border-red-300/30 hover:bg-red-500/20 morphing-button animate-in"
                    style={{ animationDelay: '100ms' }}
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
                    className="btn-2025 btn-2025--ghost text-green-100 border-green-300/30 hover:bg-green-500/20 morphing-button animate-in"
                    style={{ animationDelay: '200ms' }}
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

        {/* Enhanced hover hint with anchor positioning */}
        {isHovered && !isFlipped && enableAdvancedAnimations && (
          <div 
            className="tooltip"
            style={{ '--anchor-name': `--card-${card.id}` } as React.CSSProperties}
          >
            <div className="px-3 py-1.5 glass-blur bg-black/80 text-white text-xs rounded-lg animate-in">
              {t('common:flashcard.clickToReveal')}
            </div>
          </div>
        )}

        {/* Revealing animation overlay */}
        {isRevealing && (
          <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-primary-600 
                          rounded-2xl flex items-center justify-center opacity-90 animate-in">
            <div className="text-white text-lg font-medium gradient-text">
              {t('common:flashcard.revealing')}...
            </div>
          </div>
        )}

        {/* Progress indicator for study sessions */}
        {showStats && card.timesReviewed > 0 && (
          <div className="scroll-progress absolute top-0 left-0 right-0 h-1 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary-500 to-primary-700 transition-all duration-500"
              style={{ 
                width: `${Math.min((card.correctCount / card.timesReviewed) * 100, 100)}%` 
              }}
            />
          </div>
        )}
      </article>
    </div>
  )
})

export default FlashCardElite