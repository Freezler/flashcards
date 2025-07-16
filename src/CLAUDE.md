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
├── data/
│   ├── testDecks.ts    # Sample flashcard decks for development
│   └── CLAUDE.md       # Data documentation
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

- **Primary**: Modern CSS with CSS variables for consistency
- **Layout**: CSS Grid and Flexbox for responsive layouts
- **Variables**: Centralized design tokens in `:root` for:
  - Colors (primary, secondary, surface, text, borders)
  - Spacing (xs, sm, md, lg, xl, 2xl, 3xl)
  - Border radius (sm, md, lg, xl, 2xl)
  - Shadows and transitions
- **Fallback**: Tailwind CSS utility classes where needed
- **Component styles**: CSS modules or styled-components for complex components
- **Global styles**: `index.css` for base styles and resets

## TypeScript Standards

- Strict mode enabled in tsconfig.json
- All functions should have proper type annotations
- Use interfaces for object types
- Prefer explicit return types for clarity

## Current Components

- **App.tsx**: Main landing page with hero section and feature cards
- **main.tsx**: Application entry point with root rendering
- **progressTracker.ts**: Utility for tracking user progress
- **testDecks.ts**: Sample flashcard data for development and testing

## Development Notes

- Recently converted from JavaScript to TypeScript
- All files follow strict TypeScript patterns
- ESLint configured with TypeScript rules
- Vite handles TypeScript compilation automatically
- Git workflow with main/development branches established
- Pre-commit hooks planned for quality gates
- Component architecture ready for flashcard features

## CSS Implementation

- **Modern CSS**: Uses CSS Grid and Flexbox for layouts
- **Design System**: Implemented comprehensive CSS variables system
- **CSS Variables**: Centralized design tokens in App.css `:root`
- **No Scroll Layout**: Landing page fits exactly in viewport (100vh)
- **Responsive**: Mobile-first approach with breakpoints
- **Performance**: Optimized with efficient selectors and transitions
