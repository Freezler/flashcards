# Web Development Flashcards App - Project Context

## Project Overview

A modern, intelligent React 19 flashcard application built with TypeScript, Vite and Tailwind CSS. The app helps users learn through intelligent flashcard systems with spaced repetition and progress tracking, specifically focused on web development education with international language support infrastructure.

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

- **Branch**: `main` (active development)
- **Status**: Core functionality implemented, experimental UI variants in development
- **Completed**: React.memo optimization, responsive layouts, security enhancements, CSS Masters Phase 1
- **Bundle Size**: ~600KB+ total bundle - optimization needed
- **Features**: 4 web development decks, 41 cards, spaced repetition algorithm, responsive design, i18n infrastructure
- **Security**: CSP headers, input sanitization, CSRF protection, secure storage
- **Development Status**: Multiple UI experiments (Beautiful, Elite, 2025 variants) actively being developed

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

- **4 Web Development Decks** - 41 cards covering frontend, backend, web fundamentals and DevOps
- **Educational Quality** - Practical web development knowledge for interviews and work
- **Tech-Focused Content** - From basic web concepts to advanced development topics
- **3 Difficulty Levels** - Easy, Medium, Hard for progressive learning
- **Internationalization Infrastructure** - i18next setup with translation key structure (UI in multiple languages, content primarily English)

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

- **Responsive Design** - Mobile-first approach with clamp() fluid typography
- **Multiple UI Variants** - Original, Beautiful, Elite, and 2025 experimental designs
- **Modern CSS with OKLCH colors** and beautiful gradients
- **CSS Masters Phase 1** - @property declarations, professional easing functions, container queries
- **Accessibility Focus** - WCAG AA compliant with ARIA labels and semantic HTML
- **Navigation system** with React Router and proper landmarks
- **Dashboard** with deck statistics and accessible interactions
- **Confirmation modals** for destructive actions
- **Professional form styling** with real-time validation
- **High Contrast Support** - Automatic adaptation for visual accessibility
- **Screen Reader Support** - Comprehensive compatibility with assistive technologies

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

### High Priority (Development Focus)

- [ ] **UI Consolidation** - Choose primary UI design from current variants (Original, Beautiful, Elite, 2025)
- [ ] **Bundle optimization** - Reduce bundle size with better code splitting and tree shaking
- [ ] **Complete internationalization** - Finish translation content for all supported languages
- [ ] **Component standardization** - Consolidate multiple component variants into single implementations
- [ ] **Performance optimization** - Address bundle size and loading performance

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
