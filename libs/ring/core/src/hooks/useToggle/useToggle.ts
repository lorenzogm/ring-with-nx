import { useMemo, useState } from 'react'

export type UseToggleState = 'OPEN' | 'CLOSED'

export type UseToggleHandlers = {
  toggle: () => void
  open: () => void
  close: () => void
}

export function useToggle(): [UseToggleState, UseToggleHandlers] {
  const [state, setState] = useState<UseToggleState>('CLOSED')

  const handlers = useMemo(
    () => ({
      open: () => {
        setState('OPEN')
      },
      close: () => {
        setState('CLOSED')
      },
      toggle: () => {
        setState((s) => (s === 'OPEN' ? 'CLOSED' : 'OPEN'))
      },
    }),
    [],
  )

  return [state, handlers]
}
