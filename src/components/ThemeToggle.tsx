import { useState, useEffect } from 'react'

function ThemeToggle(): React.JSX.Element {
  const [theme, setTheme] = useState<'light' | 'dark' | 'auto'>('auto')

  useEffect(() => {
    // Check for saved theme or default to auto
    const savedTheme = localStorage.getItem('theme') as
      | 'light'
      | 'dark'
      | 'auto'
      | null
    if (savedTheme) {
      setTheme(savedTheme)
      applyTheme(savedTheme)
    } else {
      setTheme('auto')
      applyTheme('auto')
    }
  }, [])

  const applyTheme = (newTheme: 'light' | 'dark' | 'auto'): void => {
    const root = document.documentElement

    // Remove existing theme attributes
    root.removeAttribute('data-theme')
    root.classList.remove('dark-theme', 'light-theme')

    if (newTheme === 'dark') {
      root.setAttribute('data-theme', 'dark')
    } else if (newTheme === 'light') {
      root.setAttribute('data-theme', 'light')
    }
    // For 'auto', we let CSS media queries handle it
  }

  const toggleTheme = (): void => {
    const newTheme =
      theme === 'light' ? 'dark' : theme === 'dark' ? 'auto' : 'light'
    setTheme(newTheme)
    applyTheme(newTheme)
    localStorage.setItem('theme', newTheme)
  }

  const getThemeIcon = (): string => {
    switch (theme) {
      case 'light':
        return '☀️'
      case 'dark':
        return '🌙'
      case 'auto':
        return '🌓'
      default:
        return '🌓'
    }
  }

  const getThemeLabel = (): string => {
    switch (theme) {
      case 'light':
        return 'Light'
      case 'dark':
        return 'Dark'
      case 'auto':
        return 'Auto'
      default:
        return 'Auto'
    }
  }

  return (
    <button
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={`Switch to ${
        theme === 'light' ? 'dark' : theme === 'dark' ? 'auto' : 'light'
      } theme`}
      title={`Current: ${getThemeLabel()}. Click to cycle.`}
    >
      <span className="theme-toggle__icon">{getThemeIcon()}</span>
      <span className="theme-toggle__label">{getThemeLabel()}</span>
    </button>
  )
}

export default ThemeToggle
