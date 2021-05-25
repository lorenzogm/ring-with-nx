import {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'

import getAssets from './getAssets'
import { ServerState } from './index.d'

const Context = createContext(null)

type UseServerState = [ServerState]
export default function useServerState(): UseServerState {
  const state = useContext(Context)

  return state
}

type ProviderProps = {
  children: ReactNode
}
export function Provider({ children }: ProviderProps): ReactElement {
  const [state, setState] = useState<ServerState>({ status: 'IDLE' })

  useEffect(() => {
    getAssets().then((assetsDoc) => {
      setState({
        status: 'SUCCESS',
        assetsDoc,
      })
    })
  }, [])

  if (state.status !== 'SUCCESS') {
    return null
  }

  return <Context.Provider value={[state]}>{children}</Context.Provider>
}
