# Component Patterns & Architecture

## Performance Optimizations

### React.memo Usage
All major components are wrapped with React.memo for performance:
- `CardItem` - Memoized with custom comparison for card updates
- `CardList` - Memoized with useCallback handlers
- `DecksPage` - Memoized to prevent unnecessary re-renders
- `EmptyState` - Fully memoized reusable component
- `LoadingBoundary` - Memoized loading/error boundary

### useCallback & useMemo Patterns
```typescript
// Always memoize event handlers in list components
const handleEdit = useCallback((card: FlashCard): void => {
  setEditingCard(card)
  setShowForm(true)
}, [])

// Memoize expensive calculations
const contextValue = useMemo((): CardContextType => ({
  state,
  addCard,
  updateCard,
  // ... other actions
}), [state, addCard, updateCard, ...])
```

## Common Components Architecture

### `/components/common/` - Reusable UI Components

**EmptyState** - Standardized empty states
```typescript
interface EmptyStateProps {
  icon: string
  title: string
  description: string
  action?: {
    text: string
    onClick: () => void
    variant?: 'primary' | 'secondary'
  }
}
```

**LoadingBoundary** - Universal loading/error handling
```typescript
interface LoadingBoundaryProps {
  loading: boolean
  error: string | null
  fallback?: React.ReactNode
  errorFallback?: (error: string) => React.ReactNode
  children: React.ReactNode
}
```

### `/hooks/` - Custom Hooks

**useFormValidation** - Reusable form validation logic
```typescript
const { formData, errors, updateField, validateAll } = useFormValidation(
  initialData,
  validationRules
)
```

# Component Patterns

## Component Standards

- Use functional components with TypeScript
- Proper return type annotations: `React.JSX.Element`
- Props interfaces defined above component
- Default export for main component

## Component Structure Template

```typescript
interface ComponentNameProps {
  // Define props here
}

function ComponentName({ prop1, prop2 }: ComponentNameProps): React.JSX.Element {
  // Component logic
  return (
    <div>
      {/* JSX content */}
    </div>
  )
}

export default ComponentName
```

## Props Patterns

- Use interfaces for all props
- Optional props with `?` operator
- Default values using destructuring
- Children prop: `children: React.ReactNode`

## Styling Patterns

- Primary: Tailwind CSS utility classes
- Semantic class names for complex layouts
- CSS modules for component-specific styles
- Avoid inline styles unless dynamic

## Responsiveness Patterns

- Mobile-first approach for all components
- Responsive breakpoints:
  - `@media (max-width: 640px)` - Mobile
  - `@media (min-width: 768px)` - Tablet
  - `@media (min-width: 1024px)` - Desktop
- Fluid typography and spacing using CSS clamp()
- Responsive grid layouts with CSS Grid
- Flexbox for flexible component layouts

## Variables & Theming

- CSS Custom Properties for dynamic theming
- OKLCH color space for perceptual uniformity
- Semantic variable naming:
  - `--surface-1`, `--surface-2`, etc. for backgrounds
  - `--text-1`, `--text-2` for typography
  - `--brand-*` for primary colors
  - `--border-*` for borders
- Fluid spacing variables using clamp()
- Theme variables defined in :root

## Animation Patterns

- Prefers-reduced-motion support
- CSS transitions for micro-interactions
- Keyframe animations for complex effects
- Animation timing functions:
  - `cubic-bezier(0.4, 0, 0.2, 1)` - Standard easing
  - `cubic-bezier(0.68, -0.55, 0.265, 1.55)` - Bouncy effects
- Performance considerations:
  - Prefer transform/opacity for smooth animations
  - Avoid animating layout properties
  - Use will-change for complex animations

## Component Categories

### Layout Components

- Header/Navigation
- Main content areas
- Grid layouts
- Responsive containers

### UI Components

- Buttons with variants
- Form inputs
- Cards and containers
- Modal/overlay components

### Feature Components

- Flashcard components
- Progress indicators
- Analytics dashboards
- User management

## Event Handling

- Use proper TypeScript event types
- Example: `onClick: (event: React.MouseEvent<HTMLButtonElement>) => void`
- Prefer arrow functions for inline handlers
- Extract complex handlers to separate functions

## State Management

- Use React hooks for local state
- Context for shared state
- Proper TypeScript typing for state

## Implemented Components

### FlashCard Component (✅ Completed)

**Location**: `src/components/FlashCard.tsx`

**Features**:

- ✅ **3D Flip Animation** - Magical card flip with Jhey Tompkins-inspired effects

- ✅ **Difficulty-based Styling** - Dynamic colors based on card difficulty (easy/medium/hard)
- ✅ **Size Variants** - Small, medium, and large sizes
- ✅ **Interactive Elements** - Click to flip, reveal button, answer actions
- ✅ **Sparkle Effects** - Animated sparkles on hover
- ✅ **Magical Glow** - Rotating conic gradient glow effect
- ✅ **Accessibility** - Keyboard navigation, ARIA labels, reduced motion support
- ✅ **Mobile Responsive** - Optimized for mobile devices

**Props Interface**:

```typescript
interface FlashCardProps {
  card: FlashCardType          // The flashcard data
  onAnswer?: (cardId: string, isCorrect: boolean) => void
  showActions?: boolean        // Show correct/incorrect buttons
  autoFlip?: boolean          // Disable manual flipping
  size?: 'small' | 'medium' | 'large'
}
```

**Styling Approach**:

- CSS custom properties for theming
- BEM methodology for class naming
- Multi-layer box shadows for depth
- OKLCH colors for difficulty variants
- CSS transforms for 3D effects

### StudySession Component (✅ Completed)

**Location**: `src/components/StudySession.tsx`

**Features**:

- ✅ **Intelligent Card Scheduling** - Uses SM-2 spaced repetition algorithm
- ✅ **Response Time Tracking** - Analyzes answer speed for quality grading
- ✅ **Progress Visualization** - Animated progress bar with shine effect
- ✅ **Session Analytics** - Real-time stats and comprehensive results
- ✅ **Multiple Study Modes** - Spaced repetition and random modes
- ✅ **Session Management** - Time limits, card limits, early completion
- ✅ **Results Screen** - Beautiful completion screen with detailed analytics
- ✅ **Mobile Responsive** - Optimized for all screen sizes

**Props Interface**:

```typescript
interface StudySessionProps {
  deck: Deck                    // The deck to study
  studyMode?: StudyMode        // SPACED or RANDOM
  onSessionComplete?: (results: StudySessionResults) => void
  onCardUpdate?: (card: FlashCardType) => void
  maxCards?: number            // Max cards per session (default: 20)
  timeLimit?: number           // Time limit in minutes (default: 30)
}

interface StudySessionResults {
  cardsStudied: number
  correctAnswers: number
  incorrectAnswers: number
  sessionDuration: number      // in seconds
  averageResponseTime: number
  cardsGraduated: number      // cards that improved
  perfectCards: number        // cards answered very easily
}
```

**Key Features**:

- **SM-2 Integration**: Automatically schedules cards based on performance
- **Quality Grading**: Converts response time + correctness → learning quality
- **Intelligent Ordering**: Prioritizes overdue cards, then by difficulty
- **Session Analytics**: Tracks everything for learning insights
- **Beautiful Results**: Celebration screen with comprehensive stats
- **Performance Optimized**: Efficient state management and updates

## Future Components (Planned)

- [ ] Deck component
- [ ] ProgressChart component
- [ ] UserProfile component
