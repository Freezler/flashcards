# Flash Cards App - Project Context

## Project Overview

A React 19 flashcard application built with TypeScript, Vite, and Tailwind CSS. The app helps users learn through intelligent flashcard systems with spaced repetition and progress tracking.

## Tech Stack

- **Frontend**: React 19 with TypeScript <https://react.dev/learn>
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Linting**: ESLint with TypeScript rules
- **Type Checking**: TypeScript with strict mode

## Development Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build
- `npx tsc --noEmit` - Type check without emitting

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
├── src/
│   ├── CLAUDE.md               # Source code context
│   ├── components/
│   │   └── CLAUDE.md           # Component-specific patterns
│   ├── utils/
│   │   └── CLAUDE.md           # Utility functions context
│   └── types/
│       └── CLAUDE.md           # TypeScript definitions
└── package.json
```

## Key Features (Current)

- Landing page with hero section
- Feature cards showcase
- Progress tracking utility
- TypeScript strict mode enabled
- ESLint with type-aware rules

## Next Steps / Roadmap

- [ ] Implement actual flashcard functionality
- [ ] Add spaced repetition algorithm
- [ ] Create card creation/editing interface
- [ ] Add progress analytics dashboard
- [ ] Implement user authentication
- [ ] Add deck management system

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
