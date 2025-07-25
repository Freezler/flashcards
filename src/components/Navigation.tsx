/* eslint-disable prettier/prettier */
import { Fade as Hamburger } from 'hamburger-react'
import React, { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useCards } from '../contexts/CardContext'
import { useTheme, getLogoThemeClass } from '../hooks'
import ThemeToggle from './ThemeToggle'

interface NavItem {
  name: string
  path: string
  icon: string
  badge?: number
  tooltip?: string
}

interface BreadcrumbItem {
  name: string
  path: string
}

const Navigation = function Navigation(): React.JSX.Element {
  const location = useLocation()
  const { user, logout } = useAuth()
  const { state } = useCards()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { t, i18n } = useTranslation('common')
  const themeState = useTheme()

  // Use actual deck count from CardContext
  const totalDecks = state.decks.length

  const navItems: NavItem[] = useMemo(
    () => [
      {
        name: t('navigation.dashboard'),
        path: '/',
        icon: '🏠',
        tooltip: 'Ga naar dashboard',
      },
      {
        name: t('navigation.decks'),
        path: '/decks',
        icon: '📚',
        badge: totalDecks,
        tooltip: `${totalDecks} decks beschikbaar`,
      },
      {
        name: t('navigation.newDeck'),
        path: '/decks/new',
        icon: '➕',
        tooltip: 'Maak een nieuw deck aan',
      },
    ],
    [totalDecks, t]
  )

  const handleLogout = useCallback(() => {
    logout()
    setIsMobileMenuOpen(false)
  }, [logout])

  const handleLanguageChange = useCallback((language: string) => {
    i18n.changeLanguage(language)
  }, [i18n])

  // Generate breadcrumbs based on current path
  const breadcrumbs = useMemo((): BreadcrumbItem[] => {
    const pathSegments = location.pathname.split('/').filter(Boolean)
    const crumbs: BreadcrumbItem[] = [{ name: 'Dashboard', path: '/' }]

    if (pathSegments.length > 0) {
      const segment = pathSegments[0]
      switch (segment) {
        case 'decks':
          crumbs.push({ name: 'Mijn Decks', path: '/decks' })
          if (pathSegments[1] === 'new') {
            crumbs.push({ name: 'Nieuw Deck', path: '/decks/new' })
          }
          break
        case 'deck':
          if (pathSegments[1]) {
            crumbs.push({ name: 'Mijn Decks', path: '/decks' })
            crumbs.push({
              name: 'Deck Details',
              path: `/deck/${pathSegments[1]}`,
            })
            if (pathSegments[2] === 'study') {
              crumbs.push({ name: 'Studie Sessie', path: location.pathname })
            }
          }
          break
        default:
          break
      }
    }

    return crumbs
  }, [location.pathname])


  return (
    <>
      <nav className="navigation" role="navigation" aria-label="Hoofdnavigatie">
        <div className="nav-brand">
          <Link to="/" className="brand-link" aria-label="FlashCards - Ga naar dashboard">
            <img
              src="/brainBulb.svg"
              className={`nav-logo ${getLogoThemeClass(themeState)}`}
              alt=""
              role="presentation"
            />
            <span className="nav-title">CogniCraft</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <ul className="nav-items desktop-nav" role="menubar">
          {navItems.map(item => (
            <li key={item.path} role="none">
              <Link
                to={item.path}
                className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
                role="menuitem"
                aria-label={item.tooltip}
                aria-current={location.pathname === item.path ? 'page' : undefined}
              >
                <span className="nav-icon" aria-hidden="true">{item.icon}</span>
                <span className="nav-label">{item.name}</span>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="nav-badge" role="status" aria-label={`${item.badge} items`}>
                    {item.badge > 99 ? '99+' : item.badge}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>

        <div className="nav-user desktop-nav">
          <div className="desktop-theme-toggle">
            <ThemeToggle showAccentToggle={false} />
          </div>
          {user ? (
            <div className="user-dropdown">
              <div className="user-avatar-icon">
                <span className="user-icon">👤</span>
              </div>
              <div className="user-popover">
                <div className="user-info">
                  <div className="user-name">{user.name}</div>
                  <div className="user-email">{user.email}</div>
                </div>
                <hr className="user-menu-divider" />
                <div className="language-selector">
                  <div className="language-label">{t('user.selectLanguage')}</div>
                  <div className="language-options">
                    <button
                      className={`language-option ${i18n.language === 'nl' ? 'active' : ''}`}
                      onClick={() => handleLanguageChange('nl')}
                      aria-label={t('languages.dutch')}
                    >
                      🇳🇱 NL
                    </button>
                    <button
                      className={`language-option ${i18n.language === 'en' ? 'active' : ''}`}
                      onClick={() => handleLanguageChange('en')}
                      aria-label={t('languages.english')}
                    >
                      🇬🇧 EN
                    </button>
                    <button
                      className={`language-option ${i18n.language === 'de' ? 'active' : ''}`}
                      onClick={() => handleLanguageChange('de')}
                      aria-label={t('languages.german')}
                    >
                      🇩🇪 DE
                    </button>
                    <button
                      className={`language-option ${i18n.language === 'es' ? 'active' : ''}`}
                      onClick={() => handleLanguageChange('es')}
                      aria-label={t('languages.spanish')}
                    >
                      🇪🇸 ES
                    </button>
                  </div>
                </div>
                <hr className="user-menu-divider" />
                <button className="logout-button" onClick={handleLogout}>
                  🚪 {t('navigation.logout')}
                </button>
              </div>
            </div>
          ) : (
            <div className="user-dropdown">
              <div className="user-avatar-icon guest-user">
                <span className="user-icon">👤</span>
                <span className="guest-strike">🚫</span>
              </div>
              <div className="user-popover">
                <div className="user-info guest-info">
                  <div className="user-name">{t('auth.guestUser')}</div>
                  <div className="user-email">{t('auth.notLoggedIn')}</div>
                </div>
                <hr className="user-menu-divider" />
                <div className="language-selector">
                  <div className="language-label">{t('user.selectLanguage')}</div>
                  <div className="language-options">
                    <button
                      className={`language-option ${i18n.language === 'nl' ? 'active' : ''}`}
                      onClick={() => handleLanguageChange('nl')}
                      aria-label={t('languages.dutch')}
                    >
                      🇳🇱 NL
                    </button>
                    <button
                      className={`language-option ${i18n.language === 'en' ? 'active' : ''}`}
                      onClick={() => handleLanguageChange('en')}
                      aria-label={t('languages.english')}
                    >
                      🇬🇧 EN
                    </button>
                    <button
                      className={`language-option ${i18n.language === 'de' ? 'active' : ''}`}
                      onClick={() => handleLanguageChange('de')}
                      aria-label={t('languages.german')}
                    >
                      🇩🇪 DE
                    </button>
                    <button
                      className={`language-option ${i18n.language === 'es' ? 'active' : ''}`}
                      onClick={() => handleLanguageChange('es')}
                      aria-label={t('languages.spanish')}
                    >
                      🇪🇸 ES
                    </button>
                  </div>
                </div>
                <hr className="user-menu-divider" />
                <Link to="/login" className="login-button">
                  🚪 {t('auth.signIn')}
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="mobile-hamburger">
          <Hamburger
            toggled={isMobileMenuOpen}
            toggle={setIsMobileMenuOpen}
            size={24}
            duration={0.3}
            hideOutline={false}
          />
        </div>
      </nav>

      {/* Mobile Menu Overlay & Slide-out */}
      {isMobileMenuOpen && (
        <>
          <div
            className="mobile-overlay"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="mobile-menu">
            <div className="mobile-menu-items">
              {navItems.map(item => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`mobile-menu-item ${location.pathname === item.path ? 'active' : ''}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-label">{item.name}</span>
                </Link>
              ))}
            </div>

            <div className="mobile-menu-footer">
              <div className="mobile-user-section">
                <div className="mobile-user-info">
                  <div className={`user-avatar-mobile ${!user ? 'guest-user' : ''}`}>
                    <span className="user-icon">👤</span>
                    {!user && <span className="guest-strike">🚫</span>}
                  </div>
                  <div className="user-details">
                    <div className="user-name">
                      {user ? user.name : t('auth.guestUser')}
                    </div>
                    <div className="user-email">
                      {user ? user.email : t('auth.notLoggedIn')}
                    </div>
                  </div>
                </div>

                <div className="mobile-actions">
                  <ThemeToggle showAccentToggle={false} />
                  {user ? (
                    <button
                      className="logout-button mobile-logout"
                      onClick={handleLogout}
                    >
                      🚪 {t('navigation.logout')}
                    </button>
                  ) : (
                    <Link
                      to="/login"
                      className="login-button"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      🚪 {t('auth.signIn')}
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Breadcrumb Navigation */}
      {breadcrumbs.length > 1 && (
        <div className="breadcrumb-container">
          <nav className="breadcrumb" aria-label="Breadcrumb navigation">
            {breadcrumbs.map((crumb, index) => (
              <span key={crumb.path} className="breadcrumb-item">
                {index < breadcrumbs.length - 1 ? (
                  <>
                    <Link to={crumb.path} className="breadcrumb-link">
                      {crumb.name}
                    </Link>
                    <span className="breadcrumb-separator" aria-hidden="true">
                      →
                    </span>
                  </>
                ) : (
                  <span className="breadcrumb-current" aria-current="page">
                    {crumb.name}
                  </span>
                )}
              </span>
            ))}
          </nav>
        </div>
      )}
    </>
  )
}

export default React.memo(Navigation)
