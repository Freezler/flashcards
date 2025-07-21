import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { CardProvider } from '../contexts/CardContext'

interface TestWrapperProps {
  children: React.ReactNode
}

export const TestWrapper = ({
  children,
}: TestWrapperProps): React.JSX.Element => {
  return (
    <MemoryRouter>
      <CardProvider>{children}</CardProvider>
    </MemoryRouter>
  )
}
