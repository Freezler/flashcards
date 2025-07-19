import {
  act,
  cleanup,
  fireEvent,
  RenderOptions,
  render as rtlRender,
  screen,
  waitFor,
} from '@testing-library/react'
import { TestWrapper } from './TestWrapper'

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => rtlRender(ui, { wrapper: TestWrapper, ...options })

// Export our custom render function and commonly used RTL functions
export { act, cleanup, fireEvent, customRender as render, screen, waitFor }
