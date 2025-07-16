# Source Code Context

## File Structure

``` mermaid
src/
├── App.tsx              # Main application component
├── main.tsx            # Entry point with React root
├── utils/
│   └── progressTracker.ts  # Progress tracking utilities
├── components/
│   └── CLAUDE.md       # Component patterns and standards
├── types/
│   └── CLAUDE.md       # TypeScript type definitions
├── App.css             # Component-specific styles
└── index.css           # Global styles and Tailwind
```

## Import Patterns

- Use relative imports for local files: `import App from './App'`
- Use absolute imports for external packages: `import { StrictMode } from 'react'`
- CSS imports should be at the top: `import './App.css'`

## Component Structure

- All components use TypeScript with `.tsx` extensions
- Function components with proper return type annotations
- Use `React.JSX.Element` for return types
- Export default for main components

## Error Handling

- Use proper null checking for DOM elements
- Throw descriptive errors for critical failures
- Example: `if (!rootElement) throw new Error('Root element not found')`

## Styling Approach

- Primary: Tailwind CSS utility classes
- Component styles: CSS modules or styled-components
- Global styles: `index.css` for base styles
- Use semantic class names for complex components

## TypeScript Standards

- Strict mode enabled in tsconfig.json
- All functions should have proper type annotations
- Use interfaces for object types
- Prefer explicit return types for clarity

## Current Components

- **App.tsx**: Main landing page with hero section and feature cards
- **main.tsx**: Application entry point with root rendering
- **progressTracker.ts**: Utility for tracking user progress

## Development Notes

- Recently converted from JavaScript to TypeScript
- All files follow strict TypeScript patterns
- ESLint configured with TypeScript rules
- Vite handles TypeScript compilation automatically
- Git workflow with main/development branches established
- Pre-commit hooks planned for quality gates
- Component architecture ready for flashcard features
