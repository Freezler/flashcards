import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import StudySession, { StudySessionResults } from '../components/StudySession'
import { useCards } from '../contexts/CardContext'
import { StudyMode, FlashCard as FlashCardType } from '../types'

function StudyPage(): React.JSX.Element {
  const { deckId } = useParams<{ deckId: string }>()
  const { state } = useCards()
  const deck = state.decks.find(d => d.id === deckId)
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

  const handleSessionComplete = (_results: StudySessionResults) => {
    // Here we could save results to local storage or send to a backend
  }

  const handleCardUpdate = (_updatedCard: FlashCardType) => {
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
