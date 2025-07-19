import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import Dashboard from './components/Dashboard'
import {
  DecksPage,
  DeckPage,
  StudyPage,
  NewDeckPage,
  LoginPage,
  LandingPage,
} from './pages'
import { CardProvider } from './contexts/CardContext'
import { AuthProvider, useAuth } from './contexts/AuthContext'

function AppContent(): React.JSX.Element {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <CardProvider>
      <Router>
        {!isAuthenticated ? (
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<LandingPage />} />
          </Routes>
        ) : (
          <div className="app-container">
            <Navigation />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/decks" element={<DecksPage />} />
                <Route path="/decks/new" element={<NewDeckPage />} />
                <Route path="/deck/:deckId" element={<DeckPage />} />
                <Route path="/deck/:deckId/study" element={<StudyPage />} />
                <Route path="*" element={<Dashboard />} />
              </Routes>
            </main>
          </div>
        )}
      </Router>
    </CardProvider>
  )
}

function App(): React.JSX.Element {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App
