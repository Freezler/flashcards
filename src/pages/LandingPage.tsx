import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useTheme, getLogoThemeClass } from '../hooks'
import Navigation from '../components/Navigation'

const LandingPage = React.memo(function LandingPage(): React.JSX.Element {
  const { t } = useTranslation('common')
  const themeState = useTheme()

  return (
    <div className="landing-page">
      <Navigation />
      <div className="landing-container">
        <main className="landing-main">
          <section className="hero-section">
            <div className="hero-content">
              <h1 className="hero-title">
                {t('landing.heroTitle')}
                <span className="hero-highlight"> CogniCraft</span>
              </h1>
              <p className="hero-subtitle">{t('landing.heroSubtitle')}</p>
              <div className="hero-actions">
                <Link to="/login" className="btn-primary btn-large">
                  {t('landing.getStarted')}
                </Link>
                <a href="#features" className="btn-secondary btn-large">
                  {t('landing.learnMore')}
                </a>
              </div>
            </div>
            <div className="hero-visual">
              <div className="hero-logo-container">
                <img
                  src="/brainBulb.svg"
                  alt="FlashCards Brain Logo"
                  className={`hero-logo ${getLogoThemeClass(themeState)}`}
                />
                <div className="hero-logo-glow"></div>
              </div>
            </div>
          </section>

          <section id="features" className="features-section">
            <h2 className="features-title">{t('landing.whyTitle')}</h2>
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">🧠</div>
                <h3>{t('landing.features.spaced.title')}</h3>
                <p>{t('landing.features.spaced.description')}</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">📊</div>
                <h3>{t('landing.features.tracking.title')}</h3>
                <p>{t('landing.features.tracking.description')}</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🎯</div>
                <h3>{t('landing.features.personalized.title')}</h3>
                <p>{t('landing.features.personalized.description')}</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">📱</div>
                <h3>{t('landing.features.anywhere.title')}</h3>
                <p>{t('landing.features.anywhere.description')}</p>
              </div>
            </div>
          </section>

          <section className="cta-section">
            <div className="cta-content">
              <h2>{t('landing.cta.title')}</h2>
              <p>{t('landing.cta.description')}</p>
              <Link to="/login" className="btn-primary btn-large">
                {t('auth.createAccount')}
              </Link>
            </div>
          </section>
        </main>

        <footer className="landing-footer">
          <p>{t('landing.footer')}</p>
        </footer>
      </div>
    </div>
  )
})

export default LandingPage
