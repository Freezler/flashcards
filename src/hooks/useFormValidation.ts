import { useState, useCallback } from 'react'

type ValidationRules<T> = {
  [K in keyof T]?: (value: T[K]) => string | undefined
}

interface UseFormValidationReturn<T> {
  formData: T
  errors: Partial<Record<keyof T, string>>
  updateField: (field: keyof T, value: T[keyof T]) => void
  validateAll: () => boolean
  setFormData: React.Dispatch<React.SetStateAction<T>>
  clearErrors: () => void
}

export function useFormValidation<
  T extends Record<string, string | number | boolean>,
>(
  initialData: T,
  validationRules: ValidationRules<T>
): UseFormValidationReturn<T> {
  const [formData, setFormData] = useState<T>(initialData)
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({})

  const _validateField = useCallback(
    (field: keyof T, value: T[keyof T]): boolean => {
      const rule = validationRules[field]
      const error = rule ? rule(value) : undefined

      setErrors(prev => ({
        ...prev,
        [field]: error,
      }))

      return !error
    },
    [validationRules]
  )

  const updateField = useCallback(
    (field: keyof T, value: T[keyof T]): void => {
      setFormData(prev => ({
        ...prev,
        [field]: value,
      }))

      // Clear error when user starts typing
      if (errors[field]) {
        setErrors(prev => ({
          ...prev,
          [field]: undefined,
        }))
      }
    },
    [errors]
  )

  const validateAll = useCallback((): boolean => {
    const newErrors: Partial<Record<keyof T, string>> = {}
    let isValid = true

    for (const [field, value] of Object.entries(formData)) {
      const rule = validationRules[field as keyof T]
      if (rule) {
        const error = rule(value as T[keyof T])
        if (error) {
          newErrors[field as keyof T] = error
          isValid = false
        }
      }
    }

    setErrors(newErrors)
    return isValid
  }, [formData, validationRules])

  const clearErrors = useCallback((): void => {
    setErrors({})
  }, [])

  return {
    formData,
    errors,
    updateField,
    validateAll,
    setFormData,
    clearErrors,
  }
}

// Common validation rules
export const validationRules = {
  required: (fieldName: string) => (value: string) =>
    !value?.trim() ? `${fieldName} is verplicht` : undefined,

  minLength: (fieldName: string, minLength: number) => (value: string) =>
    value?.length < minLength
      ? `${fieldName} moet minimaal ${minLength} karakters bevatten`
      : undefined,

  maxLength: (fieldName: string, maxLength: number) => (value: string) =>
    value?.length > maxLength
      ? `${fieldName} mag maximaal ${maxLength} karakters bevatten`
      : undefined,
}
