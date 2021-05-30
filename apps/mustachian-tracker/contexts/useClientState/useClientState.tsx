import getAssetsDatasheet from 'contexts/useClientState/getAssetsDatasheet'
import getAssetsDatatable from 'contexts/useClientState/getAssetsDatatable'
import useServerState from 'contexts/useServerState'
import merge from 'lodash.merge'
import {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useState,
} from 'react'
import { AssetsDatasheetTable } from 'types/index.d'

import getAssetsMetrics from './getAssetsMetrics'
import { ClientState } from './index.d'

const Context = createContext(null)

export type UseClientState = [
  ClientState,
  {
    addYear: (year) => void
    selectYear: (year: string) => void
    setData: (data: AssetsDatasheetTable) => void
    setField: (value: string, row: number, col: number) => void
  },
]
export default function useClientState(): UseClientState {
  const state = useContext<UseClientState>(Context)

  return state
}

type ProviderProps = {
  children: ReactNode
}
export function Provider({ children }: ProviderProps): ReactElement {
  const [serverState, { setAssetsDoc }] = useServerState()

  const assetsDatasheet = getAssetsDatasheet(serverState.assetsDoc)
  const assetsDatatable = getAssetsDatatable(serverState.assetsDoc)
  const assetsMetrics = getAssetsMetrics(serverState.assetsDoc)

  const [state, setState] = useState<ClientState>({
    yearSelected: Object.keys(assetsDatasheet).slice(0).reverse()[0],
    timeframeSelected: '1Y',

    assetsDatasheet,
    assetsDatatable,
    assetsMetrics,
  })

  return (
    <Context.Provider
      value={[state, { addYear, selectYear, setData, setField }]}
    >
      {children}
    </Context.Provider>
  )

  function setData(data: AssetsDatasheetTable) {
    setState((s) => {
      setAssetsDoc(s.yearSelected, data)

      return {
        ...s,
        assetsDatasheet: {
          ...s.assetsDatasheet,
          [state.yearSelected]: data,
        },
      }
    })
  }

  function setField(value, row, col) {
    setState((s) => {
      const data = s.assetsDatasheet[state.yearSelected]
      const dataUpdated = data

      dataUpdated[row][col] = { ...data[row][col], value }

      setAssetsDoc(s.yearSelected, dataUpdated)

      return {
        ...s,
        assetsDatasheet: {
          ...s.assetsDatasheet,
          [state.yearSelected]: dataUpdated,
        },
      }
    })
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
