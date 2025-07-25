import React, { useState } from 'react'
import FlashCard2025 from '../components/FlashCard2025'
import { FlashCard, DifficultyLevel } from '../types'

const sampleCards: FlashCard[] = [
  {
    id: 'demo-1',
    front: 'decks:frontend.cards.react-basics.front',
    back: 'decks:frontend.cards.react-basics.back',
    difficulty: DifficultyLevel.EASY,
    category: 'Frontend',
    tags: ['react', 'javascript', 'ui'],
    lastReviewed: null,
    nextReview: null,
    timesReviewed: 5,
    correctCount: 4,
    incorrectCount: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'demo-2',
    front: 'decks:backend.cards.rest-api.front',
    back: 'decks:backend.cards.rest-api.back',
    difficulty: DifficultyLevel.MEDIUM,
    category: 'Backend',
    tags: ['api', 'rest', 'http'],
    lastReviewed: null,
    nextReview: null,
    timesReviewed: 8,
    correctCount: 6,
    incorrectCount: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'demo-3',
    front: 'decks:devops.cards.docker.front',
    back: 'decks:devops.cards.docker.back',
    difficulty: DifficultyLevel.HARD,
    category: 'DevOps',
    tags: ['docker', 'containers', 'deployment'],
    lastReviewed: null,
    nextReview: null,
    timesReviewed: 3,
    correctCount: 1,
    incorrectCount: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

const Design2025Demo: React.FC = () => {
  const [selectedCard, setSelectedCard] = useState<FlashCard>(sampleCards[0])

  const handleAnswer = (cardId: string, isCorrect: boolean, responseTime?: number) => {
    console.log(`Card ${cardId} answered ${isCorrect ? 'correctly' : 'incorrectly'} in ${responseTime}ms`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent mb-4">
            2025 Design System
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Experience the future of flashcard learning with glassmorphism, modern interactions, and cutting-edge design patterns.
          </p>
        </header>

        {/* Design Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="card-2025 glass-surface p-8 text-center">
            <div className="text-4xl mb-4">🪟</div>
            <h3 className="text-xl font-semibold mb-3">Glassmorphism</h3>
            <p className="text-gray-600">
              Frosted glass effects with backdrop blur and layered transparency for modern depth.
            </p>
          </div>
          
          <div className="card-2025 glass-surface p-8 text-center">
            <div className="text-4xl mb-4">✨</div>
            <h3 className="text-xl font-semibold mb-3">Micro-interactions</h3>
            <p className="text-gray-600">
              Smooth animations and haptic feedback that respond to every user interaction.
            </p>
          </div>
          
          <div className="card-2025 glass-surface p-8 text-center">
            <div className="text-4xl mb-4">🎨</div>
            <h3 className="text-xl font-semibold mb-3">OKLCH Colors</h3>
            <p className="text-gray-600">
              Modern color system with perceptually uniform colors and adaptive contrast.
            </p>
          </div>
        </div>

        {/* Interactive Demo Section */}
        <div className="card-2025 glass-surface p-8 mb-16">
          <h2 className="text-3xl font-semibold text-center mb-8">Interactive FlashCard Demo</h2>
          
          {/* Card Selector */}
          <div className="flex justify-center gap-4 mb-8">
            {sampleCards.map((card) => (
              <button
                key={card.id}
                onClick={() => setSelectedCard(card)}
                className={`btn-2025 ${
                  selectedCard.id === card.id ? 'btn-2025--primary' : 'btn-2025--ghost'
                }`}
              >
                <div className={`difficulty-pill difficulty-pill--${card.difficulty.toLowerCase()}`}>
                  {card.difficulty}
                </div>
                {card.category}
              </button>
            ))}
          </div>

          {/* FlashCard Demo */}
          <div className="flex justify-center">
            <div className="w-full max-w-md">
              <FlashCard2025
                card={selectedCard}
                onAnswer={handleAnswer}
                showActions={true}
                showStats={true}
                size="large"
              />
            </div>
          </div>
        </div>

        {/* Button Showcase */}
        <div className="card-2025 glass-surface p-8 mb-16">
          <h2 className="text-3xl font-semibold text-center mb-8">Modern Button System</h2>
          
          <div className="flex flex-wrap justify-center gap-4">
            <button className="btn-2025 btn-2025--primary">
              <span>🚀</span>
              Primary Action
            </button>
            
            <button className="btn-2025 btn-2025--ghost">
              <span>📝</span>
              Secondary Action
            </button>
            
            <button className="btn-2025 btn-2025--ghost text-green-600 border-green-200 hover:bg-green-50">
              <span>✅</span>
              Success Action
            </button>
            
            <button className="btn-2025 btn-2025--ghost text-red-600 border-red-200 hover:bg-red-50">
              <span>❌</span>
              Danger Action
            </button>
          </div>
        </div>

        {/* Difficulty Pills Showcase */}
        <div className="card-2025 glass-surface p-8 mb-16">
          <h2 className="text-3xl font-semibold text-center mb-8">Difficulty Indicators</h2>
          
          <div className="flex justify-center gap-6">
            <div className="difficulty-pill difficulty-pill--easy text-lg">
              <div className="w-3 h-3 rounded-full bg-current opacity-70"></div>
              Easy
            </div>
            
            <div className="difficulty-pill difficulty-pill--medium text-lg">
              <div className="w-3 h-3 rounded-full bg-current opacity-70"></div>
              Medium
            </div>
            
            <div className="difficulty-pill difficulty-pill--hard text-lg">
              <div className="w-3 h-3 rounded-full bg-current opacity-70"></div>
              Hard
            </div>
          </div>
        </div>

        {/* Color Palette */}
        <div className="card-2025 glass-surface p-8">
          <h2 className="text-3xl font-semibold text-center mb-8">OKLCH Color System</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { name: 'Primary 100', color: 'var(--primary-100)' },
              { name: 'Primary 300', color: 'var(--primary-300)' },
              { name: 'Primary 500', color: 'var(--primary-500)' },
              { name: 'Primary 700', color: 'var(--primary-700)' },
              { name: 'Primary 900', color: 'var(--primary-900)' },
            ].map((colorSwatch) => (
              <div key={colorSwatch.name} className="text-center">
                <div
                  className="w-full h-16 rounded-lg mb-2 border border-gray-200"
                  style={{ backgroundColor: colorSwatch.color }}
                ></div>
                <div className="text-sm font-medium">{colorSwatch.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center mt-16 py-8">
          <p className="text-gray-500">
            🚀 Ready to modernize your app with 2025 design trends? This is just the beginning!
          </p>
        </footer>
      </div>
    </div>
  )
}

export default Design2025Demo