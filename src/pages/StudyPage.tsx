import { useParams, Link } from 'react-router-dom'
import { useState } from 'react'
import { testDecks } from '../data'
import FlashCard from '../components/FlashCard'

function StudyPage(): React.JSX.Element {
  const { deckId } = useParams<{ deckId: string }>()
  const deck = testDecks.find(d => d.id === deckId)
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [score, setScore] = useState({ correct: 0, incorrect: 0 })

  const handleAnswer = (cardId: string, isCorrect: boolean): void => {
    setScore(prev => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      incorrect: prev.incorrect + (isCorrect ? 0 : 1)
    }))
    
    // Move to next card after a short delay
    setTimeout(() => {
      setCurrentCardIndex(prev => (prev + 1) % deck.cards.length)
    }, 1200)
  }

  const currentCard = deck?.cards[currentCardIndex]

  if (!deck) {
    return (
      <div className="dashboard-container">
        <div className="error-message">
          <h2>Deck niet gevonden</h2>
          <p>Het deck dat je zoekt bestaat niet of is verwijderd.</p>
          <Link to="/decks" className="btn-primary">
            Terug naar decks
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="study-container">
      <header className="study-header">
        <div className="study-navigation">
          <Link to="/decks" className="study-back-btn">
            ← Terug
          </Link>
          <h1 className="study-title">{deck.name}</h1>
          <div className="study-progress">
            {currentCardIndex + 1} / {deck.cards.length}
          </div>
        </div>
        
        <div className="study-score">
          <div className="score-item score-item--correct">
            <span className="score-icon">✅</span>
            <span className="score-count">{score.correct}</span>
          </div>
          <div className="score-item score-item--incorrect">
            <span className="score-icon">❌</span>
            <span className="score-count">{score.incorrect}</span>
          </div>
        </div>
      </header>

      <main className="study-main">
        {currentCard && (
          <FlashCard
            card={currentCard}
            onAnswer={handleAnswer}
            showActions={true}
            size="large"
          />
        )}
      </main>

      <footer className="study-footer">
        <div className="study-controls">
          <button 
            className="study-control-btn study-control-btn--prev"
            onClick={() => setCurrentCardIndex(prev => 
              prev === 0 ? deck.cards.length - 1 : prev - 1
            )}
            disabled={deck.cards.length <= 1}
          >
            ← Vorige
          </button>
          <button 
            className="study-control-btn study-control-btn--next"
            onClick={() => setCurrentCardIndex(prev => 
              (prev + 1) % deck.cards.length
            )}
            disabled={deck.cards.length <= 1}
          >
            Volgende →
          </button>
        </div>
        
        <div className="study-hint">
          💡 Klik op de kaart om hem om te draaien, of gebruik de "Reveal" knop
        </div>
      </footer>
    </div>
  )
}

export default StudyPage