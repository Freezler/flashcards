import { Fade as Hamburger } from 'hamburger-react'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useCards } from '../contexts/CardContext'
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
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  // Use actual deck count from CardContext
  const totalDecks = state.decks.length

  const navItems: NavItem[] = useMemo(
    () => [
      {
        name: 'Dashboard',
        path: '/',
        icon: '🏠',
        tooltip: 'Ga naar dashboard',
      },
      {
        name: 'Mijn Decks',
        path: '/decks',
        icon: '📚',
        badge: totalDecks,
        tooltip: `${totalDecks} decks beschikbaar`,
      },
      {
        name: 'Nieuw Deck',
        path: '/decks/new',
        icon: '➕',
        tooltip: 'Maak een nieuw deck aan',
      },
    ],
    [totalDecks]
  )

  const handleLogout = useCallback(() => {
    logout()
    setIsMobileMenuOpen(false)
  }, [logout])

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

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (isSearchOpen) {
        setIsSearchOpen(false)
        setSearchQuery('')
      }
    }

    if (isSearchOpen) {
      document.addEventListener('click', handleClickOutside)
      return () => document.removeEventListener('click', handleClickOutside)
    }
  }, [isSearchOpen])

  const handleSearchToggle = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()
      setIsSearchOpen(!isSearchOpen)
      if (!isSearchOpen) {
        // Focus search input after animation
        setTimeout(() => {
          document.getElementById('nav-search-input')?.focus()
        }, 100)
      }
    },
    [isSearchOpen]
  )

  return (
    <>
      <nav className="navigation" role="navigation" aria-label="Hoofdnavigatie">
        <div className="nav-brand">
          <Link to="/" className="brand-link" aria-label="FlashCards - Ga naar dashboard">
            <img
              src="/brainBulb.svg"
              className="nav-logo"
              alt=""
              role="presentation"
            />
            <span className="nav-title">FlashCards</span>
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
          {/* Search functionality */}
          <div
            className={`nav-search ${isSearchOpen ? 'nav-search--open' : ''}`}
          >
            <button
              className="search-toggle"
              onClick={handleSearchToggle}
              aria-label="Toggle search"
              title="Zoeken"
            >
              🔍
            </button>
            {isSearchOpen && (
              <div
                className="search-input-container"
                onClick={e => e.stopPropagation()}
              >
                <input
                  id="nav-search-input"
                  type="text"
                  className="search-input"
                  placeholder="Zoek in decks..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Escape') {
                      setIsSearchOpen(false)
                      setSearchQuery('')
                    }
                  }}
                />
                {searchQuery && (
                  <button
                    className="search-clear"
                    onClick={() => setSearchQuery('')}
                    aria-label="Clear search"
                  >
                    ✕
                  </button>
                )}
              </div>
            )}
          </div>

          <div className="desktop-theme-toggle">
            <ThemeToggle />
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
                  <ThemeToggle />
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
