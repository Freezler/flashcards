import React from 'react'

interface EmptyStateProps {
  icon: string
  title: string
  description: string
  action?: {
    text: string
    onClick: () => void
    variant?: 'primary' | 'secondary'
  }
}

const EmptyState = React.memo(function EmptyState({
  icon,
  title,
  description,
  action,
}: EmptyStateProps): React.JSX.Element {
  return (
    <div className="empty-state">
      <div className="empty-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
      {action && (
        <button
          className={`btn-${action.variant || 'primary'}`}
          onClick={action.onClick}
        >
          {action.text}
        </button>
      )}
    </div>
  )
})

export default EmptyState
