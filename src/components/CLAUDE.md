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

## Future Components (Planned)

- [ ] Deck component
- [ ] StudySession component
- [ ] ProgressChart component
- [ ] UserProfile component
