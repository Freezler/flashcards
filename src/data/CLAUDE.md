# Test Data Context

## Overview

This directory contains sample data for development and testing purposes. All data uses the TypeScript interfaces defined in `../types/`.

## Current Data Files

### testDecks.ts

- **Purpose**: Provides realistic flashcard decks for development and testing
- **Content**: 4 comprehensive decks covering web development topics
- **Total Cards**: 20+ flashcards across different difficulty levels

#### Available Decks:

1. **React Fundamentals** (6 cards)
   - JSX, state vs props, event handling
   - useEffect, React.memo, keys
   - Difficulty: Easy to Hard

2. **TypeScript Basics** (5 cards)
   - TypeScript intro, interfaces vs types
   - Generics, never type, union types
   - Difficulty: Easy to Hard

3. **JavaScript ES6+** (5 cards)
   - Destructuring, spread operator, promises
   - async/await, closures
   - Difficulty: Easy to Hard

4. **Web Development Fundamentals** (4 cards)
   - HTTP vs HTTPS, status codes
   - CORS, DOM manipulation
   - Difficulty: Easy to Hard

## Exported Functions

### Core Data
- `testDecks`: Array of all sample decks
- `reactFundamentalsDeck`, `typescriptBasicsDeck`, etc.: Individual decks

### Statistics
- `getTestDeckStats()`: Returns dashboard statistics object
- `getCardsByDifficulty(difficulty)`: Filter cards by difficulty level
- `getCardsByCategory(category)`: Filter cards by category

## Usage Examples

```typescript
import { testDecks, getTestDeckStats, getCardsByDifficulty } from '../data'

// Get all decks
const allDecks = testDecks

// Get dashboard stats
const stats = getTestDeckStats()

// Get only hard cards
const hardCards = getCardsByDifficulty(DifficultyLevel.HARD)
```

## Data Quality

- All flashcards follow proper TypeScript interfaces
- Realistic content covering actual web development concepts
- Balanced difficulty distribution
- Proper categorization and tagging
- Timestamps and metadata included

## Future Enhancements

- [ ] Add more diverse topics (algorithms, databases, etc.)
- [ ] Include multimedia content (images, code snippets)
- [ ] Add spaced repetition scheduling data
- [ ] Include user interaction history
- [ ] Add deck sharing and community features