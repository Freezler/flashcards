import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react'
import { secureStorage } from '../utils/secureStorage'

interface User {
  id: string
  name: string
  email: string
  isFirstLogin?: boolean
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  isFirstLogin: boolean
  login: (userData: User) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider = React.memo(function AuthProvider({
  children,
}: AuthProviderProps): React.JSX.Element {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in on app start
    const userData = secureStorage.getJSON<User>('user')
    if (userData) {
      setUser(userData)
    } else {
      // For development, auto-login a test user
      const testUser = {
        id: 'test-user-1',
        name: 'Test Gebruiker',
        email: 'test@example.com',
        isFirstLogin: false,
      }
      setUser(testUser)
      secureStorage.setItem('user', testUser)
    }
    setIsLoading(false)
  }, [])

  const login = (userData: User) => {
    // Check if this user has logged in before by checking existing users storage
    const userList = secureStorage.getJSON<string[]>('flashcards-users') || []

    // Check if user ID already exists in the list
    const isFirstLogin = !userList.includes(userData.id)

    if (isFirstLogin) {
      // Add user to the list of users who have logged in
      userList.push(userData.id)
      secureStorage.setItem('flashcards-users', userList)
    }

    const userWithLoginStatus = {
      ...userData,
      isFirstLogin,
    }

    setUser(userWithLoginStatus)
    secureStorage.setItem('user', userWithLoginStatus)
  }

  const logout = () => {
    setUser(null)
    secureStorage.removeItem('user')
  }

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    isFirstLogin: user?.isFirstLogin ?? false,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
})

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
