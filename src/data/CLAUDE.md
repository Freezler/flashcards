# Web Development Test Data Context

## Overview

This directory contains web development example data for development and testing. All data uses TypeScript interfaces defined in `../types/`.

## Current Data Files

### testDecks.ts

- **Purpose**: Provides realistic web development flashcard decks for development and testing
- **Content**: 4 comprehensive decks covering web development topics
- **Total Cards**: 40+ flashcards distributed across different difficulty levels

#### Available Decks:

1. **Frontend Development** (12 cards)
   - React, JavaScript, CSS, TypeScript fundamentals
   - Virtual DOM, hooks, event handling, closures
   - Difficulty: Easy to Hard

2. **Backend Development** (10 cards)
   - REST APIs, databases (SQL/NoSQL), Node.js
   - Authentication, JWT, middleware, CORS
   - Difficulty: Easy to Hard

3. **Web Development Fundamentals** (10 cards)
   - Git, HTTP methods, HTTPS, responsive design
   - Web storage, CDN, semantic HTML, PWA, accessibility
   - Difficulty: Easy to Medium

4. **DevOps & Tools** (8 cards)
   - Docker, CI/CD, webpack, npm, Kubernetes
   - Environment variables, load balancing
   - Difficulty: Easy to Hard

## Exported Functions

### Core Data

- `testDecks`: Array of all example decks
- `frontendDevelopmentDeck`, `backendDevelopmentDeck`, etc.: Individual decks

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
- Realistic web development educational content
- Balanced difficulty distribution across Easy/Medium/Hard
- Proper categorization and tagging (Frontend, Backend, General, DevOps)
- Timestamps and metadata included
- Interview-style questions for practical learning

## Content Categories

- **Frontend**: React, JavaScript, CSS, TypeScript, DOM manipulation
- **Backend**: REST APIs, Node.js, databases, authentication, server concepts
- **General**: Git, HTTP, web standards, accessibility, performance
- **DevOps**: Docker, CI/CD, build tools, deployment, infrastructure

## Future Improvements

- [ ] Add more specialized topics (databases, security, testing)
- [ ] Include multimedia content (code examples, diagrams)
- [ ] Add spaced repetition scheduling data
- [ ] Include user interaction history
- [ ] Add community deck sharing features
- [ ] Implement difficulty-based question algorithms
