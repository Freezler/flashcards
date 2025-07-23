/**
 * Security utilities for XSS prevention and input sanitization
 */

// HTML entities that need escaping to prevent XSS
const HTML_ENTITIES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
  '/': '&#x2F;',
  '`': '&#x60;',
  '=': '&#x3D;'
}

/**
 * Escape HTML entities to prevent XSS attacks
 * @param unsafe - Potentially unsafe string input
 * @returns Sanitized string safe for HTML rendering
 */
export const escapeHtml = (unsafe: string): string => {
  if (typeof unsafe !== 'string') {
    return String(unsafe)
  }
  
  return unsafe.replace(/[&<>"'`=\/]/g, (match) => HTML_ENTITIES[match] || match)
}

/**
 * Sanitize flashcard content to prevent XSS while preserving basic formatting
 * @param content - User input content
 * @returns Sanitized content
 */
export const sanitizeFlashcardContent = (content: string): string => {
  if (!content || typeof content !== 'string') {
    return ''
  }

  // Remove potentially dangerous characters and normalize whitespace
  return content
    .replace(/[<>]/g, '') // Remove angle brackets completely
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+\s*=/gi, '') // Remove event handlers like onclick=
    .replace(/data:(?!image\/[a-z]+;base64,)/gi, '') // Block data URLs except safe images
    .trim()
    .substring(0, 1000) // Limit length to prevent DoS
}

/**
 * Validate and sanitize category names
 * @param category - Category input
 * @returns Sanitized category
 */
export const sanitizeCategory = (category: string): string => {
  if (!category || typeof category !== 'string') {
    return ''
  }

  return category
    .replace(/[<>"'&]/g, '') // Remove HTML-dangerous characters
    .trim()
    .substring(0, 100) // Reasonable limit for categories
}

/**
 * Sanitize tags array
 * @param tags - Array of tag strings
 * @returns Sanitized tags array
 */
export const sanitizeTags = (tags: string[]): string[] => {
  if (!Array.isArray(tags)) {
    return []
  }

  return tags
    .filter(tag => typeof tag === 'string' && tag.trim().length > 0)
    .map(tag => tag
      .replace(/[<>"'&]/g, '') // Remove HTML-dangerous characters
      .trim()
      .substring(0, 50) // Reasonable limit for tags
    )
    .filter(tag => tag.length > 0)
    .slice(0, 10) // Limit number of tags
}

/**
 * Validate email format securely
 * @param email - Email input
 * @returns Whether email is valid
 */
export const isValidEmail = (email: string): boolean => {
  if (!email || typeof email !== 'string') {
    return false
  }

  // Simple but secure email validation
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
  
  return emailRegex.test(email) && email.length <= 254 // RFC 5321 limit
}

/**
 * Generate a cryptographically secure random token
 * @param length - Length of the token
 * @returns Secure random token
 */
export const generateSecureToken = (length: number = 32): string => {
  const array = new Uint8Array(length)
  crypto.getRandomValues(array)
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('')
}

/**
 * Validate that user input doesn't contain suspicious patterns
 * @param input - User input to validate
 * @returns Whether input appears safe
 */
export const validateUserInput = (input: string): boolean => {
  if (!input || typeof input !== 'string') {
    return true // Empty input is safe
  }

  // Patterns that might indicate XSS attempts
  const suspiciousPatterns = [
    /<script/i,
    /javascript:/i,
    /on\w+\s*=/i,
    /<iframe/i,
    /<object/i,
    /<embed/i,
    /<link/i,
    /<meta/i,
    /data:(?!image\/[a-z]+;base64,)/i,
    /vbscript:/i,
    /expression\s*\(/i
  ]

  return !suspiciousPatterns.some(pattern => pattern.test(input))
}

/**
 * Rate limiter for preventing abuse
 */
export class RateLimiter {
  private attempts: Map<string, number[]> = new Map()
  private readonly maxAttempts: number
  private readonly windowMs: number

  constructor(maxAttempts: number = 10, windowMs: number = 60000) {
    this.maxAttempts = maxAttempts
    this.windowMs = windowMs
  }

  isAllowed(identifier: string): boolean {
    const now = Date.now()
    const attempts = this.attempts.get(identifier) || []

    // Remove old attempts outside the window
    const recentAttempts = attempts.filter(time => now - time < this.windowMs)
    
    if (recentAttempts.length >= this.maxAttempts) {
      return false
    }

    // Add current attempt
    recentAttempts.push(now)
    this.attempts.set(identifier, recentAttempts)

    return true
  }

  reset(identifier: string): void {
    this.attempts.delete(identifier)
  }
}

// Global rate limiter instances
export const formSubmissionLimiter = new RateLimiter(5, 60000) // 5 submissions per minute
export const loginAttemptLimiter = new RateLimiter(3, 300000) // 3 login attempts per 5 minutes