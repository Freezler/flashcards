import React, { useCallback, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../contexts/AuthContext'
import { useFormValidation, validationRules } from '../hooks'
import {
  generateSecureToken,
  isValidEmail,
  loginAttemptLimiter,
  validateUserInput,
} from '../utils/security'

interface LoginFormData {
  email: string
  password: string
  [key: string]: string
}

interface RegisterFormData extends LoginFormData {
  name: string
  confirmPassword: string
}

const LoginPage = React.memo(function LoginPage(): React.JSX.Element {
  const { t } = useTranslation('common')
  const navigate = useNavigate()
  const { login } = useAuth()
  const [isRegister, setIsRegister] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [authError, setAuthError] = useState<string | null>(null)

  // Validation rules for login
  const loginValidationRules = {
    email: (value: string) => {
      if (!value?.trim()) return t('auth.emailRequired')
      if (!validateUserInput(value)) return t('auth.emailInvalidChars')
      return !isValidEmail(value) ? t('auth.emailInvalid') : undefined
    },
    password: (value: string) => {
      if (!value?.trim()) return t('auth.passwordRequired')
      if (!validateUserInput(value)) return t('auth.passwordInvalidChars')
      return undefined
    },
  }

  // Validation rules for registration
  const registerValidationRules = {
    name: validationRules.required(t('auth.nameLabel')),
    email: (value: string) => {
      if (!value?.trim()) return t('auth.emailRequired')
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return !emailRegex.test(value) ? t('auth.emailInvalid') : undefined
    },
    password: (value: string) => {
      if (!value?.trim()) return t('auth.passwordRequired')
      return value.length < 6 ? t('auth.passwordMinLength') : undefined
    },
    confirmPassword: (value: string) => {
      if (!value?.trim()) return t('auth.confirmPasswordRequired')
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

      // Rate limiting protection
      const clientIdentifier =
        'login-' + (localStorage.getItem('client-id') || generateSecureToken())
      if (!loginAttemptLimiter.isAllowed(clientIdentifier)) {
        setAuthError(t('auth.tooManyAttempts'))
        return
      }

      if (!validateLogin()) return

      setIsLoading(true)
      try {
        // Simuleer API call
        await new Promise(resolve => setTimeout(resolve, 1000))

        // Mock login logic - in real app this would be an API call
        if (
          loginData.email === 'demo@cognicraft.dev' &&
          loginData.password === 'demo123'
        ) {
          const userData = {
            id: generateSecureToken(16),
            name: t('auth.demoUser'),
            email: loginData.email,
          }
          login(userData)
          navigate('/')
        } else {
          setAuthError(t('auth.invalidCredentials'))
        }
      } catch {
        setAuthError(t('auth.loginError'))
      } finally {
        setIsLoading(false)
      }
    },
    [loginData, validateLogin, navigate, login, t]
  )

  const handleRegister = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      setAuthError(null)

      if (!validateRegister()) return

      // Check password confirmation
      if (registerData.password !== registerData.confirmPassword) {
        setAuthError(t('auth.passwordMismatch'))
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
        setAuthError(t('auth.registerError'))
      } finally {
        setIsLoading(false)
      }
    },
    [registerData, validateRegister, navigate, login, t]
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
            📚 CogniCraft
          </Link>
          <h1 className="login-title">
            {isRegister ? t('auth.createAccount') : t('auth.signIn')}
          </h1>
          <p className="login-subtitle">
            {isRegister
              ? t('auth.createAccountSubtitle')
              : t('auth.signInSubtitle')}
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
          noValidate
          aria-labelledby="login-title"
        >
          {isRegister && (
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                {t('auth.nameLabel')} *
              </label>
              <input
                type="text"
                id="name"
                className={`form-input ${registerErrors.name ? 'error' : ''}`}
                value={registerData.name}
                onChange={e => updateRegisterField('name', e.target.value)}
                placeholder={t('auth.namePlaceholder')}
                disabled={isLoading}
                required
                aria-invalid={!!registerErrors.name}
                aria-describedby={
                  registerErrors.name ? 'name-error' : undefined
                }
              />
              {registerErrors.name && (
                <span
                  id="name-error"
                  className="form-error"
                  role="alert"
                  aria-live="polite"
                >
                  {registerErrors.name}
                </span>
              )}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email" className="form-label">
              {t('auth.emailLabel')} *
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
              placeholder={t('auth.emailPlaceholder')}
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
              {t('auth.passwordLabel')} *
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
                isRegister
                  ? t('auth.passwordPlaceholderRegister')
                  : t('auth.passwordPlaceholder')
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
                {t('auth.confirmPasswordLabel')} *
              </label>
              <input
                type="password"
                id="confirmPassword"
                className={`form-input ${registerErrors.confirmPassword ? 'error' : ''}`}
                value={registerData.confirmPassword}
                onChange={e =>
                  updateRegisterField('confirmPassword', e.target.value)
                }
                placeholder={t('auth.confirmPasswordPlaceholder')}
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
              t('auth.createAccount')
            ) : (
              t('auth.signIn')
            )}
          </button>
        </form>

        <div className="login-footer">
          <p>
            {isRegister ? t('auth.haveAccount') : t('auth.noAccount')}{' '}
            <button
              type="button"
              className="link-button"
              onClick={toggleMode}
              disabled={isLoading}
            >
              {isRegister ? t('auth.signIn') : t('auth.createAccount')}
            </button>
          </p>

          {!isRegister && (
            <div className="demo-credentials">
              <h4>{t('auth.demoAccountTitle')}</h4>
              <p>📧 demo@cognicraft.dev</p>
              <p>🔒 demo123</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
})

export default LoginPage
