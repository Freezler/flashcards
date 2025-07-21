import React, { useState, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useFormValidation, validationRules } from '../hooks'
import { useAuth } from '../contexts/AuthContext'

interface LoginFormData {
  email: string
  password: string
}

interface RegisterFormData extends LoginFormData {
  name: string
  confirmPassword: string
}

const LoginPage = React.memo(function LoginPage(): React.JSX.Element {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [isRegister, setIsRegister] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [authError, setAuthError] = useState<string | null>(null)

  // Validation rules voor login
  const loginValidationRules = {
    email: (value: string) => {
      if (!value?.trim()) return 'E-mail is verplicht'
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return !emailRegex.test(value) ? 'Ongeldig e-mailadres' : undefined
    },
    password: validationRules.required('Wachtwoord'),
  }

  // Validation rules voor registratie
  const registerValidationRules = {
    name: validationRules.required('Naam'),
    email: (value: string) => {
      if (!value?.trim()) return 'E-mail is verplicht'
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return !emailRegex.test(value) ? 'Ongeldig e-mailadres' : undefined
    },
    password: (value: string) => {
      if (!value?.trim()) return 'Wachtwoord is verplicht'
      return value.length < 6
        ? 'Wachtwoord moet minimaal 6 karakters bevatten'
        : undefined
    },
    confirmPassword: (value: string) => {
      if (!value?.trim()) return 'Bevestig wachtwoord'
      return undefined // We'll check this separately
    },
  }

  const {
    formData: loginData,
    errors: loginErrors,
    updateField: updateLoginField,
    validateAll: validateLogin,
  } = useFormValidation<LoginFormData>(
    { email: '', password: '' },
    loginValidationRules
  )

  const {
    formData: registerData,
    errors: registerErrors,
    updateField: updateRegisterField,
    validateAll: validateRegister,
  } = useFormValidation<RegisterFormData>(
    { name: '', email: '', password: '', confirmPassword: '' },
    registerValidationRules
  )

  const handleLogin = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      setAuthError(null)

      if (!validateLogin()) return

      setIsLoading(true)
      try {
        // Simuleer API call
        await new Promise(resolve => setTimeout(resolve, 1000))

        // Mock login logic - in echte app zou dit een API call zijn
        if (
          loginData.email === 'demo@flashcards.nl' &&
          loginData.password === 'demo123'
        ) {
          const userData = {
            id: '1',
            name: 'Demo Gebruiker',
            email: loginData.email,
          }
          login(userData)
          navigate('/')
        } else {
          setAuthError('Ongeldig e-mailadres of wachtwoord')
        }
      } catch {
        setAuthError('Er is een fout opgetreden bij het inloggen')
      } finally {
        setIsLoading(false)
      }
    },
    [loginData, validateLogin, navigate, login]
  )

  const handleRegister = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      setAuthError(null)

      if (!validateRegister()) return

      // Check password confirmation
      if (registerData.password !== registerData.confirmPassword) {
        setAuthError('Wachtwoorden komen niet overeen')
        return
      }

      setIsLoading(true)
      try {
        // Simuleer API call
        await new Promise(resolve => setTimeout(resolve, 1000))

        // Mock register logic
        const userData = {
          id: Date.now().toString(),
          name: registerData.name,
          email: registerData.email,
        }
        login(userData)
        navigate('/')
      } catch {
        setAuthError('Er is een fout opgetreden bij het registreren')
      } finally {
        setIsLoading(false)
      }
    },
    [registerData, validateRegister, navigate, login]
  )

  const toggleMode = useCallback(() => {
    setIsRegister(!isRegister)
    setAuthError(null)
  }, [isRegister])

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <Link to="/" className="login-logo">
            📚 FlashCards
          </Link>
          <h1 className="login-title">
            {isRegister ? 'Account aanmaken' : 'Inloggen'}
          </h1>
          <p className="login-subtitle">
            {isRegister
              ? 'Maak een account aan om je voortgang op te slaan'
              : 'Log in om verder te gaan met leren'}
          </p>
        </div>

        {authError && (
          <div className="auth-error">
            <span className="error-icon">⚠️</span>
            {authError}
          </div>
        )}

        <form
          onSubmit={isRegister ? handleRegister : handleLogin}
          className="login-form"
        >
          {isRegister && (
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                Naam *
              </label>
              <input
                type="text"
                id="name"
                className={`form-input ${registerErrors.name ? 'error' : ''}`}
                value={registerData.name}
                onChange={e => updateRegisterField('name', e.target.value)}
                placeholder="Je naam"
                disabled={isLoading}
              />
              {registerErrors.name && (
                <span className="form-error">{registerErrors.name}</span>
              )}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email" className="form-label">
              E-mailadres *
            </label>
            <input
              type="email"
              id="email"
              className={`form-input ${(isRegister ? registerErrors.email : loginErrors.email) ? 'error' : ''}`}
              value={isRegister ? registerData.email : loginData.email}
              onChange={e =>
                isRegister
                  ? updateRegisterField('email', e.target.value)
                  : updateLoginField('email', e.target.value)
              }
              placeholder="je@email.nl"
              disabled={isLoading}
            />
            {(isRegister ? registerErrors.email : loginErrors.email) && (
              <span className="form-error">
                {isRegister ? registerErrors.email : loginErrors.email}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Wachtwoord *
            </label>
            <input
              type="password"
              id="password"
              className={`form-input ${(isRegister ? registerErrors.password : loginErrors.password) ? 'error' : ''}`}
              value={isRegister ? registerData.password : loginData.password}
              onChange={e =>
                isRegister
                  ? updateRegisterField('password', e.target.value)
                  : updateLoginField('password', e.target.value)
              }
              placeholder={
                isRegister ? 'Minimaal 6 karakters' : 'Je wachtwoord'
              }
              disabled={isLoading}
            />
            {(isRegister ? registerErrors.password : loginErrors.password) && (
              <span className="form-error">
                {isRegister ? registerErrors.password : loginErrors.password}
              </span>
            )}
          </div>

          {isRegister && (
            <div className="form-group">
              <label htmlFor="confirmPassword" className="form-label">
                Bevestig wachtwoord *
              </label>
              <input
                type="password"
                id="confirmPassword"
                className={`form-input ${registerErrors.confirmPassword ? 'error' : ''}`}
                value={registerData.confirmPassword}
                onChange={e =>
                  updateRegisterField('confirmPassword', e.target.value)
                }
                placeholder="Herhaal je wachtwoord"
                disabled={isLoading}
              />
              {registerErrors.confirmPassword && (
                <span className="form-error">
                  {registerErrors.confirmPassword}
                </span>
              )}
            </div>
          )}

          <button
            type="submit"
            className="btn-primary login-submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="loading-spinner">⏳</span>
            ) : isRegister ? (
              'Account aanmaken'
            ) : (
              'Inloggen'
            )}
          </button>
        </form>

        <div className="login-footer">
          <p>
            {isRegister ? 'Heb je al een account?' : 'Nog geen account?'}{' '}
            <button
              type="button"
              className="link-button"
              onClick={toggleMode}
              disabled={isLoading}
            >
              {isRegister ? 'Inloggen' : 'Account aanmaken'}
            </button>
          </p>

          {!isRegister && (
            <div className="demo-credentials">
              <h4>Demo account:</h4>
              <p>📧 demo@flashcards.nl</p>
              <p>🔒 demo123</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
})

export default LoginPage
