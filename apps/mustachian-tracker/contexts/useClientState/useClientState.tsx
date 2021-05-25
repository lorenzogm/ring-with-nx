import {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useState,
} from 'react'
import merge from 'lodash.merge'
import getAssetsDatasheet from 'contexts/useClientState/getAssetsDatasheet'
import getAssetsDatatable from 'contexts/useClientState/getAssetsDatatable'
import useServerState, { AssetsDoc } from 'contexts/useServerState'
import { ClientState } from './index.d'

const Context = createContext(null)

export type UseClientState = [
  ClientState,
  {
    addYear: (year) => void
    selectYear: (year: string) => void
    setData: (data: AssetsDoc) => void
  },
]
export default function useClientState(): UseClientState {
  const state = useContext(Context)

  return state
}

type ProviderProps = {
  children: ReactNode
}
export function Provider({ children }: ProviderProps): ReactElement {
  const [serverState] = useServerState()

  const assetsDatasheet = getAssetsDatasheet(serverState.assetsDoc)
  const assetsDatatable = getAssetsDatatable(serverState.assetsDoc)

  const [state, setState] = useState<ClientState>({
    yearSelected: Object.keys(assetsDatasheet).slice(0).reverse()[0],
    assetsDatasheet,
    assetsDatatable,
  })

  return (
    <Context.Provider value={[state, { addYear, selectYear, setData }]}>
      {children}
    </Context.Provider>
  )

  function setData(data) {
    setState((s) => ({
      ...s,
      assetsDatasheet: {
        ...s.assetsDatasheet,
        [state.yearSelected]: data,
      },
    }))
  }

  function selectYear(year) {
    setState((s) => ({ ...s, yearSelected: year }))
  }

  function addYear() {
    const year =
      Math.min(
        ...Object.keys(state.assetsDatasheet).map((y) => parseInt(y, 10)),
      ) - 1
    const assetsDoc = merge(serverState.assetsDoc, {
      assets: {
        [year]: [],
      },
    })

    setState((s) => ({
      ...s,
      assetsDatasheet: getAssetsDatasheet(assetsDoc),
      yearSelected: year.toString(),
    }))
  }
}
