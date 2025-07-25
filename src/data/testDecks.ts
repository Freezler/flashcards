/**
 * Test Deck Data
 * Web Development flashcard decks for development and testing
 */

import { FlashCard, Deck, DifficultyLevel } from '../types'

// Helper function to create a FlashCard
// Counter for creating unique but static IDs
let cardIdCounter = 1

const createFlashCard = (
  frontKey: string,
  backKey: string,
  difficulty: DifficultyLevel,
  category: string,
  tags: string[] = []
): FlashCard => ({
  id: `card-${cardIdCounter++}`,
  front: frontKey, // Now stores translation key
  back: backKey, // Now stores translation key
  difficulty,
  category,
  tags,
  lastReviewed: null,
  nextReview: null,
  timesReviewed: 0,
  correctCount: 0,
  incorrectCount: 0,
  createdAt: new Date('2024-01-01T10:00:00.000Z'),
  updatedAt: new Date('2024-01-01T10:00:00.000Z'),
})

// Frontend Development Deck
const frontendDevelopmentCards: FlashCard[] = [
  createFlashCard(
    'decks:frontend.cards.react-basics.front',
    'decks:frontend.cards.react-basics.back',
    DifficultyLevel.EASY,
    'Frontend',
    ['react', 'javascript', 'ui', 'components']
  ),
  createFlashCard(
    'decks:frontend.cards.js-variables.front',
    'decks:frontend.cards.js-variables.back',
    DifficultyLevel.MEDIUM,
    'Frontend',
    ['javascript', 'variables', 'scope']
  ),
  createFlashCard(
    'decks:frontend.cards.css-grid.front',
    'decks:frontend.cards.css-grid.back',
    DifficultyLevel.MEDIUM,
    'Frontend',
    ['css', 'grid', 'layout']
  ),
  createFlashCard(
    'decks:frontend.cards.virtual-dom.front',
    'decks:frontend.cards.virtual-dom.back',
    DifficultyLevel.MEDIUM,
    'Frontend',
    ['react', 'virtual-dom', 'performance']
  ),
  createFlashCard(
    'decks:frontend.cards.typescript.front',
    'decks:frontend.cards.typescript.back',
    DifficultyLevel.EASY,
    'Frontend',
    ['typescript', 'javascript', 'types']
  ),
  createFlashCard(
    'decks:frontend.cards.js-equality.front',
    'decks:frontend.cards.js-equality.back',
    DifficultyLevel.MEDIUM,
    'Frontend',
    ['javascript', 'comparison', 'operators']
  ),
  createFlashCard(
    'decks:frontend.cards.css-flexbox.front',
    'decks:frontend.cards.css-flexbox.back',
    DifficultyLevel.EASY,
    'Frontend',
    ['css', 'flexbox', 'layout']
  ),
  createFlashCard(
    'decks:frontend.cards.react-hooks.front',
    'decks:frontend.cards.react-hooks.back',
    DifficultyLevel.MEDIUM,
    'Frontend',
    ['react', 'hooks', 'functional-components']
  ),
  createFlashCard(
    'decks:frontend.cards.null-undefined.front',
    'decks:frontend.cards.null-undefined.back',
    DifficultyLevel.MEDIUM,
    'Frontend',
    ['javascript', 'null', 'undefined']
  ),
  createFlashCard(
    'decks:frontend.cards.event-delegation.front',
    'decks:frontend.cards.event-delegation.back',
    DifficultyLevel.HARD,
    'Frontend',
    ['javascript', 'events', 'delegation']
  ),
  createFlashCard(
    'decks:frontend.cards.css-box-model.front',
    'decks:frontend.cards.css-box-model.back',
    DifficultyLevel.EASY,
    'Frontend',
    ['css', 'box-model', 'layout']
  ),
  createFlashCard(
    'decks:frontend.cards.js-closure.front',
    'decks:frontend.cards.js-closure.back',
    DifficultyLevel.HARD,
    'Frontend',
    ['javascript', 'closure', 'scope']
  ),
]

// Backend Development Deck
const backendDevelopmentCards: FlashCard[] = [
  createFlashCard(
    'decks:backend.cards.rest-api.front',
    'decks:backend.cards.rest-api.back',
    DifficultyLevel.EASY,
    'Backend',
    ['rest', 'api', 'http', 'web-services']
  ),
  createFlashCard(
    'decks:backend.cards.sql-nosql.front',
    'decks:backend.cards.sql-nosql.back',
    DifficultyLevel.MEDIUM,
    'Backend',
    ['database', 'sql', 'nosql']
  ),
  createFlashCard(
    'decks:backend.cards.nodejs.front',
    'decks:backend.cards.nodejs.back',
    DifficultyLevel.EASY,
    'Backend',
    ['nodejs', 'javascript', 'server']
  ),
  createFlashCard(
    'decks:backend.cards.http-status.front',
    'decks:backend.cards.http-status.back',
    DifficultyLevel.MEDIUM,
    'Backend',
    ['http', 'status-codes', 'web']
  ),
  createFlashCard(
    'decks:backend.cards.middleware.front',
    'decks:backend.cards.middleware.back',
    DifficultyLevel.MEDIUM,
    'Backend',
    ['express', 'middleware', 'nodejs']
  ),
  createFlashCard(
    'decks:backend.cards.auth-authz.front',
    'decks:backend.cards.auth-authz.back',
    DifficultyLevel.MEDIUM,
    'Backend',
    ['auth', 'security', 'permissions']
  ),
  createFlashCard(
    'decks:backend.cards.jwt.front',
    'decks:backend.cards.jwt.back',
    DifficultyLevel.MEDIUM,
    'Backend',
    ['jwt', 'token', 'authentication']
  ),
  createFlashCard(
    'decks:backend.cards.normalization.front',
    'decks:backend.cards.normalization.back',
    DifficultyLevel.HARD,
    'Backend',
    ['database', 'normalization', 'sql']
  ),
  createFlashCard(
    'decks:backend.cards.put-patch.front',
    'decks:backend.cards.put-patch.back',
    DifficultyLevel.MEDIUM,
    'Backend',
    ['http', 'rest', 'api']
  ),
  createFlashCard(
    'decks:backend.cards.cors.front',
    'decks:backend.cards.cors.back',
    DifficultyLevel.MEDIUM,
    'Backend',
    ['cors', 'security', 'web']
  ),
]

// General Web Development Deck
const generalWebDevCards: FlashCard[] = [
  createFlashCard(
    'decks:fundamentals.cards.git.front',
    'decks:fundamentals.cards.git.back',
    DifficultyLevel.EASY,
    'General',
    ['git', 'version-control', 'collaboration']
  ),
  createFlashCard(
    'decks:fundamentals.cards.get-post.front',
    'decks:fundamentals.cards.get-post.back',
    DifficultyLevel.EASY,
    'General',
    ['http', 'get', 'post']
  ),
  createFlashCard(
    'decks:fundamentals.cards.https.front',
    'decks:fundamentals.cards.https.back',
    DifficultyLevel.EASY,
    'General',
    ['https', 'security', 'ssl', 'tls']
  ),
  createFlashCard(
    'decks:fundamentals.cards.responsive.front',
    'decks:fundamentals.cards.responsive.back',
    DifficultyLevel.EASY,
    'General',
    ['responsive', 'css', 'mobile-first']
  ),
  createFlashCard(
    'decks:fundamentals.cards.cookies-localstorage.front',
    'decks:fundamentals.cards.cookies-localstorage.back',
    DifficultyLevel.MEDIUM,
    'General',
    ['cookies', 'localStorage', 'web-storage']
  ),
  createFlashCard(
    'decks:fundamentals.cards.cdn.front',
    'decks:fundamentals.cards.cdn.back',
    DifficultyLevel.MEDIUM,
    'General',
    ['cdn', 'performance', 'caching']
  ),
  createFlashCard(
    'decks:fundamentals.cards.semantic-html.front',
    'decks:fundamentals.cards.semantic-html.back',
    DifficultyLevel.EASY,
    'General',
    ['html', 'semantic', 'accessibility']
  ),
  createFlashCard(
    'decks:fundamentals.cards.csr-ssr.front',
    'decks:fundamentals.cards.csr-ssr.back',
    DifficultyLevel.MEDIUM,
    'General',
    ['rendering', 'csr', 'ssr']
  ),
  createFlashCard(
    'decks:fundamentals.cards.pwa.front',
    'decks:fundamentals.cards.pwa.back',
    DifficultyLevel.MEDIUM,
    'General',
    ['pwa', 'offline', 'mobile']
  ),
  createFlashCard(
    'decks:fundamentals.cards.accessibility.front',
    'decks:fundamentals.cards.accessibility.back',
    DifficultyLevel.MEDIUM,
    'General',
    ['accessibility', 'a11y', 'aria']
  ),
]

// DevOps & Tools Deck
const devOpsToolsCards: FlashCard[] = [
  createFlashCard(
    'decks:devops.cards.docker.front',
    'decks:devops.cards.docker.back',
    DifficultyLevel.MEDIUM,
    'DevOps',
    ['docker', 'containers', 'deployment']
  ),
  createFlashCard(
    'decks:devops.cards.ci-cd.front',
    'decks:devops.cards.ci-cd.back',
    DifficultyLevel.MEDIUM,
    'DevOps',
    ['ci-cd', 'automation', 'deployment']
  ),
  createFlashCard(
    'decks:devops.cards.webpack.front',
    'decks:devops.cards.webpack.back',
    DifficultyLevel.MEDIUM,
    'DevOps',
    ['webpack', 'bundler', 'build-tools']
  ),
  createFlashCard(
    'decks:devops.cards.npm.front',
    'decks:devops.cards.npm.back',
    DifficultyLevel.EASY,
    'DevOps',
    ['npm', 'package-manager', 'nodejs']
  ),
  createFlashCard(
    'decks:devops.cards.npm-install-ci.front',
    'decks:devops.cards.npm-install-ci.back',
    DifficultyLevel.MEDIUM,
    'DevOps',
    ['npm', 'ci', 'dependencies']
  ),
  createFlashCard(
    'decks:devops.cards.kubernetes.front',
    'decks:devops.cards.kubernetes.back',
    DifficultyLevel.HARD,
    'DevOps',
    ['kubernetes', 'orchestration', 'containers']
  ),
  createFlashCard(
    'decks:devops.cards.env-vars.front',
    'decks:devops.cards.env-vars.back',
    DifficultyLevel.EASY,
    'DevOps',
    ['env-vars', 'configuration', 'security']
  ),
  createFlashCard(
    'decks:devops.cards.load-balancing.front',
    'decks:devops.cards.load-balancing.back',
    DifficultyLevel.MEDIUM,
    'DevOps',
    ['load-balancing', 'scaling', 'performance']
  ),
]

// Create decks
export const frontendDevelopmentDeck: Deck = {
  id: 'frontend-dev-001',
  name: 'Frontend Development',
  description:
    'Master modern frontend technologies including React, JavaScript, CSS, and TypeScript',
  cards: frontendDevelopmentCards,
  totalCards: frontendDevelopmentCards.length,
  isActive: true,
  reviewedCards: 0,
  createdAt: new Date('2024-01-01T09:00:00.000Z'),
  updatedAt: new Date('2024-01-01T09:00:00.000Z'),
}

export const backendDevelopmentDeck: Deck = {
  id: 'backend-dev-001',
  name: 'Backend Development',
  description:
    'Learn server-side development with APIs, databases, authentication, and Node.js',
  cards: backendDevelopmentCards,
  totalCards: backendDevelopmentCards.length,
  isActive: true,
  reviewedCards: 0,
  createdAt: new Date('2024-01-01T09:00:00.000Z'),
  updatedAt: new Date('2024-01-01T09:00:00.000Z'),
}

export const generalWebDevDeck: Deck = {
  id: 'general-webdev-001',
  name: 'Web Development Fundamentals',
  description:
    'Essential web development concepts including HTTP, Git, responsive design, and web standards',
  cards: generalWebDevCards,
  totalCards: generalWebDevCards.length,
  isActive: true,
  reviewedCards: 0,
  createdAt: new Date('2024-01-01T09:00:00.000Z'),
  updatedAt: new Date('2024-01-01T09:00:00.000Z'),
}

export const devOpsToolsDeck: Deck = {
  id: 'devops-tools-001',
  name: 'DevOps & Tools',
  description:
    'Development tools and DevOps practices including Docker, CI/CD, build tools, and deployment',
  cards: devOpsToolsCards,
  totalCards: devOpsToolsCards.length,
  isActive: true,
  reviewedCards: 0,
  createdAt: new Date('2024-01-01T09:00:00.000Z'),
  updatedAt: new Date('2024-01-01T09:00:00.000Z'),
}

// Export all decks as an array
export const testDecks: Deck[] = [
  frontendDevelopmentDeck,
  backendDevelopmentDeck,
  generalWebDevDeck,
  devOpsToolsDeck,
]

// Utility functions
export const getTestDeckStats = () => {
  const totalCards = testDecks.reduce((sum, deck) => sum + deck.totalCards, 0)
  return {
    totalDecks: testDecks.length,
    totalCards,
    studyStreak: 3, // Mock data
    cardsToReview: 8, // Mock data
  }
}

export const getCardsByDifficulty = (
  difficulty: DifficultyLevel
): FlashCard[] => {
  return testDecks
    .flatMap(deck => deck.cards)
    .filter(card => card.difficulty === difficulty)
}

export const getCardsByCategory = (category: string): FlashCard[] => {
  return testDecks
    .flatMap(deck => deck.cards)
    .filter(card => card.category.toLowerCase() === category.toLowerCase())
}

export const getAllCards = (): FlashCard[] => {
  return testDecks.flatMap(deck => deck.cards)
}

// Export individual card arrays for specific use cases
export {
  frontendDevelopmentCards,
  backendDevelopmentCards,
  generalWebDevCards,
  devOpsToolsCards,
}
