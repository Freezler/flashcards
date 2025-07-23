/**
 * Secure localStorage wrapper with encryption and validation
 */

import { generateSecureToken } from './security'

// Simple encryption/decryption for sensitive data
const ENCRYPTION_KEY = 'flashcards-security-2024' // In production, this would be dynamically generated

/**
 * Simple XOR encryption for localStorage data
 * Note: This is basic obfuscation, not cryptographically secure encryption
 */
const encrypt = (text: string): string => {
  let result = ''
  for (let i = 0; i < text.length; i++) {
    result += String.fromCharCode(
      text.charCodeAt(i) ^ ENCRYPTION_KEY.charCodeAt(i % ENCRYPTION_KEY.length)
    )
  }
  return btoa(result) // Base64 encode
}

const decrypt = (encrypted: string): string => {
  try {
    const text = atob(encrypted) // Base64 decode
    let result = ''
    for (let i = 0; i < text.length; i++) {
      result += String.fromCharCode(
        text.charCodeAt(i) ^ ENCRYPTION_KEY.charCodeAt(i % ENCRYPTION_KEY.length)
      )
    }
    return result
  } catch {
    return ''
  }
}

/**
 * Data types that should be encrypted in localStorage
 */
const SENSITIVE_KEYS = ['user', 'auth-token', 'session-data']

/**
 * Data size limits to prevent DoS attacks
 */
const MAX_DATA_SIZE = 1024 * 1024 // 1MB per item
const MAX_TOTAL_SIZE = 5 * 1024 * 1024 // 5MB total

class SecureStorage {
  private static instance: SecureStorage
  private sizeTracker = new Map<string, number>()

  private constructor() {
    // Singleton pattern
  }

  static getInstance(): SecureStorage {
    if (!SecureStorage.instance) {
      SecureStorage.instance = new SecureStorage()
    }
    return SecureStorage.instance
  }

  /**
   * Get current total storage size
   */
  private getTotalSize(): number {
    return Array.from(this.sizeTracker.values()).reduce((sum, size) => sum + size, 0)
  }

  /**
   * Validate data before storing
   */
  private validateData(key: string, data: string): boolean {
    if (!key || typeof key !== 'string') return false
    if (!data || typeof data !== 'string') return false
    if (data.length > MAX_DATA_SIZE) return false
    if (this.getTotalSize() + data.length > MAX_TOTAL_SIZE) return false
    
    // Check for suspicious patterns
    const suspiciousPatterns = [
      /<script/i,
      /javascript:/i,
      /on\w+\s*=/i,
      /data:(?!image\/[a-z]+;base64,)/i
    ]
    
    return !suspiciousPatterns.some(pattern => pattern.test(data))
  }

  /**
   * Set item in localStorage with optional encryption
   */
  setItem(key: string, value: any): boolean {
    try {
      const stringValue = typeof value === 'string' ? value : JSON.stringify(value)
      
      if (!this.validateData(key, stringValue)) {
        console.warn('SecureStorage: Invalid data rejected for key:', key)
        return false
      }

      const shouldEncrypt = SENSITIVE_KEYS.some(sensitiveKey => key.includes(sensitiveKey))
      const finalValue = shouldEncrypt ? encrypt(stringValue) : stringValue
      
      localStorage.setItem(key, finalValue)
      this.sizeTracker.set(key, finalValue.length)
      
      return true
    } catch (error) {
      console.error('SecureStorage: Failed to set item:', error)
      return false
    }
  }

  /**
   * Get item from localStorage with automatic decryption
   */
  getItem(key: string): string | null {
    try {
      const value = localStorage.getItem(key)
      if (!value) return null

      const shouldDecrypt = SENSITIVE_KEYS.some(sensitiveKey => key.includes(sensitiveKey))
      return shouldDecrypt ? decrypt(value) : value
    } catch (error) {
      console.error('SecureStorage: Failed to get item:', error)
      return null
    }
  }

  /**
   * Get and parse JSON item
   */
  getJSON<T>(key: string): T | null {
    try {
      const value = this.getItem(key)
      return value ? JSON.parse(value) : null
    } catch (error) {
      console.error('SecureStorage: Failed to parse JSON:', error)
      return null
    }
  }

  /**
   * Remove item from localStorage
   */
  removeItem(key: string): void {
    try {
      localStorage.removeItem(key)
      this.sizeTracker.delete(key)
    } catch (error) {
      console.error('SecureStorage: Failed to remove item:', error)
    }
  }

  /**
   * Clear all data
   */
  clear(): void {
    try {
      localStorage.clear()
      this.sizeTracker.clear()
    } catch (error) {
      console.error('SecureStorage: Failed to clear storage:', error)
    }
  }

  /**
   * Get storage statistics
   */
  getStats(): { totalSize: number; itemCount: number; items: string[] } {
    return {
      totalSize: this.getTotalSize(),
      itemCount: this.sizeTracker.size,
      items: Array.from(this.sizeTracker.keys())
    }
  }

  /**
   * Clean up expired or invalid data
   */
  cleanup(): void {
    try {
      const keys = Object.keys(localStorage)
      keys.forEach(key => {
        const value = localStorage.getItem(key)
        if (value && !this.validateData(key, value)) {
          console.warn('SecureStorage: Removing invalid data for key:', key)
          this.removeItem(key)
        }
      })
    } catch (error) {
      console.error('SecureStorage: Cleanup failed:', error)
    }
  }
}

// Export singleton instance
export const secureStorage = SecureStorage.getInstance()

/**
 * Initialize secure storage and perform cleanup
 */
export const initSecureStorage = (): void => {
  // Generate client ID for rate limiting if not exists
  if (!secureStorage.getItem('client-id')) {
    secureStorage.setItem('client-id', generateSecureToken())
  }

  // Perform cleanup on initialization
  secureStorage.cleanup()
}

// Auto-initialize
if (typeof window !== 'undefined') {
  initSecureStorage()
}