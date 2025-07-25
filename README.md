# 🧠 Web Development Flashcards App

A modern, intelligent flashcard application built with React 19 and TypeScript for learning web development concepts, frontend/backend technologies and DevOps tools.

![React](https://img.shields.io/badge/React-19.1.0-61dafb?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178c6?style=for-the-badge&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7.0-646cff?style=for-the-badge&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1-06b6d4?style=for-the-badge&logo=tailwindcss)

## ✨ Features

### 🎯 Core Functionality

- **4 Web Development Decks** - 41 cards covering frontend development, backend development, web fundamentals and DevOps
- **Intelligent Spaced Repetition** - SM-2 algorithm for optimal memory retention
- **Interactive Flashcards** - Multiple UI variants (Original, Beautiful, Elite, 2025) with 3D flip animations
- **Advanced Study Sessions** - Progress tracking, response time analysis and session analytics
- **Complete CRUD Operations** - Create, edit and delete your own cards and decks
- **Comprehensive Security** - CSRF protection, input sanitization, and secure storage
- **Full Accessibility** - WCAG AA compliant with screen reader support

### 🎨 User Experience

- **Fully Responsive Design** - Optimized for mobile, tablet and desktop
- **Modern CSS with OKLCH Colors** - Beautiful gradients and fluid typography
- **Multiple UI Experiments** - Exploring different design approaches (Beautiful, Elite, 2025 variants)
- **CSS Masters Implementation** - Phase 1 complete with @property declarations, professional easing, container queries
- **Universal Accessibility** - Keyboard navigation, screen readers, high contrast support
- **Security Headers** - CSP, X-Frame-Options, and comprehensive protection
- **Offline-First** - Secure localStorage persistence for offline use

### 🚀 Performance & Security

- **React 19 Latest Features** - With strict TypeScript and modern hooks
- **Code Splitting & Lazy Loading** - Optimized bundle with dynamic imports (needs optimization)
- **Bundle Size** - ~600KB+ total bundle (optimization in progress)
- **Security Hardened** - CSRF tokens, input sanitization, rate limiting
- **Development Active** - Multiple experimental components and UI variants
- **Comprehensive Test Suite** - Vitest with Testing Library
- **ESLint + Prettier** - Automatic code formatting and linting
- **Git Workflow** - Feature branches with protected main branch

## 📚 Web Development Content

### 💻 Available Decks

1. **Frontend Development** (12 cards) - React, JavaScript, CSS, TypeScript fundamentals
2. **Backend Development** (10 cards) - REST APIs, databases, Node.js, authentication
3. **Web Development Fundamentals** (10 cards) - Git, HTTP, responsive design, accessibility
4. **DevOps & Tools** (9 cards) - Docker, CI/CD, webpack, build tools

### 📊 Learning Statistics

- **41 Total Cards** distributed across 3 difficulty levels (Easy/Medium/Hard)
- **Tech-Focused Content** - From basic web concepts to advanced development topics
- **Educational Quality** - Practical web development knowledge for interviews and work
- **Language Support** - i18n infrastructure with translation keys (content primarily English)

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

- **Bundle Size**: ~600KB+ total bundle (optimization needed)
- **Code Splitting**: 8+ lazy-loaded page chunks with experimental components
- **First Contentful Paint**: Varies (optimization in progress)
- **React.memo Optimized** - Prevented unnecessary re-renders
- **Development Status** - Multiple UI variants causing bundle bloat
- **CSS Masters Phase 1** - Modern CSS optimizations implemented
- **Mobile Responsive** - Responsive design for all screen sizes (multiple variants)

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

## 🛡️ Security & Accessibility

### Security Features

- **CSRF Protection** - Token-based form security
- **Input Sanitization** - XSS protection met comprehensive validation
- **Secure Storage** - Encrypted localStorage wrapper
- **Rate Limiting** - Form submission abuse protection
- **Security Headers** - CSP, X-Frame-Options, X-Content-Type-Options
- **Content Security Policy** - Restrictive CSP voor script injection protection

### Accessibility Features

- **WCAG AA Compliant** - Full compliance with accessibility standards
- **Screen Reader Support** - Complete ARIA labels en semantic HTML
- **Keyboard Navigation** - Full keyboard accessibility
- **High Contrast Support** - Automatic adaptation voor visual impairments
- **Reduced Motion Support** - Respects user preferences voor animations
- **Focus Management** - Proper focus indicators en management

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
- **Security First** - All user input must be sanitized
- **Accessibility First** - All features must be accessible

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
  <strong>Gemaakt met ❤️ voor web developers en tech studenten</strong>
</p>

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-nederlandse-content">Content</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-quick-start">Quick Start</a> •
  <a href="#-contributing">Contributing</a>
</p>
