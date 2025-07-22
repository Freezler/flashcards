import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react'

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
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser)
        setUser(userData)
      } catch (error) {
        console.error('Error parsing stored user data:', error)
        localStorage.removeItem('user')
      }
    }
    setIsLoading(false)
  }, [])

  const login = (userData: User) => {
    // Check if this user has logged in before by checking existing users storage
    const existingUsers = localStorage.getItem('flashcards-users') || '[]'
    let userList: string[] = []
    
    try {
      userList = JSON.parse(existingUsers)
    } catch (error) {
      console.error('Error parsing users list:', error)
    }

    // Check if user ID already exists in the list
    const isFirstLogin = !userList.includes(userData.id)
    
    if (isFirstLogin) {
      // Add user to the list of users who have logged in
      userList.push(userData.id)
      localStorage.setItem('flashcards-users', JSON.stringify(userList))
    }

    const userWithLoginStatus = {
      ...userData,
      isFirstLogin,
    }

    setUser(userWithLoginStatus)
    localStorage.setItem('user', JSON.stringify(userWithLoginStatus))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
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
