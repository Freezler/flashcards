# Utility Functions Context

## Current Utilities

### security.ts (✅ Completed)

- **Purpose**: Comprehensive input sanitization and validation for XSS protection
- **Status**: TypeScript implementation complete with robust security features
- **Core Functions**:
  - `sanitizeFlashcardContent(input: string): string` - Clean user input for flashcards
  - `sanitizeCategory(input: string): string` - Sanitize category names
  - `sanitizeTags(tags: string[]): string[]` - Clean tag arrays
  - `validateUserInput(input: string): boolean` - Comprehensive input validation
  - `formSubmissionLimiter` - Rate limiting object for form protection

**Features**:
- ✅ **XSS Protection**: HTML entity encoding and script tag removal
- ✅ **Rate Limiting**: Form submission protection (5 requests per minute)
- ✅ **Input Validation**: Blocks suspicious patterns and malicious content
- ✅ **Character Limits**: Enforces reasonable content length limits
- ✅ **Tag Sanitization**: Safe processing of user-defined tags

### secureStorage.ts (✅ Completed)

- **Purpose**: Secure localStorage wrapper with encryption and validation
- **Status**: TypeScript implementation complete with comprehensive security
- **Core Functions**:
  - `setItem<T>(key: string, value: T): void` - Secure storage with validation
  - `getItem(key: string): string | null` - Safe retrieval with error handling
  - `getJSON<T>(key: string): T | null` - Type-safe JSON parsing
  - `removeItem(key: string): void` - Secure item removal
  - `clear(): void` - Complete storage cleanup
  - `isSecureContext(): boolean` - Security context validation

**Features**:
- ✅ **Data Validation**: Input sanitization before storage
- ✅ **Error Handling**: Graceful failure with fallbacks
- ✅ **Type Safety**: Generic support for type-safe operations
- ✅ **Security Context**: HTTPS validation for sensitive operations
- ✅ **Storage Limits**: Prevents excessive data storage

### csrf.ts (✅ Completed)

- **Purpose**: CSRF (Cross-Site Request Forgery) protection for forms
- **Status**: TypeScript implementation complete with token management
- **Core Functions**:
  - `useCSRF()` - React hook for CSRF protection
  - `getToken(): string` - Generate secure CSRF tokens
  - `validateToken(token: string): boolean` - Validate form tokens
  - `generateSecureToken(): string` - Cryptographically secure token generation

**Features**:
- ✅ **Token Generation**: Cryptographically secure random tokens
- ✅ **Session Management**: Automatic token rotation and cleanup
- ✅ **React Integration**: Custom hook for easy component integration  
- ✅ **Validation**: Server-side style token validation
- ✅ **Performance**: Efficient token storage and retrieval

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
- [ ] `dateUtils.ts` - Date formatting and manipulation
- [ ] `performance.ts` - Performance monitoring and optimization
- [ ] `analytics.ts` - User behavior tracking (privacy-focused)
- [ ] `backup.ts` - Data backup and restore functionality

## Testing Approach

- Unit tests for all utility functions
- Test edge cases and error conditions
- Mock external dependencies (localStorage, Date)
- Use descriptive test names
