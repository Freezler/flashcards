import { lazy, Suspense } from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import Navigation from './components/Navigation'
import ScrollProgress from './components/ScrollProgress'
import { ScrollToTop } from './components/common'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { CardProvider } from './contexts/CardContext'

// Lazy load non-critical components for better performance
const DeckPage = lazy(() => import('./pages/DeckPage'))
const DecksPage = lazy(() => import('./pages/DecksPage'))
const LandingPage = lazy(() => import('./pages/LandingPage'))
const LoginPage = lazy(() => import('./pages/LoginPage'))
const NewDeckPage = lazy(() => import('./pages/NewDeckPage'))
const StudyPage = lazy(() => import('./pages/StudyPage'))

function AppContent(): React.JSX.Element {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="app-loading">
        <div className="loading-spinner">Loading...</div>
      </div>
    )
  }

  return (
    <CardProvider>
      <Router>
        <ScrollToTop />
        <ScrollProgress />
        <Suspense
          fallback={<div className="page-loading">Loading page...</div>}
        >
          {!isAuthenticated ? (
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="*" element={<LandingPage />} />
            </Routes>
          ) : (
            <div className="app-container">
              <a href="#main-content" className="skip-link">
                Ga naar hoofdinhoud
              </a>
              <Navigation />
              <main id="main-content" className="main-content">
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
        </Suspense>
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
