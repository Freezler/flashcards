import { Link, useLocation } from 'react-router-dom'

interface NavItem {
  name: string
  path: string
  icon: string
}

function Navigation(): React.JSX.Element {
  const location = useLocation()

  const navItems: NavItem[] = [
    { name: 'Dashboard', path: '/', icon: '🏠' },
    { name: 'Mijn Decks', path: '/decks', icon: '📚' },
    { name: 'Voortgang', path: '/progress', icon: '📊' },
    { name: 'Instellingen', path: '/settings', icon: '⚙️' },
  ]

  return (
    <nav className="navigation">
      <div className="nav-brand">
        <Link to="/" className="brand-link">
          <img src="/vite.svg" className="nav-logo" alt="FlashCards logo" />
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
        <Link to="/login" className="btn-secondary">
          Inloggen
        </Link>
      </div>
    </nav>
  )
}

export default Navigation
