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

## Future Utilities (Planned)

- [ ] `spacedRepetition.ts` - Spaced repetition algorithm
- [ ] `cardShuffle.ts` - Card shuffling and randomization
- [ ] `studyMetrics.ts` - Study session analytics
- [ ] `dataExport.ts` - Export progress data
- [ ] `localStorage.ts` - Local storage management
- [ ] `dateUtils.ts` - Date formatting and manipulation

## Testing Approach

- Unit tests for all utility functions
- Test edge cases and error conditions
- Mock external dependencies (localStorage, Date)
- Use descriptive test names
