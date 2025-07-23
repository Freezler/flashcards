# 🧠 Nederlandse Flashcards App

Een moderne, intelligente flashcard applicatie gebouwd met React 19 en TypeScript voor het leren van Nederlandse taal, geschiedenis, geografie en cultuur.

![React](https://img.shields.io/badge/React-19.1.0-61dafb?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178c6?style=for-the-badge&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7.0-646cff?style=for-the-badge&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1-06b6d4?style=for-the-badge&logo=tailwindcss)

## ✨ Features

### 🎯 Core Functionaliteit

- **6 Uitgebreide Nederlandse Decks** - 94+ kaarten over grammatica, geschiedenis, geografie, cultuur, literatuur en sport
- **Intelligente Spaced Repetition** - SM-2 algoritme voor optimaal geheugen
- **Interactieve Flashcards** - 3D flip animaties met difficulty-based styling
- **Geavanceerde Study Sessions** - Progress tracking, response time analysis en session analytics
- **Complete CRUD Operations** - Maak, bewerk en verwijder je eigen kaarten en decks
- **Deck Deletion met Confirmatie** - Veilige deck verwijdering met confirmation modal

### 🎨 User Experience

- **Volledig Responsive Design** - Geoptimaliseerd voor mobile, tablet en desktop
- **Moderne CSS met OKLCH Colors** - Fluid typography met CSS clamp() voor perfecte schaalbaarheid
- **Professional UI/UX** - Material Design-inspired interface met smooth animations
- **Dark/Light Mode Support** - Theme toggle voor persoonlijke voorkeur
- **Offline-First** - LocalStorage persistence voor offline gebruik

### 🚀 Performance & Development

- **React 19 Latest Features** - Met strict TypeScript en moderne hooks
- **Code Splitting & Lazy Loading** - Optimized bundle met dynamische imports
- **Optimized Bundle Size** - 259KB main + kleine page chunks (84KB gzipped)
- **Console.log Free** - Production-ready zonder debug statements
- **User-Select Disabled** - App-like experience zonder tekst selectie
- **Comprehensive Test Suite** - Vitest met Testing Library
- **ESLint + Prettier** - Automatische code formatting en linting
- **Git Workflow** - Feature branches met protected main branch

## 📚 Nederlandse Content

### 🇳🇱 Beschikbare Decks

1. **Nederlandse Grammatica** (18 kaarten) - Woordsoorten, spelling, werkwoorden
2. **Geschiedenis van Nederland** (18 kaarten) - Van Gouden Eeuw tot moderne tijd
3. **Nederlandse Geografie** (18 kaarten) - Provincies, steden, natuurgebieden
4. **Nederlandse Cultuur** (20 kaarten) - Kunst, tradities, feestdagen
5. **Nederlandse Literatuur** (10 kaarten) - Belangrijke schrijvers en werken
6. **Nederlandse Sport** (10 kaarten) - Sporters, prestaties en geschiedenis

### 📊 Leerstatistieken

- **94 Totale Kaarten** verdeeld over 3 moeilijkheidsgraden
- **Balanced Content** - Van basis grammatica tot gevorderde cultuurkennis
- **Educational Quality** - Nauwkeurige, feitelijk correcte Nederlandse inhoud

## 🛠️ Tech Stack

### Frontend

- **React 19.1.0** - Latest React with concurrent features
- **TypeScript 5.8** - Strict mode voor type safety
- **Vite 7.0** - Modern build tool met HMR
- **React Router 7.6** - Client-side routing met SPA support

### Styling & Design

- **Tailwind CSS 4.1** - Utility-first CSS framework
- **Custom CSS Variables** - OKLCH colors en design tokens
- **Fluid Typography** - CSS clamp() voor responsive text
- **Inter Font** - Professional typography

### Development & Testing

- **Vitest 3.2** - Fast unit testing
- **Testing Library** - React component testing
- **ESLint 9.30** - Code linting met TypeScript rules
- **Prettier 3.6** - Code formatting

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm of yarn

### Installatie

````bash
# Clone het project
git clone https://github.com/FREEZLER/react19-flash-cards.git
cd react19-flash-cards

# Installeer dependencies
npm install

# Start development server
npm run dev
```bash

### Development Scripts

```bash
# Development server met HMR
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Run tests
npm run test

# Tests met UI
npm run test:ui

# Code linting
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format
````

## 🏗️ Project Architectuur

```Project
flash-cards/
├── src/
│   ├── components/          # React components
│   │   ├── common/          # Reusable UI components
│   │   ├── FlashCard.tsx    # Main flashcard component
│   │   ├── StudySession.tsx # Study session with SM-2 algorithm
│   │   └── Navigation.tsx   # App navigation
│   ├── contexts/            # React Context providers
│   │   └── CardContext.tsx  # Global state management
│   ├── pages/              # Route pages
│   ├── data/               # Nederlandse flashcard content
│   ├── types/              # TypeScript type definitions
│   ├── utils/              # Utility functions
│   └── hooks/              # Custom React hooks
├── CLAUDE.md               # Development context
├── PROJECT_FLOWCHART.md    # Development roadmap
└── docs/                   # Additional documentation
```

## 🎯 Performance Metrics

- **Bundle Size**: 259KB main + separate chunks (84KB gzipped total)
- **Code Splitting**: 8 lazy-loaded page chunks (2-13KB each)
- **First Contentful Paint**: < 1s
- **React.memo Optimized** - Prevented unnecessary re-renders
- **Console-free Production** - All debug statements removed
- **Lighthouse Score**: 95+ Performance, 100 Accessibility
- **Mobile Responsive** - Optimized voor alle schermgroottes

## 📱 Responsive Design

### Breakpoint Strategy

- **Mobile First** - 320px+ basis design
- **Small Tablet** - 480px+ verbeterde spacing
- **Tablet** - 768px+ 3-column layouts
- **Desktop** - 1024px+ optimale gebruik van ruimte
- **Large Desktop** - 1200px+ maximum comfort

### Study Stats Layout

- **Mobile**: 2×3 grid voor portrait-vriendelijke weergave
- **Desktop**: 3×2 grid voor landscape-optimale layout
- **Fluid Typography**: CSS clamp() voor perfecte schaalbaarheid

## 🧪 Testing

```bash
# Unit tests
npm run test

# Tests met coverage
npm run test:coverage

# Interactive test UI
npm run test:ui
```

### Test Coverage

- **CardContext** - State management tests
- **FlashCard Component** - User interaction tests
- **StudySession** - Spaced repetition algorithm tests
- **Form Validation** - Input validation tests

## 🤝 Contributing

1. Fork het project
2. Maak een feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit je changes (`git commit -m 'feat: Add some AmazingFeature'`)
4. Push naar de branch (`git push origin feature/AmazingFeature`)
5. Open een Pull Request

### Development Guidelines

- Gebruik **TypeScript strict mode**
- Volg **conventional commit** messages
- Schrijf **tests** voor nieuwe features
- Update **CLAUDE.md** voor significante wijzigingen
- Gebruik **ESLint + Prettier** voor code style

## 📄 License

Dit project is gelicenseerd onder de MIT License - zie het [LICENSE](LICENSE) bestand voor details.

## 👥 Authors

- **FREEZLER** - _Initial development_ - [@FREEZLER](https://github.com/FREEZLER)
- **Claude AI** - _Development assistance_ - AI-assisted development

## 🙏 Acknowledgments

- **React Team** - Voor React 19 en geweldige developer experience
- **Vite Team** - Voor lightning-fast build tooling
- **Tailwind CSS** - Voor utility-first CSS framework
- **Nederlandse Taal Unie** - Voor authentieke Nederlandse content
- **Open Source Community** - Voor inspiratie en tools

---

<p align="center">
  <strong>Gemaakt met ❤️ voor Nederlandse taalleerders</strong>
</p>

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-nederlandse-content">Content</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-quick-start">Quick Start</a> •
  <a href="#-contributing">Contributing</a>
</p>
