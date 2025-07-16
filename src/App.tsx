import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Navigation from './components/Navigation'
import Dashboard from './components/Dashboard'

function App(): React.JSX.Element {
  return (
    <Router>
      <div className="app-container">
        <Navigation />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            {/* TODO: Add other routes */}
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
