import React, { useState, useEffect } from 'react'
import FlashCardElite from '../components/FlashCardElite'
import { FlashCard, DifficultyLevel } from '../types'

const sampleCards: FlashCard[] = [
  {
    id: 'elite-1',
    front: 'decks:frontend.cards.react-basics.front',
    back: 'decks:frontend.cards.react-basics.back',
    difficulty: DifficultyLevel.EASY,
    category: 'Frontend',
    tags: ['react', 'javascript', 'ui'],
    lastReviewed: null,
    nextReview: null,
    timesReviewed: 12,
    correctCount: 10,
    incorrectCount: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'elite-2',
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
    id: 'elite-3',
    front: 'decks:devops.cards.docker.front',
    back: 'decks:devops.cards.docker.back',
    difficulty: DifficultyLevel.HARD,
    category: 'DevOps',
    tags: ['docker', 'containers', 'deployment'],
    lastReviewed: null,
    nextReview: null,
    timesReviewed: 15,
    correctCount: 9,
    incorrectCount: 6,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

const CSSMastersDemo: React.FC = () => {
  const [selectedCard, setSelectedCard] = useState<FlashCard>(sampleCards[0])
  const [showAdvancedFeatures, setShowAdvancedFeatures] = useState(true)
  const [currentTime, setCurrentTime] = useState(new Date())

  // Update time every second for dynamic content
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const handleAnswer = (cardId: string, isCorrect: boolean, responseTime?: number) => {
    console.log(`Card ${cardId} answered ${isCorrect ? 'correctly' : 'incorrectly'} in ${responseTime}ms`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100 page-transition">
      {/* Scroll progress indicator */}
      <div className="scroll-progress"></div>
      
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section with CSS Masters Attribution */}
        <header className="text-center mb-16 card-reveal">
          <h1 className="text-6xl font-bold gradient-text mb-6 animate-in">
            CSS Masters 2025 Edition
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8 animate-in" style={{ animationDelay: '200ms' }}>
            Featuring cutting-edge techniques from the legends: 
            <strong className="gradient-text"> CSS-Tricks, Kevin Powell, Jhey Tompkins, and Wes Bos</strong>
          </p>
          
          {/* Live clock with modern typography */}
          <div className="glass-surface card-2025 inline-block px-6 py-3 animate-in" style={{ animationDelay: '400ms' }}>
            <div className="text-sm font-medium opacity-70">Current Time</div>
            <div className="text-2xl font-bold gradient-text">
              {currentTime.toLocaleTimeString()}
            </div>
          </div>
        </header>

        {/* Feature Toggle */}
        <div className="card-2025 glass-surface p-6 mb-12 card-reveal">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold mb-2">Advanced Animations</h2>
              <p className="text-gray-600">Enable scroll-driven animations, magnetic interactions, and view transitions</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={showAdvancedFeatures}
                onChange={(e) => setShowAdvancedFeatures(e.target.checked)}
                className="sr-only"
              />
              <div className={`w-11 h-6 rounded-full transition-all duration-300 ${
                showAdvancedFeatures 
                  ? 'bg-gradient-to-r from-primary-500 to-primary-700' 
                  : 'bg-gray-300'
              }`}>
                <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                  showAdvancedFeatures ? 'translate-x-5' : 'translate-x-0'
                } mt-0.5 ml-0.5`} />
              </div>
            </label>
          </div>
        </div>

        {/* CSS Masters Techniques Showcase */}
        <div className="dashboard-grid mb-16">
          {/* Scroll-Driven Animations */}
          <div className="card-2025 glass-surface p-8 text-center card-reveal">
            <div className="text-4xl mb-4">📜</div>
            <h3 className="text-xl font-semibold mb-3 gradient-text">Scroll-Driven Animations</h3>
            <p className="text-gray-600 mb-4">
              Native CSS animations that respond to scroll position without JavaScript
            </p>
            <code className="text-xs bg-gray-100 px-2 py-1 rounded">
              animation-timeline: scroll()
            </code>
          </div>
          
          {/* Container Queries */}
          <div className="card-2025 glass-surface p-8 text-center card-reveal">
            <div className="text-4xl mb-4">📦</div>
            <h3 className="text-xl font-semibold mb-3 gradient-text">Container Queries</h3>
            <p className="text-gray-600 mb-4">
              Responsive design based on parent container size, not viewport
            </p>
            <code className="text-xs bg-gray-100 px-2 py-1 rounded">
              @container (width &gt; 500px)
            </code>
          </div>
          
          {/* Advanced Easing */}
          <div className="card-2025 glass-surface p-8 text-center card-reveal">
            <div className="text-4xl mb-4">🎢</div>
            <h3 className="text-xl font-semibold mb-3 gradient-text">Modern Easing</h3>
            <p className="text-gray-600 mb-4">
              Natural spring and bounce easing with CSS linear() function
            </p>
            <code className="text-xs bg-gray-100 px-2 py-1 rounded">
              var(--ease-spring)
            </code>
          </div>
          
          {/* CSS @property */}
          <div className="card-2025 glass-surface p-8 text-center card-reveal">
            <div className="text-4xl mb-4">🎨</div>
            <h3 className="text-xl font-semibold mb-3 gradient-text">CSS @property</h3>
            <p className="text-gray-600 mb-4">
              Animatable custom properties with type definitions
            </p>
            <code className="text-xs bg-gray-100 px-2 py-1 rounded">
              @property --gradient-angle
            </code>
          </div>
          
          {/* Anchor Positioning */}
          <div className="card-2025 glass-surface p-8 text-center card-reveal">
            <div className="text-4xl mb-4">⚓</div>
            <h3 className="text-xl font-semibold mb-3 gradient-text">Anchor Positioning</h3>
            <p className="text-gray-600 mb-4">
              Position elements relative to other elements anywhere in the DOM
            </p>
            <code className="text-xs bg-gray-100 px-2 py-1 rounded">
              position-anchor: --trigger
            </code>
          </div>
          
          {/* View Transitions */}
          <div className="card-2025 glass-surface p-8 text-center card-reveal">
            <div className="text-4xl mb-4">🔄</div>
            <h3 className="text-xl font-semibold mb-3 gradient-text">View Transitions</h3>
            <p className="text-gray-600 mb-4">
              Smooth transitions between different states and pages
            </p>
            <code className="text-xs bg-gray-100 px-2 py-1 rounded">
              view-transition-name: auto
            </code>
          </div>
        </div>

        {/* Interactive Demo Section */}
        <div className="card-2025 glass-surface p-8 mb-16 card-reveal">
          <h2 className="text-3xl font-semibold text-center mb-8 gradient-text">
            Elite FlashCard Demo
          </h2>
          
          {/* Card Selector with Enhanced Buttons */}
          <div className="flex justify-center gap-4 mb-8 flex-wrap">
            {sampleCards.map((card) => (
              <button
                key={card.id}
                onClick={() => setSelectedCard(card)}
                className={`btn-2025 morphing-button animate-in ${
                  selectedCard.id === card.id ? 'btn-2025--primary' : 'btn-2025--ghost'
                }`}
                style={{ animationDelay: `${sampleCards.indexOf(card) * 100}ms` }}
              >
                <div className={`difficulty-pill difficulty-pill--${card.difficulty.toLowerCase()}`}>
                  {card.difficulty}
                </div>
                {card.category}
              </button>
            ))}
          </div>

          {/* Elite FlashCard Demo */}
          <div className="flex justify-center">
            <div className="w-full max-w-md">
              <FlashCardElite
                card={selectedCard}
                onAnswer={handleAnswer}
                showActions={true}
                showStats={true}
                size="large"
                enableAdvancedAnimations={showAdvancedFeatures}
              />
            </div>
          </div>
          
          {/* Stats Display */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center glass-blur p-4 rounded-lg animate-in" style={{ animationDelay: '100ms' }}>
              <div className="text-2xl font-bold gradient-text">
                {Math.round((selectedCard.correctCount / selectedCard.timesReviewed) * 100)}%
              </div>
              <div className="text-sm opacity-70">Accuracy Rate</div>
            </div>
            <div className="text-center glass-blur p-4 rounded-lg animate-in" style={{ animationDelay: '200ms' }}>
              <div className="text-2xl font-bold gradient-text">
                {selectedCard.timesReviewed}
              </div>
              <div className="text-sm opacity-70">Times Reviewed</div>
            </div>
            <div className="text-center glass-blur p-4 rounded-lg animate-in" style={{ animationDelay: '300ms' }}>
              <div className="text-2xl font-bold gradient-text">
                {selectedCard.tags.length}
              </div>
              <div className="text-sm opacity-70">Tags</div>
            </div>
          </div>
        </div>

        {/* CSS Grid Masonry Layout Demo */}
        <div className="card-2025 glass-surface p-8 mb-16 card-reveal">
          <h2 className="text-3xl font-semibold text-center mb-8 gradient-text">
            Advanced Grid Layout
          </h2>
          
          <div className="cards-masonry">
            {[...Array(6)].map((_, index) => (
              <div 
                key={index}
                className="card-2025 glass-surface p-6 animate-in"
                style={{ 
                  height: `${150 + (index * 30)}px`,
                  animationDelay: `${index * 100}ms`
                }}
              >
                <h3 className="font-semibold mb-2 gradient-text">Grid Item {index + 1}</h3>
                <p className="text-gray-600 text-sm">
                  This demonstrates CSS Grid masonry layout with {index % 2 === 0 ? 'shorter' : 'taller'} content 
                  to show how the layout adapts naturally.
                </p>
                {index % 3 === 0 && (
                  <div className="mt-3">
                    <div className="difficulty-pill difficulty-pill--easy">
                      Dynamic Height
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="card-2025 glass-surface p-8 card-reveal">
          <h2 className="text-3xl font-semibold text-center mb-8 gradient-text">
            Performance Features
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center animate-in">
              <div className="text-3xl font-bold text-green-600 mb-2">GPU</div>
              <div className="text-sm text-gray-600">Hardware Accelerated</div>
            </div>
            <div className="text-center animate-in" style={{ animationDelay: '100ms' }}>
              <div className="text-3xl font-bold text-blue-600 mb-2">A11Y</div>
              <div className="text-sm text-gray-600">Accessibility First</div>
            </div>
            <div className="text-center animate-in" style={{ animationDelay: '200ms' }}>
              <div className="text-3xl font-bold text-purple-600 mb-2">60fps</div>
              <div className="text-sm text-gray-600">Smooth Animations</div>
            </div>
            <div className="text-center animate-in" style={{ animationDelay: '300ms' }}>
              <div className="text-3xl font-bold text-orange-600 mb-2">Zero</div>
              <div className="text-sm text-gray-600">JavaScript Animations</div>
            </div>
          </div>
        </div>

        {/* Footer with Attribution */}
        <footer className="text-center mt-16 py-8 card-reveal">
          <div className="glass-surface card-2025 inline-block p-6">
            <h3 className="text-lg font-semibold mb-3 gradient-text">Inspired by CSS Masters</h3>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <a 
                href="https://css-tricks.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-2025 btn-2025--ghost"
              >
                CSS-Tricks
              </a>
              <a 
                href="https://www.kevinpowell.co" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-2025 btn-2025--ghost"
              >
                Kevin Powell
              </a>
              <a 
                href="https://jhey.dev" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-2025 btn-2025--ghost"
              >
                Jhey Tompkins
              </a>
              <a 
                href="https://wesbos.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-2025 btn-2025--ghost"
              >
                Wes Bos
              </a>
            </div>
            <p className="text-gray-500 mt-4">
              🚀 Cutting-edge CSS techniques for the modern web
            </p>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default CSSMastersDemo