/**
 * Flashcard and Deck Type Definitions
 * Core types for the flashcard application
 */

// Enums
export enum DifficultyLevel {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard'
}

export enum StudyMode {
  SPACED = 'spaced',
  RANDOM = 'random'
}

// Core Flashcard Interface
export interface FlashCard {
  id: string
  front: string
  back: string
  difficulty: DifficultyLevel
  category: string
  tags: string[]
  lastReviewed: Date | null
  nextReview: Date | null
  timesReviewed: number
  correctCount: number
  incorrectCount: number
  createdAt: Date
  updatedAt: Date
}

// Deck Interface
export interface Deck {
  id: string
  name: string
  description: string
  cards: FlashCard[]
  createdAt: Date
  updatedAt: Date
  isActive: boolean
  totalCards: number
  reviewedCards: number
}

// Study Session Types
export interface StudySession {
  id: string
  deckId: string
  startTime: Date
  endTime: Date | null
  cardsReviewed: number
  correctAnswers: number
  incorrectAnswers: number
  sessionDuration: number // in seconds
  studyMode: StudyMode
}

export interface StudyResult {
  cardId: string
  isCorrect: boolean
  responseTime: number // in milliseconds
  difficulty: DifficultyLevel
  timestamp: Date
}

// Create/Update DTOs
export interface CreateFlashCardDto {
  front: string
  back: string
  difficulty: DifficultyLevel
  category: string
  tags: string[]
}

export interface UpdateFlashCardDto {
  front?: string
  back?: string
  difficulty?: DifficultyLevel
  category?: string
  tags?: string[]
}

export interface CreateDeckDto {
  name: string
  description: string
  cards?: CreateFlashCardDto[]
}

export interface UpdateDeckDto {
  name?: string
  description?: string
  isActive?: boolean
}

// Progress and Analytics
export interface DeckProgress {
  deckId: string
  totalCards: number
  masteredCards: number
  reviewCards: number
  newCards: number
  averageScore: number
  streakDays: number
  lastStudied: Date | null
}

export interface StudyStats {
  totalDecks: number
  totalCards: number
  studyStreak: number
  cardsToReview: number
  weeklyProgress: number
  monthlyProgress: number
}