---

# 🎓 CogniCraft Flashcards – Developer Onboarding Guide

Welcome to **CogniCraft**, a modern, internationalized React flashcard app for web developers. This guide covers setup, architecture, workflows, and tips to help you become productive fast!

---

## 🌟 What is CogniCraft?

A fast, secure, responsive flashcards app built with:

- **React 19.1 + TypeScript 5.8 (Strict)**
- **Vite 7 + Tailwind CSS v4 + Custom CSS (OKLCH colors)**
- **Full i18n:** Dutch, English, German, Spanish
- **40+ Flashcards:** Frontend, Backend, Fundamentals, DevOps
- **Spaced Repetition:** SM-2 algorithm
- **3D Animations, Mobile-first, Glassmorphism UI**
- **Security:** CSP, XSS, CSRF, encrypted storage

---

## 🚀 Quick Start

1. **Clone & Install**
   ```bash
   git clone https://github.com/Freezler/flashcards.git
   cd flashcards
   npm install
   ```

2. **Start Dev Server**
   ```bash
   npm run dev
   # Visit http://localhost:5173
   ```

3. **Key Commands**
   | Command              | Purpose                                |
   |----------------------|----------------------------------------|
   | npm run dev          | Start dev server (Hot Reload)          |
   | npm run build        | Production build (output: dist/)       |
   | npm run preview      | Preview production build               |
   | npm run test         | Run unit tests (Vitest)                |
   | npm run lint         | Lint code (ESLint + TS rules)          |
   | npm run lint:fix     | Auto-fix linting issues                |
   | npm run format       | Format with Prettier                   |
   | npx tsc --noEmit     | Type-check only (no output)            |

---

## 🗂️ Project Structure

```
flashcards/
├── CLAUDE.md                 # Project context & architecture
├── ONBOARDING.md             # This doc
├── PROJECT_FLOWCHART.md      # Visual overview
├── src/
│   ├── components/           # React components
│   │   ├── common/           # Reusable UI
│   │   ├── Dashboard.tsx     # Main dashboard
│   │   ├── FlashCard.tsx     # 3D animated card
│   │   ├── Navigation.tsx    # Header & i18n switcher
│   │   ├── StudySession.tsx  # Spaced repetition interface
│   │   └── ...               # More components
│   ├── contexts/             # State management (Card, Auth)
│   ├── pages/                # Route components (Decks, Study, etc.)
│   ├── i18n/                 # i18next config & translations
│   ├── data/                 # Flashcard content (testDecks.ts)
│   ├── types/                # TypeScript definitions
│   ├── utils/                # Helpers (security, storage)
│   └── index.css             # Global styles, design tokens
├── vite.config.js            # Vite + Tailwind config
├── tsconfig.json             # TypeScript config
└── ...                       # Other config & docs
```

---

## 🌍 Internationalization (i18n)

- Uses **react-i18next** with 4 languages: 🇳🇱 🇬🇧 🇩🇪 🇪🇸
- Translations live in `src/i18n/locales/<lang>/{common,decks}.json`
- UI text: `common.json` | Flashcard text: `decks.json`

**Usage Example:**
```typescript
import { useTranslation } from 'react-i18next';
const { t } = useTranslation(['common', 'decks']);
return <div>{t(card.front, { ns: 'decks' })}</div>;
```

**Adding a translation:**
1. Add the key to all language files.
2. Use the translation key in your code/component.
3. For flashcards, update `testDecks.ts` with the new key.

---

## 📚 Flashcard System

- **Decks:** Frontend, Backend, Fundamentals, DevOps
- **Card Structure:**
  ```typescript
  interface FlashCard {
    id: string;
    front: string; // translation key
    back: string;  // translation key
    difficulty: 'easy' | 'medium' | 'hard';
    category: string;
    tags: string[];
    lastReviewed: Date | null;
    nextReview: Date | null;
    timesReviewed: number;
    correctCount: number;
    incorrectCount: number;
    createdAt: Date;
    updatedAt: Date;
  }
  ```

---

## 🏗️ Core Components

| Component           | Purpose                                               |
|---------------------|-------------------------------------------------------|
| Navigation.tsx      | App header, language selector, user profile           |
| Dashboard.tsx       | User stats, deck progress, i18n greetings            |
| FlashCard.tsx       | 3D card, difficulty color, accessibility              |
| StudySession.tsx    | Spaced repetition session (SM-2), analytics           |
| DecksPage.tsx       | List/manage all decks                                 |
| DeckPage.tsx        | View/manage single deck                               |

**Patterns:**
- Use `React.memo` for all components
- Memoize handlers with `useCallback`
- Use `useMemo` for expensive calculations
- Integrate i18n via `useTranslation`

---

## 🔒 Security

- **CSP headers** (XSS prevention)
- **Input sanitization** (`utils/security.ts`)
- **CSRF protection** (`utils/csrf.ts`)
- **Encrypted localStorage** (`utils/secureStorage.ts`)
- **Rate limiting** for forms

---

## 🧭 Development Workflow

1. **Before You Start**
   ```bash
   git checkout main
   git pull
   git checkout -b feature/your-feature
   ```

2. **During Development**
   - Run: `npm run dev`
   - Test: `npm run test`
   - Lint: `npm run lint`
   - Format: `npm run format`

3. **Committing**
   - Use [Conventional Commits](https://www.conventionalcommits.org/):
     - `feat:`, `fix:`, `docs:`, etc.
   - Example: `git commit -m "feat: add new flashcard field for tags"`

4. **Pull Requests**
   - Push your branch: `git push origin feature/your-feature`
   - Open a PR. Add screenshots for UI changes.
   - Request review from a senior developer.

---

## ✅ How to Add...

**A New Flashcard Field:**
- Update `src/types/flashcard.ts`
- Update display components & forms
- Update tests

**A New Page:**
- Create new file in `src/pages/`
- Add lazy import and route in `src/App.tsx`
- Add to navigation (if needed)

**A New Component:**
- Use TypeScript interfaces, `React.memo`, and proper CSS variables

**A Translation Key:**
- Add to all language files (`common.json`/`decks.json`)

**A Flashcard:**
- Add translation keys to `decks.json`
- Add card data to `testDecks.ts`

---

## 🐛 Common Issues

| Error / Problem                  | Solution                                  |
|----------------------------------|-------------------------------------------|
| Module not found                 | Check file path and export/import         |
| TypeScript error (missing prop)  | Update interfaces/types                   |
| Styling not applied              | Use correct CSS class & variables         |
| Component not re-rendering       | Check memoization, state updates          |
| Translation not working          | Specify the correct namespace in `useTranslation` |

---

## 🧪 Testing & QA

- **Unit Tests:** `npm run test`
- **Type Checking:** `npx tsc --noEmit`
- **Linting:** `npm run lint`
- **Build:** `npm run build`
- **Preview:** `npm run preview`

---

## 📖 Learning & Resources

- [React 19 Docs](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vitest](https://vitest.dev)
- [Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [CSS Variables (MDN)](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)

---

## 🚀 Your First Contribution: Sample Task

**Add a "Created Date" to Flashcards**
1. Find the flashcard display component.
2. Add: `Created on: {card.createdAt.toLocaleDateString('nl-NL')}`
3. Style with CSS variables.
4. Test rendering & commit your changes.

---

## 🆘 Getting Help

- **Project Architecture:** `CLAUDE.md`
- **Component Patterns:** `src/components/CLAUDE.md`
- **TypeScript Conventions:** `src/types/CLAUDE.md`
- **Visual Overview:** `PROJECT_FLOWCHART.md`
- **Ask Questions:** Open an issue or ask a senior developer.

---

**Welcome to the Team! Read code, ask questions, test your work, and have fun helping people learn! 🚀**

---
