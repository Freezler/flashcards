# TypeScript Definitions

## Type Organization

- Shared types in `types/` directory
- Component-specific types in component files
- API types in `types/api.ts`
- Domain types in separate files

## Current Types

### Progress Types (Legacy - progressTracker.ts)

```typescript
interface ProgressEntry {
  task: string
  date: Date
}
```

### Core Application Types (Implemented)

### Flashcard Types (`flashcard.ts`)

```typescript
enum DifficultyLevel {
  EASY = 'easy',
  MEDIUM = 'medium', 
  HARD = 'hard'
}

interface FlashCard {
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

interface Deck {
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
```

### Study Session Types (`flashcard.ts`)

```typescript
interface StudySession {
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

interface StudyResult {
  cardId: string
  isCorrect: boolean
  responseTime: number // in milliseconds
  difficulty: DifficultyLevel
  timestamp: Date
}
```

### User Types (`user.ts`)

```typescript
enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
  SYSTEM = 'system'
}

interface User {
  id: string
  username: string
  email: string
  createdAt: Date
  updatedAt: Date
  preferences: UserPreferences
  isActive: boolean
}

interface UserPreferences {
  dailyGoal: number
  reminderTime: string // HH:MM format
  theme: Theme
  studyMode: 'spaced' | 'random'
  autoAdvance: boolean
  showProgress: boolean
  soundEnabled: boolean
  notificationsEnabled: boolean
}
```

## Type Patterns

- Use interfaces for object shapes
- Use type aliases for unions and primitives
- Prefer `interface` over `type` for extensibility
- Use enums for fixed sets of values
- Generic types for reusable components

## File Structure

```
types/
├── index.ts          # Re-export all types (✅ Implemented)
├── flashcard.ts      # Flashcard and Deck types (✅ Implemented)
├── user.ts           # User and preferences types (✅ Implemented)
├── common.ts         # Shared utility types (✅ Implemented)
├── CLAUDE.md         # Type documentation
└── routes.ts         # Route definitions (existing)
```

## Naming Conventions

- PascalCase for interfaces and types
- Descriptive names that reflect purpose
- Suffix with purpose if needed: `CreateCardRequest`, `UpdateUserResponse`
- Use singular names for single entities

## Export Strategy

- Export all types from individual files
- Re-export from `types/index.ts` for easy imports
- Use named exports, not default exports
