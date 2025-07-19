import React from 'react'

interface LoadingBoundaryProps {
  loading: boolean
  error: string | null
  fallback?: React.ReactNode
  errorFallback?: (error: string) => React.ReactNode
  children: React.ReactNode
}

const LoadingBoundary = React.memo(function LoadingBoundary({
  loading,
  error,
  fallback,
  errorFallback,
  children,
}: LoadingBoundaryProps): React.JSX.Element {
  if (loading) {
    return (
      <>
        {fallback || (
          <div className="loading-state">
            <h2>Laden...</h2>
          </div>
        )}
      </>
    )
  }

  if (error) {
    return (
      <>
        {errorFallback ? (
          errorFallback(error)
        ) : (
          <div className="error-message">
            <h2>Er is een fout opgetreden</h2>
            <p>{error}</p>
          </div>
        )}
      </>
    )
  }

  return <>{children}</>
})

export default LoadingBoundary
