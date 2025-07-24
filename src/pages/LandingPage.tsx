import React from 'react'
import { Link } from 'react-router-dom'

const LandingPage = React.memo(function LandingPage(): React.JSX.Element {
  return (
    <div className="landing-page">
      <div className="landing-container">
        <header className="landing-header">
          <div className="landing-logo">
            <img 
              src="/brainBulb.svg" 
              alt="FlashCards Logo" 
              className="logo-svg"
            />
            <span className="logo-text">FlashCards</span>
          </div>
          <nav className="landing-nav">
            <Link to="/login" className="btn-secondary">
              Inloggen
            </Link>
          </nav>
        </header>

        <main className="landing-main">
          <section className="hero-section">
            <div className="hero-content">
              <h1 className="hero-title">
                Leer slimmer met
                <span className="hero-highlight"> FlashCards</span>
              </h1>
              <p className="hero-subtitle">
                Gebruik spaced repetition om effectiever te leren. Onthoud meer
                in minder tijd met onze intelligente flashcard app.
              </p>
              <div className="hero-actions">
                <Link to="/login" className="btn-primary btn-large">
                  🚀 Gratis beginnen
                </Link>
                <a href="#features" className="btn-secondary btn-large">
                  📖 Meer info
                </a>
              </div>
            </div>
            <div className="hero-visual">
              <div className="hero-logo-container">
                <img 
                  src="/brainBulb.svg" 
                  alt="FlashCards Brain Logo" 
                  className="hero-logo"
                />
                <div className="hero-logo-glow"></div>
              </div>
            </div>
          </section>

          <section id="features" className="features-section">
            <h2 className="features-title">Waarom FlashCards?</h2>
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">🧠</div>
                <h3>Spaced Repetition</h3>
                <p>
                  Wetenschappelijk bewezen leeralgoritme voor optimaal geheugen
                </p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">📊</div>
                <h3>Voortgang Tracking</h3>
                <p>Zie je leervooruitgang en identificeer zwakke punten</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🎯</div>
                <h3>Gepersonaliseerd</h3>
                <p>Intelligente aanpassing aan jouw leertempo en niveau</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">📱</div>
                <h3>Overal Beschikbaar</h3>
                <p>Leer waar en wanneer je wilt, op elk apparaat</p>
              </div>
            </div>
          </section>

          <section className="cta-section">
            <div className="cta-content">
              <h2>Klaar om te beginnen?</h2>
              <p>
                Maak gratis een account aan en start vandaag nog met effectief
                leren
              </p>
              <Link to="/login" className="btn-primary btn-large">
                Account aanmaken
              </Link>
            </div>
          </section>
        </main>

        <footer className="landing-footer">
          <p>
            &copy; 2024 FlashCards. Gemaakt met ❤️ voor betere leerresultaten.
          </p>
        </footer>
      </div>
    </div>
  )
})

export default LandingPage
