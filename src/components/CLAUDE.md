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

## Future Components (Planned)

- [ ] FlashCard component
- [ ] Deck component
- [ ] StudySession component
- [ ] ProgressChart component
- [ ] UserProfile component
