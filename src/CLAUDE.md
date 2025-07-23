# Source Code Context

## File Structure

```mermaid
src/
├── App.tsx              # Main application component
├── main.tsx            # Entry point with React root
├── utils/
│   ├── security.ts         # Input sanitization and XSS protection
│   ├── secureStorage.ts    # Secure localStorage wrapper
│   └── csrf.ts             # CSRF protection utilities
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

- **App.tsx**: Main application component with security headers and accessibility
- **main.tsx**: Application entry point with root rendering
- **security.ts**: Comprehensive input sanitization and validation utilities
- **secureStorage.ts**: Secure localStorage wrapper with encryption
- **csrf.ts**: CSRF protection with token management
- **testDecks.ts**: Sample flashcard data for development and testing

## Development Notes

- Security-first development approach implemented
- All user input sanitized and validated
- CSRF protection on all forms
- Comprehensive accessibility compliance (WCAG AA)
- All files follow strict TypeScript patterns
- ESLint configured with TypeScript rules
- Vite handles TypeScript compilation automatically
- Git workflow with main/development branches established
- Security hardening with CSP headers and input validation

## CSS Implementation

- **Modern CSS**: Uses CSS Grid and Flexbox for layouts with accessibility focus
- **Design System**: Comprehensive CSS variables with OKLCH colors and gradients
- **Accessibility**: Screen reader support, high contrast mode, reduced motion
- **Security**: Content Security Policy compatible styling
- **Responsive**: Mobile-first approach with fluid typography
- **Performance**: Optimized with efficient selectors and smooth transitions
- **WCAG Compliance**: Color contrast ratios meet AA standards
