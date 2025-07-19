import { Link, useLocation } from 'react-router-dom'
import { useState, useCallback, useEffect, useRef } from 'react'
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
  const [showUserMenu, setShowUserMenu] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const navItems: NavItem[] = [
    { name: 'Dashboard', path: '/', icon: '🏠' },
    { name: 'Mijn Decks', path: '/decks', icon: '📚' },
    { name: 'Voortgang', path: '/progress', icon: '📊' },
    { name: 'Instellingen', path: '/settings', icon: '⚙️' },
  ]

  const handleLogout = useCallback(() => {
    logout()
    setShowUserMenu(false)
  }, [logout])

  const toggleUserMenu = useCallback(() => {
    setShowUserMenu(!showUserMenu)
  }, [showUserMenu])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowUserMenu(false)
      }
    }

    if (showUserMenu) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showUserMenu])

  return (
    <nav className="navigation">
      <div className="nav-brand">
        <Link to="/" className="brand-link">
          <img src="/brainBulb.svg" className="nav-logo" alt="FlashCards logo" />
          <span className="nav-title">FlashCards</span>
        </Link>
      </div>

      <div className="nav-items">
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

      <div className="nav-user">
        <ThemeToggle />
        {user ? (
          <div ref={dropdownRef} className="user-dropdown">
            <button
              className="user-avatar"
              onClick={toggleUserMenu}
              aria-label="User menu"
            >
              <span className="user-icon">👤</span>
              <span className="user-name">{user.name}</span>
            </button>
            {showUserMenu && (
              <div className="user-menu">
                <div className="user-info">
                  <div className="user-email">{user.email}</div>
                </div>
                <hr className="user-menu-divider" />
                <button className="logout-button" onClick={handleLogout}>
                  🚪 Uitloggen
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login" className="btn-secondary">
            Inloggen
          </Link>
        )}
      </div>
    </nav>
  )
}

export default Navigation
