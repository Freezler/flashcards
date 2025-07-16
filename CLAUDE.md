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

- **Branch**: `feature/styling` (working on UI improvements)
- **Status**: Mobile-first responsive design, OKLCH colors, Jhey Tompkins buttons implemented
- **Pending**: Interactive FlashCard component implementation

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
│   │   ├── CLAUDE.md           # Component-specific patterns
│   │   ├── Dashboard.tsx       # Main dashboard with stats/decks
│   │   └── Navigation.tsx      # App navigation header
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

- ✅ **Landing page** with hero section and responsive design
- ✅ **Feature cards showcase** with interactive navigation
- ✅ **Progress tracking utility** (progressTracker.ts)
- ✅ **TypeScript strict mode** enabled with comprehensive types
- ✅ **ESLint** with type-aware rules
- ✅ **Mobile-first responsive design** with proper breakpoints
- ✅ **Modern CSS implementation** with OKLCH colors and CSS variables
- ✅ **Dashboard component** with stats grid and deck display
- ✅ **Navigation system** with React Router
- ✅ **Test data** with 4 comprehensive flashcard decks (20+ cards)
- ✅ **Git workflow** established with feature branches
- ✅ **Component architecture** ready for flashcard functionality

## Next Steps / Roadmap

### High Priority (Core Functionality)
- [ ] **FlashCard component** - Interactive card with flip animation
- [ ] **StudySession component** - Study interface with spaced repetition
- [ ] **Card creation/editing interface** - CRUD operations for cards
- [ ] **Local storage integration** - Data persistence

### Medium Priority (Enhanced UX)
- [ ] **Progress analytics dashboard** - Visual progress tracking
- [ ] **Advanced deck management** - Deck organization and sharing
- [ ] **Study mode variations** - Different study approaches
- [ ] **Performance optimization** - Lazy loading, code splitting

### Future Features
- [ ] **User authentication** - Multi-user support
- [ ] **Spaced repetition algorithm** - Advanced scheduling
- [ ] **Multimedia support** - Images, audio in flashcards
- [ ] **Export/import functionality** - Data portability

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