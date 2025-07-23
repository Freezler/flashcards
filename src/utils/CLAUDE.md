# Utility Functions Context

## Current Utilities

### progressTracker.ts

- **Purpose**: Track user learning progress and milestones
- **Status**: TypeScript implementation complete
- **Interface**: `ProgressEntry` with `task: string` and `date: Date`
- **Functions**:
  - `addProgress(task: string): void` - Add new progress entry
  - `getProgress(): ProgressEntry[]` - Get all progress entries

## Utility Standards

- All utilities should be properly typed with TypeScript
- Use interfaces for complex data structures
- Export individual functions, not default exports
- Include proper error handling where needed
- Add JSDoc comments for complex functions

## File Organization

- One utility per file for better modularity
- Group related utilities in subdirectories if needed
- Use descriptive file names: `progressTracker.ts`, `dateUtils.ts`

## Common Utility Patterns

### Data Validation

```typescript
export const validateEmail = (email: string): boolean => {
  // validation logic
}
```

### Local Storage Helpers

```typescript
export const saveToStorage = <T>(key: string, data: T): void => {
  // storage logic
}
```

### Date/Time Utilities

```typescript
export const formatDate = (date: Date): string => {
  // formatting logic
}
```

### Array Manipulation

```typescript
export const shuffleArray = <T>(array: T[]): T[] => {
  // shuffle logic
}
```

### spacedRepetition.ts (✅ Completed)

- **Purpose**: Intelligent spaced repetition algorithm based on SM-2 (SuperMemo 2)
- **Status**: TypeScript implementation complete with comprehensive features
- **Core Algorithm**: SM-2 algorithm for optimal learning intervals and retention
- **Key Functions**:
  - `calculateNextReview()` - Core SM-2 calculation for review scheduling
  - `getAnswerQuality()` - Convert response time and correctness to quality grade
  - `isCardDue()` - Check if card needs review
  - `getDueCards()` - Get all cards due for review
  - `sortCardsByPriority()` - Intelligent card ordering (overdue → hard → easy)
  - `calculateSessionStats()` - Study session analytics and time estimation
  - `updateCardWithSpacedRepetition()` - Update card with algorithm results

**Features**:

- ✅ **SM-2 Algorithm**: Proven spaced repetition with ease factors (1.3-2.5)
- ✅ **Response Time Analysis**: Quality grading based on answer speed and difficulty
- ✅ **Intelligent Scheduling**: Cards scheduled optimally for memory retention
- ✅ **Priority Sorting**: Overdue cards first, then by difficulty for efficient learning
- ✅ **Session Analytics**: Comprehensive stats and time estimation
- ✅ **Difficulty Integration**: Initial ease factors based on card difficulty level

**Interfaces**:

```typescript
interface SpacedRepetitionResult {
  nextReviewDate: Date
  interval: number        // days until next review
  easeFactor: number     // difficulty multiplier (1.3-2.5)
  repetition: number     // successful repetitions count
}

enum AnswerQuality {
  BLACKOUT = 0      // Complete blackout
  INCORRECT = 1     // Incorrect response
  HARD = 2         // Correct but difficult
  GOOD = 3         // Correct with hesitation
  EASY = 4         // Perfect response
  VERY_EASY = 5    // Easier than expected
}
```

## Future Utilities (Planned)

- [ ] `cardShuffle.ts` - Card shuffling and randomization
- [ ] `studyMetrics.ts` - Advanced study analytics and insights
- [ ] `dataExport.ts` - Export progress data
- [ ] `localStorage.ts` - Local storage management
- [ ] `dateUtils.ts` - Date formatting and manipulation

## Testing Approach

- Unit tests for all utility functions
- Test edge cases and error conditions
- Mock external dependencies (localStorage, Date)
- Use descriptive test names
