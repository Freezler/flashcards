/**
 * Test Deck Data
 * Sample flashcard decks for development and testing
 */

import { FlashCard, Deck, DifficultyLevel } from '../types'

// Utility function to generate UUIDs (simple version for testing)
const generateId = (): string => {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  )
}

// Helper function to create a FlashCard
const createFlashCard = (
  front: string,
  back: string,
  difficulty: DifficultyLevel,
  category: string,
  tags: string[] = []
): FlashCard => ({
  id: generateId(),
  front,
  back,
  difficulty,
  category,
  tags,
  lastReviewed: null,
  nextReview: null,
  timesReviewed: 0,
  correctCount: 0,
  incorrectCount: 0,
  createdAt: new Date(),
  updatedAt: new Date(),
})

// React Fundamentals Deck
const reactFundamentalsCards: FlashCard[] = [
  createFlashCard(
    'What is JSX?',
    'JSX is a syntax extension for JavaScript that allows you to write HTML-like code in your JavaScript files. It gets transpiled to React.createElement() calls.',
    DifficultyLevel.EASY,
    'React',
    ['jsx', 'syntax', 'fundamentals']
  ),
  createFlashCard(
    'What is the difference between state and props?',
    'Props are read-only data passed from parent to child components. State is mutable data that belongs to a component and can be changed using setState or useState.',
    DifficultyLevel.MEDIUM,
    'React',
    ['state', 'props', 'data-flow']
  ),
  createFlashCard(
    'How do you handle events in React?',
    'React uses SyntheticEvents, which are wrappers around native events. You pass event handlers as props: onClick={handleClick}. Use arrow functions or bind to preserve context.',
    DifficultyLevel.MEDIUM,
    'React',
    ['events', 'handlers', 'synthetic-events']
  ),
  createFlashCard(
    'What is the useEffect hook used for?',
    'useEffect allows you to perform side effects in functional components. It runs after every render by default, but you can control when it runs with a dependency array.',
    DifficultyLevel.HARD,
    'React',
    ['hooks', 'useEffect', 'side-effects']
  ),
  createFlashCard(
    'What is React.memo()?',
    "React.memo() is a higher-order component that memoizes the result of a component. It prevents unnecessary re-renders when props haven't changed.",
    DifficultyLevel.HARD,
    'React',
    ['optimization', 'memo', 'performance']
  ),
  createFlashCard(
    'What are React Keys?',
    'Keys help React identify which items have changed, added, or removed. They should be unique among siblings and stable across re-renders.',
    DifficultyLevel.MEDIUM,
    'React',
    ['keys', 'reconciliation', 'lists']
  ),
]

// TypeScript Basics Deck
const typescriptBasicsCards: FlashCard[] = [
  createFlashCard(
    'What is TypeScript?',
    'TypeScript is a superset of JavaScript that adds static type definitions. It helps catch errors at compile time and provides better IDE support.',
    DifficultyLevel.EASY,
    'TypeScript',
    ['basics', 'types', 'javascript']
  ),
  createFlashCard(
    'What is the difference between interface and type?',
    'Interfaces can be extended and merged, while types are more flexible and can represent unions, intersections, and computed types. Both can describe object shapes.',
    DifficultyLevel.MEDIUM,
    'TypeScript',
    ['interface', 'type', 'definitions']
  ),
  createFlashCard(
    'What are generic types?',
    'Generics allow you to create reusable components that work with multiple types. They use angle brackets: function identity<T>(arg: T): T { return arg; }',
    DifficultyLevel.HARD,
    'TypeScript',
    ['generics', 'reusability', 'functions']
  ),
  createFlashCard(
    'What is the never type?',
    "The never type represents values that never occur. It's used for functions that never return (throw errors or infinite loops) or unreachable code.",
    DifficultyLevel.HARD,
    'TypeScript',
    ['never', 'types', 'advanced']
  ),
  createFlashCard(
    'What are union types?',
    'Union types allow a value to be one of several types: string | number. Use the pipe symbol (|) to separate types.',
    DifficultyLevel.MEDIUM,
    'TypeScript',
    ['union', 'types', 'operators']
  ),
]

// JavaScript ES6+ Deck
const javascriptES6Cards: FlashCard[] = [
  createFlashCard(
    'What is destructuring?',
    'Destructuring allows you to extract values from arrays or objects into distinct variables: const {name, age} = person; const [first, second] = array;',
    DifficultyLevel.EASY,
    'JavaScript',
    ['destructuring', 'es6', 'syntax']
  ),
  createFlashCard(
    'What is the spread operator?',
    'The spread operator (...) expands elements of an iterable (array, string, object) into individual elements. Used for copying and merging.',
    DifficultyLevel.MEDIUM,
    'JavaScript',
    ['spread', 'operator', 'arrays']
  ),
  createFlashCard(
    'What is a Promise?',
    'A Promise represents an asynchronous operation that will eventually complete or fail. It has three states: pending, fulfilled, or rejected.',
    DifficultyLevel.MEDIUM,
    'JavaScript',
    ['promises', 'async', 'asynchronous']
  ),
  createFlashCard(
    'What is the difference between async/await and Promises?',
    'async/await is syntactic sugar over Promises. It makes asynchronous code look and behave more like synchronous code, making it easier to read and debug.',
    DifficultyLevel.HARD,
    'JavaScript',
    ['async', 'await', 'promises']
  ),
  createFlashCard(
    'What is a closure?',
    'A closure is when a function retains access to variables from its outer scope even after the outer function has returned. It "closes over" the variables.',
    DifficultyLevel.HARD,
    'JavaScript',
    ['closures', 'scope', 'functions']
  ),
]

// Web Development Fundamentals Deck
const webDevFundamentalsCards: FlashCard[] = [
  createFlashCard(
    'What is the difference between HTTP and HTTPS?',
    'HTTP is unsecured, while HTTPS (HTTP Secure) uses SSL/TLS encryption to secure data transmission between client and server.',
    DifficultyLevel.EASY,
    'Web Development',
    ['http', 'https', 'security']
  ),
  createFlashCard(
    'What are HTTP status codes?',
    'HTTP status codes indicate the result of an HTTP request: 2xx (success), 3xx (redirection), 4xx (client error), 5xx (server error).',
    DifficultyLevel.MEDIUM,
    'Web Development',
    ['http', 'status-codes', 'api']
  ),
  createFlashCard(
    'What is CORS?',
    'Cross-Origin Resource Sharing (CORS) is a mechanism that allows restricted resources on a web page to be requested from another domain.',
    DifficultyLevel.HARD,
    'Web Development',
    ['cors', 'security', 'api']
  ),
  createFlashCard(
    'What is the DOM?',
    'The Document Object Model (DOM) is a programming interface for HTML documents. It represents the page as a tree of nodes that can be manipulated.',
    DifficultyLevel.MEDIUM,
    'Web Development',
    ['dom', 'html', 'manipulation']
  ),
]

// Create deck helper function
const createDeck = (
  name: string,
  description: string,
  cards: FlashCard[]
): Deck => ({
  id: generateId(),
  name,
  description,
  cards,
  createdAt: new Date(),
  updatedAt: new Date(),
  isActive: true,
  totalCards: cards.length,
  reviewedCards: 0,
})

// Export test decks
export const testDecks: Deck[] = [
  createDeck(
    'React Fundamentals',
    'Essential React concepts and patterns for building modern web applications',
    reactFundamentalsCards
  ),
  createDeck(
    'TypeScript Basics',
    'Core TypeScript concepts for type-safe JavaScript development',
    typescriptBasicsCards
  ),
  createDeck(
    'JavaScript ES6+',
    'Modern JavaScript features and syntax improvements',
    javascriptES6Cards
  ),
  createDeck(
    'Web Development Fundamentals',
    'Core concepts every web developer should know',
    webDevFundamentalsCards
  ),
]

// Export individual decks for convenience
export const [
  reactFundamentalsDeck,
  typescriptBasicsDeck,
  javascriptES6Deck,
  webDevFundamentalsDeck,
] = testDecks

// Export statistics for dashboard
export const getTestDeckStats = () => ({
  totalDecks: testDecks.length,
  totalCards: testDecks.reduce((sum, deck) => sum + deck.totalCards, 0),
  studyStreak: 0,
  cardsToReview: testDecks.reduce((sum, deck) => sum + deck.totalCards, 0),
})

// Export cards by difficulty for testing
export const getCardsByDifficulty = (
  difficulty: DifficultyLevel
): FlashCard[] => {
  return testDecks
    .flatMap(deck => deck.cards)
    .filter(card => card.difficulty === difficulty)
}

// Export cards by category
export const getCardsByCategory = (category: string): FlashCard[] => {
  return testDecks
    .flatMap(deck => deck.cards)
    .filter(card => card.category === category)
}
