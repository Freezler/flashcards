# 🚀 Junior Developer Onboarding Guide

Welcome to the Nederlandse Flashcards App! This guide will help you get up to speed quickly and contribute effectively to the project.

## 📋 Prerequisites

### Required Knowledge

- **React 19** - Functional components, hooks, context, concurrent features
- **TypeScript** - Basic types, interfaces, generics
- **CSS** - Flexbox, Grid, CSS variables
- **Git** - Basic commands, branching, pull requests

### Recommended Experience

- **React Router** - Client-side routing
- **Vite** - Modern build tool
- **Testing** - Unit testing with Vitest/Jest
- **ESLint/Prettier** - Code formatting and linting

## 🛠️ Development Environment Setup

### 1. System Requirements

```bash
# Check your versions
node --version  # Should be 18.0.0 or higher
npm --version   # Should be 8.0.0 or higher
git --version   # Any recent version
```

### 2. Clone and Install

```bash
# Clone the repository
git clone git@github.com:Freezler/flashcards.git
cd flash-cards

# Install dependencies
npm install

# Start development server
npm run dev
```

### 3. Verify Setup

- Open <http://localhost:5173>
- You should see the flashcards app
- Try logging in (any email/password works)
- Navigate through different sections

## 📚 Project Architecture

### File Structure Overview

```text
src/
├── components/          # React components
│   ├── common/         # Reusable UI components
│   │   ├── EmptyState.tsx
│   │   ├── LoadingBoundary.tsx
│   │   └── index.ts
│   ├── __tests__/      # Component tests
│   ├── CardForm.tsx    # Card creation/editing form
│   ├── CardList.tsx    # Card display component
│   ├── Dashboard.tsx   # Main dashboard
│   ├── FlashCard.tsx   # Core flashcard component
│   ├── Navigation.tsx  # App navigation
│   ├── ScrollToTop.tsx # Route scroll handler
│   ├── StudySession.tsx # Study interface
│   └── ThemeToggle.tsx # Dark/light mode toggle
├── contexts/           # State management
│   ├── __tests__/      # Context tests
│   ├── AuthContext.tsx # User authentication
│   └── CardContext.tsx # Flashcard data
├── pages/             # Route-based pages
│   ├── DeckPage.tsx   # Individual deck view
│   ├── DecksPage.tsx  # All decks overview
│   ├── LandingPage.tsx # Landing page
│   ├── LoginPage.tsx  # Login page
│   ├── NewDeckPage.tsx # Deck creation
│   ├── StudyPage.tsx  # Study interface
│   └── index.ts       # Page exports
├── hooks/             # Custom React hooks
├── types/             # TypeScript definitions
├── data/              # Static data (Nederlandse content)
├── utils/             # Helper functions
└── test/              # Test utilities
```

### Key Components to Understand

#### 1. CardContext.tsx

**Purpose**: Global state management for flashcards

```typescript
// Main state structure
interface CardState {
  decks: Deck[]
  loading: boolean
  error: string | null
}

// Key functions you'll use
const {
  state,
  addCard,
  updateCard,
  deleteCard,
  addDeck,
  updateDeck,
  deleteDeck,
  getDeck,
  getCard,
} = useCards()
```

#### 2. FlashCard.tsx

**Purpose**: Interactive flashcard with 3D animations

```typescript
// Usage example
<FlashCard
  card={cardData}
  onAnswer={(cardId, isCorrect) => handleAnswer(cardId, isCorrect)}
  showActions={true}
/>
```

#### 3. StudySession.tsx

**Purpose**: Study interface with spaced repetition

- Uses SM-2 algorithm for optimal learning
- Tracks response time and accuracy
- Provides detailed session analytics

## 🎯 Common Tasks for Junior Developers

### Task 1: Add a New Field to Flashcards

1. **Update Types** (`src/types/flashcard.ts`)
2. **Update Components** that display cards
3. **Update Forms** that create/edit cards
4. **Update Tests** for the new functionality

```typescript
interface FlashCard {
  id: string
  front: string
  back: string
  difficulty: DifficultyLevel
  category: string
  tags: string[] // ← Required field, not optional
  lastReviewed: Date | null
  nextReview: Date | null
  timesReviewed: number
  correctCount: number
  incorrectCount: number
  createdAt: Date
  updatedAt: Date
}
```

### Task 2: Create a New Page

1. **Create Page Component** (`src/pages/NewPage.tsx`)
2. **Add to Router** (`src/App.tsx`)

```typescript
function NewPage(): React.JSX.Element {
  return (
    <div className="dashboard-container">
      <h1>My New Page</h1>
      {/* Your content here */}
    </div>
  )
}

export default NewPage
```

```typescript
// Add lazy import
const NewPage = lazy(() => import('./pages/NewPage'))

// Add route
<Route path="/new-page" element={<NewPage />} />
```

**Add Navigation** (`src/components/Navigation.tsx`)

### Task 3: Style a Component

```css
/* Use CSS variables for consistency */
.my-component {
  background: var(--surface-1);
  color: var(--text-1);
  border: 1px solid var(--border-1);
  border-radius: var(--radius-2);
  padding: var(--space-s);
}

/* Responsive design */
@media (max-width: 768px) {
  .my-component {
    padding: var(--space-xs);
  }
}
```

## 🔧 Development Workflow

### 1. Before You Start

```bash
# Always pull latest changes
git checkout main
git pull origin main

# Create a feature branch
git checkout -b feature/your-feature-name
```

### 2. During Development

```bash
# Run the app
npm run dev

# Run tests (in another terminal)
npm run test

# Check linting
npm run lint

# Format code
npm run format
```

### 3. Code Standards

#### TypeScript

```typescript
// ✅ Good - Explicit return types
function processCard(card: FlashCard): ProcessedCard {
  return { ...card, processed: true }
}

// ✅ Good - Proper interface usage
interface ComponentProps {
  title: string
  onSubmit: (data: FormData) => void
}

// ❌ Avoid - Using 'any'
function badFunction(data: any): any {
  return data.whatever
}
```

#### React Components

```typescript
// ✅ Good - Functional component with TypeScript
interface MyComponentProps {
  title: string
  items: string[]
}

function MyComponent({ title, items }: MyComponentProps): React.JSX.Element {
  return (
    <div>
      <h2>{title}</h2>
      <ul>
        {items.map(item => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  )
}

// ✅ Good - Export with React.memo for performance
export default React.memo(MyComponent)
```

#### CSS Classes

```css
/* ✅ Good - Use existing design tokens */
.card-container {
  background: var(--surface-1);
  padding: var(--space-m);
  border-radius: var(--radius-2);
}

/* ❌ Avoid - Magic numbers */
.bad-container {
  padding: 23px;
  margin: 17px;
}
```

### 4. Testing Your Changes

```bash
# Unit tests
npm run test

# Type checking
npx tsc --noEmit

# Build for production (check for errors)
npm run build

# Test the production build
npm run preview
```

### 5. Committing Changes

```bash
# Stage your changes
git add .

# Commit with conventional format
git commit -m "feat: add new flashcard field for tags"
# Other prefixes: fix:, docs:, style:, refactor:, test:

# Push your branch
git push origin feature/your-feature-name
```

## 🐛 Common Issues & Solutions

### Issue 1: "Module not found"

```error
Error: Cannot resolve module './MyComponent'
```

**Solution**: Check file paths and exports

```typescript
// Make sure you export default
export default MyComponent

// And import correctly
import MyComponent from './MyComponent'
```

### Issue 2: TypeScript errors

```error
Property 'x' does not exist on type 'Y'
```

**Solution**: Check your types and interfaces

```typescript
// Define proper interfaces
interface Props {
  x: string // Add missing property
}
```

### Issue 3: Styling not applied

**Solution**: Check CSS class names and CSS variable usage

```css
/* Use existing variables */
color: var(--text-1); /* ✅ Good */
color: #333333; /* ❌ Avoid */
```

### Issue 4: Component not re-rendering

**Solution**: Check React.memo dependencies and state updates

```typescript
// Use useCallback for event handlers
const handleClick = useCallback(() => {
  // Your logic
}, [dependency])

// Use useMemo for expensive calculations
const expensiveValue = useMemo(() => {
  return calculateSomething(data)
}, [data])
```

## 📖 Learning Resources

### React 19 & TypeScript

- [React 19 Documentation](https://react.dev) - Latest features including concurrent rendering
- [React 19 Migration Guide](https://react.dev/blog/2024/04/25/react-19) - What's new in React 19
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React 19 TypeScript Patterns](https://react-typescript-cheatsheet.netlify.app/)

### Testing

- [Vitest Documentation](https://vitest.dev)
- [Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

### CSS & Styling

- [CSS Variables Guide](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
- [Flexbox Guide](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- [CSS Grid Guide](https://css-tricks.com/snippets/css/complete-guide-grid/)

## 💡 Pro Tips

### 1. Use the Dev Tools

- React Developer Tools browser extension
- Redux DevTools for state inspection
- TypeScript compiler output for error details

### 2. Code Organization

- Keep components small and focused
- Extract custom hooks for reusable logic
- Use TypeScript interfaces for data shapes
- Group related files in folders

### 3. Performance

- Use React.memo for expensive components
- Use useCallback for event handlers
- Use useMemo for expensive calculations
- Lazy load pages that aren't immediately needed

### 4. Debugging

- Use console.log sparingly (remove before committing)
- Use debugger statements for breakpoints
- Check Network tab for API issues
- Use React Developer Tools for component inspection

## 🚀 Your First Contribution

Here's a simple task to get started:

### Task: Add a "Created Date" Display

1. Find a flashcard display component
2. Add a "Created on: [date]" text below the card content
3. Format the date nicely (use `toLocaleDateString('nl-NL')`)
4. Style it with existing CSS variables
5. Test that it displays correctly
6. Commit and create a pull request

### Success Criteria

- Date displays in Dutch format
- Styling matches the app's design
- No TypeScript errors
- Component still renders properly

## 📞 Getting Help

### Code Review Process

1. Create a pull request with a clear description
2. Add screenshots if UI changes are involved
3. Request review from a senior developer
4. Address feedback and make necessary changes
5. Merge when approved

### Who to Ask

- **General React questions**: Team lead or senior developers
- **TypeScript issues**: Check TypeScript documentation first
- **CSS/Styling**: Reference existing components for patterns
- **Testing**: Look at existing test files for examples

### Resources in the Codebase

- `CLAUDE.md` - Project context and decisions
- `src/components/CLAUDE.md` - Component patterns
- `src/types/CLAUDE.md` - TypeScript conventions
- Existing tests - Examples of testing patterns

## 🎉 Welcome to the Team

You're now ready to contribute to the Nederlandse Flashcards App! Remember:

- **Ask questions** - Better to ask than to guess
- **Read existing code** - Learn from established patterns
- **Test your changes** - Ensure quality before committing
- **Have fun** - You're building something that helps people learn!

Happy coding! 🚀

---

**Need immediate help?** Check the existing codebase for examples or create an issue in the repository with your question.
