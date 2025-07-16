import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Navigation from './components/Navigation'
import Dashboard from './components/Dashboard'
import { DecksPage, DeckPage, StudyPage } from './pages'

function App(): React.JSX.Element {
  return (
    <Router>
      <div className="app-container">
        <Navigation />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/decks" element={<DecksPage />} />
            <Route path="/deck/:deckId" element={<DeckPage />} />
            <Route path="/deck/:deckId/study" element={<StudyPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
