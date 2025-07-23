/**
 * CSRF (Cross-Site Request Forgery) protection utilities
 */

import { generateSecureToken } from './security'
import { secureStorage } from './secureStorage'

/**
 * CSRF token manager
 */
class CSRFManager {
  private static instance: CSRFManager
  private currentToken: string | null = null
  private tokenExpiry: number = 0
  private readonly TOKEN_LIFETIME = 3600000 // 1 hour in milliseconds

  private constructor() {
    // Singleton pattern
  }

  static getInstance(): CSRFManager {
    if (!CSRFManager.instance) {
      CSRFManager.instance = new CSRFManager()
    }
    return CSRFManager.instance
  }

  /**
   * Generate a new CSRF token
   */
  private generateToken(): string {
    return generateSecureToken(32)
  }

  /**
   * Get current CSRF token, generating a new one if needed
   */
  getToken(): string {
    const now = Date.now()
    
    // Check if current token is still valid
    if (this.currentToken && now < this.tokenExpiry) {
      return this.currentToken
    }

    // Generate new token
    this.currentToken = this.generateToken()
    this.tokenExpiry = now + this.TOKEN_LIFETIME

    // Store in secure storage for persistence across page reloads
    secureStorage.setItem('csrf-token', this.currentToken)
    secureStorage.setItem('csrf-token-expiry', this.tokenExpiry.toString())

    return this.currentToken
  }

  /**
   * Validate a CSRF token
   */
  validateToken(token: string): boolean {
    if (!token || typeof token !== 'string') {
      return false
    }

    const currentToken = this.getToken()
    const now = Date.now()

    // Check token match and expiry
    return token === currentToken && now < this.tokenExpiry
  }

  /**
   * Initialize CSRF manager from stored data
   */
  initialize(): void {
    const storedToken = secureStorage.getItem('csrf-token')
    const storedExpiry = secureStorage.getItem('csrf-token-expiry')

    if (storedToken && storedExpiry) {
      const expiry = parseInt(storedExpiry, 10)
      const now = Date.now()

      if (now < expiry) {
        this.currentToken = storedToken
        this.tokenExpiry = expiry
      } else {
        // Clean up expired token
        secureStorage.removeItem('csrf-token')
        secureStorage.removeItem('csrf-token-expiry')
      }
    }
  }

  /**
   * Clear current token (for logout)
   */
  clearToken(): void {
    this.currentToken = null
    this.tokenExpiry = 0
    secureStorage.removeItem('csrf-token')
    secureStorage.removeItem('csrf-token-expiry')
  }
}

// Export singleton instance
export const csrfManager = CSRFManager.getInstance()

/**
 * React hook for CSRF protection
 */
export const useCSRF = () => {
  const getToken = () => csrfManager.getToken()
  const validateToken = (token: string) => csrfManager.validateToken(token)

  return { getToken, validateToken }
}

/**
 * Add CSRF token to form data
 */
export const addCSRFToken = (formData: FormData): FormData => {
  const token = csrfManager.getToken()
  formData.append('csrf_token', token)
  return formData
}

/**
 * Add CSRF token to request headers
 */
export const addCSRFHeaders = (headers: Record<string, string> = {}): Record<string, string> => {
  return {
    ...headers,
    'X-CSRF-Token': csrfManager.getToken()
  }
}

/**
 * Validate CSRF token from request
 */
export const validateCSRFFromRequest = (request: {
  headers?: Record<string, string>
  body?: FormData | Record<string, any>
}): boolean => {
  // Check header first
  if (request.headers && request.headers['X-CSRF-Token']) {
    return csrfManager.validateToken(request.headers['X-CSRF-Token'])
  }

  // Check form data
  if (request.body) {
    let token: string | null = null
    
    if (request.body instanceof FormData) {
      token = request.body.get('csrf_token') as string
    } else if (typeof request.body === 'object' && request.body.csrf_token) {
      token = request.body.csrf_token
    }

    if (token) {
      return csrfManager.validateToken(token)
    }
  }

  return false
}

// Initialize CSRF manager
if (typeof window !== 'undefined') {
  csrfManager.initialize()
}