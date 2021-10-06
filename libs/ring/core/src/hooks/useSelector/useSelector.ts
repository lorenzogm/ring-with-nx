import { useMemo, useState } from 'react'

type UseColorSelectorHandlers<State> = {
  select: (state: State) => void
}

export function useSelector<State>(
  initialState: State,
): [State, UseColorSelectorHandlers<State>] {
  const [state, setState] = useState<State>(initialState)

  const handlers = useMemo(
    () => ({
      select: (itemSelected: State) => {
        setState(itemSelected)
      },
    }),
    [],
  )

  return [state, handlers]
}
