import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import StudySession, { StudySessionResults } from '../components/StudySession'
import { testDecks } from '../data'
import { StudyMode, FlashCard as FlashCardType } from '../types'

function StudyPage(): React.JSX.Element {
  const { deckId } = useParams<{ deckId: string }>()
  const deck = testDecks.find(d => d.id === deckId)
  const [studyMode] = useState<StudyMode>(StudyMode.SPACED)

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

  const handleSessionComplete = (results: StudySessionResults) => {
    console.log('Study session completed:', results)
    // Here we could save results to local storage or send to a backend
  }

  const handleCardUpdate = (updatedCard: FlashCardType) => {
    console.log('Card updated with spaced repetition data:', updatedCard)
    // Here we could update the card in our data store
  }

  return (
    <StudySession
      deck={deck}
      studyMode={studyMode}
      onSessionComplete={handleSessionComplete}
      onCardUpdate={handleCardUpdate}
      maxCards={20}
      timeLimit={30}
    />
  )
}

export default StudyPage
