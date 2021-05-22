import {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useState,
} from 'react'
import useServerState from '../useServerState'
import { ClientState } from './index.d'

const Context = createContext(null)

export default function useClientState() {
  const state = useContext(Context)

  return state
}

type ProviderProps = {
  children: ReactNode
}
export function Provider({ children }: ProviderProps): ReactElement {
  const [serverState] = useServerState()

  const [state, setState] = useState<ClientState>({
    yearSelected: serverState.yearList[0],
  })

  function selectYear(year) {
    setState((state) => ({ ...state, yearSelected: year }))
  }

  return (
    <Context.Provider value={[state, { selectYear }]}>
      {children}
    </Context.Provider>
  )
}
