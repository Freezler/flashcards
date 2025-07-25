# 🎓 CogniCraft Flashcards - Developer Onboarding Guide

Welcome to **CogniCraft**, a modern, intelligent React 19 flashcard application with full internationalization support! This guide will get you up and running quickly.

## 🌟 **What You're Working With**

### **Application Overview**
- **Modern React 19.1.0** with TypeScript 5.8 and strict mode
- **Full Internationalization** - 4 languages (🇳🇱 🇬🇧 🇩🇪 🇪🇸) with real-time switching  
- **40+ Web Development Flashcards** across Frontend, Backend, Fundamentals, and DevOps
- **Intelligent Spaced Repetition** using SM-2 algorithm
- **Beautiful 3D Animations** with magical effects and accessibility support
- **Mobile-First Design** with glassmorphism UI and OKLCH colors
- **Security Hardened** with CSP headers, input sanitization, and CSRF protection

### **Tech Stack**
```
Frontend:     React 19.1.0 + TypeScript 5.8
Build:        Vite 7.0 + Tailwind CSS v4  
Routing:      React Router 7.6
i18n:         react-i18next with 4 languages
Testing:      Vitest 3.2 + Testing Library
Linting:      ESLint 9.30 with TypeScript rules
Styling:      Custom CSS + Tailwind utilities + OKLCH colors
```

## 🚀 **Quick Start**

### **1. Installation & Setup**
```bash
# Clone and install dependencies
npm install

# Start development server with HMR
npm run dev

# Open browser to http://localhost:5173
```

### **2. Available Commands**
```bash
# Development
npm run dev          # Start dev server with Vite HMR
npm run build        # Production build (outputs to dist/)
npm run preview      # Preview production build

# Code Quality  
npm run lint         # Run ESLint with TypeScript rules
npm run lint:fix     # Auto-fix linting issues
npm run format       # Format code with Prettier
npx tsc --noEmit     # Type check without emitting files

# Testing
npm run test         # Run unit tests with Vitest
npm run test:ui      # Interactive test UI
```

### **3. Project Structure**
```
📁 flash-cards/
├── 📄 CLAUDE.md              # Project context & architecture
├── 📄 ONBOARDING.md          # This file - developer guide
├── 📄 PROJECT_FLOWCHART.md   # Visual project overview
├── 📁 src/
│   ├── 📄 CLAUDE.md          # Source code patterns
│   ├── 📁 components/        # React components
│   │   ├── 📄 CLAUDE.md      # Component patterns & standards  
│   │   ├── 📄 Navigation.tsx  # App header with i18n language selector
│   │   ├── 📄 Dashboard.tsx   # Main dashboard with stats
│   │   ├── 📄 FlashCard.tsx   # 3D animated flashcard component
│   │   ├── 📄 StudySession.tsx # Spaced repetition study interface
│   │   └── 📁 common/        # Reusable UI components
│   ├── 📁 contexts/          # React Context for state management
│   │   ├── 📄 CardContext.tsx # Global flashcard state
│   │   └── 📄 AuthContext.tsx # User authentication
│   ├── 📁 pages/            # Route components
│   │   ├── 📄 DecksPage.tsx  # Deck management (fully translated)
│   │   ├── 📄 DeckPage.tsx   # Individual deck view (fully translated)
│   │   └── 📄 StudyPage.tsx  # Study interface
│   ├── 📁 i18n/             # Internationalization
│   │   ├── 📄 index.ts       # i18next configuration
│   │   └── 📁 locales/       # Translation files
│   │       ├── 📁 nl/        # Dutch translations
│   │       ├── 📁 en/        # English translations  
│   │       ├── 📁 de/        # German translations
│   │       └── 📁 es/        # Spanish translations
│   ├── 📁 data/             # Test data & content
│   │   ├── 📄 CLAUDE.md      # Data documentation
│   │   └── 📄 testDecks.ts   # 40+ web dev flashcards (fully translated)
│   ├── 📁 types/            # TypeScript definitions
│   │   ├── 📄 CLAUDE.md      # Type system documentation
│   │   └── 📄 flashcard.ts   # Core flashcard types
│   ├── 📁 utils/            # Utility functions
│   │   ├── 📄 CLAUDE.md      # Utility patterns
│   │   ├── 📄 security.ts    # Input sanitization & XSS protection
│   │   └── 📄 secureStorage.ts # Encrypted localStorage wrapper
│   └── 📄 index.css         # Global styles with OKLCH colors
├── 📄 vite.config.js        # Vite + Tailwind v4 configuration
├── 📄 tailwind.config.js    # Tailwind CSS configuration
└── 📄 tsconfig.json         # TypeScript strict configuration
```

## 🌍 **Internationalization System**

### **Language Support**
Our app fully supports 4 languages with professional-quality translations:

- 🇳🇱 **Nederlands** - Native Dutch with proper grammar
- 🇬🇧 **English** - Primary development language  
- 🇩🇪 **Deutsch** - Technical German translations
- 🇪🇸 **Español** - Spanish with technical accuracy

### **How i18n Works**
```typescript
// 1. Components use useTranslation hook
import { useTranslation } from 'react-i18next'

function MyComponent() {
  const { t } = useTranslation('common')  // Use 'common' namespace
  
  return <h1>{t('dashboard.title')}</h1>  // Translates to current language
}

// 2. Flashcard content uses 'decks' namespace  
const { t } = useTranslation(['common', 'decks'])
return <div>{t(card.front, { ns: 'decks' })}</div>  // Card content translation
```

### **Translation File Structure**
```
src/i18n/locales/
├── nl/common.json    # Dutch UI translations
├── nl/decks.json     # Dutch flashcard content
├── en/common.json    # English UI translations  
├── en/decks.json     # English flashcard content
├── de/common.json    # German UI translations
├── de/decks.json     # German flashcard content
├── es/common.json    # Spanish UI translations
└── es/decks.json     # Spanish flashcard content
```

### **Adding New Translations**
```typescript
// 1. Add keys to all language files
// common.json - UI text
{
  "mySection": {
    "title": "My Title",
    "description": "My description"
  }
}

// decks.json - Flashcard content
{
  "frontend": {
    "cards": {
      "my-card": {
        "front": "What is...?",
        "back": "The answer is..."
      }
    }
  }
}

// 2. Use in components
const { t } = useTranslation('common')
return <h1>{t('mySection.title')}</h1>

// 3. For flashcards, use translation keys in testDecks.ts
createFlashCard(
  'decks:frontend.cards.my-card.front',
  'decks:frontend.cards.my-card.back',
  DifficultyLevel.EASY,
  'Frontend'
)
```

## 📚 **Flashcard Content System**

### **Available Decks (40+ Cards)**
1. **Frontend Development** (12 cards)
   - React, JavaScript, CSS, TypeScript
   - Virtual DOM, hooks, closures, box model
   
2. **Backend Development** (10 cards)  
   - REST APIs, databases, Node.js, authentication
   - JWT, CORS, middleware, normalization

3. **Web Development Fundamentals** (10 cards)
   - Git, HTTP, HTTPS, responsive design
   - PWAs, accessibility, semantic HTML

4. **DevOps & Tools** (8 cards)
   - Docker, CI/CD, webpack, npm, Kubernetes
   - Environment variables, load balancing

### **How Flashcards Work**
```typescript
// 1. Cards are stored with translation keys
interface FlashCard {
  id: string
  front: string    // Translation key like 'decks:frontend.cards.react.front'
  back: string     // Translation key like 'decks:frontend.cards.react.back'  
  difficulty: 'easy' | 'medium' | 'hard'
  category: string
  tags: string[]
  // Spaced repetition data
  lastReviewed: Date | null
  nextReview: Date | null
  timesReviewed: number
  correctCount: number
  incorrectCount: number
}

// 2. Components translate the keys dynamically
function FlashCard({ card }) {
  const { t } = useTranslation(['common', 'decks'])
  
  return (
    <div>
      <h3>{t(card.front, { ns: 'decks' })}</h3>    {/* Translates question */}
      <p>{t(card.back, { ns: 'decks' })}</p>       {/* Translates answer */}
    </div>
  )
}
```

## 🎨 **Component Architecture**

### **Key Components**

#### **Navigation.tsx** - App Header
- Language selector with 4 flags (🇳🇱 🇬🇧 🇩🇪 🇪🇸)
- User profile dropdown
- Glassmorphism design with backdrop-filter
- Fully accessible with keyboard navigation

#### **Dashboard.tsx** - Main Dashboard  
- Time-based greetings (morning/afternoon/evening)
- Study statistics with 2×3 mobile / 3×2 desktop grid
- Available decks with progress indicators
- Comprehensive i18n integration

#### **FlashCard.tsx** - 3D Animated Cards
- Magical 3D flip animations with sparkle effects
- Difficulty-based styling (easy=green, medium=yellow, hard=red)
- Response time tracking for spaced repetition
- Full accessibility with ARIA labels and keyboard support

#### **StudySession.tsx** - Spaced Repetition Engine
- SM-2 algorithm implementation
- Intelligent card scheduling based on performance
- Progress tracking with animated progress bar
- Session analytics and results screen

#### **DecksPage.tsx & DeckPage.tsx** - Deck Management
- Complete CRUD operations for decks and cards
- Confirmation modals for destructive actions
- Professional card management interface
- Full i18n support with interpolation

### **Common Patterns**
```typescript
// 1. All components use React.memo for performance
const MyComponent = React.memo(function MyComponent(props) {
  // Component logic
})

// 2. Event handlers are memoized with useCallback
const handleClick = useCallback(() => {
  // Handler logic
}, [dependencies])

// 3. Expensive calculations use useMemo
const expensiveValue = useMemo(() => {
  return heavyCalculation(data)
}, [data])

// 4. i18n integration pattern
const { t } = useTranslation('common')
// or for multiple namespaces:
const { t } = useTranslation(['common', 'decks'])
```

## 🔒 **Security Features**

### **Implemented Security**
- **CSP Headers** - Content Security Policy for XSS protection
- **Input Sanitization** - All user input sanitized with comprehensive validation
- **CSRF Protection** - Token-based form protection
- **Secure Storage** - Encrypted localStorage with validation
- **Rate Limiting** - Form submission protection against abuse
- **XSS Prevention** - HTML sanitization and proper escaping

### **Security Utils**
```typescript
// Input validation
import { validateUserInput, isValidEmail } from '../utils/security'

// Secure storage
import { secureStorage } from '../utils/secureStorage'
secureStorage.setItem('key', 'value')
const value = secureStorage.getItem('key')

// CSRF protection
import { generateCSRFToken, validateCSRFToken } from '../utils/csrf'
```

## 🎯 **Development Workflow**

### **Git Workflow**
```bash
# 1. Create feature branch from main
git checkout -b feature/my-feature

# 2. Make changes and commit with conventional commits
git add .
git commit -m "feat: add new flashcard component"

# 3. Push and create PR
git push -u origin feature/my-feature

# 4. Main branch is protected - requires PR review
```

### **Code Standards**
- **TypeScript Strict Mode** - All code must pass strict type checking
- **ESLint + Prettier** - Automated code formatting and linting
- **Conventional Commits** - Use `feat:`, `fix:`, `docs:`, etc.
- **Component Standards** - React.memo, proper TypeScript interfaces, accessibility

### **Testing Strategy**
```bash
# Unit tests with Vitest
npm run test

# Type checking
npx tsc --noEmit

# Linting
npm run lint

# Build verification
npm run build
```

## 🎨 **Styling System**

### **Design System**
- **OKLCH Colors** - Perceptually uniform color space
- **Glassmorphism UI** - Backdrop-filter effects with transparency
- **Fluid Typography** - CSS clamp() for responsive text scaling
- **CSS Custom Properties** - Semantic design tokens
- **Mobile-First** - Responsive breakpoints starting from mobile

### **CSS Architecture**
```css
/* Global CSS variables in index.css */
:root {
  --surface-1: oklch(98% 0.002 247);
  --text-1: oklch(15% 0.01 247);  
  --brand-500: oklch(60% 0.15 260);
  /* ... more design tokens */
}

/* Component-specific styles */
.flashcard {
  background: var(--surface-1);
  color: var(--text-1);
  border-radius: var(--radius-lg);
}
```

### **Responsive Breakpoints**
```css
/* Mobile First */
.component { /* Mobile styles */ }

@media (min-width: 768px) { /* Tablet */ }
@media (min-width: 1024px) { /* Desktop */ }
@media (min-width: 1280px) { /* Large Desktop */ }
```

## 🧪 **Adding New Features**

### **Adding a New Component**
```typescript
// 1. Create component with proper TypeScript
interface MyComponentProps {
  title: string
  onAction?: () => void
}

const MyComponent = React.memo(function MyComponent({
  title,
  onAction
}: MyComponentProps): React.JSX.Element {
  const { t } = useTranslation('common')
  
  return (
    <div>
      <h1>{t('myComponent.title')}</h1>
      {/* Component JSX */}
    </div>
  )
})

export default MyComponent
```

### **Adding New Translation Keys**
```json
// Add to all language files: nl/common.json, en/common.json, etc.
{
  "myComponent": {
    "title": "My Title",
    "description": "My description",
    "actions": {
      "save": "Save",
      "cancel": "Cancel"
    }
  }
}
```

### **Adding New Flashcards**
```typescript
// 1. Add translation keys to all decks.json files
{
  "frontend": {
    "cards": {
      "new-card": {
        "front": "What is the question?",
        "back": "This is the answer explanation."
      }
    }
  }
}

// 2. Add card to testDecks.ts
createFlashCard(
  'decks:frontend.cards.new-card.front',
  'decks:frontend.cards.new-card.back',
  DifficultyLevel.MEDIUM,
  'Frontend',
  ['react', 'javascript']
)
```

## 🐛 **Common Issues & Solutions**

### **Translation Not Working**
```typescript
// ❌ Wrong - missing namespace
const { t } = useTranslation()
return <div>{t('decks:frontend.cards.react.front')}</div>

// ✅ Correct - specify namespace
const { t } = useTranslation(['common', 'decks'])  
return <div>{t(card.front, { ns: 'decks' })}</div>
```

### **TypeScript Errors**
```typescript
// ❌ Wrong - missing index signature
interface FormData {
  email: string
  password: string
}

// ✅ Correct - add index signature for form validation hook
interface FormData {
  email: string
  password: string
  [key: string]: string
}
```

### **Build Failures**
```bash
# Check for TypeScript errors
npx tsc --noEmit

# Check for linting issues  
npm run lint

# Fix auto-fixable issues
npm run lint:fix
```

## 📋 **Current Development Status**

### ✅ **Completed Features**
- Full internationalization system with 4 languages
- 40+ web development flashcards with professional translations
- 3D animated FlashCard component with accessibility
- Spaced repetition study system with SM-2 algorithm
- Complete deck management (CRUD operations)
- Security hardening (CSP, XSS, CSRF protection)
- Mobile-first responsive design
- Performance optimizations (React.memo, code splitting ready)
- Comprehensive documentation and onboarding

### 🚧 **In Progress**
- StudySession and remaining component translations
- Form validation message translations
- CLAUDE.md documentation updates

### 📝 **Roadmap**
- Code splitting implementation for bundle size optimization
- Advanced study analytics with visual charts
- Deck import/export functionality  
- Offline support with service worker
- User authentication with cloud sync

## 🆘 **Getting Help**

### **Documentation**
- **CLAUDE.md** - Project architecture and decisions
- **src/CLAUDE.md** - Source code patterns
- **src/components/CLAUDE.md** - Component standards
- **PROJECT_FLOWCHART.md** - Visual project overview

### **Key Files to Understand**
1. **src/i18n/index.ts** - i18n configuration
2. **src/data/testDecks.ts** - Flashcard content
3. **src/contexts/CardContext.tsx** - Global state management
4. **src/components/FlashCard.tsx** - Core flashcard component
5. **src/types/flashcard.ts** - TypeScript definitions

### **Development Tips**
- Always run `npm run lint` before committing
- Use `npx tsc --noEmit` to check TypeScript errors
- Test language switching after adding new translations
- Follow the established patterns in existing components
- Update CLAUDE.md files when making architectural changes

---

🎓 **Happy coding! Welcome to the CogniCraft team!** 

For questions or clarifications, refer to the comprehensive documentation in the CLAUDE.md files throughout the project.
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
11

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
