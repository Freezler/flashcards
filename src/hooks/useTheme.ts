import { useState, useEffect } from 'react'

type ThemeMode = 'light' | 'dark' | 'auto'
type AccentColor = 'blue' | 'purple' | 'green' | 'orange' | 'pink'

interface ThemeState {
  mode: ThemeMode
  accent: AccentColor
}

/**
 * Custom hook to access the current theme state
 * Syncs with localStorage and provides the current theme mode and accent
 */
export function useTheme(): ThemeState {
  const [themeState, setThemeState] = useState<ThemeState>({
    mode: 'auto',
    accent: 'blue',
  })

  useEffect(() => {
    // Initial load from localStorage
    const savedMode = localStorage.getItem('theme-mode') as ThemeMode | null
    const savedAccent = localStorage.getItem(
      'theme-accent'
    ) as AccentColor | null

    const newThemeState = {
      mode: savedMode || 'auto',
      accent: savedAccent || 'blue',
    }

    setThemeState(newThemeState)

    // Listen for storage changes (theme changes in other tabs)
    const handleStorageChange = (e: StorageEvent): void => {
      if (e.key === 'theme-mode' && e.newValue) {
        setThemeState(prev => ({ ...prev, mode: e.newValue as ThemeMode }))
      }
      if (e.key === 'theme-accent' && e.newValue) {
        setThemeState(prev => ({ ...prev, accent: e.newValue as AccentColor }))
      }
    }

    // Listen for custom theme change events (same tab)
    const handleThemeChange = (e: CustomEvent<ThemeState>): void => {
      setThemeState(e.detail)
    }

    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('themechange', handleThemeChange as EventListener)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener(
        'themechange',
        handleThemeChange as EventListener
      )
    }
  }, [])

  return themeState
}

/**
 * Get CSS class name for theme-aware SVG logos
 * @param themeState - Current theme state
 * @returns CSS class name to apply to SVG elements
 */
export function getLogoThemeClass(themeState: ThemeState): string {
  switch (themeState.mode) {
    case 'light':
      return 'light-mode'
    case 'dark':
      return 'dark-mode'
    case 'auto':
      return 'auto-mode'
    default:
      return ''
  }
}
