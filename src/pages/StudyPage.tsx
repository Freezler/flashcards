import { useParams, Link } from 'react-router-dom'
import { testDecks } from '../data'

function StudyPage(): React.JSX.Element {
  const { deckId } = useParams<{ deckId: string }>()
  const deck = testDecks.find(d => d.id === deckId)

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
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1 className="dashboard-title">Studie: {deck.name}</h1>
        <p className="dashboard-subtitle">
          {deck.totalCards} kaarten klaar om te bestuderen
        </p>
      </header>

      <div className="study-placeholder">
        <div className="study-info">
          <h3>🚧 Studie functionaliteit komt binnenkort</h3>
          <p>
            Hier komt de interactieve studie-ervaring waar je door de flashcards
            kunt bladeren, jezelf kunt testen en je voortgang kunt bijhouden.
          </p>
          <div className="study-features">
            <div className="feature-item">🎯 Interactieve flashcards</div>
            <div className="feature-item">⏱️ Spaced repetition algoritme</div>
            <div className="feature-item">📊 Voortgang tracking</div>
            <div className="feature-item">🎨 Verschillende studiemodussen</div>
          </div>
        </div>
        
        <div className="study-actions">
          <Link to={`/deck/${deck.id}`} className="btn-primary">
            📖 Bekijk kaarten
          </Link>
          <Link to="/decks" className="btn-secondary">
            ← Terug naar decks
          </Link>
        </div>
      </div>
    </div>
  )
}

export default StudyPage