# Nederlandse Flashcards App - Project Context

## Project Overview

Een moderne, intelligente React 19 flashcard applicatie gebouwd met TypeScript, Vite en Tailwind CSS. De app helpt gebruikers leren door middel van intelligente flashcard systemen met spaced repetition en progress tracking, specifiek gericht op Nederlandse educatieve content.

## Tech Stack

- **Frontend**: React 19.1.0 with TypeScript 5.8 <https://react.dev/learn>
- **Build Tool**: Vite 7.0 met moderne Tailwind v4 integration
- **Styling**: Custom CSS met OKLCH colors + Tailwind CSS utilities
- **Routing**: React Router 7.6 voor client-side navigation
- **Linting**: ESLint 9.30 met TypeScript rules
- **Testing**: Vitest 3.2 met Testing Library
- **Type Checking**: TypeScript strict mode
- **Fonts**: Inter font family voor moderne typography
- **Design System**: CSS variables met fluid typography en clamp() scaling

## Development Commands

- `npm run dev` - Start development server (Vite HMR)
- `npm run build` - Build for production
- `npm run lint` - Run ESLint met TypeScript rules
- `npm run lint:fix` - Fix linting issues automatisch
- `npm run format` - Format code met Prettier
- `npm run preview` - Preview production build
- `npm run test` - Run unit tests met Vitest
- `npm run test:ui` - Interactive test UI
- `npx tsc --noEmit` - Type check without emitting files

## Current Project State

- **Branch**: `main` (production ready)
- **Status**: Complete CRUD functionaliteit, security hardening, accessibility compliance
- **Completed**: Nederlandse content migration, React.memo optimization, responsive layouts, security enhancements
- **Bundle Size**: 604KB total bundle (165KB gzipped) - code splitting implemented
- **Features**: 4 web development decks, 41 kaarten, spaced repetition, responsive design, internationalization (i18n)
- **Security**: CSP headers, input sanitization, CSRF protection, secure storage

## Git Workflow

### Branch Structure

- **main**: Production-ready code, protected branch
- **development**: Integration branch for features
- **feature/\***: Individual feature branches (e.g., `feature/flashcard-component`)
- **release/\***: Release preparation branches
- **hotfix/\***: Critical production fixes

### Development Process

1. Create feature branch from `development`
2. Work on feature with regular commits
3. Open PR to merge feature → `development`
4. After review, merge to `development`
5. Create release branch from `development`
6. Merge release → `main` and tag version

### Branch Protection

- **main**: Requires PR reviews, passing CI, up-to-date branch
- **development**: Requires PR reviews, passing CI
- No direct pushes to protected branches

## Project Architecture

```project
/
├── CLAUDE.md                    # Project-wide context (this file)
├── PROJECT_FLOWCHART.md         # Visual project structure
├── src/
│   ├── CLAUDE.md               # Source code context
│   ├── components/
│   │   ├── common/             # Reusable UI components
│   │   │   ├── EmptyState.tsx  # Standardized empty states
│   │   │   ├── LoadingBoundary.tsx # Universal loading/error handling
│   │   │   └── index.ts        # Common component exports
│   │   ├── CLAUDE.md           # Component-specific patterns
│   │   ├── CardForm.tsx        # Modal form for creating/editing cards
│   │   ├── CardList.tsx        # Card display with CRUD actions
│   │   ├── Dashboard.tsx       # Main dashboard with stats/decks
│   │   ├── FlashCard.tsx       # Interactive flashcard component
│   │   ├── StudySession.tsx    # Study interface with spaced repetition
│   │   └── Navigation.tsx      # App navigation header
│   ├── contexts/
│   │   ├── CardContext.tsx     # Global state management (optimized)
│   │   └── __tests__/          # Context unit tests
│   ├── hooks/
│   │   ├── useFormValidation.ts # Reusable form validation hook
│   │   └── index.ts            # Hook exports
│   ├── pages/
│   │   ├── DeckPage.tsx        # Individual deck view
│   │   ├── DecksPage.tsx       # All decks overview
│   │   ├── StudyPage.tsx       # Study interface (placeholder)
│   │   └── index.ts            # Page exports
│   ├── data/
│   │   ├── CLAUDE.md           # Test data documentation
│   │   ├── testDecks.ts        # Sample flashcard decks
│   │   └── index.ts            # Data exports
│   ├── types/
│   │   ├── CLAUDE.md           # TypeScript definitions
│   │   ├── flashcard.ts        # Core flashcard types
│   │   ├── user.ts             # User and preferences types
│   │   ├── common.ts           # Shared utility types
│   │   ├── routes.ts           # Route definitions
│   │   └── index.ts            # Type exports
│   ├── utils/
│   │   ├── CLAUDE.md           # Utility functions context
│   │   ├── security.ts         # Input sanitization and validation
│   │   ├── secureStorage.ts    # Secure localStorage wrapper
│   │   └── csrf.ts             # CSRF protection utilities
│   ├── App.tsx                 # Main app component with routing
│   ├── main.tsx                # React root entry point
│   └── index.css               # Global styles with OKLCH colors
├── vite.config.js              # Vite + Tailwind v4 configuration
├── tailwind.config.js          # Tailwind CSS configuration
├── tsconfig.json               # TypeScript configuration
└── package.json                # Dependencies and scripts
```

## Key Features (Current)

### ✅ Web Development Content & Education

- **4 Web Development Decks** - 41 kaarten over frontend, backend, web fundamentals en DevOps
- **Educatieve Kwaliteit** - Praktische web development kennis voor interviews en werk
- **Tech-Focused Content** - Van basis web concepten tot gevorderde development topics
- **3 Moeilijkheidsgraden** - Easy, Medium, Hard voor progressive learning
- **Internationalization** - Nederlandse UI met i18next, content in translation keys

### ✅ Core Functionality

- **Complete CRUD system** - Create, edit, delete cards and decks
- **CardContext state management** - Optimized with useCallback/useMemo
- **Secure Storage** - Enhanced localStorage with encryption and validation
- **Form validation** - Reusable useFormValidation hook with security checks
- **Interactive FlashCard component** - 3D flip animations, difficulty-based styling
- **StudySession component** - Spaced repetition algorithm (SM-2)
- **CSRF Protection** - Token-based form security
- **Input Sanitization** - XSS protection with comprehensive validation

### ✅ Performance Optimizations

- **React.memo** on all major components to prevent unnecessary re-renders
- **Memoized context values** and action functions
- **Bundle size** - 604KB total (165KB gzipped) with room for optimization
- **Loading boundaries** and error handling
- **Component code splitting** ready for implementation

### ✅ UI/UX Features

- **Volledig Responsive Design** - Mobile-first met clamp() fluid typography
- **Study Stats Layouts** - 2×3 mobile grid, 3×2 desktop grid
- **Modern CSS met OKLCH colors** and beautiful gradients
- **Accessibility First** - WCAG AA compliant with ARIA labels and semantic HTML
- **Navigation system** met React Router and proper landmarks
- **Dashboard** met deck statistics and accessible interactions
- **Confirmation modals** voor destructive actions
- **Professional form styling** met real-time validation
- **High Contrast Support** - Automatic adaptation for visual accessibility
- **Screen Reader Support** - Complete compatibility with assistive technologies

### ✅ Security & Accessibility

- **CSP Headers** - Content Security Policy for XSS protection
- **Input Sanitization** - Comprehensive validation and sanitization utilities
- **Secure Storage** - Encrypted localStorage with validation and cleanup
- **CSRF Protection** - Token-based protection for form submissions
- **Rate Limiting** - Form submission protection against abuse
- **Security Headers** - X-Frame-Options, X-Content-Type-Options, and more
- **WCAG AA Compliance** - Full accessibility with screen reader support
- **Semantic HTML** - Proper landmarks, roles, and ARIA attributes
- **Keyboard Navigation** - Complete keyboard accessibility
- **High Contrast Support** - Automatic adaptation for visual impairments
- **Reduced Motion Support** - Respects user preferences for animations

### ✅ Developer Experience

- **TypeScript strict mode** with comprehensive type safety
- **ESLint + Prettier** with automated formatting
- **Comprehensive test suite** for CardContext and components
- **Professional documentation** - README, CLAUDE.md, PROJECT_FLOWCHART
- **Git workflow** with feature branches and protected main

## Next Steps / Roadmap

### High Priority (Performance & Polish)

- [ ] **Bundle optimization** - Reduce from 604KB to ~400KB target with better code splitting and tree shaking
- [ ] **Advanced study analytics** - Visual progress charts and learning insights
- [ ] **Deck import/export** - JSON/CSV data portability
- [ ] **Complete CRUD implementation** - Full create/edit/delete functionality
- [ ] **Security hardening** - Implement proper CSRF protection and CSP headers

### Medium Priority (Enhanced Features)

- [ ] **Advanced study modes** - Review due cards, difficult cards only
- [ ] **Deck organization** - Categories, tags, search functionality
- [ ] **Study streaks** - Gamification and motivation features
- [ ] **Multimedia cards** - Image and audio support

### Future Features

- [ ] **User authentication** - Multi-user support with cloud sync
- [ ] **Collaborative decks** - Sharing and community features
- [ ] **Advanced spaced repetition** - Anki-style algorithms
- [ ] **Mobile app** - React Native implementation
- [ ] **Plugin system** - Custom study modes and card types

## Project Standards

- Use TypeScript with strict mode
- Follow React 19 patterns and best practices
- All components should have proper TypeScript interfaces
- Use proper error handling and null checks
- Follow established file naming conventions
- Conventional commit messages (feat:, fix:, docs:, etc.)
- Pre-commit hooks for linting and formatting
- All PRs require code review before merging

## Context Files

- **Root**: Project overview, architecture, and high-level decisions
- **src/**: Source code patterns, imports, and code organization
- **src/components/**: Component patterns, props, and styling approaches
- **src/utils/**: Utility function patterns and shared logic
- **src/types/**: TypeScript definitions and interfaces

## Maintaining Context Files

**Important**: These CLAUDE.md files should be updated whenever:

- New components, utils, or types are added
- Project structure changes
- Dependencies or workflows are modified
- Major features are implemented
- Development practices evolve

**Reminder**: Always ask Claude to update relevant CLAUDE.md files when making significant changes to maintain accurate project context.

## Project Reminders

- Always update the CLAUDE.md with the latest project context and decisions
