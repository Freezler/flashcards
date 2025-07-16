# TypeScript Definitions

## Type Organization

- Shared types in `types/` directory
- Component-specific types in component files
- API types in `types/api.ts`
- Domain types in separate files

## Current Types

### Progress Types (progressTracker.ts)

```typescript
interface ProgressEntry {
  task: string
  date: Date
}
```

## Planned Type Definitions

### Flashcard Types

```typescript
interface FlashCard {
  id: string
  front: string
  back: string
  difficulty: 'easy' | 'medium' | 'hard'
  lastReviewed: Date
  nextReview: Date
  timesReviewed: number
  correctCount: number
  incorrectCount: number
}

interface Deck {
  id: string
  name: string
  description: string
  cards: FlashCard[]
  createdAt: Date
  updatedAt: Date
}
```

### Study Session Types

```typescript
interface StudySession {
  id: string
  deckId: string
  startTime: Date
  endTime: Date | null
  cardsReviewed: number
  correctAnswers: number
  incorrectAnswers: number
}

interface StudyResult {
  cardId: string
  isCorrect: boolean
  responseTime: number
  difficulty: 'easy' | 'medium' | 'hard'
}
```

### User Types

```typescript
interface User {
  id: string
  username: string
  email: string
  createdAt: Date
  preferences: UserPreferences
}

interface UserPreferences {
  dailyGoal: number
  reminderTime: string
  theme: 'light' | 'dark'
  studyMode: 'spaced' | 'random'
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
├── index.ts          # Re-export all types
├── flashcard.ts      # Flashcard and Deck types
├── user.ts           # User and preferences types
├── study.ts          # Study session types
├── api.ts            # API request/response types
└── common.ts         # Shared utility types
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
