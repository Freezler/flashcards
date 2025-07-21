/**
 * Spaced Repetition Algorithm Implementation
 * Based on the SM-2 (SuperMemo 2) algorithm for optimal learning intervals
 */

import { FlashCard, DifficultyLevel } from '../types'

/**
 * Represents the result of a spaced repetition calculation
 */
export interface SpacedRepetitionResult {
  nextReviewDate: Date
  interval: number // days until next review
  easeFactor: number // difficulty multiplier (1.3 - 2.5)
  repetition: number // number of successful repetitions
}

/**
 * Grades for answer quality in spaced repetition
 */
export enum AnswerQuality {
  BLACKOUT = 0, // Complete blackout
  INCORRECT = 1, // Incorrect response; correct one remembered
  HARD = 2, // Correct response recalled with serious difficulty
  GOOD = 3, // Correct response after a hesitation
  EASY = 4, // Perfect response
  VERY_EASY = 5, // Perfect response; easier than expected
}

/**
 * Configuration for the spaced repetition algorithm
 */
interface SpacedRepetitionConfig {
  minEaseFactor: number
  maxEaseFactor: number
  easeFactorBonus: number
  easeFactorPenalty: number
  graduatingInterval: number
  lapseInterval: number
}

/**
 * Default configuration following SM-2 algorithm specifications
 */
const DEFAULT_CONFIG: SpacedRepetitionConfig = {
  minEaseFactor: 1.3,
  maxEaseFactor: 2.5,
  easeFactorBonus: 0.1,
  easeFactorPenalty: 0.2,
  graduatingInterval: 1,
  lapseInterval: 1,
}

/**
 * Calculate the initial ease factor based on card difficulty
 * @param difficulty - The difficulty level of the card
 * @returns Initial ease factor (1.3 - 2.5)
 */
export const getInitialEaseFactor = (difficulty: DifficultyLevel): number => {
  switch (difficulty) {
    case DifficultyLevel.EASY:
      return 2.5
    case DifficultyLevel.MEDIUM:
      return 2.0
    case DifficultyLevel.HARD:
      return 1.6
    default:
      return 2.0
  }
}

/**
 * Convert answer correctness to quality grade
 * @param isCorrect - Whether the answer was correct
 * @param responseTime - Time taken to respond in milliseconds
 * @param difficulty - Card difficulty level
 * @returns AnswerQuality grade
 */
export const getAnswerQuality = (
  isCorrect: boolean,
  responseTime: number,
  difficulty: DifficultyLevel
): AnswerQuality => {
  if (!isCorrect) {
    return AnswerQuality.INCORRECT
  }

  // Calculate expected response time based on difficulty
  const expectedTime =
    difficulty === DifficultyLevel.EASY
      ? 3000
      : difficulty === DifficultyLevel.MEDIUM
        ? 5000
        : 8000

  const ratio = responseTime / expectedTime

  if (ratio <= 0.5) return AnswerQuality.VERY_EASY
  if (ratio <= 0.8) return AnswerQuality.EASY
  if (ratio <= 1.2) return AnswerQuality.GOOD
  if (ratio <= 2.0) return AnswerQuality.HARD
  return AnswerQuality.HARD
}

/**
 * Core SM-2 spaced repetition calculation
 * @param card - The flashcard being studied
 * @param answerQuality - Quality of the answer (0-5)
 * @param config - Algorithm configuration
 * @returns SpacedRepetitionResult with next review scheduling
 */
export const calculateNextReview = (
  card: FlashCard,
  answerQuality: AnswerQuality,
  config: SpacedRepetitionConfig = DEFAULT_CONFIG
): SpacedRepetitionResult => {
  let easeFactor = card.lastReviewed
    ? getEaseFactorFromCard(card)
    : getInitialEaseFactor(card.difficulty)

  let interval = 0
  let repetition = card.timesReviewed

  // SM-2 Algorithm Implementation
  if (answerQuality >= AnswerQuality.GOOD) {
    // Correct answer
    if (repetition === 0) {
      interval = config.graduatingInterval
    } else if (repetition === 1) {
      interval = 6
    } else {
      interval = Math.round(interval * easeFactor)
    }
    repetition += 1
  } else {
    // Incorrect answer - reset repetition but keep some interval
    repetition = 0
    interval = config.lapseInterval
  }

  // Update ease factor based on answer quality
  easeFactor =
    easeFactor +
    (0.1 - (5 - answerQuality) * (0.08 + (5 - answerQuality) * 0.02))

  // Clamp ease factor within bounds
  easeFactor = Math.max(
    config.minEaseFactor,
    Math.min(config.maxEaseFactor, easeFactor)
  )

  // Calculate next review date
  const nextReviewDate = new Date()
  nextReviewDate.setDate(nextReviewDate.getDate() + interval)

  return {
    nextReviewDate,
    interval,
    easeFactor,
    repetition,
  }
}

/**
 * Extract ease factor from card data
 * @param card - The flashcard
 * @returns Current ease factor or initial value
 */
const getEaseFactorFromCard = (card: FlashCard): number => {
  // For now, derive from difficulty since we don't store ease factor yet
  // This will be updated when we add ease factor to the FlashCard interface
  return getInitialEaseFactor(card.difficulty)
}

/**
 * Check if a card is due for review
 * @param card - The flashcard to check
 * @returns True if the card should be reviewed now
 */
export const isCardDue = (card: FlashCard): boolean => {
  if (!card.nextReview) {
    return true // New cards are always due
  }

  return new Date() >= card.nextReview
}

/**
 * Get all cards that are due for review from a deck
 * @param cards - Array of flashcards
 * @returns Array of cards due for review
 */
export const getDueCards = (cards: FlashCard[]): FlashCard[] => {
  return cards.filter(isCardDue)
}

/**
 * Sort cards by review priority (overdue first, then by difficulty)
 * @param cards - Array of flashcards
 * @returns Sorted array with highest priority cards first
 */
export const sortCardsByPriority = (cards: FlashCard[]): FlashCard[] => {
  return [...cards].sort((a, b) => {
    const aDue = isCardDue(a)
    const bDue = isCardDue(b)

    // Due cards first
    if (aDue && !bDue) return -1
    if (!aDue && bDue) return 1

    // Among due cards, sort by how overdue they are
    if (aDue && bDue) {
      const aOverdue = a.nextReview ? Date.now() - a.nextReview.getTime() : 0
      const bOverdue = b.nextReview ? Date.now() - b.nextReview.getTime() : 0
      return bOverdue - aOverdue // Most overdue first
    }

    // Among future cards, sort by review date
    if (a.nextReview && b.nextReview) {
      return a.nextReview.getTime() - b.nextReview.getTime()
    }

    // Finally, sort by difficulty (hard cards first for better learning)
    const difficultyOrder = { hard: 0, medium: 1, easy: 2 }
    return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]
  })
}

/**
 * Calculate study session statistics
 * @param cards - Array of flashcards in the session
 * @returns Session statistics object
 */
export interface SessionStats {
  totalCards: number
  dueCards: number
  newCards: number
  overdueCards: number
  estimatedTimeMinutes: number
}

export const calculateSessionStats = (cards: FlashCard[]): SessionStats => {
  const dueCards = getDueCards(cards)
  const now = new Date()

  const newCards = cards.filter(card => card.timesReviewed === 0).length
  const overdueCards = cards.filter(
    card => card.nextReview && card.nextReview < now
  ).length

  // Estimate 30 seconds per card on average
  const estimatedTimeMinutes = Math.ceil(dueCards.length * 0.5)

  return {
    totalCards: cards.length,
    dueCards: dueCards.length,
    newCards,
    overdueCards,
    estimatedTimeMinutes,
  }
}

/**
 * Update a flashcard with spaced repetition data
 * @param card - The original flashcard
 * @param result - The spaced repetition calculation result
 * @returns Updated flashcard
 */
export const updateCardWithSpacedRepetition = (
  card: FlashCard,
  result: SpacedRepetitionResult,
  isCorrect: boolean
): FlashCard => {
  return {
    ...card,
    lastReviewed: new Date(),
    nextReview: result.nextReviewDate,
    timesReviewed: result.repetition,
    correctCount: isCorrect ? card.correctCount + 1 : card.correctCount,
    incorrectCount: isCorrect ? card.incorrectCount : card.incorrectCount + 1,
    updatedAt: new Date(),
  }
}
