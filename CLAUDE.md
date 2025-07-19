# Flash Cards App - Project Context

## Project Overview

A React 19 flashcard application built with TypeScript, Vite, and Tailwind CSS. The app helps users learn through intelligent flashcard systems with spaced repetition and progress tracking.

## Tech Stack

- **Frontend**: React 19 with TypeScript <https://react.dev/learn>
- **Build Tool**: Vite with modern Tailwind v4 integration
- **Styling**: Custom CSS with OKLCH colors + Tailwind CSS utilities
- **Routing**: React Router for client-side navigation
- **Linting**: ESLint with TypeScript rules
- **Type Checking**: TypeScript with strict mode
- **Fonts**: Inter font family for modern typography
- **Design System**: CSS variables with fluid typography and spacing

## Development Commands

- `npm run dev` - Start development server (Vite)
- `npm run build` - Build for production
- `npm run lint` - Run ESLint with TypeScript rules  
- `npm run preview` - Preview production build
- `npx tsc --noEmit` - Type check without emitting files

## Current Git State

- **Branch**: `feature/study-session-component` (working on optimization)
- **Status**: Complete CRUD functionality, performance optimizations implemented
- **Completed**: CardContext optimization, React.memo implementation, common components
- **Bundle Size**: 262KB (82KB gzipped) - optimized from previous version

## Git Workflow

### Branch Structure
- **main**: Production-ready code, protected branch
- **development**: Integration branch for features
- **feature/***: Individual feature branches (e.g., `feature/flashcard-component`)
- **release/***: Release preparation branches
- **hotfix/***: Critical production fixes

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

```
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
│   │   └── progressTracker.ts  # Progress tracking utility
│   ├── App.tsx                 # Main app component with routing
│   ├── main.tsx                # React root entry point
│   └── index.css               # Global styles with OKLCH colors
├── vite.config.js              # Vite + Tailwind v4 configuration
├── tailwind.config.js          # Tailwind CSS configuration
├── tsconfig.json               # TypeScript configuration
└── package.json                # Dependencies and scripts
```

## Key Features (Current)

### ✅ Core Functionality
- **Complete CRUD system** - Create, edit, delete cards and decks
- **CardContext state management** - Optimized with useCallback/useMemo
- **LocalStorage persistence** - Automatic data persistence with date parsing
- **Form validation** - Reusable useFormValidation hook
- **Interactive FlashCard component** - 3D flip animations, difficulty-based styling
- **StudySession component** - Spaced repetition algorithm (SM-2)

### ✅ Performance Optimizations
- **React.memo** on all major components to prevent unnecessary re-renders
- **Memoized context values** and action functions
- **Bundle size optimization** - 262KB (82KB gzipped)
- **Loading boundaries** and error handling
- **Component code splitting** ready for implementation

### ✅ UI/UX Features
- **Modern responsive design** with OKLCH colors and CSS variables
- **Empty states** and loading indicators
- **Navigation system** with React Router
- **Dashboard** with deck statistics
- **Confirmation modals** for destructive actions
- **Professional form styling** with real-time validation

### ✅ Developer Experience
- **TypeScript strict mode** with comprehensive type safety
- **ESLint + Prettier** with automated formatting
- **Comprehensive test suite** for CardContext and components
- **CLAUDE.md documentation** for all major modules
- **Git workflow** with feature branches and protected main

## Next Steps / Roadmap

### High Priority (Performance & Polish)
- [ ] **Code splitting** - Implement lazy loading for pages (262KB → ~200KB target)
- [ ] **Advanced study analytics** - Visual progress charts and learning insights
- [ ] **Deck import/export** - JSON/CSV data portability
- [ ] **Offline support** - Service worker for offline functionality

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