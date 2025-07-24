import { Link, useLocation } from 'react-router-dom'
import { useState, useCallback } from 'react'
import { Fade as Hamburger } from 'hamburger-react'
import ThemeToggle from './ThemeToggle'
import { useAuth } from '../contexts/AuthContext'

interface NavItem {
  name: string
  path: string
  icon: string
}

function Navigation(): React.JSX.Element {
  const location = useLocation()
  const { user, logout } = useAuth()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navItems: NavItem[] = [
    { name: 'Dashboard', path: '/', icon: '🏠' },
    { name: 'Mijn Decks', path: '/decks', icon: '📚' },
    { name: 'Voortgang', path: '/progress', icon: '📊' },
    { name: 'Instellingen', path: '/settings', icon: '⚙️' },
  ]

  const handleLogout = useCallback(() => {
    logout()
    setIsMobileMenuOpen(false)
  }, [logout])

  return (
    <>
      <nav className="navigation">
        <div className="nav-brand">
          <Link to="/" className="brand-link">
            <img
              src="/brainBulb.svg"
              className="nav-logo"
              alt="FlashCards logo"
            />
            <span className="nav-title">FlashCards</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="nav-items desktop-nav">
          {navItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.name}</span>
            </Link>
          ))}
        </div>

        <div className="nav-user desktop-nav">
          <div className="desktop-theme-toggle">
            <ThemeToggle showAccentToggle={false} />
          </div>
          {user ? (
            <div className="user-dropdown-hover">
              <div className="user-avatar-icon">
                <span className="user-icon">👤</span>
              </div>
              <div className="user-popover">
                <div className="user-info">
                  <div className="user-name">{user.name}</div>
                  <div className="user-email">{user.email}</div>
                </div>
                <hr className="user-menu-divider" />
                <button className="logout-button" onClick={handleLogout}>
                  🚪 Uitloggen
                </button>
              </div>
            </div>
          ) : (
            <Link to="/login" className="btn-secondary">
              Inloggen
            </Link>
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
                {user ? (
                  <div className="mobile-user-info">
                    <div className="user-avatar-mobile">
                      <span className="user-icon">👤</span>
                    </div>
                    <div className="user-details">
                      <div className="user-name">{user.name}</div>
                      <div className="user-email">{user.email}</div>
                    </div>
                  </div>
                ) : null}

                <div className="mobile-actions">
                  <ThemeToggle showAccentToggle={false} />
                  {user ? (
                    <button
                      className="logout-button mobile-logout"
                      onClick={handleLogout}
                    >
                      🚪 Uitloggen
                    </button>
                  ) : (
                    <Link
                      to="/login"
                      className="btn-secondary"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Inloggen
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default Navigation
