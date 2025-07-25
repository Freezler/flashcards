import { useState, useEffect } from 'react'

type ThemeMode = 'light' | 'dark' | 'auto'
type AccentColor = 'blue' | 'purple' | 'green' | 'orange' | 'pink'

interface ThemeState {
  mode: ThemeMode
  accent: AccentColor
}

interface ThemeToggleProps {
  showAccentToggle?: boolean
}

function ThemeToggle({
  showAccentToggle = true,
}: ThemeToggleProps): React.JSX.Element {
  const [themeState, setThemeState] = useState<ThemeState>({
    mode: 'auto',
    accent: 'blue',
  })

  useEffect(() => {
    // Check for saved theme or default to auto
    const savedMode = localStorage.getItem('theme-mode') as ThemeMode | null
    const savedAccent = localStorage.getItem(
      'theme-accent'
    ) as AccentColor | null

    const newThemeState = {
      mode: savedMode || 'auto',
      accent: savedAccent || 'blue',
    }

    setThemeState(newThemeState)
    applyTheme(newThemeState)
  }, [])

  const applyTheme = (theme: ThemeState): void => {
    const root = document.documentElement

    // Remove existing theme attributes
    root.removeAttribute('data-theme')
    root.removeAttribute('data-accent')
    root.classList.remove('dark-theme', 'light-theme')

    // Apply theme mode
    if (theme.mode === 'dark') {
      root.setAttribute('data-theme', 'dark')
    } else if (theme.mode === 'light') {
      root.setAttribute('data-theme', 'light')
    }

    // Apply accent color
    root.setAttribute('data-accent', theme.accent)

    // For 'auto', we let CSS media queries handle it
  }

  const toggleThemeMode = (): void => {
    const newMode: ThemeMode =
      themeState.mode === 'light'
        ? 'dark'
        : themeState.mode === 'dark'
          ? 'auto'
          : 'light'

    const newThemeState = { ...themeState, mode: newMode }
    setThemeState(newThemeState)
    applyTheme(newThemeState)
    localStorage.setItem('theme-mode', newMode)
  }

  const cycleAccentColor = (): void => {
    const colors: AccentColor[] = ['blue', 'purple', 'green', 'orange', 'pink']
    const currentIndex = colors.indexOf(themeState.accent)
    const nextColor = colors[(currentIndex + 1) % colors.length]

    const newThemeState = { ...themeState, accent: nextColor }
    setThemeState(newThemeState)
    applyTheme(newThemeState)
    localStorage.setItem('theme-accent', nextColor)
  }

  const getThemeIcon = (): string => {
    switch (themeState.mode) {
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
    switch (themeState.mode) {
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

  const getAccentIcon = (): string => {
    switch (themeState.accent) {
      case 'blue':
        return '🔵'
      case 'purple':
        return '🟣'
      case 'green':
        return '🟢'
      case 'orange':
        return '🟠'
      case 'pink':
        return '🩷'
      default:
        return '🔵'
    }
  }

  if (!showAccentToggle) {
    // Simple theme toggle for navigation
    return (
      <button
        className="theme-toggle"
        onClick={toggleThemeMode}
        aria-label={`Switch to ${
          themeState.mode === 'light'
            ? 'dark'
            : themeState.mode === 'dark'
              ? 'auto'
              : 'light'
        } theme`}
        title={`Current: ${getThemeLabel()}. Click to cycle.`}
      >
        <span className="theme-toggle__icon">{getThemeIcon()}</span>
        <span className="theme-toggle__label">{getThemeLabel()}</span>
      </button>
    )
  }

  return (
    <div className="theme-controls glass-card">
      <button
        className="theme-toggle glass-button hover-lift"
        onClick={toggleThemeMode}
        aria-label={`Switch to ${
          themeState.mode === 'light'
            ? 'dark'
            : themeState.mode === 'dark'
              ? 'auto'
              : 'light'
        } theme`}
        title={`Current: ${getThemeLabel()}. Click to cycle.`}
      >
        <span className="theme-toggle__icon magical-glow">
          {getThemeIcon()}
        </span>
        <span className="theme-toggle__label">{getThemeLabel()}</span>
      </button>

      <button
        className="accent-toggle glass-button hover-lift"
        onClick={cycleAccentColor}
        aria-label={`Change accent color from ${themeState.accent}`}
        title={`Current accent: ${themeState.accent}. Click to cycle colors.`}
      >
        <span className="accent-toggle__icon magical-glow">
          {getAccentIcon()}
        </span>
        <span className="accent-toggle__label">{themeState.accent}</span>
      </button>
    </div>
  )
}

export default ThemeToggle
