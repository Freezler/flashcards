/**
 * User and Preferences Type Definitions
 * User-related types for the flashcard application
 */

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
  SYSTEM = 'system',
}

export interface UserPreferences {
  dailyGoal: number
  reminderTime: string // HH:MM format
  theme: Theme
  studyMode: 'spaced' | 'random'
  autoAdvance: boolean
  showProgress: boolean
  soundEnabled: boolean
  notificationsEnabled: boolean
}

export interface User {
  id: string
  username: string
  email: string
  createdAt: Date
  updatedAt: Date
  preferences: UserPreferences
  isActive: boolean
}

export interface UserStats {
  totalStudyTime: number // in minutes
  totalCardsStudied: number
  averageAccuracy: number
  longestStreak: number
  currentStreak: number
  favoriteCategories: string[]
  weeklyGoalProgress: number
}

// Authentication related types
export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterCredentials {
  username: string
  email: string
  password: string
  confirmPassword: string
}

export interface AuthResponse {
  user: User
  token: string
  refreshToken: string
}

// Settings update DTOs
export interface UpdateUserDto {
  username?: string
  email?: string
}

export interface UpdatePreferencesDto {
  dailyGoal?: number
  reminderTime?: string
  theme?: Theme
  studyMode?: 'spaced' | 'random'
  autoAdvance?: boolean
  showProgress?: boolean
  soundEnabled?: boolean
  notificationsEnabled?: boolean
}
